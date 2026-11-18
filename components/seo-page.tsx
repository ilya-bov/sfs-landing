import Link from "next/link";
import type { Metadata } from "next";

// Shared layout for the product and comparison (SEO) pages. Server component: all copy
// is in the HTML for crawlers. `eyebrow` is the short page name used in breadcrumbs
// and link lists; it is not rendered above the H1.

export type SeoPageContent = {
  path: string;
  eyebrow: string;
  title: string;
  lead: string;
  features: { title: string; text: string }[];
  code?: { caption: string; language: string; source: string };
  steps?: { title: string; text: string }[];
  faq: { q: string; a: string }[];
  docsLinks: { label: string; href: string }[];
  // Customer quote; only real, attributed quotes.
  quote?: { text: string; name: string; role: string };
  // Comparison table; every cell must be sourced (see `sources`).
  comparison?: {
    caption: string;
    columns: [string, string];
    rows: { label: string; values: [string, string] }[];
    note?: string;
    sources?: { label: string; href: string }[];
  };
};

const SITE_URL = "https://sendforsign.com";

export const PRODUCT_PAGES = [
  { href: "/mcp", label: "MCP server" },
  { href: "/esignature-api", label: "eSignature API" },
  { href: "/embedded-esignature", label: "Embedded e-signing" },
  { href: "/ai-contract-generation", label: "AI contract generation" },
];

export const COMPARE_PAGES: { href: string; label: string }[] = [
  { href: "/docusign-alternative", label: "DocuSign alternative" },
  { href: "/compare/boldsign", label: "Sendforsign vs BoldSign" },
  { href: "/compare/dropbox-sign", label: "Sendforsign vs Dropbox Sign" },
  { href: "/compare/signwell", label: "Sendforsign vs SignWell" },
];

export function seoMetadata(
  path: string,
  title: string,
  description: string,
): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    // A page-level openGraph replaces the root one entirely, so repeat the shared fields
    openGraph: {
      type: "website",
      siteName: "Sendforsign",
      locale: "en_US",
      url: `${SITE_URL}${path}`,
      title,
      description,
      images: ["/opengraph-image"],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/twitter-image"],
    },
  };
}

export default function SeoPage({ content }: { content: SeoPageContent }) {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: content.faq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Sendforsign", item: SITE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: content.eyebrow,
        item: `${SITE_URL}${content.path}`,
      },
    ],
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[radial-gradient(ellipse_at_top,_#26262e_0%,_#0b0b0f_55%)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([faqJsonLd, breadcrumbJsonLd]),
        }}
      />

      {/* Hero */}
      <section className="mx-auto max-w-4xl px-6 pt-36 pb-16 text-center md:pt-44">
        <h1 className="text-4xl font-medium leading-tight tracking-tight text-neutral-100 md:text-6xl">
          {content.title}
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/70">
          {content.lead}
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="https://app.sendforsign.com"
            className="rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition hover:bg-white/90"
          >
            Get API key
          </Link>
          <Link
            href={content.docsLinks[0].href}
            className="rounded-full border border-white/15 px-6 py-3 text-sm font-medium text-white transition hover:bg-white/10"
          >
            Read the docs
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-6xl px-6 pb-16">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {content.features.map((f) => (
            <div
              key={f.title}
              className="rounded-2xl border border-white/10 bg-white/5 p-6"
            >
              <h2 className="text-lg font-semibold tracking-tight text-white">
                {f.title}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-white/70">
                {f.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Customer quote */}
      {content.quote && (
        <section className="mx-auto max-w-4xl px-6 pb-16">
          <figure className="rounded-2xl border border-white/10 bg-white/5 p-6 sm:p-8">
            <blockquote className="text-lg leading-relaxed text-white/90">
              “{content.quote.text}”
            </blockquote>
            <figcaption className="mt-4 text-sm text-white/60">
              {content.quote.name}, {content.quote.role}
            </figcaption>
          </figure>
        </section>
      )}
      {/* Comparison */}
      {content.comparison && (
        <section className="mx-auto max-w-5xl px-6 pb-16">
          <h2 className="mb-6 text-2xl font-semibold tracking-tight text-white">
            {content.comparison.caption}
          </h2>
          <div className="overflow-x-auto rounded-2xl border border-white/10">
            <table className="w-full min-w-[560px] text-left text-sm">
              <thead className="bg-white/5 text-white">
                <tr>
                  <th scope="col" className="p-4 font-medium"><span className="sr-only">Feature</span></th>
                  <th scope="col" className="p-4 font-medium">{content.comparison.columns[0]}</th>
                  <th scope="col" className="p-4 font-medium">{content.comparison.columns[1]}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {content.comparison.rows.map((r) => (
                  <tr key={r.label} className="align-top">
                    <th scope="row" className="p-4 font-medium text-white">{r.label}</th>
                    <td className="p-4 text-white/80">{r.values[0]}</td>
                    <td className="p-4 text-white/70">{r.values[1]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {content.comparison.note && (
            <p className="mt-4 text-sm leading-relaxed text-white/60">{content.comparison.note}</p>
          )}
          {content.comparison.sources && content.comparison.sources.length > 0 && (
            <p className="mt-2 text-xs leading-relaxed text-white/50">
              Sources:{" "}
              {content.comparison.sources.map((src, i) => (
                <span key={src.href}>
                  {i > 0 && ", "}
                  <a href={src.href} rel="nofollow noopener" target="_blank" className="underline hover:text-white/80">
                    {src.label}
                  </a>
                </span>
              ))}
            </p>
          )}
        </section>
      )}
      {/* Code example */}
      {content.code && (
        <section className="mx-auto max-w-4xl px-6 pb-16">
          <h2 className="mb-4 text-2xl font-semibold tracking-tight text-white">
            {content.code.caption}
          </h2>
          <pre className="overflow-x-auto rounded-2xl border border-white/10 bg-black/40 p-5 text-xs leading-relaxed text-white/80 sm:text-sm">
            <code data-language={content.code.language}>{content.code.source}</code>
          </pre>
        </section>
      )}

      {/* Steps */}
      {content.steps && (
        <section className="mx-auto max-w-4xl px-6 pb-16">
          <h2 className="mb-6 text-2xl font-semibold tracking-tight text-white">
            How it works
          </h2>
          <ol className="space-y-4">
            {content.steps.map((s, i) => (
              <li
                key={s.title}
                className="flex gap-4 rounded-2xl border border-white/10 bg-white/5 p-5"
              >
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white text-sm font-semibold text-black">
                  {i + 1}
                </span>
                <div>
                  <h3 className="font-semibold text-white">{s.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-white/70">
                    {s.text}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </section>
      )}

      {/* FAQ */}
      <section className="mx-auto max-w-4xl px-6 pb-16">
        <h2 className="mb-6 text-2xl font-semibold tracking-tight text-white">
          Frequently asked questions
        </h2>
        <div className="divide-y divide-white/10 rounded-2xl border border-white/10 bg-white/5">
          {content.faq.map((item) => (
            <details key={item.q} className="group p-5">
              <summary className="cursor-pointer list-none font-medium text-white">
                {item.q}
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-white/70">
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </section>

      {/* Docs + related pages */}
      <section className="mx-auto max-w-4xl px-6 pb-24">
        <div className="grid gap-8 sm:grid-cols-2">
          <div>
            <h2 className="text-sm font-medium uppercase tracking-wider text-white/50">
              Documentation
            </h2>
            <ul className="mt-3 space-y-2 text-sm">
              {content.docsLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-white/80 underline-offset-4 hover:text-white hover:underline"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-sm font-medium uppercase tracking-wider text-white/50">
              More from Sendforsign
            </h2>
            <ul className="mt-3 space-y-2 text-sm">
              {[...PRODUCT_PAGES, ...COMPARE_PAGES].filter((p) => p.href !== content.path).map((p) => (
                <li key={p.href}>
                  <Link
                    href={p.href}
                    className="text-white/80 underline-offset-4 hover:text-white hover:underline"
                  >
                    {p.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/"
                  className="text-white/80 underline-offset-4 hover:text-white hover:underline"
                >
                  Sendforsign overview
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
