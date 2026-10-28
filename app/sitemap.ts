import type { MetadataRoute } from "next";
import { PRODUCT_PAGES } from "@/components/seo-page";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://sendforsign.com/",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    ...PRODUCT_PAGES.map((p) => ({
      url: `https://sendforsign.com${p.href}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
