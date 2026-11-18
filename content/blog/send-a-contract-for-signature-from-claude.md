---
title: "How to send a contract for signature from Claude, step by step"
description: "Connect Claude to an e-signature MCP server, draft a contract from a template or from your own text, let the other side fill their fields, and send it for signature without leaving the chat."
date: 2026-11-18
author: "Ilia, founder of Sendforsign"
---

Claude can draft a contract in seconds. Getting that contract signed used to be the slow part: copy the text into an e-signature tool, add fields, add signers, send. With an MCP server, Claude does those steps itself, and you stay in the chat.

This guide connects Claude to Sendforsign, drafts a contract two ways, and sends it for signature. It takes about five minutes. You need a Claude plan that supports custom connectors and a free Sendforsign account.

## 1. Connect Claude

In Claude (web or desktop), open **Settings → Connectors → Add custom connector**, give it a name, and paste:

```
https://api.sendforsign.com/mcp
```

Click **Connect**. A Sendforsign sign-in page opens. After you sign in you see a consent screen where you choose:

- **The account** the connector works in.
- **A user (tenant)**, if you want to limit Claude to one of your customers. Leave it empty to work across the whole account.
- **What Claude may do.** *Drafts only* is the default: Claude can create and fill contracts but cannot send them. Pick *Can send* when you are ready.
- **Allowed recipient domains**, if you want to restrict who contracts can go to.

That is the whole setup. No API key is copied anywhere, and you can disconnect at any time.

If you use Claude Code, one command does the same:

```bash
claude mcp add --transport http sendforsign https://api.sendforsign.com/mcp
```

Then run `/mcp` inside Claude Code and sign in.

To check the connection, ask Claude: *"What can you do with Sendforsign on this connection?"* It calls `get_connection_info` and tells you the mode, the tenant and the allowed domains.

## 2. Draft from a template

If you already have templates in Sendforsign, this is the fastest path. Ask:

> Create an NDA from my "Mutual NDA" template for Acme Ltd, fill in our side, add jane@acme.com as the signer, and show me before sending.

Behind the scenes Claude lists your templates, reads the template's fields and who fills each one, creates a **draft**, fills the fields that belong to your side, and adds Jane as a recipient. Creating a draft never emails anyone. Claude then shows you what it filled, which fields are left for Jane, and a signing link.

The important part is *who fills what*. Every field in a Sendforsign contract has an owner: your side, any recipient, or one specific recipient. Claude fills only your side. Jane will fill her company details herself when she opens the contract.

## 3. Or draft from your own text

No template? Write the contract in the chat, or let Claude write it, and mark the fields with double braces:

```markdown
# Design services agreement

Between **Studio Nord** and {{Client company@any}}.

The fee is {{Fee=2 400 EUR}}, due within 14 days of the invoice.
Our representative: {{Our representative}}.

Signed for the client by {{Signer title@jane@acme.com}}.
```

Each marker becomes a real field:

| Marker | Who fills it |
|---|---|
| `{{Our representative}}` | Your side, later |
| `{{Fee=2 400 EUR}}` | Your side, filled now |
| `{{Client company@any}}` | Any recipient |
| `{{Signer title@jane@acme.com}}` | Jane only |

The same name used twice is one field, so `{{Fee}}` can appear in the price table and in the payment clause and both show the same value. You can simply say *"Create this as a contract and add jane@acme.com as signer"* and Claude passes the text with its markers.

Prefer a PDF? Attach it and ask Claude to put Jane's signature and the signing date at the bottom of the last page. It uploads the PDF and places the fields there.

## 4. Review, then send

Ask Claude to show you the draft: the fields, their values, and the recipients. Fix anything in plain language (*"change the fee to 2 600 EUR"*, *"add tom@acme.com as an approver before Jane"*).

When it looks right, switch the connector to *Can send* if you have not already, and say:

> Send it for signature.

Sending is the one step with consequences, so it is protected twice. The connection must allow sending, and the send call itself must carry an explicit confirmation; Claude shows you that call before it runs. If you set allowed domains, an address outside them is refused even if something in the conversation asks for it.

Jane gets an email with a link. She fills her fields, signs, and that is it. She cannot change the text of the contract or your fields, and nothing changes after she signs.

## 5. Track it

Later in the same chat or a new one:

> Which contracts are still waiting for signature this week? Remind whoever hasn't signed.

> What happened with the Acme NDA? Show me the timeline.

> Download the signed PDF.

The timeline shows when the contract was sent, seen and signed, and also what the agent did: every action Claude took through the connector is logged on the contract, with which app did it and on whose behalf.

## What this is good for

For one-off contracts, this replaces a lot of copying and clicking. Where it really pays off is inside a product: a booking platform, a staffing tool or an agency CRM whose own agent drafts contracts for its customers. The same server gives each customer of your product their own tenant, your brand on the emails and signing pages, and the same guardrails.

The [MCP quickstart](https://sendforsign.com/docs/ai-agents/mcp-quickstart) has the setup for ChatGPT, Cursor, VS Code and server-side agents, and the [prompt library](https://sendforsign.com/docs/ai-agents/prompts) has more requests that work well. The Free plan covers 5 contracts a month.
