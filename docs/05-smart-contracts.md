# 05-smart-contracts.md

# Vorra Smart Contract Specification

**Project:** Vorra

**Version:** 1.0

**Blockchain:** Celo

**Primary Currency:** cUSD

---

# Overview

The Vorra smart contract system is responsible for securing every financial transaction that occurs on the platform.

Unlike traditional marketplaces where payments are transferred directly to sellers, Vorra uses programmable escrow contracts to ensure both buyers and sellers are protected throughout the trading process.

The smart contracts must be simple, secure, auditable, and optimized for low gas costs on Celo.

---

# Design Principles

The contracts should follow these principles:

* Security over complexity.
* Funds must never be controlled by the backend.
* Every payment must be verifiable on-chain.
* Every completed transaction contributes to hackathon metrics.
* The platform should remain upgradeable without compromising user funds.

---

# Contract Architecture

```text
                     Buyer
                       │
                       ▼
              TradeEscrow.sol
                │          │
                │          ▼
                │     PlatformTreasury.sol
                │
                ▼
             Seller
```

---

# Contracts

## 1. TradeEscrow.sol

### Purpose

Acts as the main escrow contract.

Every completed purchase creates an escrow record.

Funds remain locked until delivery has been confirmed.

---

### Responsibilities

* Accept buyer payment.
* Lock funds securely.
* Store trade information.
* Release funds after confirmation.
* Refund buyer if required.
* Emit blockchain events.

---

### Escrow States

```text
Created

↓

Funded

↓

Accepted

↓

Shipped

↓

Delivered

↓

Released
```

Alternative states

```text
Cancelled

Refunded

Disputed
```

---

### Escrow Data

Each escrow stores:

Escrow ID

Buyer Address

Seller Address

Order ID

Product ID

Amount

Platform Fee

Currency

Status

Created At

Released At

Transaction Hash

---

### Functions

createEscrow()

Creates a new escrow.

---

fundEscrow()

Transfers cUSD into escrow.

---

acceptOrder()

Seller accepts order.

---

markShipped()

Seller marks shipment.

---

confirmDelivery()

Buyer confirms delivery.

---

releaseFunds()

Transfers payment to seller.

---

refundBuyer()

Returns funds.

---

cancelEscrow()

Cancels before shipment.

---

getEscrow()

Returns escrow details.

---

# Events

EscrowCreated

EscrowFunded

ShipmentStarted

DeliveryConfirmed

FundsReleased

RefundIssued

EscrowCancelled

---

# Release Logic

Funds may only be released if

Escrow funded

AND

Buyer confirmed delivery

OR

Dispute resolved

---

# Refund Logic

Refund allowed when

Seller cancels

Order expires

Admin resolves dispute

No shipment within deadline

---

# PlatformTreasury.sol

## Purpose

Collect platform fees.

---

Responsibilities

Receive fees.

Track revenue.

Allow owner withdrawals.

Maintain accounting.

---

Fee Structure

Default

1%

Future

Configurable

---

Example

Buyer pays

1000 cUSD

↓

Seller receives

990 cUSD

↓

Treasury receives

10 cUSD

---

Functions

collectFee()

withdrawFees()

getRevenue()

changeFee()

---

# Platform Fee

Fee is deducted automatically during settlement.

The buyer always sees:

Product Price

Platform Fee

Total

before signing the transaction.

---

# Security

The treasury never has permission to move escrow funds.

Escrow funds remain isolated until release.

---

# Future Contracts

TradeAgreement.sol

Stores immutable purchase agreements.

DisputeManager.sol

Handles disputes.

ReputationOracle.sol

Computes trust scores on-chain (future).

---

# Access Control

Buyer

Can

Fund escrow

Confirm delivery

Cancel before acceptance

View escrow

---

Seller

Can

Accept order

Mark shipped

View escrow

Receive funds

---

Admin

Can

Resolve disputes

Pause contract

Update fee

Cannot withdraw user escrow.

---

# Emergency Pause

Contracts should support emergency pause.

During pause

No new escrows.

No releases.

No refunds.

Only admin actions.

---

# Reentrancy Protection

All fund transfers must use:

Checks

↓

Effects

↓

Interactions

Pattern.

Use OpenZeppelin ReentrancyGuard.

---

# Safe Transfers

Only IERC20 SafeERC20 methods.

No raw transfer().

---

# Token Support

Primary

cUSD

Future

CELO

USDT

USDC

---

# Escrow Timeline

Buyer creates order.

↓

Escrow deployed.

↓

Buyer funds escrow.

↓

Seller accepts.

↓

Seller ships.

↓

Buyer confirms.

↓

Funds released.

↓

Treasury fee collected.

↓

Transaction completed.

---

# Gas Optimization

Pack structs.

Avoid unnecessary storage writes.

Emit indexed events.

Reuse immutable variables.

Minimize loops.

---

# Upgrade Strategy

Contracts should use OpenZeppelin upgradeable patterns only if necessary.

Otherwise, prefer immutable contracts for simplicity and auditability.

---

# Testing Requirements

Unit tests

Escrow creation

Funding

Release

Refund

Cancellation

Access control

Fee calculation

Events

Reentrancy

Failure cases

---

# Edge Cases

Buyer never confirms.

Seller never ships.

Incorrect payment amount.

Escrow already released.

Duplicate confirmations.

Unauthorized release.

Token transfer failure.

Contract paused.

---

# Integration With Backend

The backend never holds user funds.

Responsibilities include:

Creating escrow requests.

Monitoring blockchain events.

Updating database records.

Sending notifications.

Syncing order status.

Every blockchain event should trigger a backend listener to keep Vorra's database synchronized with on-chain state.

---

# Hackathon Alignment

This contract architecture directly supports the Celo Agentic Payments & DeFAI Hackathon by:

* Executing real cUSD transactions on Celo.
* Generating measurable on-chain activity.
* Enabling AI agents to orchestrate payments securely.
* Supporting platform fee collection for revenue generation.
* Providing transparent, auditable payment flows.

The escrow system is the financial backbone of Vorra and should be treated as the platform's highest-priority component.
