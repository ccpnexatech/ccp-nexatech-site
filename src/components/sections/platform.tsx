import { useTranslations } from "next-intl";
import { Check, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MotionSection, StaggerContainer, StaggerItem } from "@/components/shared/motion-section";

const LINKEDIN_URL = "https://www.linkedin.com/in/ccp-nexatech/";

export function Platform() {
  const t = useTranslations("platform");
  const features = [
    t("feature_1"),
    t("feature_2"),
    t("feature_3"),
    t("feature_4"),
  ];

  return (
    <section id="platform" className="section-padding bg-surface-900/30">
      <div className="container-site">
        <div className="relative overflow-hidden rounded-4xl border border-brand-500/15 bg-surface-800/40 p-8 md:p-14 lg:p-20">
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage:
                "radial-gradient(at 30% 50%, rgb(61 110 245 / 0.2) 0px, transparent 60%), radial-gradient(at 80% 20%, rgb(249 115 22 / 0.1) 0px, transparent 50%)",
            }}
            aria-hidden
          />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <MotionSection direction="left">
              <div className="flex flex-col gap-5">
                <div className="flex items-center gap-3">
                  <Badge variant="default">{t("label")}</Badge>
                  <Badge variant="accent">{t("subtitle")}</Badge>
                </div>

                <h2 className="heading-md text-gradient">{t("title")}</h2>

                <p className="body-md">{t("description")}</p>

                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="group w-fit"
                >
                  <a
                    href={LINKEDIN_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {t("cta")}
                    <ExternalLink
                      size={15}
                      className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </a>
                </Button>
              </div>
            </MotionSection>

            <MotionSection direction="right" delay={0.1}>
              <StaggerContainer className="flex flex-col gap-3">
                {features.map((feature, i) => (
                  <StaggerItem key={i}>
                    <div className="flex items-start gap-3 surface-glass rounded-xl p-4">
                      <div className="w-5 h-5 rounded-full bg-brand-600/20 border border-brand-500/30 flex items-center justify-center shrink-0 mt-0.5">
                        <Check size={11} className="text-brand-400" />
                      </div>
                      <span className="text-sm text-slate-300 leading-relaxed">
                        {feature}
                      </span>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </MotionSection>
          </div>
        </div>
      </div>
    </section>
  );
}
