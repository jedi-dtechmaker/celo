# 09-hackathon-submission.md

# Vorra Hackathon Strategy

**Hackathon:** Celo Agentic Payments & DeFAI Hackathon

**Project:** Vorra

**Version:** 1.0

**Timeline:**

* Kick-off: July 7
* Submission deadline: August 3, 9:00 GMT
* Winners announced: August 6

**Prize Pool:** $5,000 distributed in CELO.

---

# Executive Summary

Vorra is an **AI-powered B2B procurement platform** that enables businesses across Africa to discover trusted suppliers, negotiate deals, and complete secure cross-border payments using **Celo stablecoins**.

Unlike a traditional marketplace, Vorra combines:

* AI Procurement Agents
* Programmable Escrow Payments
* Supplier Reputation System
* Autonomous Purchasing (AutoBuy)
* Cross-border Trade Marketplace

into a single production-ready application.

The project is designed to demonstrate real economic activity on Celo while solving a genuine problem faced by African businesses.

---

# Problem Statement

Cross-border procurement in Africa is fragmented and inefficient.

Businesses often struggle to:

* Find trusted suppliers.
* Compare prices across countries.
* Verify supplier credibility.
* Negotiate fairly.
* Pay securely.
* Track transactions.
* Reduce procurement time.

These challenges increase costs, create distrust, and slow regional trade.

---

# Solution

Vorra uses AI to simplify the entire procurement process.

Instead of manually searching through hundreds of suppliers, a buyer can simply ask:

> "Find me 500kg of Grade A maize from Ghana under 450 cUSD."

Vorra's AI:

* Searches the marketplace.
* Compares suppliers.
* Evaluates trust scores.
* Estimates delivery.
* Recommends the best option.
* Creates the order.
* Initiates secure on-chain escrow payment.

This reduces procurement from hours of manual work to a few minutes.

---

# Why Celo?

Vorra is built on Celo because it provides:

* Fast transactions.
* Low transaction costs.
* Mobile-first infrastructure.
* Stablecoin support.
* Excellent developer ecosystem.
* Global payment rails.

Celo makes it practical to settle real-world trade payments without the friction of traditional banking.

---

# Alignment with Hackathon Goals

Vorra directly supports the objectives of the Agentic Payments & DeFAI Hackathon.

### AI Agents

✔ Procurement Agent

✔ Search Agent

✔ Negotiation Agent

✔ Risk Analysis Agent

✔ Payment Agent

✔ AutoBuy Agent

---

### Agentic Payments

The AI does more than answer questions.

It actively:

* Creates purchase orders.
* Initiates escrow.
* Requests wallet approval.
* Monitors transactions.
* Tracks delivery.
* Completes settlement.

---

### Real Utility

Vorra solves an existing business problem rather than showcasing AI for demonstration purposes.

The platform can be used immediately by African businesses buying agricultural products, raw materials, manufactured goods, and wholesale inventory.

---

# Track Strategy

## Track 1 — Most Revenue Generated

**Primary Target**

Vorra is intentionally designed to maximize real on-chain transaction volume.

**Prize:** $3,000 total.

* 1st Prize: $2,000
* 2nd Prize: $1,000

**Win condition:** highest on-chain volume generated on Celo during the hackathon period from July 7 to August 3.

Revenue sources include:

* Marketplace purchases.
* Escrow settlements.
* Platform transaction fees.
* Repeat buyer activity.
* AutoBuy executions.

Every successful trade increases total on-chain volume.

---

### Revenue Strategy

Encourage early adoption by:

* Inviting real suppliers.
* Listing real products.
* Running live demo purchases.
* Incentivizing repeat transactions.
* Processing every purchase through Celo.

The objective is to generate as many legitimate transactions as possible during the hackathon period.

---

## Attribution Tags

Immediately after hackathon registration:

* Obtain the assigned attribution tag.
* Include the tag in every eligible on-chain transaction.
* Verify tagged transactions appear on the leaderboard.
* Submit a link to the agent's on-chain wallet address or tagged transactions.

No production deployment should occur without attribution enabled.

Only the assigned tag is credited for Track 1. If Vorra already uses its own internal tagging, include the assigned hackathon tag in the tag array as well.

---

## Track 2 — x402 Payments

Vorra will integrate the Celo x402 facilitator for supported payment flows.

**Prize:** $1,000 total.

* 1st Prize: $700
* 2nd Prize: $300

**Win condition:** highest raw count of successful x402 pay-per-request settlements on Celo during the hackathon period.

**Required tracking details:**

* Route payments through the Celo x402 facilitator at `api.x402.celo.org`.
* Add the Vorra agent/payTo wallet to the submission.
* x402 settlements do not need attribution tags because the facilitator sends the settlement transaction.
* Attribution is retroactive once the wallet is added; every settlement since July 1 counts once the wallet is on file.

Potential x402 use cases include:

* AI premium requests.
* Procurement reports.
* Supplier verification reports.
* Advanced market analysis.
* API access for enterprise buyers.

Every successful x402 settlement contributes toward the leaderboard.

---

## Track 3 — AskBots

The Procurement Agent can be registered as an AskBots-compatible AI agent.

**Prize:** $500 total in bounties.

**Win condition:** judging and leaderboard bounties for the highest-rated agents on `askbots.ai`.

Capabilities include:

* Product discovery.
* Supplier recommendations.
* Procurement guidance.
* Trade planning.

The goal is to achieve high user ratings through practical utility and reliable recommendations.

Submission requires registering the agent on AskBots and submitting through the Celo Builder Skill.

---

## Track 4 — Aigora

Vorra will integrate with Aigora where applicable.

The project team should also submit thoughtful technical feedback during development to qualify for available feedback rewards.

**Prize:** $500 total.

**Win condition:** top 10 most valuable feedback submissions each win $50 in CELO.

Submission requires registering on `aigora.org`, submitting feedback, and submitting the agentic project through the Celo Builder Skill.

---

# Required Hackathon Actions

## Registration

Registration happens through the Celo Builders Skill. Vorra must provide:

* Project name: Vorra.
* Public GitHub repository: `https://github.com/chidinmaik/vorra-celo`.
* Telegram handle: `@jedi_dtechmaker`.
* Attribution tag: `celo_5fdfafd97630`.

Registration returns the assigned attribution tag. This must happen before real Track 1 transaction testing.

## Registration Prompt

Use this prompt with the Celo Builders Skill:

> Register my project for the Celo Agentic Payments & DeFAI Hackathon.
>
> Project name: Vorra
>
> Public GitHub repo: https://github.com/chidinmaik/vorra-celo
>
> Telegram handle: @jedi_dtechmaker

## Submission Assets

The final submission should include:

* Project description.
* Public GitHub repository.
* Live demo URL.
* Demo video.
* Agent wallet address.
* Tagged transaction links for Track 1.
* Agent/payTo wallet for Track 2.
* ERC-8004 registry link if available.
* Required X post tagging `@CeloDevs` and `@Celo`.

## Suggested X Post

> I am building Vorra for the @CeloDevs Agent Hackathon.
>
> Vorra is an AI procurement agent for African businesses: find suppliers, compare trust, create orders, and settle escrow payments on Celo.
>
> Registered onchain: [ERC-8004 link]
>
> Let's go @Celo.

---

# Demo Flow

## Step 1

Open Vorra.

---

## Step 2

Register as a buyer.

---

## Step 3

Connect MiniPay or another supported Celo wallet.

---

## Step 4

Search:

> Find 500kg of white maize from Ghana.

---

## Step 5

Vorra AI compares suppliers.

---

## Step 6

Open a supplier profile.

Review:

* Trust Score
* Ratings
* Delivery estimate
* Price

---

## Step 7

Purchase product.

Wallet opens.

Buyer approves transaction.

Escrow is funded on Celo.

---

## Step 8

Seller accepts order.

Order status updates.

---

## Step 9

Buyer confirms delivery.

Escrow releases funds automatically.

Platform fee is collected.

---

## Step 10

Buyer leaves a review.

Supplier reputation updates.

---

## Step 11

Buyer creates an AutoBuy rule.

Example:

* Product: White Maize
* Max Price: 400 cUSD
* Country: Ghana
* Trust Score: 90+
* Quantity: 500kg

The AutoBuy worker monitors new listings and automatically creates the purchase when a matching product becomes available.

---

# Judge Experience

The ideal judging experience should demonstrate:

* A polished user interface.
* Functional AI assistance.
* Real marketplace data.
* Live wallet interaction.
* On-chain escrow payment.
* Reputation updates.
* Autonomous purchasing.

Judges should feel they are using a finished product rather than a prototype.

---

# Technical Highlights

* React + TypeScript frontend.
* NestJS backend.
* PostgreSQL database.
* OpenAI-powered AI agents.
* Celo smart contracts.
* cUSD programmable payments.
* Escrow architecture.
* Background workers for AutoBuy.
* Mobile-friendly interface.

---

# Success Metrics

During the hackathon, track:

* Registered buyers.
* Registered sellers.
* Products listed.
* Orders created.
* Escrow contracts created.
* Completed payments.
* Total on-chain transaction volume.
* Platform fees generated.
* AutoBuy executions.
* AI requests completed.
* Successful x402 settlements.
* AskBots rating and review count.
* Tagged transaction count on the live leaderboard.

These metrics demonstrate both technical functionality and real economic activity.

---

# Submission Checklist

Before submission, verify the following:

* Public GitHub repository is available.
* Attribution tag is integrated.
* All eligible transactions are tagged.
* Demo application is deployed.
* Smart contracts are deployed.
* Wallet integration works.
* AI agents function correctly.
* Marketplace is populated with sample or real products.
* Demo video is recorded.
* Project documentation is complete.
* ERC-8004 registration is completed (if required).
* Required social media announcement is published.
* Submission form is fully completed.
* Agent/payTo wallet is added for x402 tracking if applying to Track 2.
* AskBots registration is complete if applying to Track 3.
* Aigora feedback is submitted if applying to Track 4.

---

# Future Roadmap

After the hackathon, Vorra can expand to include:

* Freight booking.
* Customs documentation.
* Cargo insurance.
* Trade financing.
* Invoice generation.
* AI contract drafting.
* Multi-language support.
* Mobile applications.
* ERP integrations.
* Advanced analytics.

These features are intentionally excluded from the MVP to maintain focus while providing a clear path for future growth.

---

# Why Vorra Can Win

Vorra stands out because it is more than an AI chatbot or a simple DeFi interface.

It combines:

* Artificial Intelligence
* Programmable Payments
* Real Marketplace Activity
* Autonomous Agents
* Cross-Border Commerce
* Stablecoin Settlement

into a cohesive product with immediate real-world utility.

The platform generates genuine on-chain transactions, demonstrates practical use of Celo's payment infrastructure, and addresses one of Africa's largest economic opportunities: making cross-border trade faster, safer, and more accessible through intelligent automation.
