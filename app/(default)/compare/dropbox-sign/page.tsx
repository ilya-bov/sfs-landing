import SeoPage, { seoMetadata, type SeoPageContent } from "@/components/seo-page";
import { CHECKED, SFS, SFS_SOURCES } from "@/components/compare";

const content: SeoPageContent = {
  path: "/compare/dropbox-sign",
  eyebrow: "Sendforsign vs Dropbox Sign",
  title: "Sendforsign vs Dropbox Sign",
  lead: "Dropbox Sign is a polished signing product with a long-standing API. Sendforsign is built for products that embed contracts for their own customers and want AI agents to draft and send them under rules the server enforces.",
  features: [
    { title: "Remote MCP with sign-in", text: "One URL for Claude, ChatGPT and Cursor. People sign in with OAuth and pick what the agent may do; server-side agents use an API key." },
    { title: "Guardrails the server enforces", text: "Read-only, draft or send mode per connection, a confirmation on every send, a recipient domain allowlist and a log of every agent action." },
    { title: "Built for platforms", text: "A client per customer of your platform and a user per tenant. An agent connection can be limited to one tenant." },
    { title: "Fields with owners", text: "You fill your fields, each recipient fills theirs. Recipients cannot change the text or anyone else's fields, and nothing changes after signing." },
    { title: "Signing under your brand", text: "Your logo on emails and the signing page, Sendforsign branding turned off, signing links on your own domain." },
    { title: "Free sandbox", text: "The whole create, send and sign flow before you ship. Then a platform fee plus contracts sent, no seats." },
  ],
  comparison: {
    caption: "Sendforsign and Dropbox Sign side by side",
    columns: ["Sendforsign", "Dropbox Sign"],
    rows: [
      { label: "Embedded signing", values: [SFS.embedded, "An iframe through the hellosign-embedded library, locked to the domain registered for your API app; production needs app approval."] },
      { label: "Plan with embedded signing", values: [SFS.price, "Standard API plan, $250 a month from 100 requests. Essentials ($75) covers non-embedded signing only; embedded templates need Premium."] },
      { label: "Branding", values: [SFS.branding, "Email customization from Standard; removing 'Powered by Dropbox Sign' from the embedded signer page on Premium (custom quote)."] },
      { label: "MCP server for AI agents", values: [SFS.mcp, "Through the Dropbox remote MCP server with a Dropbox account: send, status, reminders, cancel, search and download. No templates, signing order or advanced fields."] },
      { label: "Agent guardrails", values: [SFS.guardrails, "The user must review and confirm sending, reminders and cancellation."] },
      { label: "Signature levels", values: [SFS.levels, "Standard e-signatures, plus AES and QES through national eIDs and partner trust providers."] },
    ],
    note: `Dropbox Sign is the stronger choice for a well-known signing brand, Dropbox storage integration and advanced or qualified signatures through national eIDs. Dropbox Sign details were checked on its own pages on ${CHECKED}; plans and prices change, so check them before you decide.`,
    sources: [
      { label: "Dropbox Sign API pricing", href: "https://sign.dropbox.com/products/dropbox-sign-api/pricing" },
      { label: "Dropbox Sign API plans", href: "https://help.dropbox.com/plans/how-much-does-the-dropbox-sign-api-cost" },
      { label: "Dropbox Sign embedded signing", href: "https://developers.hellosign.com/docs/walkthroughs/embedded-signing.md" },
      { label: "Dropbox Sign API branding", href: "https://help.dropbox.com/integrations/add-branding-api-dropbox-sign" },
      { label: "Dropbox Sign MCP", href: "https://help.dropbox.com/integrations/dropbox-sign-mcp-remote-server" },
      { label: "Dropbox Sign and eID", href: "https://help.dropbox.com/plans/dropbox-sign-and-eid" },
      ...SFS_SOURCES,
    ],
  },
  faq: [
    { q: "What is the main difference between Sendforsign and Dropbox Sign?", a: "Sendforsign is built for products that embed contracts for many customers and let AI agents act on them: a remote MCP server with sign-in, per-tenant connections and guardrails the server enforces, plus fields that each belong to one party." },
    { q: "When is Dropbox Sign the better choice?", a: "When your users already live in Dropbox, when you need AES or QES through national eIDs, or when a familiar signing brand matters more than signing under your own." },
    { q: "Do you support advanced or qualified electronic signatures?", a: "No. Sendforsign provides simple electronic signatures under eIDAS and the ESIGN Act and UETA, with an audit trail and a signature certificate." },
    { q: "How is Sendforsign priced?", a: "A monthly platform fee plus the contracts you send for signature, with no seats and no per-agent fees. Drafts and reads are not billed, and the sandbox is free." },
  ],
  docsLinks: [
    { label: "MCP quickstart", href: "https://sendforsign.com/docs/ai-agents/mcp-quickstart" },
    { label: "API introduction", href: "https://sendforsign.com/docs/api-reference/introapi" },
    { label: "Embed contracts for your platform", href: "https://sendforsign.com/docs/usecase/embeddocforplatform" },
  ],
};

export const metadata = seoMetadata(content.path, "Sendforsign vs Dropbox Sign: embedded signing", "Sendforsign and Dropbox Sign (HelloSign) compared for embedded signing, white-label branding, AI agents and MCP, platforms and signature levels.");

export default function Page() {
  return <SeoPage content={content} />;
}
