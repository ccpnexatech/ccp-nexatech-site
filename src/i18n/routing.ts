import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["pt-BR", "en"],
  defaultLocale: "pt-BR",
  localePrefix: "always",
  pathnames: {
    "/": "/",
    "/sobre": {
      "pt-BR": "/sobre",
      en: "/about",
    },
    "/servicos": {
      "pt-BR": "/servicos",
      en: "/services",
    },
    "/contato": {
      "pt-BR": "/contato",
      en: "/contact",
    },
  },
});

export type Locale = (typeof routing.locales)[number];
export type Pathname = keyof typeof routing.pathnames;
