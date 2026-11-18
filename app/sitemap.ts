import type { MetadataRoute } from "next";
import { PRODUCT_PAGES, COMPARE_PAGES } from "@/components/seo-page";
import { getPosts } from "@/lib/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://sendforsign.com/",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    ...[...PRODUCT_PAGES, ...COMPARE_PAGES].map((p) => ({
      url: `https://sendforsign.com${p.href}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    {
      url: "https://sendforsign.com/blog",
      lastModified: new Date(getPosts()[0].date),
      changeFrequency: "weekly" as const,
      priority: 0.6,
    },
    ...getPosts().map((p) => ({
      url: `https://sendforsign.com/blog/${p.slug}`,
      lastModified: new Date(p.date),
      changeFrequency: "yearly" as const,
      priority: 0.5,
    })),
  ];
}
