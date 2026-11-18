import SeoPage, { seoMetadata, type SeoPageContent } from "@/components/seo-page";
import { CHECKED, SFS, SFS_SOURCES } from "@/components/compare";

const content: SeoPageContent = {
  path: "/docusign-alternative",
  eyebrow: "DocuSign alternative",
  title: "A DocuSign alternative for embedded e-signature",
  lead: "For products that put contracts inside their own app: signing under your brand, fields that know who fills them, and an MCP server your AI agents can use safely. API-first, without enterprise sales to unlock embedding.",
  features: [
    { title: "Signing inside your product", text: "Show each recipient's signing link in your UI or render it with the RecipientView React component. Recipients stay in your product." },
    { title: "Your brand, your domain", text: "Your logo on emails and the signing page, Sendforsign branding turned off, and signing links on your own subdomain." },
    { title: "Built for platforms", text: "A client per customer of your platform and a user per tenant, with webhooks and agent connections scoped to them." },
    { title: "Fields with owners", text: "You fill your fields, each recipient fills theirs. Recipients cannot change the text or anyone else's fields, and nothing changes after signing." },
    { title: "Agents with guardrails", text: "A remote MCP server with drafts by default, a confirmation on every send, a domain allowlist and a log of every agent action." },
    { title: "Start without a sales call", text: "Free sandbox with the full create, send and sign flow. Pricing is a platform fee plus contracts sent." },
  ],
  quote: {
    text: "DocuSign's embedding capabilities are absolutely suboptimal. The best they offer is an iframe that opens inside your app, but as a platform, we have no control over what happens inside of it. With Sendforsign, I have full control over the user UX/UI; people won't even realize they are signing contracts using a different software. The API-first integration their team built is so seamless.",
    name: "Alex",
    role: "CEO at Maroo, who went from kickoff to release in four weeks",
  },
  comparison: {
    caption: "Sendforsign and DocuSign for embedded signing",
    columns: ["Sendforsign", "DocuSign eSignature API"],
    rows: [
      { label: "Embedded signing", values: [SFS.embedded, "A recipient-view URL per signer, valid 5 minutes and usable once: redirect, iframe, or the Docusign JS focused view."] },
      { label: "Plan with embedded signing", values: [SFS.price, "Listed only on the Enhanced developer plan (contact sales). Starter is $50 a month for 40 envelopes, without embedded signing."] },
      { label: "Branding", values: [SFS.branding, "Custom signing brands from the Intermediate plan ($300 a month). Removing the Docusign mark is not offered as a listed feature."] },
      { label: "MCP server for AI agents", values: [SFS.mcp, "Official remote server with OAuth and 44 tools, including CLM and workflow tools; some need an IAM subscription."] },
      { label: "Agent guardrails", values: [SFS.guardrails, "The docs ask custom agents to add their own approval step before sending; admins can turn MCP access off per account."] },
      { label: "Signature levels", values: [SFS.levels, "SES, AES and QES, with ID verification for the higher levels."] },
    ],
    note: `DocuSign is the stronger choice when you need advanced or qualified signatures, ID verification, CLM or the broad enterprise feature set. Competitor details were checked on DocuSign's own pages on ${CHECKED}; plans and prices change, so check them before you decide.`,
    sources: [
      { label: "DocuSign developer pricing", href: "https://ecom.docusign.com/plans-and-pricing/developer" },
      { label: "DocuSign embedded signing", href: "https://docusign.docs.buildwithfern.com/docs/esign-rest-api/esign101/concepts/embedding/embedded-signing.md" },
      { label: "DocuSign MCP server", href: "https://developers.docusign.com/platform/mcp-server/" },
      { label: "DocuSign MCP tools", href: "https://developers.docusign.com/platform/mcp-server/mcp-tools.md" },
      { label: "DocuSign digital signatures", href: "https://www.docusign.com/en-gb/products/electronic-signature/digital-signature" },
      ...SFS_SOURCES,
    ],
  },
  steps: [
    { title: "Get an API key", text: "Sign up and copy the key from the API Keys tab. The sandbox covers the whole flow." },
    { title: "Map your customers", text: "Create a client for each business on your platform and a user for each of their people." },
    { title: "Embed signing", text: "Create contracts from your templates, add recipients and show the signing link in your product, or use the React components." },
    { title: "Listen for webhooks", text: "React to sent, seen, signed and fully signed events in your backend." },
  ],
  faq: [
    { q: "Why do platforms move from DocuSign to Sendforsign?", a: "Usually for control over the signing experience inside their own product, branding without an enterprise plan, and a model built around many customers of one platform." },
    { q: "Can recipients sign without leaving my app?", a: "Yes. Show the signing link in your UI or embed it with the RecipientView React component, under your brand and, if you want, on your own domain." },
    { q: "Do you support advanced or qualified electronic signatures?", a: "No. Sendforsign provides simple electronic signatures under eIDAS and the ESIGN Act and UETA, with an audit trail and a signature certificate. If you need AES or QES, DocuSign or a qualified trust provider is the better fit." },
    { q: "Can my AI agent send contracts?", a: "Yes, through the remote MCP server. New connections can only draft; sending needs send mode and a confirmation on every send." },
    { q: "How is it priced?", a: "A monthly platform fee plus the contracts you send for signature, with no seats and no per-agent fees. The sandbox is free." },
  ],
  docsLinks: [
    { label: "Embed contracts for your platform", href: "https://about.sendforsign.com/usecase/embeddocforplatform" },
    { label: "Send your first document", href: "https://about.sendforsign.com/usecase/firstdoc" },
    { label: "Custom domain for signing links", href: "https://about.sendforsign.com/usecase/recipientdomain" },
    { label: "MCP quickstart", href: "https://about.sendforsign.com/ai-agents/mcp-quickstart" },
  ],
};

export const metadata = seoMetadata(
  content.path,
  "DocuSign alternative for embedded e-signature",
  "Embed e-signature in your product under your brand, with field roles and an MCP server for AI agents. Sendforsign and DocuSign compared for platforms.",
);

export default function Page() {
  return <SeoPage content={content} />;
}
