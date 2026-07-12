# 02-mvp-spec.md

# Vorra MVP Specification

**Version:** 1.0

**Project:** Vorra

**Hackathon:** Celo Agentic Payments & DeFAI Hackathon

---

# Purpose

This document defines the exact Minimum Viable Product (MVP) for Vorra.

Anything not included in this document is considered **out of scope** for the hackathon submission.

The objective is to ship a **fully functional, production-quality application** that demonstrates real AI-powered procurement and real on-chain payments on Celo.

---

# MVP Goal

A business should be able to:

1. Create an account.
2. Connect a Celo wallet.
3. Browse or search products.
4. Ask Vorra for procurement assistance.
5. Purchase products securely.
6. Pay using cUSD.
7. Track orders.
8. Build reputation through completed transactions.
9. Configure an autonomous AutoBuy Agent.

Everything above must function end-to-end.

---

# Core Product

Vorra consists of seven production-ready modules.

## Module 1 — Authentication

### Buyer Registration

Fields

* Full Name
* Email
* Password
* Country
* Business Name (optional)
* Phone Number

Features

* Email verification
* Secure login
* Password reset
* JWT authentication
* Session management

---

### Seller Registration

Fields

* Business Name
* Contact Name
* Email
* Phone
* Country
* Business Address
* Wallet Address

Features

* Business profile
* Wallet connection
* Dashboard access

---

# Module 2 — Marketplace

This is the heart of Vorra.

Every listed product must be searchable.

---

## Seller Dashboard

A seller can

* Add products
* Edit products
* Delete products
* Upload images
* Manage inventory
* View orders
* Track revenue

---

## Product Fields

Product Name

Category

Description

Images

Country

Available Quantity

Minimum Order Quantity

Unit

Price

Currency

Delivery Time

Status

Created At

Updated At

---

## Marketplace Features

Product Search

Category Filter

Country Filter

Price Filter

Trust Filter

Featured Products

Recently Added

Popular Products

Supplier Profiles

---

# Module 3 — AI Procurement

Vorra AI is available throughout the application.

---

## AI Search

Natural language product search.

Example

> Find 2,000kg of Grade A maize from Ghana under 900 cUSD.

Vorra converts the request into structured marketplace queries.

---

## Ask Vorra

Available on every product page.

Capabilities

* Compare products
* Explain prices
* Find alternatives
* Estimate delivery
* Explain trust score
* Recommend suppliers
* Start purchase
* Prepare negotiation

---

## Import Wizard

Guided procurement assistant.

Questions

Product

Quantity

Destination

Budget

Delivery Deadline

Preferred Country

Preferred Rating

Output

Ranked supplier recommendations.

---

# Module 4 — Negotiation

Buyers may negotiate.

Workflow

Buyer Offer

↓

Seller Notification

↓

Accept

Reject

Counter

↓

Buyer Response

↓

Agreement

↓

Purchase

AI assists by suggesting fair prices using marketplace data.

---

# Module 5 — Escrow Payments

Every purchase uses escrow.

Workflow

Buyer clicks Buy

↓

Wallet Approval

↓

Smart Contract

↓

Funds Locked

↓

Seller Ships

↓

Buyer Confirms

↓

Escrow Releases

↓

Platform Fee Deducted

↓

Transaction Complete

---

Supported Currency

Primary

cUSD

Future

CELO

USDT

USDC

---

# Module 6 — Reputation

Every completed order updates reputation.

---

## Supplier Reputation

Metrics

Average Rating

Completed Orders

On-Time Delivery

Disputes

Trade Volume

Verification Status

Response Time

Trust Score

---

## Buyer Reputation

Metrics

Completed Orders

Payment Reliability

Confirmation Speed

Disputes

Trust Score

---

# Module 7 — AutoBuy

The flagship AI feature.

Users create autonomous purchasing agents.

Example

Product

White Maize

Maximum Price

400 cUSD

Minimum Trust

90

Minimum Rating

4.5

Country

Ghana

Quantity

500kg

Expiration

30 Days

---

Workflow

Agent monitors listings.

↓

Matching product found.

↓

Trust verified.

↓

Budget verified.

↓

Escrow funded.

↓

Order created.

↓

Buyer notified.

No manual intervention required after initial authorization.

---

# User Flows

## Buyer Flow

Register

↓

Connect Wallet

↓

Browse Marketplace

↓

Search

↓

Ask Vorra

↓

Compare Products

↓

Purchase

↓

Escrow

↓

Track Order

↓

Confirm Delivery

↓

Leave Review

---

## Seller Flow

Register

↓

Connect Wallet

↓

Create Business Profile

↓

Upload Products

↓

Receive Orders

↓

Ship Products

↓

Receive Escrow Payment

↓

Improve Reputation

---

# Order Lifecycle

Pending

↓

Negotiating

↓

Accepted

↓

Escrow Funded

↓

Preparing

↓

Shipped

↓

Delivered

↓

Completed

---

Alternative States

Cancelled

Disputed

Refunded

---

# AI Features Included

AI Search

Ask Vorra

Import Wizard

Supplier Comparison

Negotiation Suggestions

AutoBuy

Trade Explanation

Risk Analysis

Activity Feed

---

# Features Excluded

The following will NOT be built for MVP.

❌ Live freight APIs

❌ Customs automation

❌ Insurance

❌ Lending

❌ Credit scoring

❌ Warehouse management

❌ Mobile app

❌ Voice assistant

❌ AI phone calls

❌ ERP integrations

---

# Design Principles

Marketplace First

AI Second

Payments Everywhere

Simple Navigation

Professional UI

Fast Performance

Minimal User Friction

---

# Definition of Done

The MVP is complete when:

✅ Buyers register successfully.

✅ Sellers register successfully.

✅ Wallet connection works.

✅ Products can be listed.

✅ Marketplace search works.

✅ AI Search works.

✅ Ask Vorra works.

✅ Import Wizard works.

✅ Negotiation works.

✅ Escrow payments execute on Celo.

✅ Reputation updates after transactions.

✅ Orders move through every status.

✅ AutoBuy executes autonomous purchases.

✅ Platform generates real on-chain activity.

---

# Demo Scenario

Judge opens Vorra.

Registers as Buyer.

Searches

> Find me 500kg of maize from Ghana.

Vorra returns suppliers.

Judge opens a listing.

Clicks Ask Vorra.

AI compares suppliers.

Judge clicks Buy.

Wallet opens.

Escrow transaction completes on Celo.

Seller account accepts order.

Seller marks shipped.

Buyer confirms delivery.

Escrow releases payment.

Buyer leaves review.

Trust scores update.

Judge creates an AutoBuy rule.

A matching listing is published.

AutoBuy purchases automatically.

Real on-chain transactions are visible.

---

# MVP Success Metrics

100% functional order flow.

Real Celo transactions.

Escrow security.

Functional AI assistance.

Responsive UI.

Production-quality codebase.

Complete documentation.

Successful hackathon submission.

The MVP should demonstrate that Vorra is not merely a marketplace but an autonomous commerce platform where AI agents reduce procurement effort while Celo enables secure programmable settlement.
