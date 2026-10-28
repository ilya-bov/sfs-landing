import Link from "next/link";
import type { Metadata } from "next";

// Shared layout for the product (SEO) pages: /esignature-api, /embedded-esignature,
// /ai-contract-generation. Server component — all copy is in the HTML for crawlers.

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
};

const SITE_URL = "https://sendforsign.com";

export const PRODUCT_PAGES = [
  { href: "/esignature-api", label: "eSignature API" },
  { href: "/embedded-esignature", label: "Embedded e-signing" },
  { href: "/ai-contract-generation", label: "AI contract generation" },
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
        <p className="mb-4 inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-white">
          {content.eyebrow}
        </p>
        <h1 className="text-4xl font-medium leading-tight tracking-tighter text-neutral-100 md:text-6xl">
          {content.title}
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/70">
          {content.lead}
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="https://accounts.sendforsign.com/sign-up"
            className="rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition hover:bg-white/90"
          >
            Get started
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
              {PRODUCT_PAGES.filter((p) => p.href !== content.path).map((p) => (
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
