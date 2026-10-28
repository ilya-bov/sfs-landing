import SeoPage, { seoMetadata, type SeoPageContent } from "@/components/seo-page";

const DOCS = "https://about.sendforsign.com";

const content: SeoPageContent = {
  path: "/ai-contract-generation",
  eyebrow: "AI contract generation",
  title: "Generate contracts with AI, ready to sign",
  lead: "Describe the agreement in plain language and get a contract back, from scratch or from your own template, with recipients and placeholder data filled in. One request, ready for signing.",
  features: [
    {
      title: "Contracts in free format",
      text: "Ask for a contract using your own context and best practices. Optionally name the recipients and their email addresses.",
    },
    {
      title: "From your templates",
      text: "Generate a contract from a template by name, and fill in its placeholders with the data you pass in the same message.",
    },
    {
      title: "Explore your library",
      text: "Ask for the list of your templates or the placeholders of a template, without building separate API calls.",
    },
    {
      title: "Preview and contract key",
      text: "When a contract is created, you get its contract key for the rest of the API and a preview link to check the result.",
    },
    {
      title: "AI Assistant in your app",
      text: "Embed the AI Assistant component so your users can draft templates, fix errors and get complex terms explained.",
    },
    {
      title: "Automations",
      text: "Connect contract generation and signing to your workflows with webhooks, n8n and Make.",
    },
  ],
  code: {
    caption: "One request, plain language",
    language: "bash",
    source: `curl -X POST 'https://aiapi.sendforsign.com/webhook/aiapi' \\
     -H 'X-Sendforsign-Key: YOUR_API_KEY' \\
     -H 'clientKey: YOUR_CLIENT_KEY' \\
     -H 'secretKey: YOUR_SECRET_KEY' \\
     -H 'Content-Type: application/json' \\
     -d '{
    "message": "Create an NDA between Acme Inc. and John Doe (john@example.com) from my NDA template"
}'`,
  },
  faq: [
    {
      q: "What can I ask the AI API to do?",
      a: "Create a contract in free format, create one from a template, create and fill one in from a template with recipients and data, list your templates, and list the placeholders of a template.",
    },
    {
      q: "What do I get back?",
      a: "A text answer and, when a contract is created, its contract key and a preview URL that is valid for 30 minutes.",
    },
    {
      q: "Is AI contract generation available now?",
      a: "Yes, the AI API is available now in open beta.",
    },
    {
      q: "Can my users use AI inside my product?",
      a: "Yes. The AiAssistant React component brings the assistant into your app, next to the contract and template editors.",
    },
  ],
  docsLinks: [
    { label: "AI+API reference", href: `${DOCS}/api-reference/mcp/aiapi` },
    { label: "AI Assistant component", href: `${DOCS}/sdk/components/aiassistant` },
    { label: "Draft a template", href: `${DOCS}/usecase/firsttemplate` },
    { label: "API introduction", href: `${DOCS}/api-reference/introapi` },
  ],
};

export const metadata = seoMetadata(
  content.path,
  "AI contract generation API",
  "Generate contracts with AI from plain language, from scratch or your own templates, fill in recipients and data, and send them for e-signature with one request.",
);

export default function Page() {
  return <SeoPage content={content} />;
}
