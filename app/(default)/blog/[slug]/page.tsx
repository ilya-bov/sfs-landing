import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPost, getPosts, formatDate } from "@/lib/blog";

const SITE_URL = "https://sendforsign.com";

export const dynamicParams = false;

export function generateStaticParams() {
  return getPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const post = getPost((await params).slug);
  if (!post) return {};
  const url = `${SITE_URL}/blog/${post.slug}`;
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      siteName: "Sendforsign",
      locale: "en_US",
      url,
      title: post.title,
      description: post.description,
      publishedTime: post.date,
      images: ["/opengraph-image"],
    },
    twitter: { card: "summary_large_image", title: post.title, description: post.description },
  };
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const post = getPost((await params).slug);
  if (!post) notFound();
  const url = `${SITE_URL}/blog/${post.slug}`;
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: post.title,
      description: post.description,
      datePublished: post.date,
      url,
      mainEntityOfPage: url,
      author: { "@type": "Organization", name: post.author, url: SITE_URL },
      publisher: { "@id": `${SITE_URL}/#organization` },
      image: `${SITE_URL}/opengraph-image`,
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Sendforsign", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog` },
        { "@type": "ListItem", position: 3, name: post.title, item: url },
      ],
    },
  ];
  return (
    <div className="relative min-h-screen bg-[radial-gradient(ellipse_at_top,_#26262e_0%,_#0b0b0f_55%)]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <article className="mx-auto max-w-2xl px-6 pt-36 pb-24 md:pt-44">
        <Link href="/blog" className="text-sm text-white/60 hover:text-white">
          ← Blog
        </Link>
        <h1 className="mt-6 text-3xl font-medium leading-tight tracking-tight text-neutral-100 md:text-5xl">
          {post.title}
        </h1>
        <time dateTime={post.date} className="mt-4 block text-sm text-white/50">
          {formatDate(post.date)}
        </time>
        <div
          className="blog-body mt-10 text-base leading-relaxed text-white/80"
          dangerouslySetInnerHTML={{ __html: post.html }}
        />
        <div className="mt-16 rounded-2xl border border-white/10 bg-white/5 p-6">
          <p className="font-medium text-white">Try it with your own agent</p>
          <p className="mt-2 text-sm text-white/70">
            Connect Claude, ChatGPT or Cursor to https://api.sendforsign.com/mcp, or use the REST API. The sandbox is free.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <a href="https://app.sendforsign.com" target="_blank" rel="noopener" className="rounded-full bg-white px-5 py-2 text-sm font-medium text-black hover:bg-white/90">
              Get API key
            </a>
            <Link href="/mcp" className="rounded-full border border-white/15 px-5 py-2 text-sm font-medium text-white hover:bg-white/10">
              MCP server
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}
