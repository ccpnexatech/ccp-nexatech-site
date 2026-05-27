import type { Metadata } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://ccpnexatech.com.br";

export const baseMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "CCP NEXATECH — Software House Nordestina",
    template: "%s | CCP NEXATECH",
  },
  description:
    "Software house nordestina que constrói soluções tecnológicas com resultado real para empresas e pessoas do Nordeste.",
  keywords: [
    "software house",
    "Nordeste",
    "Fortaleza",
    "desenvolvimento web",
    "Next.js",
    "React",
    "sistemas",
    "automações",
    "tecnologia nordestina",
    "consultoria tecnologia",
    "landing page",
    "plataforma digital",
  ],
  authors: [{ name: "Caio César Passos Viana Ponte", url: SITE_URL }],
  creator: "CCP NEXATECH",
  publisher: "CCP NEXATECH",
  category: "technology",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    alternateLocale: "en_US",
    url: SITE_URL,
    siteName: "CCP NEXATECH",
    title: "CCP NEXATECH — Software House Nordestina",
    description:
      "Constrói com a região, não para a região. Soluções tecnológicas com resultado real para o Nordeste.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "CCP NEXATECH",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CCP NEXATECH — Software House Nordestina",
    description: "Constrói com a região, não para a região.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "",
  },
  alternates: {
    canonical: SITE_URL,
    languages: {
      "pt-BR": `${SITE_URL}/pt-BR`,
      en: `${SITE_URL}/en`,
    },
  },
};
