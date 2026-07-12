// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {SafeERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

/// @title PlatformTreasury
/// @notice Collects and tracks Vorra platform fees from escrow settlements.
/// @dev Only the TradeEscrow contract can deposit fees.
contract PlatformTreasury is Ownable {
    using SafeERC20 for IERC20;

    // ──────────────────────────────────────────────
    //  State
    // ──────────────────────────────────────────────

    address public escrowContract;
    mapping(address => uint256) public revenueByToken; // token => total fees collected
    uint256 public totalRevenueInCusd; // convenience tracker for cUSD

    // ──────────────────────────────────────────────
    //  Events
    // ──────────────────────────────────────────────

    event FeeCollected(address indexed token, uint256 amount, uint256 totalRevenue);
    event FeesWithdrawn(address indexed token, address indexed to, uint256 amount);
    event EscrowContractUpdated(address indexed oldContract, address indexed newContract);

    // ──────────────────────────────────────────────
    //  Errors
    // ──────────────────────────────────────────────

    error NotEscrowContract();
    error NoFeesToWithdraw();

    // ──────────────────────────────────────────────
    //  Modifiers
    // ──────────────────────────────────────────────

    modifier onlyEscrow() {
        if (msg.sender != escrowContract) revert NotEscrowContract();
        _;
    }

    // ──────────────────────────────────────────────
    //  Constructor
    // ──────────────────────────────────────────────

    constructor(address _escrowContract, address _owner) Ownable(_owner) {
        escrowContract = _escrowContract;
    }

    // ──────────────────────────────────────────────
    //  Fee Collection
    // ──────────────────────────────────────────────

    /// @notice Called by TradeEscrow when a trade settles.
    /// @param token  The ERC-20 token address (e.g., cUSD).
    /// @param amount The fee amount collected.
    function collectFee(address token, uint256 amount) external onlyEscrow {
        revenueByToken[token] += amount;
        totalRevenueInCusd += amount; // assumes cUSD for now
        emit FeeCollected(token, amount, revenueByToken[token]);
    }

    // ──────────────────────────────────────────────
    //  Owner Operations
    // ──────────────────────────────────────────────

    /// @notice Owner withdraws collected fees for a specific token.
    /// @param token The ERC-20 token address.
    /// @param to    Recipient address.
    function withdrawFees(address token, address to) external onlyOwner {
        uint256 balance = IERC20(token).balanceOf(address(this));
        if (balance == 0) revert NoFeesToWithdraw();
        IERC20(token).safeTransfer(to, balance);
        emit FeesWithdrawn(token, to, balance);
    }

    /// @notice Get total collected revenue for a token.
    function getRevenue(address token) external view returns (uint256) {
        return revenueByToken[token];
    }

    /// @notice Update the escrow contract address.
    /// @dev Only callable by owner. Ensures only the correct escrow can deposit.
    function setEscrowContract(address newContract) external onlyOwner {
        if (newContract == address(0)) revert("Invalid address");
        address old = escrowContract;
        escrowContract = newContract;
        emit EscrowContractUpdated(old, newContract);
    }

    /// @notice Manually deposit fees (fallback if escrow contract changes).
    function manualDeposit(address token, uint256 amount) external onlyOwner {
        IERC20(token).safeTransferFrom(msg.sender, address(this), amount);
        revenueByToken[token] += amount;
        totalRevenueInCusd += amount;
        emit FeeCollected(token, amount, revenueByToken[token]);
    }
}
