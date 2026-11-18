import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/api/",
    },
    // The docs (Mintlify, proxied at /docs) publish their own sitemap.
    sitemap: ["https://sendforsign.com/sitemap.xml", "https://sendforsign.com/docs/sitemap.xml"],
    host: "https://sendforsign.com",
  };
}
