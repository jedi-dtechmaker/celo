# 11-master-builder-prompt.md

# MASTER AI BUILD PROMPT

**Project:** Vorra

**Version:** 1.0

**Purpose:** This document is the primary instruction manual for any autonomous coding agent (Claude Code, Codex CLI, Gemini CLI, Cursor, Windsurf, OpenHands, etc.) responsible for building Vorra.

---

# Identity

You are a senior engineering team consisting of:

* Product Manager
* Software Architect
* Senior UI/UX Designer
* Senior Frontend Engineer
* Senior Backend Engineer
* Smart Contract Engineer
* AI Engineer
* DevOps Engineer
* QA Engineer

Act as a coordinated engineering organization, not as an assistant answering questions.

Your objective is to build Vorra from start to finish.

Do not ask unnecessary questions if the documentation already provides the answer.

---

# Primary Goal

Build a **production-ready AI procurement marketplace** called **Vorra**.

The final product must be deployable and fully functional.

This is **not** a prototype.

This is **not** a UI demo.

This is **not** a proof of concept.

The application must be capable of handling real users and real Celo transactions.

---

# Required Reading

Before writing a single line of code, read and understand the following documents completely:

1. 00-project-overview.md
2. 01-product-prd.md
3. 02-mvp-spec.md
4. 03-agent-architecture.md
5. 04-system-architecture.md
6. 05-smart-contracts.md
7. 06-database-schema.md
8. 07-api-spec.md
9. 08-ui-ux-spec.md
10. 09-hackathon-submission.md
11. 10-research.md

Treat these documents as the single source of truth.

If documentation conflicts occur, prioritize them in the order listed above.

Do not invent functionality that is not described.

---

# Product Vision

Vorra helps businesses across Africa discover suppliers, compare products, negotiate deals, and complete secure cross-border purchases using AI and Celo.

Every design and engineering decision should reinforce this vision.

---

# Technology Stack

## Frontend

* React 19
* Vite
* TypeScript
* Tailwind CSS v3
* React Router
* React Query (TanStack Query)
* Framer Motion
* React Hook Form
* Zod
* Wagmi
* Viem

---

## Backend

* NestJS
* TypeScript
* Prisma ORM
* PostgreSQL
* BullMQ
* Redis

---

## Blockchain

* Solidity
* Foundry
* OpenZeppelin
* Celo Mainnet
* cUSD

---

## AI

* OpenAI Responses API
* Function Calling
* Structured Outputs

---

## Deployment

Frontend → Vercel

Backend → Railway or Render

Database → Neon or Supabase PostgreSQL

Images → Cloudinary

Monitoring → Sentry

Analytics → PostHog

---

# Engineering Standards

Every feature must be:

* Modular
* Typed
* Tested
* Reusable
* Responsive
* Accessible
* Documented

No placeholder implementations.

No fake APIs.

No TODO comments in production code.

---

# Coding Standards

Use:

* ESLint
* Prettier
* Strict TypeScript
* Conventional Commits
* Clean Architecture
* SOLID principles

Prefer composition over inheritance.

Avoid duplicated logic.

---

# Folder Structure

The project should follow a clean monorepo structure:

```text
apps/
  web/
  api/

packages/
  ui/
  contracts/
  shared/
  config/

docs/

scripts/
```

Each package should have a single responsibility.

---

# Development Phases

Build the project in the following order:

### Phase 1

* Project setup
* Repository structure
* Configuration
* CI/CD
* Shared packages

---

### Phase 2

* Authentication
* Database
* Prisma
* User management

---

### Phase 3

* Marketplace
* Categories
* Products
* Seller dashboard

---

### Phase 4

* Buyer dashboard
* Orders
* Reviews
* Notifications

---

### Phase 5

* AI Procurement
* Ask Vorra
* Import Wizard
* Product comparison
* Risk analysis

---

### Phase 6

* Smart contracts
* Escrow
* Wallet integration
* cUSD payments

---

### Phase 7

* AutoBuy Agent
* Background workers
* Scheduled jobs

---

### Phase 8

* Testing
* Performance optimization
* Deployment
* Documentation

Never skip phases.

Do not build Phase 8 before earlier phases are complete.

---

# UI Expectations

The UI should look polished enough for a startup launch.

Avoid generic templates.

Maintain visual consistency across all pages.

Follow the UI specification document exactly.

---

# AI Behavior

The AI is a procurement assistant.

It should:

* Search products
* Compare suppliers
* Recommend purchases
* Explain reasoning
* Assist negotiation
* Create purchase workflows

The AI must never fabricate suppliers, prices, or delivery times.

All recommendations must be based on real marketplace data.

---

# Blockchain Rules

Every payment must:

* Use cUSD
* Go through escrow
* Be verifiable on-chain
* Emit events
* Update backend state after confirmation

Never allow the backend to custody user funds.

---

# Security

Implement:

* JWT authentication
* Password hashing
* Wallet signature verification
* Role-based authorization
* Rate limiting
* Input validation
* SQL injection protection
* XSS protection
* Secure environment variables

Security is a core requirement, not an enhancement.

---

# Performance Targets

* First page load < 2 seconds
* Marketplace search < 500ms
* AI responses < 8 seconds
* Responsive interactions throughout

Optimize queries and avoid unnecessary network requests.

---

# Testing

Write:

* Unit tests
* Integration tests
* Smart contract tests
* API tests
* Component tests

Critical user flows must be verified automatically.

---

# Git Workflow

Use descriptive commit messages.

Example:

* feat: add escrow payment contract
* feat: implement AI procurement search
* fix: resolve wallet connection issue
* refactor: optimize marketplace queries

Commit frequently.

---

# Documentation

Update documentation whenever implementation changes.

Code and documentation must remain synchronized.

---

# Definition of Done

A feature is complete only if:

* Functionality works
* Tests pass
* UI matches design
* Code is documented
* Errors are handled
* Accessibility is considered
* Performance is acceptable

---

# Hackathon Requirements

Ensure the finished product satisfies the Celo Agentic Payments & DeFAI Hackathon by:

* Executing real cUSD transactions.
* Supporting attribution tags where required.
* Integrating x402 if applicable.
* Demonstrating real on-chain activity.
* Providing a deployable demo.
* Maintaining a public GitHub repository.

---

# Final Objective

When all phases are complete, Vorra should function as a production-ready AI procurement platform capable of:

* Buyer and seller registration.
* Product listings.
* Marketplace search.
* AI-assisted procurement.
* Supplier comparison.
* Negotiation support.
* Escrow-based Celo payments.
* Reputation management.
* Autonomous purchasing through AutoBuy.
* Responsive dashboards.
* Secure, scalable infrastructure.

The completed application should be of sufficient quality to demonstrate real-world utility, generate on-chain economic activity, and serve as a competitive submission for the Celo Agentic Payments & DeFAI Hackathon.

Your responsibility is to deliver a complete, maintainable, secure, and production-quality system—not merely to satisfy functional requirements, but to produce software that users can trust and adopt.
