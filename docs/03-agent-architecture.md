# 03-agent-architecture.md

# Vorra AI Agent Architecture

**Version:** 1.0

**Project:** Vorra

---

# Overview

Vorra is **not a chatbot**.

Vorra is a team of specialized AI agents working together to complete procurement tasks.

Each agent has a single responsibility and communicates with other agents through structured outputs and tool calls.

No AI agent is allowed to directly modify the database or blockchain.

Every action must occur through approved backend services and smart contracts.

---

# AI Philosophy

The AI should behave like a professional procurement officer.

It should never guess.

It should always explain its reasoning.

It should never move funds without explicit user authorization or an approved AutoBuy rule.

Every recommendation should be supported by marketplace data.

---

# AI Architecture

```
                    USER
                      │
                      ▼
              Planner Agent
                      │
    ┌─────────┬────────────┬────────────┐
    ▼         ▼            ▼            ▼
Search     Risk       Logistics    Negotiation
 Agent      Agent        Agent         Agent
    │         │            │            │
    └─────────┴────────────┴────────────┘
                      │
                      ▼
              Payment Agent
                      │
                      ▼
             Celo Smart Contracts
```

The Planner Agent coordinates every request.

No other agent communicates directly with the user.

---

# Agent Communication Rules

Agents communicate only through structured JSON.

Example

```json
{
  "task":"compare_suppliers",
  "product":"White Maize",
  "quantity":500,
  "country":"Ghana"
}
```

Agents never generate UI.

Agents never write SQL.

Agents never call smart contracts directly.

All actions go through backend APIs.

---

# 1. Planner Agent

## Purpose

The Planner Agent is the brain of Vorra.

It receives user requests.

Breaks them into smaller tasks.

Delegates those tasks to specialized agents.

Collects results.

Returns one final response.

---

## Responsibilities

Understand natural language.

Extract product information.

Determine which agents are required.

Coordinate execution.

Generate final response.

---

## Example

User

> Find me 500kg of maize under 450 cUSD.

Planner decides

Search Agent

↓

Risk Agent

↓

Logistics Agent

↓

Return ranked suppliers.

---

# Planner Inputs

Natural language.

Conversation history.

User profile.

Marketplace context.

---

# Planner Outputs

Structured task list.

Final recommendation.

Reasoning.

Suggested next action.

---

# Planner Tools

search_products()

compare_suppliers()

estimate_shipping()

calculate_trade_score()

prepare_purchase()

---

# 2. Search Agent

## Purpose

Search the marketplace.

Find matching products.

Rank search results.

---

## Responsibilities

Search listings.

Apply filters.

Sort by relevance.

Return structured results.

---

## Inputs

Product

Category

Budget

Country

Delivery

Supplier Preferences

---

## Outputs

Product List

Supplier List

Ranking Score

---

## Tools

searchProducts()

searchSuppliers()

searchCategories()

getProduct()

---

# Ranking Formula

Ranking considers

Price

Supplier Trust

Delivery Time

Popularity

Availability

Recent Activity

---

# 3. Risk Agent

Purpose

Determine whether a trade is safe.

---

Responsibilities

Review supplier.

Review buyer.

Review order value.

Review dispute history.

Generate trust assessment.

---

Inputs

Supplier

Buyer

Order

Marketplace history

---

Outputs

Trust Score

Risk Level

Recommendations

---

Risk Levels

Green

Low Risk

Yellow

Medium Risk

Red

High Risk

---

Risk Formula

Supplier Trust Score

Completed Trades

Average Rating

Delivery History

Dispute Rate

Business Verification

Buyer Reputation

Order Value

---

# Example

Supplier

Trust Score

96

Completed Orders

480

Disputes

2

Risk

LOW

---

# Tools

getSupplier()

getBuyer()

getTradeHistory()

calculateRisk()

---

# 4. Logistics Agent

Purpose

Provide delivery information.

---

Responsibilities

Estimate delivery.

Estimate costs.

Determine routes.

Recommend shipping.

---

Inputs

Origin

Destination

Quantity

Product Type

---

Outputs

Estimated Delivery

Estimated Cost

Suggested Method

---

Current MVP

Delivery estimates come from seller-defined delivery settings.

Future

Integrate logistics providers.

---

Tools

estimateDelivery()

estimateCost()

---

# 5. Negotiation Agent

Purpose

Assist buyers and sellers during negotiation.

---

Responsibilities

Suggest counter offers.

Calculate fair pricing.

Explain offers.

Prepare negotiation messages.

---

Example

Buyer

400 cUSD

Seller

420 cUSD

AI

Marketplace average is 410 cUSD.

Suggested counter

410 cUSD.

---

Tools

calculateMarketAverage()

createOffer()

counterOffer()

---

# 6. Payment Agent

Purpose

Coordinate every blockchain payment.

---

Responsibilities

Prepare escrow.

Request wallet approval.

Track transactions.

Monitor confirmations.

Release escrow.

---

The Payment Agent NEVER owns funds.

It simply orchestrates payments.

---

Inputs

Buyer

Seller

Wallet

Order

Escrow Contract

---

Outputs

Payment Status

Transaction Hash

Escrow Status

---

Tools

createEscrow()

fundEscrow()

releaseEscrow()

refundEscrow()

getTransaction()

---

# Payment Flow

Buyer approves.

↓

Backend prepares transaction.

↓

Wallet signs.

↓

Smart Contract executes.

↓

Transaction confirmed.

↓

Payment recorded.

---

# 7. AutoBuy Agent

Purpose

Autonomously purchase products.

---

Workflow

Monitor listings.

↓

Compare rules.

↓

Risk assessment.

↓

Budget verification.

↓

Create order.

↓

Fund escrow.

↓

Notify buyer.

---

Rules

Maximum Price

Country

Quantity

Trust Score

Rating

Delivery Time

Expiration

Budget

---

Example

Product

White Maize

Budget

400 cUSD

Country

Ghana

Trust

90

Rating

4.5

The agent waits until a matching listing appears.

---

Tools

scanMarketplace()

checkRules()

createOrder()

fundEscrow()

sendNotification()

---

# 8. Recommendation Agent

Purpose

Explain recommendations.

---

Example

Why is Supplier A recommended?

The AI responds

Lowest price.

96 Trust Score.

98% on-time delivery.

487 successful trades.

Delivery estimate

4 days.

---

This makes recommendations transparent.

---

# AI Activity Feed

Every AI action is logged.

Example

Searching marketplace...

12 suppliers found.

Comparing prices...

Calculating trust...

Preparing escrow...

Waiting for approval...

Purchase completed.

---

# Prompt Engineering Principles

Every agent must

Remain factual.

Never hallucinate.

Never fabricate suppliers.

Never invent prices.

Never invent delivery times.

Always use backend data.

---

# Memory

Conversation Memory

User Preferences

Saved Searches

AutoBuy Rules

Recent Orders

Favorite Suppliers

---

No long-term reasoning should depend solely on LLM memory.

Persistent information belongs in the database.

---

# Safety Rules

Never spend funds without approval.

Never ignore AutoBuy rules.

Never override smart contract conditions.

Never fabricate marketplace information.

Never hide transaction failures.

Always explain why recommendations were made.

---

# Success Criteria

The AI system is considered complete when

The Planner coordinates all requests.

Search returns relevant products.

Risk analysis is accurate.

Negotiation suggestions use marketplace data.

Payments execute securely.

AutoBuy purchases automatically.

Recommendations are explainable.

Every AI action is traceable through the Activity Feed.

---

# Future Agents (Post-MVP)

The following agents are planned but intentionally excluded from the hackathon MVP:

* Customs Agent
* Freight Booking Agent
* Insurance Agent
* Trade Finance Agent
* Invoice Agent
* Compliance/KYC Agent
* Market Intelligence Agent

These will expand Vorra into a complete AI operating system for African commerce while keeping the MVP focused, reliable, and production-ready.
