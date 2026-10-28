import SeoPage, { seoMetadata, type SeoPageContent } from "@/components/seo-page";

const DOCS = "https://about.sendforsign.com";

const content: SeoPageContent = {
  path: "/esignature-api",
  eyebrow: "eSignature API",
  title: "eSignature API for developers",
  lead: "Create contracts from text, templates or PDFs, send them for signing and approval, and track every step with webhooks. One REST API with a single API key header.",
  features: [
    {
      title: "Contracts from text, templates or PDF",
      text: "Create a contract from HTML text, from a reusable template, or by uploading a PDF. Fill in placeholders in the same request, or create and send in one call.",
    },
    {
      title: "Signing, approvals and viewing",
      text: "Add recipients and choose what each one does: sign, approve, view or lock. Sendforsign emails them a personal link or you share the link yourself.",
    },
    {
      title: "Placeholders and dynamic tables",
      text: "Mark the fields of a contract as placeholders, decide who fills each one in, turn a placeholder into a dynamic table, or place fields on the pages of a PDF.",
    },
    {
      title: "Webhooks for every step",
      text: "Get notified when a contract is created, sent, seen, approved, signed by a recipient and fully signed by everyone.",
    },
    {
      title: "Multi-tenant by design",
      text: "Map each customer of your platform to a Sendforsign client and each of their employees to a client user. Data and webhooks are separated per client.",
    },
    {
      title: "Audit trail and documents",
      text: "Read the timeline of a contract, and download the result as PDF or as a Word file for text contracts.",
    },
  ],
  code: {
    caption: "Create a contract in one request",
    language: "bash",
    source: `curl -X POST 'https://api.sendforsign.com/api/contract' \\
     -H 'X-Sendforsign-Key: YOUR_API_KEY' \\
     -H 'Content-Type: application/json' \\
     -d '{
    "data": {
        "action": "create",
        "clientKey": "YOUR_CLIENT_KEY",
        "contract": {
            "name": "Sales contract",
            "value": "<p>Contract text</p>"
        }
    }
}'`,
  },
  steps: [
    {
      title: "Get your API key",
      text: "Sign up, open the API Keys tab of your dashboard and copy the key. Every request carries it in the X-Sendforsign-Key header.",
    },
    {
      title: "Create a client for each of your customers",
      text: "A client groups the contracts, templates and webhooks of one business on your platform.",
    },
    {
      title: "Create a contract and add recipients",
      text: "Create the contract from text, a template or a PDF, then add the people who sign, approve or view it.",
    },
    {
      title: "Send it and listen for webhooks",
      text: "Send the contract to recipients and react to the seen, approved and signed events in your backend.",
    },
  ],
  faq: [
    {
      q: "How do I authenticate requests to the Sendforsign API?",
      a: "Add the X-Sendforsign-Key header with your API key to every request. All requests go over HTTPS to https://api.sendforsign.com/api.",
    },
    {
      q: "Can I create contracts from my own templates?",
      a: "Yes. Create a template with placeholders once, then create contracts from it and fill in the placeholder values in the same request.",
    },
    {
      q: "Does the API support PDF documents?",
      a: "Yes. Upload a PDF as a contract, place text fields and recipient fields such as signature, name, email and date signed on its pages, and download the signed PDF.",
    },
    {
      q: "Which events can I receive with webhooks?",
      a: "contract.created, contract.sent, contract.seen, contract.approved, contract.signed and contract.fully_signed.",
    },
    {
      q: "Are signatures made with Sendforsign legally valid?",
      a: "Sendforsign provides Simple Electronic Signatures (SES), suitable for everyday agreements, with an audit trail of every action on the document.",
    },
  ],
  docsLinks: [
    { label: "API introduction", href: `${DOCS}/api-reference/introapi` },
    { label: "Send your first document", href: `${DOCS}/usecase/firstdoc` },
    { label: "Create contract", href: `${DOCS}/api-reference/contract/create` },
    { label: "Webhooks", href: `${DOCS}/api-reference/webhook/concept` },
  ],
};

export const metadata = seoMetadata(
  content.path,
  "eSignature API for developers",
  "REST eSignature API: create contracts from text, templates or PDFs, send them for signing and approval, fill placeholders and track every step with webhooks.",
);

export default function Page() {
  return <SeoPage content={content} />;
}
