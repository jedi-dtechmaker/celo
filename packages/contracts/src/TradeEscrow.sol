// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import {ReentrancyGuard} from "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import {Pausable} from "@openzeppelin/contracts/utils/Pausable.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {SafeERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

/// @title TradeEscrow
/// @notice Escrows cUSD payments between buyers and sellers on Vorra.
/// @dev Funds are locked until delivery confirmation. Fee deducted at release.
contract TradeEscrow is ReentrancyGuard, Pausable, Ownable {
    using SafeERC20 for IERC20;

    // ──────────────────────────────────────────────
    //  Types
    // ──────────────────────────────────────────────

    enum EscrowStatus {
        Created,
        Funded,
        Accepted,
        Shipped,
        Delivered,
        Released,
        Cancelled,
        Refunded,
        Disputed
    }

    struct Escrow {
        uint256 id;
        address buyer;
        address seller;
        bytes32 orderId;
        bytes32 productId;
        uint256 amount; // total cUSD amount (product price + platform fee)
        uint256 platformFee;
        address currency; // cUSD token address
        EscrowStatus status;
        uint256 createdAt;
        uint256 releasedAt;
        uint256 shippedAt;
    }

    // ──────────────────────────────────────────────
    //  State
    // ──────────────────────────────────────────────

    uint256 private _nextEscrowId;
    mapping(uint256 => Escrow) private _escrows;
    address public treasury;
    uint256 public feeBps; // fee in basis points (100 = 1%)

    // ──────────────────────────────────────────────
    //  Events
    // ──────────────────────────────────────────────

    event EscrowCreated(
        uint256 indexed id,
        address indexed buyer,
        address indexed seller,
        bytes32 orderId,
        bytes32 productId,
        uint256 amount,
        uint256 platformFee,
        address currency
    );
    event EscrowFunded(uint256 indexed id, address indexed funder);
    event OrderAccepted(uint256 indexed id, address indexed seller);
    event ShipmentStarted(uint256 indexed id, uint256 shippedAt);
    event DeliveryConfirmed(uint256 indexed id, address indexed buyer);
    event FundsReleased(uint256 indexed id, address indexed seller, uint256 netAmount, uint256 fee);
    event RefundIssued(uint256 indexed id, address indexed buyer, uint256 amount);
    event EscrowCancelled(uint256 indexed id);
    event DisputeRaised(uint256 indexed id);
    event TreasuryUpdated(address indexed oldTreasury, address indexed newTreasury);
    event FeeUpdated(uint256 oldFeeBps, uint256 newFeeBps);

    // ──────────────────────────────────────────────
    //  Errors
    // ──────────────────────────────────────────────

    error InvalidEscrowStatus();
    error NotBuyer();
    error NotSeller();
    error NotBuyerOrSeller();
    error NotParty();
    error EscrowNotFunded();
    error AmountMismatch();
    error TransferFailed();
    error NotAdmin();
    error AlreadyReleased();
    error EscrowNotActive();

    // ──────────────────────────────────────────────
    //  Constructor
    // ──────────────────────────────────────────────

    constructor(address _treasury, address _owner) Ownable(_owner) {
        if (_treasury == address(0)) revert("Invalid treasury");
        treasury = _treasury;
        feeBps = 100; // 1% default
        _nextEscrowId = 1;
    }

    // ──────────────────────────────────────────────
    //  Modifiers
    // ──────────────────────────────────────────────

    modifier onlyBuyer(uint256 escrowId) {
        if (_escrows[escrowId].buyer != msg.sender) revert NotBuyer();
        _;
    }

    modifier onlySeller(uint256 escrowId) {
        if (_escrows[escrowId].seller != msg.sender) revert NotSeller();
        _;
    }

    modifier onlyParty(uint256 escrowId) {
        Escrow storage e = _escrows[escrowId];
        if (e.buyer != msg.sender && e.seller != msg.sender) revert NotParty();
        _;
    }

    modifier inStatus(uint256 escrowId, EscrowStatus expected) {
        if (_escrows[escrowId].status != expected) revert InvalidEscrowStatus();
        _;
    }

    // ──────────────────────────────────────────────
    //  Escrow Lifecycle
    // ──────────────────────────────────────────────

    /// @notice Create a new escrow. Caller is the buyer.
    /// @dev Buyer must approve the contract to spend cUSD before funding.
    /// @param seller    Seller address
    /// @param orderId   Off-chain order identifier
    /// @param productId Off-chain product identifier
    /// @param amount    Total amount in cUSD (product price + platform fee)
    /// @param currency  cUSD token address
    /// @return escrowId The newly created escrow ID
    function createEscrow(
        address seller,
        bytes32 orderId,
        bytes32 productId,
        uint256 amount,
        address currency
    ) external whenNotPaused returns (uint256) {
        if (seller == address(0)) revert("Invalid seller");
        if (amount == 0) revert("Amount must be > 0");
        if (currency == address(0)) revert("Invalid currency");

        uint256 fee = (amount * feeBps) / 10000;
        uint256 escrowId = _nextEscrowId++;

        _escrows[escrowId] = Escrow({
            id: escrowId,
            buyer: msg.sender,
            seller: seller,
            orderId: orderId,
            productId: productId,
            amount: amount,
            platformFee: fee,
            currency: currency,
            status: EscrowStatus.Created,
            createdAt: block.timestamp,
            releasedAt: 0,
            shippedAt: 0
        });

        emit EscrowCreated(escrowId, msg.sender, seller, orderId, productId, amount, fee, currency);
        return escrowId;
    }

    /// @notice Fund an escrow. Transfers cUSD from buyer to this contract.
    /// @dev Requires buyer to have approved the contract for the amount.
    function fundEscrow(
        uint256 escrowId
    ) external whenNotPaused nonReentrant onlyBuyer(escrowId) inStatus(escrowId, EscrowStatus.Created) {
        Escrow storage e = _escrows[escrowId];
        IERC20 token = IERC20(e.currency);
        uint256 balanceBefore = token.balanceOf(address(this));
        token.safeTransferFrom(msg.sender, address(this), e.amount);
        uint256 balanceAfter = token.balanceOf(address(this));
        if (balanceAfter - balanceBefore != e.amount) revert TransferFailed();
        e.status = EscrowStatus.Funded;
        emit EscrowFunded(escrowId, msg.sender);
    }

    /// @notice Seller accepts the funded order.
    function acceptOrder(
        uint256 escrowId
    ) external whenNotPaused onlySeller(escrowId) inStatus(escrowId, EscrowStatus.Funded) {
        _escrows[escrowId].status = EscrowStatus.Accepted;
        emit OrderAccepted(escrowId, msg.sender);
    }

    /// @notice Seller marks the order as shipped.
    function markShipped(
        uint256 escrowId
    ) external whenNotPaused onlySeller(escrowId) inStatus(escrowId, EscrowStatus.Accepted) {
        Escrow storage e = _escrows[escrowId];
        e.status = EscrowStatus.Shipped;
        e.shippedAt = block.timestamp;
        emit ShipmentStarted(escrowId, block.timestamp);
    }

    /// @notice Buyer confirms delivery and triggers release of funds.
    function confirmDelivery(
        uint256 escrowId
    ) external whenNotPaused nonReentrant onlyBuyer(escrowId) inStatus(escrowId, EscrowStatus.Shipped) {
        Escrow storage e = _escrows[escrowId];
        e.status = EscrowStatus.Delivered;
        emit DeliveryConfirmed(escrowId, msg.sender);
        _release(escrowId);
    }

    /// @notice Internal release: sends net amount to seller, fee to treasury.
    function _release(uint256 escrowId) private {
        Escrow storage e = _escrows[escrowId];
        e.status = EscrowStatus.Released;
        e.releasedAt = block.timestamp;

        IERC20 token = IERC20(e.currency);
        uint256 netAmount = e.amount - e.platformFee;

        // Transfer platform fee to treasury
        token.safeTransfer(treasury, e.platformFee);

        // Transfer net amount to seller
        token.safeTransfer(e.seller, netAmount);

        emit FundsReleased(escrowId, e.seller, netAmount, e.platformFee);
    }

    /// @notice Refund the buyer. Allowed when seller cancels or admin resolves.
    function refundBuyer(
        uint256 escrowId
    ) external nonReentrant inStatus(escrowId, EscrowStatus.Funded) {
        Escrow storage e = _escrows[escrowId];
        // Only seller or admin (owner) can initiate refund before shipment
        if (msg.sender != e.seller && msg.sender != owner()) revert NotAdmin();

        e.status = EscrowStatus.Refunded;

        IERC20 token = IERC20(e.currency);
        token.safeTransfer(e.buyer, e.amount);

        emit RefundIssued(escrowId, e.buyer, e.amount);
    }

    /// @notice Cancel escrow before funding (buyer only).
    function cancelEscrow(
        uint256 escrowId
    ) external whenNotPaused onlyBuyer(escrowId) inStatus(escrowId, EscrowStatus.Created) {
        _escrows[escrowId].status = EscrowStatus.Cancelled;
        emit EscrowCancelled(escrowId);
    }

    /// @notice Raise a dispute (buyer or seller).
    function raiseDispute(uint256 escrowId) external onlyParty(escrowId) {
        Escrow storage e = _escrows[escrowId];
        if (
            e.status != EscrowStatus.Funded &&
            e.status != EscrowStatus.Accepted &&
            e.status != EscrowStatus.Shipped &&
            e.status != EscrowStatus.Delivered
        ) revert InvalidEscrowStatus();

        e.status = EscrowStatus.Disputed;
        emit DisputeRaised(escrowId);
    }

    /// @notice Admin resolves a dispute by releasing to seller.
    function resolveDisputeRelease(
        uint256 escrowId
    ) external onlyOwner nonReentrant inStatus(escrowId, EscrowStatus.Disputed) {
        _release(escrowId);
    }

    /// @notice Admin resolves a dispute by refunding buyer.
    function resolveDisputeRefund(
        uint256 escrowId
    ) external onlyOwner nonReentrant inStatus(escrowId, EscrowStatus.Disputed) {
        Escrow storage e = _escrows[escrowId];
        e.status = EscrowStatus.Refunded;

        IERC20 token = IERC20(e.currency);
        token.safeTransfer(e.buyer, e.amount);

        emit RefundIssued(escrowId, e.buyer, e.amount);
    }

    // ──────────────────────────────────────────────
    //  Getters
    // ──────────────────────────────────────────────

    /// @notice Get escrow details.
    function getEscrow(uint256 escrowId) external view returns (Escrow memory) {
        return _escrows[escrowId];
    }

    /// @notice Get current escrow status.
    function getEscrowStatus(uint256 escrowId) external view returns (EscrowStatus) {
        return _escrows[escrowId].status;
    }

    /// @notice Get the next escrow ID.
    function nextEscrowId() external view returns (uint256) {
        return _nextEscrowId;
    }

    // ──────────────────────────────────────────────
    //  Admin
    // ──────────────────────────────────────────────

    /// @notice Update the treasury address.
    function updateTreasury(address newTreasury) external onlyOwner {
        if (newTreasury == address(0)) revert("Invalid treasury");
        address old = treasury;
        treasury = newTreasury;
        emit TreasuryUpdated(old, newTreasury);
    }

    /// @notice Update the platform fee (in basis points).
    function updateFee(uint256 newFeeBps) external onlyOwner {
        if (newFeeBps > 1000) revert("Fee too high"); // max 10%
        uint256 old = feeBps;
        feeBps = newFeeBps;
        emit FeeUpdated(old, newFeeBps);
    }

    /// @notice Pause the contract (admin only).
    function pause() external onlyOwner {
        _pause();
    }

    /// @notice Unpause the contract (admin only).
    function unpause() external onlyOwner {
        _unpause();
    }
}
