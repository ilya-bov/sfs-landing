import "./css/style.css";
import type { Metadata } from "next";
import Script from "next/script";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const SITE_URL = "https://sendforsign.com";
// Search title carries the queries we want to rank for; social cards keep the slogan.
const SITE_TITLE = "E-signature API and MCP server for AI agents | Sendforsign";
const SOCIAL_TITLE = "Sendforsign — Your agent drafts. People sign.";
const SITE_DESCRIPTION =
  "E-signature API and MCP server for AI agents. Draft contracts from your templates, let people fill their fields and sign. White-label, multi-tenant.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: "%s | Sendforsign",
  },
  description: SITE_DESCRIPTION,
  applicationName: "Sendforsign",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Sendforsign",
    title: SOCIAL_TITLE,
    description: SITE_DESCRIPTION,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: SOCIAL_TITLE,
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/apple-touch-icon.png",
  },
};

// Structured data for search engines (Organization + product + site)
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "Sendforsign",
      url: SITE_URL,
      logo: `${SITE_URL}/logo-512.png`,
      sameAs: [
        "https://www.linkedin.com/company/sendforsign/",
        "https://www.youtube.com/@Sendforsign",
        "https://github.com/sendforsign",
        "https://www.npmjs.com/package/sendforsign",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "Sendforsign",
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
    {
      "@type": "SoftwareApplication",
      name: "Sendforsign",
      url: SITE_URL,
      applicationCategory: "BusinessApplication",
      applicationSubCategory: "Contract management and e-signature API",
      operatingSystem: "Web",
      description: SITE_DESCRIPTION,
      featureList: [
        "Contract templates with per-recipient field roles",
        "REST API and remote MCP server for AI agents",
        "Embedded, white-label, multi-tenant signing",
        "Agent modes, send confirmations and audit log",
        "Webhooks for contract events",
        "Simple electronic signatures for the EU and the US",
      ],
      offers: [
        { "@type": "Offer", name: "Free", price: "0", priceCurrency: "USD", description: "5 contracts sent a month, REST API and MCP server." },
        { "@type": "Offer", name: "Pro", price: "29", priceCurrency: "USD", description: "Per month, 50 contracts included, then $0.50 per contract." },
        { "@type": "Offer", name: "Platform", price: "199", priceCurrency: "USD", description: "Per month, 300 contracts included, then $0.40 per contract; white-label and tenants." },
      ],
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://static.hotjar.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  if (theme === 'light') {
                    document.documentElement.classList.remove('dark');
                  } else {
                    document.documentElement.classList.add('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
        <Script
          id="hotjar"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
    (function(h,o,t,j,a,r){
        h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
        h._hjSettings={hjid:6474189,hjsv:6};
        a=o.getElementsByTagName('head')[0];
        r=o.createElement('script');r.async=1;
        r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
        a.appendChild(r);
    })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
            `,
          }}
        />
      </head>
      <body
        className={`${inter.variable} bg-background text-foreground font-inter tracking-tight antialiased`}
      >
        <div className="flex min-h-screen flex-col overflow-hidden supports-[overflow:clip]:overflow-clip">
          {children}
        </div>
      </body>
    </html>
  );
}
