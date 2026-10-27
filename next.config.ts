import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const securityHeaders = [
  { key: "X-DNS-Prefetch-Control", value: "on" },
  { key: "X-XSS-Protection", value: "1; mode=block" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://vlibras.gov.br https://*.vlibras.gov.br https://cdn.jsdelivr.net/gh/spbgovbr-vlibras/ https://cdn.jsdelivr.net/npm/posthog-js@1.404.0/",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com https://vlibras.gov.br https://*.vlibras.gov.br https://cdn.jsdelivr.net/gh/spbgovbr-vlibras/",
      "img-src 'self' data: https:",
      "connect-src 'self' https://vlibras.gov.br https://*.vlibras.gov.br https://cdn.jsdelivr.net/gh/spbgovbr-vlibras/ https://fonts.gstatic.com https://us.i.posthog.com https://us-assets.i.posthog.com",
      "media-src 'self' data: blob: https://vlibras.gov.br https://*.vlibras.gov.br https://cdn.jsdelivr.net/gh/spbgovbr-vlibras/",
      "worker-src 'self' blob:",
      // VLibras v7 carrega o avatar (Unity) num iframe
      "frame-src 'self' https://vlibras.gov.br https://*.vlibras.gov.br https://cdn.jsdelivr.net/gh/spbgovbr-vlibras/",
    ].join("; "),
  },
];

const config: NextConfig = {
  poweredByHeader: false,
  compress: true,
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
  },
  experimental: {
    optimizeCss: true,
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};

export default withNextIntl(config);
