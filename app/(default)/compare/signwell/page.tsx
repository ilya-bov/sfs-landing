import SeoPage, { seoMetadata, type SeoPageContent } from "@/components/seo-page";
import { CHECKED, SFS, SFS_SOURCES } from "@/components/compare";

const content: SeoPageContent = {
  path: "/compare/signwell",
  eyebrow: "Sendforsign vs SignWell",
  title: "Sendforsign vs SignWell",
  lead: "SignWell has simple pay-per-document pricing and a local MCP package. Sendforsign offers a remote MCP server people sign in to, with per-tenant connections and guardrails the server enforces, for products that embed contracts for their customers.",
  features: [
    { title: "Remote MCP with sign-in", text: "One URL for Claude, ChatGPT and Cursor. People sign in with OAuth and pick what the agent may do; server-side agents use an API key." },
    { title: "Guardrails the server enforces", text: "Read-only, draft or send mode per connection, a confirmation on every send, a recipient domain allowlist and a log of every agent action." },
    { title: "Built for platforms", text: "A client per customer of your platform and a user per tenant. An agent connection can be limited to one tenant." },
    { title: "Fields with owners", text: "You fill your fields, each recipient fills theirs. Recipients cannot change the text or anyone else's fields, and nothing changes after signing." },
    { title: "Signing under your brand", text: "Your logo on emails and the signing page, Sendforsign branding turned off, signing links on your own domain." },
    { title: "Free sandbox", text: "The whole create, send and sign flow before you ship. Then a platform fee plus contracts sent, no seats." },
  ],
  comparison: {
    caption: "Sendforsign and SignWell side by side",
    columns: ["Sendforsign", "SignWell"],
    rows: [
      { label: "Embedded signing", values: [SFS.embedded, "An iframe through the SignWell JavaScript library, or a redirect to the signing URL."] },
      { label: "Plan with embedded signing", values: [SFS.price, "Usage-based: the first 25 API documents a month free with a card on file, then from $0.85 down to $0.20 per document. Unlimited test mode."] },
      { label: "Branding", values: [SFS.branding, "Own logo, colours and custom URLs per API app; which plan includes full white-label and email de-branding is not stated on the API pages."] },
      { label: "MCP server for AI agents", values: [SFS.mcp, "A local package (npx @signwell/mcp) that runs on your machine with an API key; no hosted URL or OAuth sign-in."] },
      { label: "Agent guardrails", values: [SFS.guardrails, "Every document starts as a draft and nothing is emailed until the user confirms."] },
      { label: "Signature levels", values: [SFS.levels, "Simple electronic signatures (ESIGN/UETA, eIDAS SES). No QES."] },
    ],
    note: `SignWell is the stronger choice if you want the lowest-friction pay-per-document pricing with a free monthly allowance and a simple API. SignWell details were checked on its own pages on ${CHECKED}; plans and prices change, so check them before you decide.`,
    sources: [
      { label: "SignWell API pricing", href: "https://www.signwell.com/api-pricing/" },
      { label: "SignWell embedded iframe", href: "https://developers.signwell.com/reference/embedded-iframe" },
      { label: "SignWell embedded signatures", href: "https://www.signwell.com/embedded-signatures/" },
      { label: "SignWell MCP", href: "https://www.signwell.com/mcp" },
      ...SFS_SOURCES,
    ],
  },
  faq: [
    { q: "What is the main difference between Sendforsign and SignWell?", a: "Sendforsign is built for products that embed contracts for many customers and let AI agents act on them: a remote MCP server with sign-in, per-tenant connections and guardrails the server enforces, plus fields that each belong to one party." },
    { q: "When is SignWell the better choice?", a: "When pay-per-document pricing with free monthly documents matters most and a local MCP package with an API key is enough for your agents." },
    { q: "Do you support advanced or qualified electronic signatures?", a: "No. Sendforsign provides simple electronic signatures under eIDAS and the ESIGN Act and UETA, with an audit trail and a signature certificate." },
    { q: "How is Sendforsign priced?", a: "A monthly platform fee plus the contracts you send for signature, with no seats and no per-agent fees. Drafts and reads are not billed, and the sandbox is free." },
  ],
  docsLinks: [
    { label: "MCP quickstart", href: "https://sendforsign.com/docs/ai-agents/mcp-quickstart" },
    { label: "API introduction", href: "https://sendforsign.com/docs/api-reference/introapi" },
    { label: "Embed contracts for your platform", href: "https://sendforsign.com/docs/usecase/embeddocforplatform" },
  ],
};

export const metadata = seoMetadata(content.path, "Sendforsign vs SignWell: API and MCP compared", "Sendforsign and SignWell compared for embedded e-signature and AI agents: remote vs local MCP, guardrails, branding, platforms and pricing.");

export default function Page() {
  return <SeoPage content={content} />;
}
