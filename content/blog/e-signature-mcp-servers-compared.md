---
title: "E-signature MCP servers compared: DocuSign, BoldSign, Dropbox Sign, SignWell and Sendforsign"
description: "Five e-signature vendors now offer an MCP server for AI agents. How they connect, what they let an agent do, and which guardrails the server actually enforces."
date: 2026-11-18
author: "Ilia, founder of Sendforsign"
---

A year ago, letting an AI agent send a contract meant writing your own tool around an e-signature API. Today most of the big vendors ship an MCP server, so Claude, ChatGPT or Cursor can talk to them directly. That is good news, but the servers are not interchangeable. They differ in where they run, how you connect, what the agent can do, and above all in what stops an agent from sending something it should not.

I compared the official MCP servers of DocuSign, BoldSign, Dropbox Sign and SignWell with ours. Every fact about another vendor below comes from that vendor's own pages, linked in the text, as they read on 18 November 2026. Products change quickly here, so check the links before you decide.

## The short version

| | Where it runs | How you connect | Server-side guardrails |
|---|---|---|---|
| DocuSign | Remote | OAuth | Approval left to your agent |
| BoldSign | Remote (US, EU, CA, AU) and local | OAuth or API key | Confirmation recommended, not enforced |
| Dropbox Sign | Inside the Dropbox remote MCP server | Your Dropbox account | User confirms send, remind and cancel |
| SignWell | Local (npx) | API key | Drafts first, user confirms before sending |
| Sendforsign | Remote | OAuth or API key | Modes per connection, confirm on every send, domain allowlist, audit log |

If you only remember one thing: decide first whether your agent works for one person in a chat app, or for many customers inside your product. The answer picks the right server more than any feature list.

## DocuSign

DocuSign has an [official MCP server](https://developers.docusign.com/platform/mcp-server/) with OAuth and [44 tools](https://developers.docusign.com/platform/mcp-server/mcp-tools.md) in eight groups: eSignature, CLM, Workflow Builder, Agreement Manager and more. It is the broadest surface by far, and it is listed in many AI clients.

Two things to know. Some of those tools need a separate IAM subscription, and several work only in the demo environment. And DocuSign's docs say custom agents should add their own approval step before sending; the server itself does not ask for one. Admins can switch MCP access off per account.

If your agent lives inside your own product, note that [embedded signing is listed only on the Enhanced developer plan](https://ecom.docusign.com/plans-and-pricing/developer), which is sold through sales.

## BoldSign

[BoldSign's MCP server](https://developers.boldsign.com/boldsign-mcp-server/overview/) is hosted in four regions (US, EU, Canada, Australia), accepts OAuth for chat apps and an API key for server-side agents, and also ships as an open-source local package. Its tools cover documents, templates (including sending from a template), contacts, users and teams.

On safety, the docs recommend a human confirmation before sending, revoking or reminding, and starting with read-only prompts. They are also candid that the server does not enforce a read-only mode or a confirmation: it does not tell interactive callers from automated ones.

BoldSign's API pricing is the most transparent of the group: [$30 a month with 40 envelopes, then $0.75 each](https://boldsign.com/esignature-api-pricing/).

## Dropbox Sign

Dropbox Sign does not have a separate server. Its features come through the [Dropbox remote MCP server](https://help.dropbox.com/integrations/dropbox-sign-mcp-remote-server), which you connect with your Dropbox account. An agent can send a document, check status, send reminders, cancel a request, search, and download signed copies with audit trails.

It is built for a person working in Claude or ChatGPT, not for an integrator: there are no templates, no signing order and no advanced signer fields through MCP, and no API-key mode. In return the user must review and confirm sending, reminders and cancellation.

## SignWell

[SignWell's MCP server](https://www.signwell.com/mcp) is a local package (`npx @signwell/mcp`) that runs on your machine with a SignWell API key. There is no hosted URL and no OAuth sign-in. It can send files and templates, create templates, check status, send reminders and download signed PDFs.

Its safety model is simple and good: every document starts as a draft, and nothing is emailed until the user confirms. SignWell's [pricing](https://www.signwell.com/api-pricing/) is also the friendliest for small volumes, with 25 free API documents a month.

## Sendforsign

Ours is a remote server at `https://api.sendforsign.com/mcp`. People connect by pasting the URL into their AI app and signing in; on the consent screen they pick the account, optionally one tenant, and a mode. Agents that run on your servers use an API key in headers instead. It has 19 tools: templates and their fields, drafts from a template or from the agent's own text, PDF upload and field placement, recipients, sending, timeline, PDF download and tenants.

Where we differ is what the server enforces:

- **Modes per connection.** Read only, drafts, or send. New connections can only draft.
- **A confirmation in every send and archive call.** The tool refuses without it.
- **A recipient domain allowlist,** so a prompt injection cannot add an outside address.
- **Fields with owners.** The agent fills its fields; each recipient can fill only their own, and only until they sign.
- **Tenant-limited connections.** An agent working for one customer of your platform sees only that customer's contracts.
- **An audit log of agent actions,** hash-chained, in the contract timeline.

We are also the only one of the five built around a platform with many customers: a tenant per customer, white-label signing pages and emails, and React components to embed signing.

Where others are stronger: DocuSign has the broadest feature set and full eIDAS coverage including qualified signatures; Dropbox Sign offers advanced and qualified signatures through national eIDs; BoldSign has regional hosting; SignWell has the lowest entry price. Sendforsign provides simple electronic signatures only.

## Which one to pick

- **You want to send the odd contract from Claude yourself:** Dropbox Sign if you already use Dropbox, SignWell if you want drafts by default and pay-per-document.
- **You need qualified signatures or a full CLM:** DocuSign.
- **Your product's agent sends contracts for your customers:** you need tenants, white-label and guardrails the server enforces, not ones you hope the model follows. That is the case we built Sendforsign for.

To try ours, paste `https://api.sendforsign.com/mcp` into your AI app and follow the [MCP quickstart](https://sendforsign.com/docs/ai-agents/mcp-quickstart). The Free plan covers 5 contracts a month.
