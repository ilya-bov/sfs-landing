/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          // Basic hardening
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          // Prevent clickjacking of *your* page
          { key: "X-Frame-Options", value: "DENY" },
          // CSP: blocks most injection vectors and constrains third-party embeds
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "base-uri 'self'",
              "object-src 'none'",
              "frame-ancestors 'none'",
              // Next/React will need inline styles unless you refactor to nonce/hashes
              "style-src 'self' 'unsafe-inline'",
              // Keep inline scripts enabled because the app currently uses dangerouslySetInnerHTML for theme + Hotjar bootstrap.
              // If you want stricter CSP, we can migrate those to nonce-based <Script>.
              // Hotjar temporarily disabled - uncomment when re-enabling
              // "script-src 'self' 'unsafe-inline' https://static.hotjar.com",
              "script-src 'self' 'unsafe-inline'",
              // Block the malicious domain explicitly - static-6r1.pages.dev is NOT allowed
              "script-src-elem 'self' 'unsafe-inline'",
              "connect-src 'self'",
              "img-src 'self' data: blob:",
              // Allow only the embeds we intentionally use
              "frame-src 'self' https://my.spline.design https://www.youtube.com",
              "font-src 'self' data:",
            ].join("; "),
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
