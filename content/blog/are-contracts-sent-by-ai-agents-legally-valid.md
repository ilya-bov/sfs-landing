---
title: "Are contracts sent by AI agents legally valid? ESIGN, UETA and eIDAS"
description: "An AI agent drafts a contract and sends it for e-signature. What US and EU e-signature law says about electronic agents, attribution, and the records you should keep."
date: 2026-11-18
author: "Ilia, founder of Sendforsign"
---

*This is a plain-language overview, not legal advice. Talk to a lawyer about your contracts and your jurisdiction.*

When an AI agent drafts a contract and sends it for signature, two questions come up quickly. Does it matter legally that software did the work? And if something goes wrong, can you show who did what?

The short answer: the main e-signature laws in the US and the EU were written with automation in mind, and they focus on attribution and records rather than on whether a human typed every word. That puts the weight on how you run the agent.

## The US: ESIGN and UETA

The federal **ESIGN Act** says a signature, contract or record may not be denied legal effect solely because it is electronic. It also has a specific provision on electronic agents: a contract or record may not be denied legal effect solely because its formation, creation or delivery involved the action of one or more electronic agents, **so long as the action of the electronic agent is legally attributable to the person to be bound** (15 U.S.C. § 7001(h)).

The **Uniform Electronic Transactions Act**, adopted by most states, goes in the same direction. Its section on automated transactions (§ 14) recognises that a contract can be formed by the interaction of electronic agents, or of an electronic agent and an individual. Its section on attribution (§ 9) says an electronic record or signature is attributable to a person if it was the act of that person, which can be shown in any manner, including the efficacy of any security procedure applied.

Two practical consequences:

1. **Software involvement alone is not a defect.** An agent drafting and sending a contract does not, by itself, make it invalid.
2. **Attribution is the real question.** You need to be able to show that the agent acted for you, within limits you set. That is where records and procedures matter.

## The EU: eIDAS

The **eIDAS Regulation** (EU) No 910/2014 says an electronic signature shall not be denied legal effect and admissibility as evidence in legal proceedings solely because it is in electronic form or does not meet the requirements for qualified electronic signatures (Article 25(1)). It defines three levels: simple, advanced and qualified. Only a qualified signature is automatically equivalent to a handwritten one; simple signatures are valid evidence, weighed by the court.

For most commercial contracts, the law does not require a particular level, and simple electronic signatures with a good audit trail are widely used. Some documents in some countries do require a qualified signature or a specific form. That is a reason to know your contract types, not a reason to avoid e-signatures.

## Who is signing, exactly?

It helps to separate two roles that often get blurred:

- **The agent prepares and sends.** It drafts the contract, fills your side, adds recipients and sends the request. Legally, that is your business acting through a tool.
- **People sign.** The counterparty, and often your own signatory, sign themselves on the signing page. The agent does not sign on their behalf.

Keeping signing in human hands is the simplest way to avoid hard questions about authority. The agent's job is to make sure the right document reaches the right person; the decision to commit stays with people.

## What to keep, and why

If attribution and evidence are what matter, these are the records worth having:

- **A procedure that limits what the agent can do.** Drafts only by default, sending only where enabled, an explicit confirmation on every send, and an allowlist of recipient domains. This is the kind of "security procedure" UETA § 9 refers to.
- **A log of what the agent did.** Which agent acted, on whose behalf, which tool it called with which arguments, and whether the action was allowed, stored so it cannot be quietly edited afterwards.
- **An audit trail of the signing itself.** When the contract was sent, opened and signed, by which email address, from which IP, with a signature certificate attached to the signed PDF.
- **Integrity of the signed document.** Recipients should be able to fill only their own fields and only before signing, so the text that was signed is the text that was sent.

## How Sendforsign handles it

We built our [MCP server](https://sendforsign.com/mcp) around these points:

- Each connection has a mode (read only, drafts, send), set by a person when connecting. New connections can only draft.
- Every send and archive needs `confirm: true` in the call, and recipients can be limited to allowed domains.
- Every agent action that changes something is written to a hash-chained log on the contract, with the agent's name and the person it acts for, and appears in the contract timeline.
- Recipients sign themselves. They can fill only their own fields, only until they sign, and nothing changes after signing.
- Signed PDFs carry a signature certificate with the signer's name, email, time and IP.

Sendforsign provides **simple electronic signatures** under eIDAS, and electronic signatures under ESIGN and UETA in the US. If a document needs an advanced or qualified signature, use a provider that offers it for that document.

More on the practical side in [How to let an AI agent send contracts safely](https://sendforsign.com/blog/how-to-let-an-ai-agent-send-contracts-safely), and on our [compliance page](https://sendforsign.com/docs/about/compliance).
