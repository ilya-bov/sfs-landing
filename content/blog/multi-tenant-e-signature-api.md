---
title: "Multi-tenant e-signature: one API key, many customers"
description: "If your SaaS sends contracts on behalf of its customers, you need their documents, templates, webhooks and branding kept apart. How to model tenants in an e-signature API, with working requests."
date: 2026-11-18
author: "Ilia, founder of Sendforsign"
---

Most e-signature APIs are designed around one company signing its own contracts. Platforms are different. A booking tool, a staffing marketplace or an agency CRM sends contracts *for* its customers: each of them has their own templates, their own counterparties and their own branding, and none of them should ever see another's documents.

You can fake multi-tenancy with one big account and a `customer_id` tag on every document. It works until the first time a query forgets the filter. This post shows how to model it properly, using Sendforsign's API as the example.

## Three levels

| Level | Who | Key |
|---|---|---|
| Platform | You, the integrator | API key (`X-Sendforsign-Key`) |
| Client | Each business that uses your product | `clientKey` |
| User | People inside that business | `userKey` |

Your backend holds one API key. Every request names the client it acts for, and optionally the user. Contracts, templates, recipients and webhooks belong to a client, so the separation is in the data model, not in your query filters.

## 1. Create a client when a customer signs up

```bash
curl -X POST 'https://api.sendforsign.com/api/client' \
  -H 'X-Sendforsign-Key: YOUR_API_KEY' \
  -H 'Content-Type: application/json' \
  -d '{
    "data": {
      "action": "create",
      "client": {
        "organization": "Studio Nord",
        "fullname": "Mia Nord",
        "email": "mia@studionord.example",
        "customKey": "customer_4812",
        "users": [{ "fullname": "Mia Nord", "email": "mia@studionord.example" }]
      }
    }
  }'
```

The response contains the `clientKey`; store it next to your customer record. `customKey` is your own identifier, handy for lookups and reconciliation.

## 2. Add users as their team grows

```bash
curl -X POST 'https://api.sendforsign.com/api/user' \
  -H 'X-Sendforsign-Key: YOUR_API_KEY' \
  -H 'Content-Type: application/json' \
  -d '{
    "data": {
      "action": "create",
      "clientKey": "CLIENT_KEY",
      "user": { "fullname": "Tom Berg", "email": "tom@studionord.example" }
    }
  }'
```

Pass the returned `userKey` on requests made for that person, and contracts are attributed to them. A user can see their own contracts, and you can still list everything for the client.

## 3. Create contracts in the client's space

Every contract request carries the `clientKey`. Templates are per client too, so each customer can have their own NDA without seeing anyone else's:

```bash
curl -X POST 'https://api.sendforsign.com/api/contract' \
  -H 'X-Sendforsign-Key: YOUR_API_KEY' \
  -H 'Content-Type: application/json' \
  -d '{
    "data": {
      "action": "create",
      "clientKey": "CLIENT_KEY",
      "userKey": "USER_KEY",
      "contract": { "name": "Service agreement", "templateKey": "TEMPLATE_KEY" }
    }
  }'
```

## 4. Webhooks per client

Each client has its own webhooks, with the events you choose: created, sent, seen, approved, signed, fully signed. That makes routing trivial: the event arrives at the URL you registered for that customer, so you never have to guess which tenant a `contract.signed` belongs to.

## 5. Branding per customer

On a platform, your customers' customers should see your product, or even your customer's brand. Logos on emails and the signing page, Sendforsign branding switched off, and signing links on a custom domain are all set up once, and the signing step can be embedded in your UI with the `RecipientView` React component instead of an iframe.

## 6. Agents scoped to one tenant

This is newer, and it matters if your product has an AI agent. Through our [MCP server](https://sendforsign.com/mcp), an agent connection can be limited to a single tenant: it lists only that customer's contracts and cannot pass another `userKey`. Combine it with drafts-only mode and an allowlist of recipient domains, and an agent working for one customer cannot leak into another's documents, whatever the prompt says.

## A checklist for platforms

- One API key on your server, never in the browser.
- A client per customer, created at sign-up, its `clientKey` stored with the customer.
- Templates, contracts and webhooks always created in the client's space.
- Users for the people inside each customer, when you need attribution.
- Branding and signing domain configured so signers see your product.
- If an agent acts for a customer, a connection limited to that tenant.

The [API introduction](https://sendforsign.com/docs/api-reference/introapi) covers authentication and the structure in more detail. The Platform plan ($199 a month with 300 contracts) includes tenants, white-label and the React components, and the Free plan lets you build the whole flow first.
