import { PROFILE } from "@/content/profile";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://ccpnexatech.com.br";

export function personSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: PROFILE.name,
    jobTitle: PROFILE.role.pt,
    url: SITE_URL,
    image: `${SITE_URL}${PROFILE.photo}`,
    email: `mailto:${PROFILE.email}`,
    address: { "@type": "PostalAddress", addressLocality: "Fortaleza", addressRegion: "CE", addressCountry: "BR" },
    worksFor: { "@type": "Organization", name: "Itarget Tecnologia" },
    knowsAbout: ["React", "React Native", "TypeScript", "Next.js", "APIs REST", "Firebase"],
    knowsLanguage: ["pt-BR", "en"],
    sameAs: [PROFILE.linkedin, PROFILE.github],
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    url: SITE_URL,
    name: `${PROFILE.name} — Portfólio`,
    inLanguage: ["pt-BR", "en"],
  };
}
