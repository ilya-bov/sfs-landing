import Link from "next/link";
import type { Metadata } from "next";
import { getPosts, formatDate } from "@/lib/blog";

const SITE_URL = "https://sendforsign.com";
const TITLE = "Blog: contracts, e-signature and AI agents";
const DESCRIPTION =
  "Notes from the Sendforsign team on e-signature APIs, embedded contract workflows and letting AI agents draft and send contracts safely.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/blog" },
  openGraph: {
    type: "website",
    siteName: "Sendforsign",
    locale: "en_US",
    url: `${SITE_URL}/blog`,
    title: TITLE,
    description: DESCRIPTION,
    images: ["/opengraph-image"],
  },
};

export default function BlogIndex() {
  const posts = getPosts();
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Sendforsign blog",
    url: `${SITE_URL}/blog`,
    publisher: { "@id": `${SITE_URL}/#organization` },
    blogPost: posts.map((p) => ({
      "@type": "BlogPosting",
      headline: p.title,
      url: `${SITE_URL}/blog/${p.slug}`,
      datePublished: p.date,
    })),
  };
  return (
    <div className="relative min-h-screen bg-[radial-gradient(ellipse_at_top,_#26262e_0%,_#0b0b0f_55%)]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className="mx-auto max-w-3xl px-6 pt-36 pb-24 md:pt-44">
        <h1 className="text-4xl font-medium leading-tight tracking-tight text-neutral-100 md:text-5xl">
          Blog
        </h1>
        <p className="mt-4 text-lg text-white/70">
          Contracts, e-signature and AI agents, from the team that builds Sendforsign.
        </p>
        <ul className="mt-12 divide-y divide-white/10 border-y border-white/10">
          {posts.map((p) => (
            <li key={p.slug} className="py-6">
              <time dateTime={p.date} className="text-sm text-white/50">
                {formatDate(p.date)}
              </time>
              <h2 className="mt-1 text-xl font-semibold tracking-tight text-white">
                <Link href={`/blog/${p.slug}`} className="hover:underline">
                  {p.title}
                </Link>
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-white/70">{p.description}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
