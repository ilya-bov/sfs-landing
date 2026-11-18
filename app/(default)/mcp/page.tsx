import SeoPage, { seoMetadata, type SeoPageContent } from "@/components/seo-page";

const DOCS = "https://about.sendforsign.com";

// Tool list mirrors sendforsign-api src/mcp/tools.js (17 tools). Update both together.
const content: SeoPageContent = {
  path: "/mcp",
  eyebrow: "MCP server",
  title: "E-signature MCP server for AI agents",
  lead: "A remote MCP server that lets Claude, ChatGPT, Cursor and your own agents draft contracts, fill fields, add signers and send them for e-signature, with modes, send confirmations and an audit log of every agent action.",
  features: [
    {
      title: "Remote, one URL",
      text: "Streamable HTTP at https://api.sendforsign.com/mcp. Nothing to install or host: paste the URL into your AI app and sign in.",
    },
    {
      title: "Sign in with OAuth",
      text: "OAuth 2.1 with dynamic client registration and PKCE. On the consent screen you pick the account, a tenant and the agent mode. Agents on your own servers can use an API key in headers instead.",
    },
    {
      title: "Drafts by default",
      text: "New connections can draft but not send. Read-only, draft and send modes, an explicit confirm on every send and archive, and an allowlist of recipient domains.",
    },
    {
      title: "Fields with roles",
      text: "The agent fills the fields it owns and leaves the rest to the right person: any recipient or a specific one. Recipients can change only their own fields, and only until they sign.",
    },
    {
      title: "Tenants for your customers",
      text: "One connection can be limited to one tenant, so an agent working for a customer of your platform sees only that customer's contracts.",
    },
    {
      title: "Audit log of agent actions",
      text: "Every tool call that changes something is written to a tamper-evident log on the contract: which agent, on whose behalf, what it did and whether it was allowed.",
    },
  ],
  code: {
    caption: "Connect from Claude Code in one command",
    language: "bash",
    source: `claude mcp add --transport http sendforsign https://api.sendforsign.com/mcp
# then run /mcp in Claude Code and sign in to Sendforsign

# Claude, ChatGPT: Settings → Connectors → Add custom connector
# Cursor, VS Code: add a remote server with the same URL`,
  },
  steps: [
    {
      title: "Add the server",
      text: "Paste https://api.sendforsign.com/mcp into Claude, ChatGPT, Cursor, VS Code or any MCP client that supports remote servers.",
    },
    {
      title: "Sign in and choose what the agent may do",
      text: "Pick the account, optionally one tenant, and a mode: read only, drafts, or send with confirmation.",
    },
    {
      title: "Ask in plain language",
      text: "“Create an NDA from my Mutual NDA template for Acme, fill in our side, add jane@acme.com as signer and show me before sending.”",
    },
    {
      title: "Track and download",
      text: "Ask who has not signed yet, send reminders, read the timeline or download the signed PDF with its certificate.",
    },
  ],
  faq: [
    {
      q: "Which tools does the Sendforsign MCP server expose?",
      a: "17 tools: get_connection_info, list_templates, get_template, list_contracts, get_contract, create_contract, update_contract, list_placeholders, fill_placeholders, add_recipients, list_recipients, send_for_signature, get_contract_timeline, download_contract_pdf, archive_contract, list_users and create_user. Each carries read-only or destructive hints for the client.",
    },
    {
      q: "Which AI apps can connect?",
      a: "Any MCP client that supports remote servers over Streamable HTTP: Claude (web, desktop and Claude Code), ChatGPT connectors, Cursor, VS Code, the OpenAI Agents SDK and others.",
    },
    {
      q: "Can the agent send a contract on its own?",
      a: "Only in send mode, which you choose explicitly, and every send still needs a confirmation in the tool call. You can also restrict recipients to your own domains.",
    },
    {
      q: "Does the agent see all my contracts?",
      a: "It sees what the connection allows: the whole account, or only one tenant if you picked one when signing in. Disconnecting the app revokes its access.",
    },
    {
      q: "Is there an API key option for server-side agents?",
      a: "Yes. Send X-Sendforsign-Key with your API key, and set the mode and allowed domains with headers. The tools and guardrails are the same.",
    },
    {
      q: "How much does it cost?",
      a: "The MCP server is part of the platform: a monthly platform fee plus the contracts you send. Drafts and reads are not billed, and the sandbox is free.",
    },
  ],
  docsLinks: [
    { label: "MCP quickstart", href: `${DOCS}/ai-agents/mcp-quickstart` },
    { label: "MCP tools", href: `${DOCS}/ai-agents/tools` },
    { label: "Modes and headers", href: `${DOCS}/ai-agents/headers` },
    { label: "Agent accountability", href: `${DOCS}/ai-agents/accountability` },
    { label: "Prompt library", href: `${DOCS}/ai-agents/prompts` },
  ],
};

export const metadata = seoMetadata(
  content.path,
  "E-signature MCP server for AI agents",
  "Remote MCP server for contracts and e-signature: Claude, ChatGPT and Cursor draft from your templates, fill fields and send for signing, with an audit log.",
);

export default function Page() {
  return <SeoPage content={content} />;
}
