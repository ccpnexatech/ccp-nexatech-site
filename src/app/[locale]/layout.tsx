import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { A11yBar } from "@/components/a11y/a11y-bar";
import { PrefsProvider, PREFS_BOOT } from "@/components/a11y/prefs";
import { personSchema, websiteSchema } from "@/lib/structured-data";
import { fontSans, fontSerif, fontMono } from "@/lib/fonts";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://ccpnexatech.com.br";
  return {
    alternates: { canonical: `${SITE_URL}/${locale}`, languages: { "pt-BR": `${SITE_URL}/pt-BR`, en: `${SITE_URL}/en` } },
    openGraph: { locale: locale === "pt-BR" ? "pt_BR" : "en_US" },
  };
}

export default async function LocaleLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) notFound();
  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale} className={`${fontSans.variable} ${fontSerif.variable} ${fontMono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: PREFS_BOOT }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema()) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema()) }} />
      </head>
      <body>
        <NextIntlClientProvider messages={messages}>
          <PrefsProvider>
            <A11yBar />
            <Header />
            <main id="conteudo" tabIndex={-1} className="outline-none">{children}</main>
            <Footer />
          </PrefsProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
