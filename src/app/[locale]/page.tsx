import { setRequestLocale } from "next-intl/server";
import { Opening } from "@/components/story/opening";
import { DeliverSection } from "@/components/story/deliver";
import { Metrics } from "@/components/story/metrics";
import { Chapters } from "@/components/story/chapters";
import { BackstageSection } from "@/components/story/backstage";
import { Daily } from "@/components/story/daily";
import { Projects } from "@/components/story/projects";
import { NextChapter } from "@/components/story/next";
import { Contact } from "@/components/story/contact";
import { CompanyWork } from "@/components/story/company";

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <>
      <Opening />
      <DeliverSection />
      <BackstageSection />
      <Chapters />
      <Metrics />
      <Daily />
      <CompanyWork />
      <Projects />
      <NextChapter />
      <Contact />
    </>
  );
}
