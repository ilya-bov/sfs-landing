import SeoPage, { seoMetadata, type SeoPageContent } from "@/components/seo-page";
import { CHECKED, SFS, SFS_SOURCES } from "@/components/compare";

const content: SeoPageContent = {
  path: "/compare/boldsign",
  eyebrow: "Sendforsign vs BoldSign",
  title: "Sendforsign vs BoldSign",
  lead: "Both offer an e-signature API and a hosted MCP server. The difference is in who they are built for: Sendforsign for products that embed contracts for many customers and let agents act inside guardrails the server enforces.",
  features: [
    { title: "Remote MCP with sign-in", text: "One URL for Claude, ChatGPT and Cursor. People sign in with OAuth and pick what the agent may do; server-side agents use an API key." },
    { title: "Guardrails the server enforces", text: "Read-only, draft or send mode per connection, a confirmation on every send, a recipient domain allowlist and a log of every agent action." },
    { title: "Built for platforms", text: "A client per customer of your platform and a user per tenant. An agent connection can be limited to one tenant." },
    { title: "Fields with owners", text: "You fill your fields, each recipient fills theirs. Recipients cannot change the text or anyone else's fields, and nothing changes after signing." },
    { title: "Signing under your brand", text: "Your logo on emails and the signing page, Sendforsign branding turned off, signing links on your own domain." },
    { title: "Free sandbox", text: "The whole create, send and sign flow before you ship. Then from $29 a month, no seats." },
  ],
  comparison: {
    caption: "Sendforsign and BoldSign side by side",
    columns: ["Sendforsign", "BoldSign"],
    rows: [
      { label: "Embedded signing", values: [SFS.embedded, "Embedded links on app.boldsign.com that run in an iframe, popup or new tab; link validity up to 180 days."] },
      { label: "Plan with embedded signing", values: [SFS.price, "Enterprise API: $30 a month with 40 envelopes, then $0.75 each. Free sandbox with watermark and 14-day retention."] },
      { label: "Branding", values: [SFS.branding, "Logo and colours on all plans; hiding 'Powered by BoldSign' from Growth; custom email domain from Business. A custom domain for the signing page is not documented."] },
      { label: "MCP server for AI agents", values: [SFS.mcp, "Hosted in four regions (US, EU, CA, AU) with OAuth or an API key, plus an open-source local package."] },
      { label: "Agent guardrails", values: [SFS.guardrails, "The docs recommend human confirmation before sending, revoking or reminding; the server does not enforce a read-only mode or a confirmation."] },
      { label: "Signature levels", values: [SFS.levels, "SES, plus QES as a paid add-on through Evrotrust. No AES tier."] },
    ],
    note: `BoldSign is the stronger choice if you want a low public entry price, regional data residency, SDKs in many languages or qualified signatures. BoldSign details were checked on its own pages on ${CHECKED}; plans and prices change, so check them before you decide.`,
    sources: [
      { label: "BoldSign API pricing", href: "https://boldsign.com/esignature-api-pricing/" },
      { label: "BoldSign embedded requests", href: "https://developers.boldsign.com/embedded-request/create-embedded-request-link?region=us" },
      { label: "BoldSign white-labeling", href: "https://support.boldsign.com/kb/article/21609/rebranding-or-whitelabeling-via-boldsign-api" },
      { label: "BoldSign MCP server", href: "https://developers.boldsign.com/boldsign-mcp-server/overview/" },
      { label: "BoldSign QES", href: "https://boldsign.com/qes-overview/" },
      ...SFS_SOURCES,
    ],
  },
  faq: [
    { q: "What is the main difference between Sendforsign and BoldSign?", a: "Sendforsign is built for products that embed contracts for many customers and let AI agents act on them: a remote MCP server with sign-in, per-tenant connections and guardrails the server enforces, plus fields that each belong to one party." },
    { q: "When is BoldSign the better choice?", a: "When a transparent low entry price, regional data residency or qualified signatures matter more than per-tenant agent connections and server-enforced agent modes." },
    { q: "Do you support advanced or qualified electronic signatures?", a: "No. Sendforsign provides simple electronic signatures under eIDAS and the ESIGN Act and UETA, with an audit trail and a signature certificate." },
    { q: "How is Sendforsign priced?", a: "Free for 5 contracts a month; Pro $29 a month with 50 contracts, then $0.50 each; Platform $199 a month with 300 contracts and white-label, then $0.40 each. Drafts are free, no seats or per-agent fees." },
  ],
  docsLinks: [
    { label: "MCP quickstart", href: "https://sendforsign.com/docs/ai-agents/mcp-quickstart" },
    { label: "API introduction", href: "https://sendforsign.com/docs/api-reference/introapi" },
    { label: "Embed contracts for your platform", href: "https://sendforsign.com/docs/usecase/embeddocforplatform" },
  ],
};

export const metadata = seoMetadata(content.path, "Sendforsign vs BoldSign: API and MCP compared", "Sendforsign and BoldSign compared for embedded e-signature and AI agents: MCP servers, guardrails, branding, platforms, pricing and signature levels.");

export default function Page() {
  return <SeoPage content={content} />;
}
