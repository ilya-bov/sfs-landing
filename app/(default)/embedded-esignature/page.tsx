import SeoPage, { seoMetadata, type SeoPageContent } from "@/components/seo-page";

const DOCS = "https://about.sendforsign.com";

const content: SeoPageContent = {
  path: "/embedded-esignature",
  eyebrow: "Embedded e-signing",
  title: "Embed e-signing into your product",
  lead: "Ready-made React components for contract editing, templates, signing and an AI assistant. Your users create and sign agreements without leaving your app, under your brand.",
  features: [
    {
      title: "Contract Editor",
      text: "Create and open contracts, send them for signing, sign, approve and view the audit trail, all in one component.",
    },
    {
      title: "Contract and Template Lists",
      text: "Show a client's contracts and templates inside your app and open them in the editors with one click.",
    },
    {
      title: "Template Editor",
      text: "Let your users build reusable contract templates with placeholders right inside your product.",
    },
    {
      title: "AI Assistant",
      text: "Help users draft templates, fix errors in documents and explain complex terms with the built-in AI assistant.",
    },
    {
      title: "Your brand, your domain",
      text: "Customize the emails Sendforsign sends, use your own email domain, and serve signing links from your own domain, such as document.yourdomain.com.",
    },
    {
      title: "Works on every screen",
      text: "Optimized for desktop, tablet and mobile, and supported in the latest versions of Chrome, Firefox, Safari, Edge and Opera.",
    },
  ],
  code: {
    caption: "Add the contract editor to your React app",
    language: "tsx",
    source: `npm i sendforsign

// App.tsx
import { ContractEditor } from 'sendforsign';

<ContractEditor
  token='YourClientToken'
  documentPreview={true}
/>`,
  },
  steps: [
    {
      title: "Map your customers to Sendforsign clients",
      text: "Create a client for each business on your platform and a client user for each of its employees through the API.",
    },
    {
      title: "Install the components",
      text: "Install the sendforsign package from npm and render the editor, lists or assistant where your users need them.",
    },
    {
      title: "Pass the keys of the signed-in user",
      text: "When a user logs in to your app, look up their client and user keys and initialize the components with them.",
    },
    {
      title: "Brand the signing experience",
      text: "Set up custom branding and a custom domain so recipients see your product, not ours.",
    },
  ],
  faq: [
    {
      q: "How is this different from an iframe-based signing widget?",
      a: "Sendforsign components are React components rendered in your own app, and the API behind them is open to you, so you control the user experience around them instead of handing users over to a third-party window.",
    },
    {
      q: "Which components are available?",
      a: "ContractEditor, ContractList, TemplateEditor, TemplateList and AiAssistant, installed from the sendforsign npm package.",
    },
    {
      q: "Can recipients sign on our own domain?",
      a: "Yes. Point a subdomain such as document.yourdomain.com to Sendforsign with a CNAME record, and all signing links use it.",
    },
    {
      q: "Do the components work on mobile?",
      a: "Yes. They are optimized for desktop, tablet and mobile and support the latest versions of the major browsers.",
    },
  ],
  docsLinks: [
    { label: "React components introduction", href: `${DOCS}/sdk/introsdk` },
    { label: "Embed documents to your app", href: `${DOCS}/usecase/embeddocforplatform` },
    { label: "Contract Editor", href: `${DOCS}/sdk/components/contracteditor` },
    { label: "Custom domain for signing links", href: `${DOCS}/usecase/recipientdomain` },
  ],
};

export const metadata = seoMetadata(
  content.path,
  "Embedded e-signing with React components",
  "Embed contract editing, templates and e-signing into your SaaS with Sendforsign React components. Custom branding and your own domain for signing links.",
);

export default function Page() {
  return <SeoPage content={content} />;
}
