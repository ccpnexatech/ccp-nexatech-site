import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MotionSection } from "@/components/shared/motion-section";

const STACK = ["React", "React Native", "Expo", "Next.js", "Node", "Python", "TailwindCSS"];

export function About() {
  const t = useTranslations("about");
  const locale = useLocale();

  return (
    <section id="about" className="section-padding">
      <div className="container-site">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <MotionSection direction="left">
            <div className="flex flex-col gap-6">
              <Badge variant="default">{t("label")}</Badge>

              <h2 className="heading-lg">
                {t("title")}
              </h2>

              <p className="body-lg">{t("description")}</p>

              <div className="surface-card rounded-2xl p-6 flex flex-col gap-3">
                <span className="text-xs font-semibold uppercase tracking-widest text-brand-400">
                  {t("mission_label")}
                </span>
                <p className="text-slate-200 leading-relaxed text-sm">
                  {t("mission")}
                </p>
              </div>

              <div className="flex flex-col gap-2">
                <span className="text-xs font-semibold uppercase tracking-widest text-slate-500">
                  {t("stack_label")}
                </span>
                <div className="flex flex-wrap gap-2">
                  {STACK.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-xs font-medium text-slate-400 bg-surface-800/60 border border-surface-600/40 rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <Button asChild size="lg" variant="primary" className="group w-fit">
                <Link href={`/${locale}/contato`}>
                  {t("cta")}
                  <ArrowRight
                    size={16}
                    className="transition-transform duration-200 group-hover:translate-x-1"
                  />
                </Link>
              </Button>
            </div>
          </MotionSection>

          <MotionSection direction="right" delay={0.1}>
            <div className="flex flex-col items-center gap-6">
              <div className="relative">
                <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-brand-600/20 to-accent-500/10 blur-2xl" />
                <div className="relative surface-glass rounded-3xl p-1">
                  <Image
                    src="/founder.png"
                    alt={t("founder_name")}
                    width={320}
                    height={320}
                    className="rounded-[22px] object-cover"
                    priority={false}
                  />
                </div>
              </div>

              <div className="surface-card rounded-2xl p-6 w-full max-w-xs flex flex-col gap-3">
                <span className="text-xs font-semibold uppercase tracking-widest text-slate-500">
                  {t("founder_label")}
                </span>
                <div>
                  <p className="font-semibold text-slate-100 text-sm leading-tight">
                    {t("founder_name")}
                  </p>
                  <div className="flex items-center gap-1.5 mt-1">
                    <MapPin size={11} className="text-slate-500 shrink-0" />
                    <p className="text-xs text-slate-500">{t("founder_location")}</p>
                  </div>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {t("founder_bio")}
                </p>
              </div>
            </div>
          </MotionSection>
        </div>
      </div>
    </section>
  );
}
