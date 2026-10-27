import type { Metadata } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://ccpnexatech.com.br";
const TITLE = "Caio César Ponte — Desenvolvedor Front-End & Mobile";
const DESC =
  "Portfólio de Caio César Ponte: interfaces web em React e TypeScript, apps em React Native publicados na App Store e Google Play, integrações com APIs REST. Fortaleza, CE.";

export const baseMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: TITLE, template: "%s | Caio Ponte" },
  description: DESC,
  keywords: ["Caio César Ponte", "Desenvolvedor Front-End", "React Native", "React", "TypeScript", "Next.js", "Mobile", "Fortaleza", "Portfólio", "Remotion"],
  authors: [{ name: "Caio César Ponte", url: SITE_URL }],
  creator: "Caio César Ponte",
  category: "technology",
  openGraph: {
    type: "profile",
    locale: "pt_BR",
    alternateLocale: "en_US",
    url: SITE_URL,
    siteName: "Caio César Ponte",
    title: TITLE,
    description: DESC,
    images: [{ url: "/api/og", width: 1200, height: 630, alt: TITLE }],
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESC, images: ["/api/og"] },
  robots: { index: true, follow: true },
  alternates: { canonical: SITE_URL, languages: { "pt-BR": `${SITE_URL}/pt-BR`, en: `${SITE_URL}/en` } },
};
