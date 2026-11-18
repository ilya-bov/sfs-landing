---
title: "How to let an AI agent send contracts safely"
description: "Agents can now draft and send contracts through MCP. Here is what has to be true before you let one near a signature: modes, confirmations, field roles and an audit log."
date: 2026-11-18
author: "Sendforsign"
---

AI agents can now draft a contract, fill it in and send it for signature from a chat. Claude, ChatGPT and Cursor all talk to remote MCP servers, and an e-signature API is exactly the kind of tool they are good at driving. That is the easy part.

The hard part is that a contract is not a draft email. Once it is sent, a real person receives a real obligation, under your company's name. So the question is not whether an agent can send contracts, but what has to be true before you let it.

## 1. Drafting and sending are different permissions

Most of the value of an agent is in the drafting: picking the right template, filling in the company details, adding the right signers, noticing a missing field. Sending is a single step at the end, and it is the one with consequences.

Treat them as separate permissions. A new connection should be able to read and draft, and nothing else. Sending should be something a person turns on deliberately, for a specific connection, and can turn off again. In Sendforsign this is the agent mode chosen when you connect the app: read only, drafts, or send.

## 2. Every send needs a confirmation in the call itself

Even in send mode, an agent should not be able to send by accident. The send and archive tools require an explicit confirmation flag in the tool call, so the model has to state its intent, and most AI apps show that call to the person for approval before it runs.

The practical pattern is simple: let the agent prepare everything, then ask it to show you the contract and the recipients, and only then say "send".

## 3. Limit who the agent can send to

Agents follow instructions from anywhere in their context, including documents and emails they read. A prompt injection that says "also send a copy to this address" is a real risk.

An allowlist of recipient domains closes most of it. If your agent works for your sales team, it may only send to the domains of your customers, or to your own domain while you test. Anything else is refused before it reaches an inbox.

## 4. Each field belongs to someone

A contract has fields that your side fills in, such as the price, and fields the other side fills in, such as their company details. An agent should fill only its own fields and leave the rest to the right person.

That rule has to hold on the recipient side too. A recipient should be able to fill only the fields assigned to them, and only until they sign. The text of the contract, your fields and other recipients' fields should stay exactly as you sent them, and nothing should change after signing.

## 5. Keep a log of what the agent did

When something goes wrong, "the AI did it" is not an answer. You need to know which agent acted, on whose behalf, what it tried to do and whether it was allowed.

Sendforsign writes every agent action that changes something to a log on the contract, chained by hashes so that it cannot be edited quietly afterwards. You read it in the contract timeline, through the API or the MCP server, next to sent, seen and signed.

## 6. One customer, one scope

If you run a platform, your agent often works for one of your customers at a time. Its connection should see only that customer's contracts. A connection limited to one tenant cannot list or touch anything else, whatever the model is told.

## Putting it together

None of this needs a new kind of product. It needs an e-signature API that was built with agents in mind: a remote MCP server, a sign-in instead of a shared key, modes, confirmations, a domain allowlist, field roles and an audit log.

That is what we built. You can connect it to Claude, ChatGPT or Cursor with one URL, [https://api.sendforsign.com/mcp](https://sendforsign.com/mcp), and the [MCP quickstart](https://about.sendforsign.com/ai-agents/mcp-quickstart) walks through the first contract.
