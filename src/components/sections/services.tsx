import { useTranslations } from "next-intl";
import {
  Globe,
  Search,
  Zap,
  Brain,
  GraduationCap,
  Wrench,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { SectionHeading } from "@/components/shared/section-heading";
import { StaggerContainer, StaggerItem } from "@/components/shared/motion-section";

const SERVICE_ICONS = [Globe, Search, Zap, Brain, GraduationCap, Wrench];
const SERVICE_KEYS = [
  "web",
  "diagnosis",
  "automation",
  "consulting",
  "training",
  "maintenance",
] as const;

export function Services() {
  const t = useTranslations("services");

  return (
    <section id="services" className="section-padding">
      <div className="container-site">
        <SectionHeading
          label={t("label")}
          title={t("title")}
          description={t("description")}
          className="mb-16"
        />

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {SERVICE_KEYS.map((key, index) => {
            const Icon = SERVICE_ICONS[index];
            return (
              <StaggerItem key={key}>
                <Card hover className="h-full group">
                  <CardHeader>
                    <div className="w-10 h-10 rounded-xl bg-brand-600/15 border border-brand-500/20 flex items-center justify-center mb-2 transition-colors duration-300 group-hover:bg-brand-600/25">
                      <Icon size={18} className="text-brand-400" />
                    </div>
                    <CardTitle>{t(`items.${key}.title`)}</CardTitle>
                  </CardHeader>
                  <CardDescription>{t(`items.${key}.description`)}</CardDescription>
                </Card>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}
