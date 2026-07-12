# 07-api-spec.md

# Vorra API Specification

**Project:** Vorra

**Version:** 1.0

**Architecture:** REST API

**Base URL**

```text
/api/v1
```

---

# Overview

The Vorra API serves as the communication layer between the frontend, AI agents, blockchain services, and the database.

Every request from the frontend must pass through the backend API.

The AI agents interact with the system exclusively through these endpoints.

---

# Authentication

Authentication uses JWT tokens.

Protected endpoints require:

```http
Authorization: Bearer <JWT_TOKEN>
```

---

# Standard Response Format

## Success

```json
{
  "success": true,
  "message": "Request successful.",
  "data": {}
}
```

---

## Error

```json
{
  "success": false,
  "message": "Invalid credentials.",
  "error": {
    "code": "INVALID_CREDENTIALS"
  }
}
```

---

# Authentication Endpoints

## Register Buyer

```http
POST /auth/register/buyer
```

Request

```json
{
  "fullName": "",
  "email": "",
  "password": "",
  "country": "",
  "phone": ""
}
```

Returns

* JWT
* User
* Wallet Status

---

## Register Seller

```http
POST /auth/register/seller
```

Request

```json
{
  "businessName": "",
  "ownerName": "",
  "email": "",
  "password": "",
  "country": ""
}
```

---

## Login

```http
POST /auth/login
```

---

## Logout

```http
POST /auth/logout
```

---

## Forgot Password

```http
POST /auth/forgot-password
```

---

## Reset Password

```http
POST /auth/reset-password
```

---

# Wallet API

## Connect Wallet

```http
POST /wallet/connect
```

---

## Verify Signature

```http
POST /wallet/verify
```

---

## Wallet Details

```http
GET /wallet
```

Returns

* Address
* Network
* Balance
* Connected

---

# User API

## Current User

```http
GET /users/me
```

---

## Update Profile

```http
PATCH /users/me
```

---

## Public User Profile

```http
GET /users/:id
```

---

# Seller API

## Seller Dashboard

```http
GET /seller/dashboard
```

Returns

Revenue

Products

Orders

Analytics

Trust Score

---

## Seller Analytics

```http
GET /seller/analytics
```

---

# Product API

## Create Product

```http
POST /products
```

---

## Update Product

```http
PATCH /products/:id
```

---

## Delete Product

```http
DELETE /products/:id
```

---

## Product Details

```http
GET /products/:id
```

---

## Marketplace

```http
GET /products
```

Supports

Search

Pagination

Filters

Sorting

Country

Category

Price

Trust Score

---

Example

```http
GET /products?page=1&category=grain&country=ghana
```

---

# Categories

```http
GET /categories
```

---

# Reviews API

## Create Review

```http
POST /reviews
```

---

## Seller Reviews

```http
GET /reviews/seller/:id
```

---

# Marketplace Search

```http
GET /search
```

Query

```text
?q=white maize
```

Supports

Keyword

Category

Country

Supplier

Price

Trust Score

---

# AI API

These endpoints are used internally by Vorra AI.

---

## Ask Vorra

```http
POST /ai/chat
```

Request

```json
{
  "message":"Find 500kg of maize."
}
```

Returns

AI Response

Suggested Products

Recommended Suppliers

---

## AI Search

```http
POST /ai/search
```

Returns

Ranked Products

---

## Compare Products

```http
POST /ai/compare
```

Returns

Comparison Table

Recommendations

---

## Import Wizard

```http
POST /ai/import
```

Input

Product

Quantity

Budget

Country

Destination

Returns

Supplier Recommendations

---

## Negotiation Assistant

```http
POST /ai/negotiate
```

Returns

Suggested Offer

Counter Offer

Reasoning

---

## Risk Analysis

```http
POST /ai/risk
```

Returns

Risk Level

Trust Score

Recommendation

---

# AutoBuy API

## Create Rule

```http
POST /autobuy
```

---

## Update Rule

```http
PATCH /autobuy/:id
```

---

## Delete Rule

```http
DELETE /autobuy/:id
```

---

## Active Rules

```http
GET /autobuy
```

---

## Execute Rule

Internal Worker Endpoint

```http
POST /autobuy/execute
```

---

# Orders API

## Create Order

```http
POST /orders
```

---

## Buyer Orders

```http
GET /orders
```

---

## Seller Orders

```http
GET /seller/orders
```

---

## Order Details

```http
GET /orders/:id
```

---

## Update Order Status

```http
PATCH /orders/:id/status
```

Statuses

Pending

Accepted

Shipped

Delivered

Completed

Cancelled

---

# Negotiation API

## Submit Offer

```http
POST /orders/:id/offer
```

---

## Accept Offer

```http
POST /offers/:id/accept
```

---

## Reject Offer

```http
POST /offers/:id/reject
```

---

## Counter Offer

```http
POST /offers/:id/counter
```

---

# Escrow API

## Create Escrow

```http
POST /escrow/create
```

---

## Fund Escrow

```http
POST /escrow/fund
```

---

## Release Escrow

```http
POST /escrow/release
```

---

## Refund Escrow

```http
POST /escrow/refund
```

---

## Escrow Details

```http
GET /escrow/:id
```

---

# Blockchain API

## Transaction Status

```http
GET /blockchain/transaction/:hash
```

---

## Wallet Balance

```http
GET /blockchain/balance
```

---

## Smart Contract Events

```http
GET /blockchain/events
```

---

# Notification API

## Notifications

```http
GET /notifications
```

---

## Mark Read

```http
PATCH /notifications/:id
```

---

# Dashboard API

## Buyer Dashboard

```http
GET /dashboard
```

Returns

Orders

Wallet

Notifications

Recent Searches

AutoBuy Rules

---

## Seller Dashboard

```http
GET /seller/dashboard
```

Returns

Revenue

Inventory

Orders

Reviews

Trust Score

---

# Admin API

Protected

Admin Only

Endpoints

```http
GET /admin/users

GET /admin/products

GET /admin/orders

GET /admin/reports

PATCH /admin/users/:id

DELETE /admin/products/:id
```

---

# Pagination

Example

```http
GET /products?page=1&limit=20
```

Response

```json
{
  "page": 1,
  "limit": 20,
  "totalPages": 12,
  "totalItems": 234
}
```

---

# Rate Limiting

Authentication

10 requests/minute

AI

30 requests/minute

Marketplace

100 requests/minute

Public

200 requests/minute

---

# Error Codes

| Code                 | Meaning                       |
| -------------------- | ----------------------------- |
| INVALID_CREDENTIALS  | Login failed                  |
| PRODUCT_NOT_FOUND    | Product missing               |
| ORDER_NOT_FOUND      | Invalid order                 |
| ESCROW_NOT_FOUND     | Escrow missing                |
| WALLET_NOT_CONNECTED | Wallet required               |
| PAYMENT_FAILED       | Blockchain transaction failed |
| UNAUTHORIZED         | Authentication required       |
| FORBIDDEN            | Insufficient permissions      |
| VALIDATION_ERROR     | Invalid request               |

---

# Security

Every endpoint validates:

* Authentication
* Authorization
* Request body
* Input types
* Resource ownership
* Wallet signatures (where required)

Sensitive operations such as escrow creation, payment release, and seller payouts require additional verification before execution.

---

# API Documentation

The API should be documented using **OpenAPI (Swagger)**.

Every endpoint must include:

* Description
* Request schema
* Response schema
* Authentication requirements
* Example requests
* Example responses
* Possible error codes

This ensures frontend developers, AI agents, and third-party integrators can interact with the Vorra platform consistently and securely.
