import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Services } from "@/components/sections/services";
import { Platform } from "@/components/sections/platform";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "seo" });
  return {
    title: t("services_title"),
    description: t("services_description"),
  };
}

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <div className="pt-16" />
      <Services />
      <Platform />
    </>
  );
}
