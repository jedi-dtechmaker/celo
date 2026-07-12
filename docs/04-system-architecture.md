# 04-system-architecture.md

# Vorra System Architecture

**Version:** 1.0

**Project:** Vorra

---

# Overview

Vorra is a modern full-stack web application that combines Artificial Intelligence, Blockchain, and a Marketplace into a single production-ready platform.

The architecture follows a modular approach where each component has a clearly defined responsibility.

```text
                Frontend (React)

                       │

                 REST API Gateway

                       │

     ┌──────────────┬──────────────┬──────────────┐
     │              │              │              │
 Marketplace     AI Service     Payment API    Auth API
     │              │              │              │
     └──────────────┴──────────────┴──────────────┘
                       │
                 PostgreSQL Database
                       │
          Blockchain Service (Celo)
                       │
               Smart Contracts
```

---

# High-Level Architecture

The platform consists of seven major layers.

1. Frontend
2. Backend API
3. AI Service
4. Database
5. Blockchain
6. Storage
7. Background Jobs

Each layer can evolve independently.

---

# Frontend

Technology

* React (Vite)
* TypeScript
* Tailwind CSS v3
* React Query
* React Router
* Framer Motion
* Wagmi
* Viem

Responsibilities

* User Interface
* Wallet Connection
* Marketplace
* AI Chat
* Dashboard
* Product Pages
* Orders
* Notifications

The frontend should never communicate directly with the database.

---

# Backend

Technology

* Node.js
* NestJS
* Prisma ORM
* PostgreSQL

Responsibilities

Authentication

Marketplace

Orders

Products

Notifications

Reviews

Payments

AI Tool APIs

Admin

The backend acts as the single source of truth.

---

# AI Layer

Technology

* OpenAI Responses API
* Function Calling
* Structured Outputs

Responsibilities

Natural Language Search

Ask Vorra

Import Wizard

Negotiation

Recommendations

AutoBuy Decision Engine

Risk Analysis

The AI never modifies the database directly.

It requests backend tools.

---

# Blockchain Layer

Network

Celo Mainnet

Currency

cUSD

Contracts

TradeEscrow

Treasury

PlatformFee

Future

TradeAgreement

DisputeManager

Every payment occurs on-chain.

---

# Database

Technology

PostgreSQL

ORM

Prisma

The database stores:

Users

Products

Orders

Reviews

Notifications

Messages

Escrows

AutoBuy Rules

Trade History

AI Logs

The blockchain is the source of payment truth.

The database stores business state.

---

# Storage

Technology

Cloudinary (Images)

Future

IPFS (Trade Documents)

Stored Files

Product Images

Business Logos

Verification Documents

Invoices (optional)

---

# Authentication

Email

Password

JWT

Refresh Token

Wallet Signature

Role-Based Access

Roles

Buyer

Seller

Admin

---

# Wallet Integration

Supported Wallets

MiniPay

Valora

MetaMask

WalletConnect

Responsibilities

Connect

Disconnect

Sign Message

Approve Transaction

View Balance

---

# Marketplace Module

Responsibilities

Create Products

Edit Products

Delete Products

Browse Products

Search Products

Categories

Reviews

Supplier Profiles

Inventory

---

# AI Module

Services

Search

Recommendation

Comparison

Negotiation

Risk Analysis

Import Wizard

Ask Vorra

AutoBuy

---

# Payment Module

Responsibilities

Create Escrow

Fund Escrow

Release Escrow

Refund Escrow

Track Transactions

Platform Fees

Wallet Verification

---

# Reputation Module

Responsibilities

Calculate Trust

Update Ratings

Trade Statistics

Review History

Dispute Metrics

Response Time

---

# Order Module

Responsibilities

Create Orders

Accept Orders

Cancel Orders

Track Status

Invoices

Shipment Timeline

Notifications

---

# Notification Module

Channels

Email

In-App

Future Push Notifications

Events

Order Created

Offer Received

Escrow Funded

Shipment Update

Delivery Confirmed

Review Reminder

AutoBuy Executed

---

# Background Workers

Technology

BullMQ

Redis

Responsibilities

AutoBuy Monitoring

Email Sending

Notification Queue

AI Logging

Escrow Confirmation

Transaction Monitoring

Scheduled Tasks

---

# AutoBuy Worker

Runs continuously.

Workflow

Load Active Rules

↓

Search Marketplace

↓

Validate Rules

↓

Create Order

↓

Create Escrow

↓

Notify Buyer

The AutoBuy worker operates independently of the frontend.

---

# Search Engine

Search supports

Keyword

Category

Country

Price

Trust Score

Availability

Seller

Sorting

Ranking combines:

Text relevance

Trust

Popularity

Price

Availability

---

# AI Tool Layer

The AI interacts only through approved tools.

Example

searchProducts()

compareProducts()

getSupplier()

estimateDelivery()

calculateTrust()

createNegotiation()

createEscrow()

releaseEscrow()

Every tool validates permissions before execution.

---

# Logging

Every important action is logged.

Examples

User Login

Wallet Connection

Product Created

Order Created

Escrow Created

Escrow Released

Review Submitted

AI Tool Calls

AutoBuy Execution

Logs are immutable and timestamped.

---

# Security

Passwords hashed using bcrypt.

JWT authentication.

Rate limiting.

Role-based authorization.

Wallet signature verification.

Input validation.

SQL injection prevention.

XSS protection.

CSRF protection where applicable.

Secure environment variables.

HTTPS required in production.

---

# Error Handling

Every API returns a standard response format.

Example

```json
{
  "success": false,
  "message": "Product not found.",
  "errorCode": "PRODUCT_NOT_FOUND"
}
```

Errors are logged without exposing sensitive information.

---

# API Principles

RESTful design.

Versioned endpoints.

Consistent responses.

Authentication middleware.

Pagination.

Filtering.

Validation.

Documentation with Swagger/OpenAPI.

---

# Performance Targets

Initial page load

< 2 seconds

Marketplace search

< 500ms

AI response

< 8 seconds

Wallet connection

< 3 seconds

Escrow creation

Network dependent

The application should remain responsive under normal marketplace usage.

---

# Deployment

Frontend

Vercel

Backend

Railway or Render

Database

Supabase PostgreSQL or Neon PostgreSQL

Image Storage

Cloudinary

Blockchain

Celo Mainnet

Monitoring

Sentry

Analytics

PostHog

---

# Environment Variables

Frontend

* API Base URL
* WalletConnect Project ID

Backend

* Database URL
* JWT Secret
* OpenAI API Key
* Cloudinary Credentials
* Redis URL
* Celo RPC URL
* Smart Contract Addresses

Secrets must never be committed to Git.

---

# Scalability

The architecture should support future expansion without major rewrites.

Future services can include:

* Freight Service
* Customs Service
* Insurance Service
* Trade Finance Service
* ERP Integrations
* Mobile API
* Recommendation Engine

Each service should communicate through well-defined APIs.

---

# Architecture Principles

Single Responsibility

Every service has one job.

Modularity

Components should be replaceable.

Security by Default

Every payment and user action must be verified.

AI as an Assistant

AI recommends and automates within approved rules but never bypasses user permissions or smart contract guarantees.

Blockchain as Settlement

The blockchain is the trusted settlement layer for all financial transactions.

---

# Definition of Done

The architecture is complete when:

* Frontend communicates only with backend APIs.
* Backend manages all business logic.
* AI uses only approved tool calls.
* Payments settle through Celo smart contracts.
* Database maintains business state.
* Background workers automate long-running tasks.
* Every module is independently testable.
* The system can be deployed to production with minimal configuration changes.

This architecture ensures Vorra remains scalable, secure, maintainable, and aligned with the requirements of the Celo Agentic Payments & DeFAI Hackathon.
