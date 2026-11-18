---
title: "Placing signature fields on a PDF with an API"
description: "Upload a PDF, put a signature, the signing date and text fields exactly where they belong, and get the signed PDF back. The coordinate system, the requests, and the mistakes to avoid."
date: 2026-11-18
author: "Ilia, founder of Sendforsign"
---

Plenty of contracts never start as text in your app. They arrive as PDFs: a landlord's lease, a supplier's terms, a contract a lawyer sent over. To get one signed through an API you need three things: upload the file, put fields on its pages, and get the signed PDF back with everything stamped in place.

This guide does that with Sendforsign's REST API, and shows the shortcut an AI agent can use through MCP.

## 1. Create a PDF contract and upload the file

A PDF contract is a contract with `contractType: "pdf"`:

```bash
curl -X POST 'https://api.sendforsign.com/api/contract' \
  -H 'X-Sendforsign-Key: YOUR_API_KEY' \
  -H 'Content-Type: application/json' \
  -d '{ "data": { "action": "create", "clientKey": "CLIENT_KEY",
        "contract": { "name": "Lease, Flat 4B", "contractType": "pdf" } } }'
```

Then upload the file as multipart form data, field name `pdf`:

```bash
curl -X POST 'https://api.sendforsign.com/api/upload_pdf?clientKey=CLIENT_KEY&contractKey=CONTRACT_KEY' \
  -H 'X-Sendforsign-Key: YOUR_API_KEY' \
  -F 'pdf=@lease.pdf;type=application/pdf'
```

Add the recipients next (`recipient` `create`); signature fields belong to a recipient, so they need to exist first. Adding recipients does not email anyone.

## 2. Understand the coordinate system

This is where most PDF integrations go wrong, so it is worth a paragraph. Positions are in pixels on the page **as drawn 1000 pixels wide**, measured from the **top-left** corner. Page numbers (`pageId`) start at **0**.

So for an A4 page (595 × 842 points), the drawn page is 1000 × 1415 pixels. A box at 60% across and 80% down, 30% wide and 8% tall, is:

| Field | Value |
|---|---|
| `positionX` | 0.60 × 1000 = 600 |
| `positionY` | 0.80 × 1415 = 1132 |
| `width` | 0.30 × 1000 = 300 |
| `height` | 0.08 × 1415 = 113 |

When the recipient signs, the signing page stamps each field into the PDF at the same place, scaled to the real page size. Keep positions at 1 or more: a coordinate of exactly 0 is treated as "not set" in places.

## 3. Put the recipient's signature, name, email and date

The signature, full name, email and date signed come from the recipient when they sign. They are "special" fields, keyed by the recipient: `RECIPIENT_KEY_<type>`, where the type is 1 for date signed, 2 for full name, 3 for email and 4 for the signature.

```bash
curl -X POST 'https://api.sendforsign.com/api/placeholder' \
  -H 'X-Sendforsign-Key: YOUR_API_KEY' \
  -H 'Content-Type: application/json' \
  -d '{ "data": { "action": "update", "clientKey": "CLIENT_KEY", "contractKey": "CONTRACT_KEY",
        "placeholders": [
          { "placeholderKey": "RECIPIENT_KEY_4", "isSpecial": true, "specialType": 4,
            "insertion": [ { "action": "update", "id": 1, "pageId": 1,
                             "positionX": 600, "positionY": 1132, "width": 300, "height": 113 } ] },
          { "placeholderKey": "RECIPIENT_KEY_1", "isSpecial": true, "specialType": 1,
            "insertion": [ { "action": "update", "id": 1, "pageId": 1,
                             "positionX": 600, "positionY": 1260, "width": 300, "height": 42 } ] }
        ] } }'
```

The `id` numbers the boxes of one field: use a new id for another box (for example initials on every page), the same id and page to move an existing one.

## 4. Add text fields with owners

Text fields are ordinary placeholders with an `insertion` and an owner: your side, any recipient, or one specific recipient (`fillingType` 2, 3 or 4, see [field roles](https://sendforsign.com/blog/contract-templates-for-ai-agents-field-roles)). For example, a contract number your side fills now:

```bash
curl -X POST 'https://api.sendforsign.com/api/placeholder' \
  -H 'X-Sendforsign-Key: YOUR_API_KEY' \
  -H 'Content-Type: application/json' \
  -d '{ "data": { "action": "create", "clientKey": "CLIENT_KEY", "contractKey": "CONTRACT_KEY",
        "placeholder": { "name": "Contract number", "value": "L-2026-042", "fillingType": 2,
          "insertion": [ { "id": 1, "pageId": 0, "positionX": 100, "positionY": 283, "width": 400, "height": 42 } ] } } }'
```

A field the tenant fills, such as their phone number, is the same with `fillingType: 4` and their `externalRecipientKey`; on the signing page they are asked for it before signing.

## 5. Send and get the signed PDF

Send with `recipient` `send` or show each recipient's signing link in your product. When everyone has signed, `GET /api/download_pdf` returns the signed PDF with every field in place and a signature certificate page, and your webhook gets `contract.fully_signed`.

## The agent shortcut

Through our [MCP server](https://sendforsign.com/mcp), an AI agent does all of the above with two tools and percentages instead of pixels. `create_pdf_contract` takes the PDF by https link or as a file and returns the page sizes; `place_pdf_fields` takes boxes in percent of the page, with `page: "last"` allowed:

> Put Jane's signature and the signing date at the bottom right of the last page, and a contract number field at the top of page one.

The conversion to the 1000-pixel page happens on the server, which is exactly the arithmetic above.

## Mistakes to avoid

- **Page numbers start at 0** in the REST API (the MCP tool uses 1-based pages).
- **Y grows downwards.** A PDF library will usually give you bottom-left coordinates; flip them.
- **Height depends on the page's proportions.** Multiply by the drawn height (1000 × height ÷ width), not by 1000.
- **Add recipients before their fields.** Special fields are keyed by the recipient.
- **Do not use 0** for a coordinate; start at 1.

Full parameters are in the docs for [PDF upload](https://sendforsign.com/docs/api-reference/pdf/upload), [PDF fields](https://sendforsign.com/docs/api-reference/placeholder/pdfbasic) and [recipient fields on a PDF](https://sendforsign.com/docs/api-reference/placeholder/pdfspecial).
