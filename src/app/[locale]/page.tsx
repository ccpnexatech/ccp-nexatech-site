import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/sections/hero";
import { Services } from "@/components/sections/services";
import { Values } from "@/components/sections/values";
import { About } from "@/components/sections/about";
import { Platform } from "@/components/sections/platform";
import { ContactForm } from "@/components/sections/contact-form";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <Services />
      <Values />
      <About />
      <Platform />
      <ContactForm />
    </>
  );
}
