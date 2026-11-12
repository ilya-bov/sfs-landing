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
const SITE_TITLE =
  "Sendforsign — the contracts layer for products that build AI agents";
const SITE_DESCRIPTION =
  "Contracts API and MCP server for AI agents: build contracts from templates, let the agent and the counterparty fill their own fields, send for e-signature and get a webhook when signed. White-label and multi-tenant, with an agent audit log.";

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
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
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
      logo: `${SITE_URL}/favicon.svg`,
      sameAs: [
        "https://www.linkedin.com/company/sendforsign/",
        "https://www.youtube.com/@Sendforsign",
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
      offers: {
        "@type": "Offer",
        name: "Sandbox",
        price: "0",
        priceCurrency: "USD",
        description: "Free sandbox covering the full create, send and sign flow.",
      },
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
