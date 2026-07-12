# 08-ui-ux-spec.md

# Vorra UI/UX Specification

**Project:** Vorra

**Version:** 1.0

**Design Philosophy:** AI First • Marketplace First • Mobile First

---

# Overview

Vorra should feel familiar to users who have used platforms like Alibaba, Amazon, Jumia, and Tradeling while introducing AI as a natural assistant rather than a replacement for the marketplace.

The UI should prioritize trust, clarity, and speed. Users should always understand where they are, what the AI is doing, and what happens when they approve a payment.

---

# Design Principles

### Simplicity

Every screen should have one primary goal.

---

### Trust

Important information should always be visible.

Examples:

* Supplier Trust Score
* Reviews
* Escrow Status
* Wallet Status
* Verification Badge

---

### AI Transparency

Users should always know what the AI is doing.

Example:

```text id="3n8p4r"
✓ Searching suppliers...

✓ Comparing prices...

✓ Calculating trust score...

✓ Estimating delivery...

✓ Preparing recommendation...
```

---

### Mobile First

The experience should work perfectly on mobile before desktop enhancements.

---

# Brand Identity

Primary Color

Celo Green (#35D07F)

Secondary

Dark Slate

White

Neutral Gray

Success

Green

Warning

Orange

Danger

Red

Typography

* Inter
* Geist
* Satoshi

Rounded Corners

16px

Animations

Subtle

Fast

Professional

---

# Navigation

## Desktop

```text id="v9m0kg"
---------------------------------------------------

Logo

Marketplace

Categories

Ask Vorra

Orders

Dashboard

Notifications

Wallet

Profile

---------------------------------------------------
```

---

## Mobile

Bottom Navigation

```text id="v4p4s7"
🏠 Home

🔍 Search

🤖 Ask

📦 Orders

👤 Profile
```

---

# Public Pages

## Landing Page

Sections

Hero

AI Search Bar

Categories

Featured Products

Verified Suppliers

How Vorra Works

Testimonials

CTA

Footer

---

### Hero Section

Headline

> Africa's AI Procurement Platform

Subheading

> Buy smarter. Pay securely. Trade across Africa with AI and Celo.

Primary CTA

Start Buying

Secondary CTA

Become a Seller

---

### AI Search

Large centered search box.

Placeholder

```text id="sx0pxe"
Find 500kg of maize from Ghana under 500 cUSD...
```

Users can immediately begin chatting with Vorra.

---

# Marketplace

The marketplace should resemble a modern B2B e-commerce platform.

---

## Filters

Category

Country

Price

Supplier Rating

Trust Score

Delivery Time

Verified Only

Availability

---

## Product Cards

Each card contains

Product Image

Product Name

Price

Country

Supplier

Trust Score

Rating

Delivery Estimate

Ask Vorra Button

Buy Now Button

---

Example

```text id="3l9gyb"
🌽 White Maize

$410

🇬🇭 Ghana

Golden Farms

⭐ 4.9

Trust 96

4 Day Delivery

[Ask Vorra]

[Buy]
```

---

# Product Detail Page

Sections

Gallery

Product Information

Supplier Information

Trust Score

Delivery

Reviews

Related Products

Ask Vorra Panel

Purchase Card

---

Purchase Card

Shows

Price

Quantity Selector

Wallet Status

Estimated Delivery

Escrow Information

Buy Button

---

# Supplier Profile

Displays

Business Logo

Business Name

Country

Verification

Trust Score

Completed Orders

Average Rating

Products

Reviews

Trade Timeline

---

Example

```text id="uvh0lk"
Golden Farms

Verified Supplier

Trust Score

96

Completed Orders

482

Rating

4.9

Response Time

11 Minutes
```

---

# Ask Vorra

A floating AI assistant available throughout the platform.

Capabilities

Search

Recommendations

Negotiation

Trade Advice

Risk Assessment

Product Comparison

Import Guidance

---

Example

User

> Which supplier has the fastest delivery?

Vorra

> Golden Farms has the fastest average delivery time (4 days) and a Trust Score of 96.

---

# AI Activity Panel

Displays live AI reasoning.

```text id="tjlwmh"
Searching suppliers...

Checking trust scores...

Comparing prices...

Evaluating delivery...

Recommendation complete.
```

---

# Import Wizard

Step 1

Product

Step 2

Quantity

Step 3

Budget

Step 4

Destination

Step 5

Preferences

Step 6

Recommendations

---

# Shopping Cart

Displays

Products

Quantity

Subtotal

Platform Fee

Estimated Delivery

Escrow Notice

Checkout

---

# Checkout Page

Displays

Order Summary

Supplier

Delivery Address

Wallet

Escrow Details

Platform Fee

Total

Approve Payment Button

---

# Wallet Modal

Functions

Connect Wallet

Choose Wallet

Approve Transaction

Transaction Status

Disconnect

Supported Wallets

MiniPay

Valora

MetaMask

WalletConnect

---

# Buyer Dashboard

Widgets

Recent Orders

Wallet Balance

Notifications

AutoBuy Rules

Saved Searches

Wishlist

Recommended Products

Trade Analytics

---

# Seller Dashboard

Widgets

Revenue

Products

Pending Orders

Completed Orders

Inventory

Analytics

Trust Score

Reviews

---

# Orders Page

Displays

Order Number

Supplier

Amount

Escrow Status

Shipment Status

Payment Status

Tracking Timeline

---

Example Timeline

```text id="y8xj5i"
Order Created

↓

Escrow Funded

↓

Seller Accepted

↓

Preparing Shipment

↓

Shipped

↓

Delivered

↓

Completed
```

---

# AutoBuy Page

Users create AI purchasing rules.

Fields

Product

Quantity

Budget

Maximum Price

Country

Minimum Rating

Minimum Trust

Maximum Delivery

Expiration

Activate Rule

---

Example Rule Card

```text id="qgfcq5"
White Maize

Budget

400 cUSD

Country

Ghana

Trust

90+

Status

Active
```

---

# Reputation UI

Every supplier displays

Trust Score

Average Rating

Completed Orders

Disputes

Verification

Trade Timeline

---

Trust Badge

```text id="kt0mzc"
🟢 Trusted

96/100
```

---

# Notifications

Examples

Escrow Funded

Shipment Sent

Offer Accepted

Counter Offer

AutoBuy Executed

Review Reminder

Payment Released

---

# Empty States

Instead of blank pages, display helpful AI prompts.

Example

"No products found."

Ask Vorra:

> Would you like me to search suppliers in neighboring countries?

---

# Loading States

Use skeleton loaders.

For AI actions, display progress updates rather than spinning loaders.

---

# Error States

Every error should explain:

* What happened
* Why it happened (if known)
* What the user can do next

Example

"Your wallet transaction was rejected. No funds were transferred. You can try again whenever you're ready."

---

# Accessibility

* WCAG AA contrast compliance
* Keyboard navigation
* Focus indicators
* Screen reader support
* Semantic HTML
* Responsive typography

---

# Responsive Breakpoints

Mobile

320px+

Tablet

768px+

Desktop

1024px+

Large Desktop

1440px+

---

# Motion Design

Use Framer Motion.

Animations should include:

* Page transitions
* Card hover effects
* AI thinking indicators
* Notification toasts
* Drawer animations
* Modal transitions

Avoid excessive animation that distracts from procurement tasks.

---

# Definition of Done

The UI is complete when:

* Buyers can complete the full purchasing journey without confusion.
* Sellers can manage products and orders efficiently.
* AI interactions feel integrated into the workflow.
* Wallet interactions are simple and trustworthy.
* Every major feature has a responsive interface.
* The design communicates security, professionalism, and ease of use.

The Vorra interface should make complex cross-border procurement feel as simple as shopping online while clearly showing the added value of AI and Celo-powered programmable payments.
