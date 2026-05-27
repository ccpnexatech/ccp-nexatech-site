import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { About } from "@/components/sections/about";
import { Values } from "@/components/sections/values";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "seo" });
  return {
    title: t("about_title"),
    description: t("about_description"),
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <About />
      <Values />
    </>
  );
}
