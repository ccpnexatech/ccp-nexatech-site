const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://ccpnexatech.com.br";

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "CCP NEXATECH",
    description:
      "Software house nordestina que constrói soluções tecnológicas com resultado real para empresas e pessoas do Nordeste.",
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    foundingDate: "2025",
    foundingLocation: {
      "@type": "Place",
      name: "Fortaleza, Ceará, Brasil",
    },
    areaServed: {
      "@type": "Place",
      name: "Nordeste do Brasil",
    },
    sameAs: ["https://www.linkedin.com/in/ccp-nexatech/"],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      availableLanguage: ["Portuguese", "English"],
    },
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    url: SITE_URL,
    name: "CCP NEXATECH",
    description: "Software house nordestina — constrói com a região.",
    inLanguage: ["pt-BR", "en"],
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_URL}/busca?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
