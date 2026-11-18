import SeoPage, { seoMetadata, type SeoPageContent } from "@/components/seo-page";

const DOCS = "https://sendforsign.com/docs";

// URL kept for SEO. This page used to pitch AI+API (aiapi.sendforsign.com),
// which is deprecated in favour of the MCP server and the agent skill.
const content: SeoPageContent = {
  path: "/ai-contract-generation",
  eyebrow: "AI contract generation",
  title: "Generate contracts with your AI agent",
  lead: "Connect Claude, ChatGPT, Cursor or your own agent to Sendforsign with one link and a sign-in. The agent drafts contracts from your templates, fills its fields, adds signers and sends them for signature, with your approval.",
  features: [
    {
      title: "From your own templates",
      text: "The agent lists your templates, reads their fields and creates a contract from the right one. Your wording stays yours.",
    },
    {
      title: "From any text",
      text: "Turn a proposal, an email thread or a Markdown draft into a contract, then add signers and fields.",
    },
    {
      title: "Fields with roles",
      text: "The agent fills the fields assigned to it; the counterparty fills theirs on the signing page.",
    },
    {
      title: "Send only when you say so",
      text: "Agents run in read-only, draft or send mode, and sending needs an explicit confirmation.",
    },
    {
      title: "Signing links and PDFs",
      text: "Get signing links to show in your own product, follow the timeline and download the signed PDF.",
    },
    {
      title: "Agent skill",
      text: "A ready-made skill for Claude Code and other agents with recipes for drafting, filling and sending contracts.",
    },
  ],
  code: {
    caption: "Connect Claude Code in one command, then sign in",
    language: "bash",
    source: `claude mcp add --transport http sendforsign https://api.sendforsign.com/mcp
# inside Claude Code, run /mcp and sign in to Sendforsign

# then ask:
# "Create an NDA from my 'Mutual NDA' template for Acme Ltd,
#  add jane@acme.com as signer and show me before sending."`,
  },
  steps: [
    {
      title: "Copy one link",
      text: "Paste https://api.sendforsign.com/mcp into Claude, ChatGPT, Cursor, VS Code, Claude Code or any MCP client.",
    },
    {
      title: "Sign in and pick a mode",
      text: "Sign in to Sendforsign, choose the account and tenant, and whether the agent drafts only (the default) or can send.",
    },
    {
      title: "Ask in plain language",
      text: "Ask the agent to draft, fill and prepare a contract. It shows you the result before anything is sent.",
    },
    {
      title: "Sign and track",
      text: "Recipients sign by email or through a link in your product; you get webhooks and the signed PDF.",
    },
  ],
  faq: [
    {
      q: "Which AI tools can generate contracts with Sendforsign?",
      a: "Any client that supports remote MCP servers: Claude, ChatGPT, Claude Code, Cursor, VS Code, the OpenAI Agents SDK and others. Your own backend can do the same through the REST API.",
    },
    {
      q: "Will the agent send contracts without asking?",
      a: "Not unless you allow it. You choose the mode (read only, draft or send), sending requires an explicit confirmation, and you can limit recipients to allowed email domains.",
    },
    {
      q: "Do I need an API key?",
      a: "Yes. Connect with https://api.sendforsign.com/mcp and sign in; no API key needed. Agents that run on your own servers can use an API key instead.",
    },
    {
      q: "What happened to AI+API?",
      a: "The AI+API endpoint is deprecated. The MCP server and the agent skill replace it and give the agent direct access to templates, fields, recipients and signing.",
    },
  ],
  docsLinks: [
    { label: "AI agents overview", href: `${DOCS}/ai-agents/overview` },
    { label: "MCP quickstart", href: `${DOCS}/ai-agents/mcp-quickstart` },
    { label: "Agent skill", href: `${DOCS}/ai-agents/skills` },
    { label: "Recipes", href: `${DOCS}/ai-agents/recipes` },
  ],
};

export const metadata = seoMetadata(
  content.path,
  "Generate contracts with your AI agent",
  "Let Claude, ChatGPT, Cursor or your own AI agent draft contracts from your templates, fill fields, add signers and send them for e-signature through the Sendforsign MCP server.",
);

export default function Page() {
  return <SeoPage content={content} />;
}
