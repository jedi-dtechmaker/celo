# 06-database-schema.md

# Vorra Database Schema

**Project:** Vorra

**Version:** 1.0

**Database:** PostgreSQL

**ORM:** Prisma

---

# Overview

The Vorra database stores all off-chain business data while Celo stores the financial settlement layer.

**Golden Rule**

* Blockchain stores **payments**
* Database stores **business logic**

The database should never be considered the source of truth for escrow balances.

---

# Database Design Principles

* Normalize where appropriate
* Use UUIDs as primary keys
* Soft delete records when necessary
* Track timestamps on all tables
* Use foreign keys for relationships
* Use indexes on frequently queried columns

---

# Entity Relationship Diagram

```text
Users
 │
 ├──────────────┐
 │              │
 ▼              ▼
Products     Orders
 │              │
 │              ▼
 │          Escrows
 │              │
 ▼              ▼
Categories   Transactions

Users
 │
 ├──────────────┐
 ▼              ▼
Reviews     Notifications

Users
 │
 ▼
AutoBuyRules

Products
 │
 ▼
ProductImages

Orders
 │
 ▼
OrderTimeline
```

---

# Table: users

Stores both buyers and sellers.

| Column         | Type                       |
| -------------- | -------------------------- |
| id             | UUID                       |
| full_name      | VARCHAR                    |
| email          | VARCHAR UNIQUE             |
| password       | TEXT                       |
| phone          | VARCHAR                    |
| country        | VARCHAR                    |
| wallet_address | VARCHAR                    |
| role           | ENUM(BUYER, SELLER, ADMIN) |
| avatar         | TEXT                       |
| trust_score    | DECIMAL                    |
| verified       | BOOLEAN                    |
| email_verified | BOOLEAN                    |
| status         | ENUM                       |
| created_at     | TIMESTAMP                  |
| updated_at     | TIMESTAMP                  |

---

# Table: seller_profiles

Additional seller information.

| Column               | Type      |
| -------------------- | --------- |
| id                   | UUID      |
| user_id              | UUID FK   |
| business_name        | VARCHAR   |
| business_description | TEXT      |
| address              | TEXT      |
| website              | TEXT      |
| logo                 | TEXT      |
| registration_number  | VARCHAR   |
| response_time        | INTEGER   |
| completed_orders     | INTEGER   |
| average_rating       | DECIMAL   |
| created_at           | TIMESTAMP |

---

# Table: categories

| Column     | Type      |
| ---------- | --------- |
| id         | UUID      |
| name       | VARCHAR   |
| slug       | VARCHAR   |
| icon       | TEXT      |
| created_at | TIMESTAMP |

---

# Table: products

| Column        | Type      |
| ------------- | --------- |
| id            | UUID      |
| seller_id     | UUID FK   |
| category_id   | UUID FK   |
| title         | VARCHAR   |
| description   | TEXT      |
| unit          | VARCHAR   |
| quantity      | DECIMAL   |
| minimum_order | DECIMAL   |
| unit_price    | DECIMAL   |
| currency      | VARCHAR   |
| country       | VARCHAR   |
| delivery_days | INTEGER   |
| status        | ENUM      |
| featured      | BOOLEAN   |
| created_at    | TIMESTAMP |
| updated_at    | TIMESTAMP |

---

# Table: product_images

| Column     | Type    |
| ---------- | ------- |
| id         | UUID    |
| product_id | UUID FK |
| image_url  | TEXT    |
| position   | INTEGER |

---

# Table: orders

| Column            | Type      |
| ----------------- | --------- |
| id                | UUID      |
| buyer_id          | UUID FK   |
| seller_id         | UUID FK   |
| product_id        | UUID FK   |
| quantity          | DECIMAL   |
| agreed_price      | DECIMAL   |
| total_amount      | DECIMAL   |
| order_status      | ENUM      |
| shipping_address  | TEXT      |
| expected_delivery | DATE      |
| created_at        | TIMESTAMP |
| updated_at        | TIMESTAMP |

---

# Order Status Enum

```text
Pending

Negotiating

Accepted

EscrowFunded

Preparing

Shipped

Delivered

Completed

Cancelled

Refunded

Disputed
```

---

# Table: order_timeline

Tracks every status update.

| Column      | Type      |
| ----------- | --------- |
| id          | UUID      |
| order_id    | UUID FK   |
| status      | VARCHAR   |
| description | TEXT      |
| created_at  | TIMESTAMP |

---

# Table: escrows

Maps blockchain escrows to database records.

| Column            | Type      |
| ----------------- | --------- |
| id                | UUID      |
| order_id          | UUID FK   |
| escrow_contract   | VARCHAR   |
| transaction_hash  | VARCHAR   |
| blockchain_status | ENUM      |
| amount            | DECIMAL   |
| currency          | VARCHAR   |
| released_at       | TIMESTAMP |
| created_at        | TIMESTAMP |

---

# Escrow Status Enum

```text
Created

Funded

Released

Refunded

Cancelled

Disputed
```

---

# Table: transactions

Stores blockchain transaction references.

| Column     | Type      |
| ---------- | --------- |
| id         | UUID      |
| escrow_id  | UUID FK   |
| tx_hash    | VARCHAR   |
| wallet     | VARCHAR   |
| network    | VARCHAR   |
| token      | VARCHAR   |
| amount     | DECIMAL   |
| status     | ENUM      |
| created_at | TIMESTAMP |

---

# Table: reviews

| Column      | Type      |
| ----------- | --------- |
| id          | UUID      |
| order_id    | UUID FK   |
| reviewer_id | UUID FK   |
| seller_id   | UUID FK   |
| rating      | INTEGER   |
| title       | VARCHAR   |
| review      | TEXT      |
| created_at  | TIMESTAMP |

---

# Table: negotiations

Stores offers and counter-offers.

| Column        | Type      |
| ------------- | --------- |
| id            | UUID      |
| order_id      | UUID FK   |
| sender_id     | UUID FK   |
| offered_price | DECIMAL   |
| message       | TEXT      |
| status        | ENUM      |
| created_at    | TIMESTAMP |

---

# Table: autobuy_rules

Stores AI purchasing rules.

| Column                | Type      |
| --------------------- | --------- |
| id                    | UUID      |
| buyer_id              | UUID FK   |
| product_name          | VARCHAR   |
| category_id           | UUID FK   |
| maximum_price         | DECIMAL   |
| quantity              | DECIMAL   |
| preferred_country     | VARCHAR   |
| minimum_rating        | DECIMAL   |
| minimum_trust_score   | DECIMAL   |
| maximum_delivery_days | INTEGER   |
| budget                | DECIMAL   |
| expires_at            | TIMESTAMP |
| active                | BOOLEAN   |

---

# Table: ai_activity_logs

Every AI action is recorded.

| Column         | Type      |
| -------------- | --------- |
| id             | UUID      |
| user_id        | UUID FK   |
| agent          | VARCHAR   |
| action         | VARCHAR   |
| input          | JSONB     |
| output         | JSONB     |
| execution_time | INTEGER   |
| created_at     | TIMESTAMP |

---

# Table: notifications

| Column     | Type      |
| ---------- | --------- |
| id         | UUID      |
| user_id    | UUID FK   |
| title      | VARCHAR   |
| message    | TEXT      |
| type       | ENUM      |
| read       | BOOLEAN   |
| created_at | TIMESTAMP |

---

# Table: wishlists

| Column     | Type      |
| ---------- | --------- |
| id         | UUID      |
| user_id    | UUID FK   |
| product_id | UUID FK   |
| created_at | TIMESTAMP |

---

# Table: saved_searches

Allows users to quickly rerun searches.

| Column     | Type      |
| ---------- | --------- |
| id         | UUID      |
| user_id    | UUID FK   |
| query      | TEXT      |
| filters    | JSONB     |
| created_at | TIMESTAMP |

---

# Table: disputes

Future-ready dispute management.

| Column     | Type      |
| ---------- | --------- |
| id         | UUID      |
| order_id   | UUID FK   |
| buyer_id   | UUID FK   |
| seller_id  | UUID FK   |
| reason     | TEXT      |
| resolution | TEXT      |
| status     | ENUM      |
| created_at | TIMESTAMP |

---

# Indexes

Create indexes on:

* users.email
* users.wallet_address
* products.category_id
* products.country
* products.unit_price
* products.seller_id
* orders.buyer_id
* orders.seller_id
* orders.order_status
* escrows.transaction_hash
* reviews.seller_id
* autobuy_rules.buyer_id

These indexes optimize marketplace searches and dashboard queries.

---

# Relationships

* One User → Many Products
* One User → Many Orders
* One Product → Many Images
* One Product → Many Orders
* One Order → One Escrow
* One Order → Many Timeline Events
* One Order → Many Negotiations
* One User → Many AutoBuy Rules
* One User → Many Notifications
* One Seller → Many Reviews

---

# Data Retention Policy

* Orders are never permanently deleted.
* Escrow records are immutable after settlement.
* AI activity logs are retained for auditing.
* Reviews cannot be edited after publication (future exception: admin moderation).
* Soft deletes should be used for products and user accounts.

---

# Future Tables

The following tables are intentionally excluded from the MVP but should be considered for future releases:

* freight_quotes
* customs_documents
* insurance_policies
* trade_financing
* warehouse_inventory
* supplier_certifications
* compliance_checks
* market_prices

---

# Definition of Done

The database schema is complete when:

* All marketplace operations are supported.
* AI agents have structured data to operate on.
* Escrow records map cleanly to blockchain transactions.
* Reputation metrics can be calculated efficiently.
* AutoBuy rules can be evaluated by background workers.
* Every critical business event can be audited.

This schema provides a scalable foundation for Vorra while remaining focused on the requirements of the MVP and the Celo Agentic Payments & DeFAI Hackathon.
