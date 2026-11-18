---
title: "Contract templates for AI agents: who fills which field"
description: "An agent should fill its side of a contract and leave the other side to the people who sign. How field roles work in templates, in the API, and in contracts an agent writes itself."
date: 2026-11-18
author: "Ilia, founder of Sendforsign"
---

Give an AI agent a contract template and it will happily fill in every blank it finds, including the counterparty's company number, which it will invent. That is not a model problem; it is a template problem. A template that only says *where* the blanks are, and not *whose* they are, leaves the agent guessing.

The fix is old and simple: every field gets an owner. This post explains how field roles work in Sendforsign templates, how an agent sees them, and how to use them when the agent writes the contract itself.

## Four kinds of field

| Role | Who fills it | Example |
|---|---|---|
| Owner | Your side: you, your backend or your agent | Fee, start date, your representative |
| Any recipient | Any of the people the contract is sent to | Client company name |
| A specific recipient | Only that person | The signer's job title, a VAT number |
| Fixed | Nobody; it is set in the template | A clause reference |

In the API this is the field's `fillingType`: 2 for owner, 3 for any recipient, 4 for a specific recipient (with that recipient's key in `externalRecipientKey`), 1 for fixed.

## Setting roles on a template field

In the template editor, every field has a "Who fills in this field" setting. Through the API you set it with a placeholder `update`:

```bash
curl -X POST 'https://api.sendforsign.com/api/placeholder' \
  -H 'X-Sendforsign-Key: YOUR_API_KEY' \
  -H 'Content-Type: application/json' \
  -d '{
    "data": {
      "action": "update",
      "clientKey": "CLIENT_KEY",
      "templateKey": "TEMPLATE_KEY",
      "placeholder": { "placeholderKey": "FIELD_KEY", "fillingType": 3 }
    }
  }'
```

A field for one specific recipient is set on the contract, once that recipient exists, by updating the field with `fillingType: 4` and their `externalRecipientKey`.

## What the agent sees

When an agent reads a template through our [MCP server](https://sendforsign.com/mcp), every field comes back with `filledBy`: `owner`, `any_recipient`, `specific_recipient` or `none`. After it creates a draft, the response splits them into `unfilledFields` (still its job) and `fieldsForRecipients` (not its job). That is enough for a model to do the right thing without a long system prompt:

> Create an NDA from my "Mutual NDA" template for Acme Ltd, fill in our side, add jane@acme.com as signer and show me before sending.

The agent fills the fee and your representative, attaches Jane, and tells you that the company name and her title are left for her.

## When the agent writes the contract

Agents often draft from scratch: "turn this proposal into a contract". For that case, fields can be marked right in the text with double braces:

```markdown
The fee is {{Fee=2 400 EUR}}, payable by {{Client company@any}}.
Our representative: {{Our representative}}.
Signed for the client by {{Signer title@jane@acme.com}}.
```

`{{Name}}` is an owner field to fill later, `{{Name=Value}}` an owner field filled now, `{{Name@any}}` any recipient, and `{{Name@email}}` that recipient. The same name used twice is one field. The markers become real fields with the right owners, exactly as if they came from a template.

## Why it has to be enforced, not just described

Roles are only useful if the other side cannot ignore them. In Sendforsign the server enforces them on the signing side too: a recipient can write only to their own fields, only until they sign, and cannot change the text of the contract, your fields or another recipient's fields. Field values are always inserted as text, so a value cannot add markup to the document.

That matters more with agents than with people. If a prompt injection convinces an agent to "update the fee", the guardrail is not the model's judgement but the fact that the fee is an owner field and the agent is in drafts-only mode until a person approves sending.

## A pattern that works

1. Build templates with roles once; the agent reads them, it does not decide them.
2. Let the agent fill only owner fields, and have it show you the draft.
3. Let recipients fill their own fields on the signing page.
4. Turn on sending only for connections that need it, and keep the confirmation on every send.

The [MCP tools reference](https://sendforsign.com/docs/ai-agents/tools) lists the fields each tool returns, and the [placeholder API](https://sendforsign.com/docs/api-reference/placeholder/create) covers roles for direct integrations.
