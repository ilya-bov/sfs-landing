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
  "Sendforsign — eSignature API and embedded contract workflows";
const SITE_DESCRIPTION =
  "API-first eSignature platform for SaaS and AI agents: generate contracts with AI, embed signing with React components, and automate approvals with webhooks.";

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
      operatingSystem: "Web",
      description: SITE_DESCRIPTION,
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
