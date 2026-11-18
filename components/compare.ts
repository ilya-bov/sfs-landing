// Sendforsign's side of every comparison table, in one place so the pages agree.
// Competitor cells live on each page and must cite a vendor source. Re-check them
// when a page is touched; plans and prices change. Last checked 2026-11-18.

export const CHECKED = "18 November 2026";

export const SFS = {
  mcp: "Remote server at api.sendforsign.com/mcp. Sign in with OAuth, or an API key for server-side agents. 33 tools: templates (including from a PDF), drafts with fields marked in the text, PDF upload and field placement, recipients, send, timeline, usage, webhooks, tenants.",
  guardrails: "Enforced by the server: read-only, draft or send mode per connection; every send and archive needs confirm: true; recipient domain allowlist; tenant-limited connections; hash-chained log of agent actions.",
  embedded: "Signing link per recipient for your own UI, or the RecipientView React component inside your app.",
  branding: "Your logo on emails and the signing page, Sendforsign branding can be turned off, signing links on your own domain via CNAME.",
  platforms: "A client per customer of your platform and a user per tenant; API keys, webhooks and agent connections can be scoped to one tenant.",
  fields: "Each field has an owner: you, any recipient or a specific recipient. Recipients can change only their own fields, and only until they sign.",
  price: "Free: 5 contracts a month. Pro: $29 a month with 50 contracts. Platform with white-label and tenants: $199 a month with 300 contracts, then $0.40 each. No seats or per-agent fees.",
  levels: "Simple electronic signatures (eIDAS SES, ESIGN/UETA) with audit trail and signature certificate. No AES or QES.",
};

export const SFS_SOURCES = [
  { label: "Sendforsign MCP tools", href: "https://sendforsign.com/docs/ai-agents/tools" },
  { label: "Sendforsign modes and headers", href: "https://sendforsign.com/docs/ai-agents/headers" },
  { label: "Sendforsign custom signing domain", href: "https://sendforsign.com/docs/usecase/recipientdomain" },
];
