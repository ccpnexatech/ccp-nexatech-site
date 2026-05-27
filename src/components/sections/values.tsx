import { useTranslations } from "next-intl";
import {
  Target,
  Users,
  Heart,
  MessageCircle,
  TrendingUp,
  Clock,
} from "lucide-react";
import { SectionHeading } from "@/components/shared/section-heading";
import { StaggerContainer, StaggerItem } from "@/components/shared/motion-section";
import { cn } from "@/lib/cn";

const VALUE_ICONS = [Target, Users, Heart, MessageCircle, TrendingUp, Clock];
const VALUE_KEYS = [
  "result",
  "access",
  "northeast",
  "dialogue",
  "growth",
  "longterm",
] as const;

const ACCENT_CLASSES = [
  "text-brand-400 bg-brand-600/15 border-brand-500/20",
  "text-accent-400 bg-accent-500/15 border-accent-500/20",
  "text-red-400 bg-red-500/15 border-red-500/20",
  "text-emerald-400 bg-emerald-500/15 border-emerald-500/20",
  "text-violet-400 bg-violet-500/15 border-violet-500/20",
  "text-sky-400 bg-sky-500/15 border-sky-500/20",
];

export function Values() {
  const t = useTranslations("values");

  return (
    <section id="values" className="section-padding bg-surface-900/30">
      <div className="container-site">
        <SectionHeading
          label={t("label")}
          title={t("title")}
          description={t("description")}
          className="mb-16"
        />

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {VALUE_KEYS.map((key, index) => {
            const Icon = VALUE_ICONS[index];
            const accent = ACCENT_CLASSES[index];
            const [textColor, bgColor, borderColor] = accent.split(" ");

            return (
              <StaggerItem key={key}>
                <div className="surface-card rounded-2xl p-7 h-full flex flex-col gap-4 group transition-all duration-300 hover:bg-surface-700/70 hover:-translate-y-0.5">
                  <div
                    className={cn(
                      "w-10 h-10 rounded-xl border flex items-center justify-center shrink-0",
                      bgColor,
                      borderColor
                    )}
                  >
                    <Icon size={18} className={textColor} />
                  </div>
                  <div className="flex flex-col gap-2">
                    <h3 className="text-base font-semibold text-slate-100 leading-tight">
                      {t(`items.${key}.title`)}
                    </h3>
                    <p className="text-sm text-slate-400 leading-relaxed">
                      {t(`items.${key}.description`)}
                    </p>
                  </div>
                  <div className="mt-auto pt-2">
                    <span className="text-2xl font-black text-slate-800 select-none">
                      0{index + 1}
                    </span>
                  </div>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}
