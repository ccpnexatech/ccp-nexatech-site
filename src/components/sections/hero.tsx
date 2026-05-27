"use client";

import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const CONTAINER_VARIANTS = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const ITEM_VARIANTS = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.21, 0.47, 0.32, 0.98] },
  },
};

export function Hero() {
  const t = useTranslations("hero");
  const locale = useLocale();

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0 mesh-gradient" aria-hidden />
      <div className="absolute inset-0 noise-texture" aria-hidden />

      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-10 animate-pulse-glow"
        style={{
          background:
            "radial-gradient(circle, rgb(61 110 245) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
        aria-hidden
      />

      <div className="container-site relative z-10 pt-28 pb-20 md:pt-40 md:pb-28">
        <motion.div
          variants={CONTAINER_VARIANTS}
          initial="hidden"
          animate="visible"
          className="max-w-5xl"
        >
          <motion.div variants={ITEM_VARIANTS}>
            <Badge variant="default" className="mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-400 animate-pulse" />
              {t("badge")}
            </Badge>
          </motion.div>

          <motion.h1 variants={ITEM_VARIANTS} className="heading-xl mb-6">
            <span className="text-slate-100">{t("headline_1")} </span>
            <span className="text-gradient">{t("headline_2")}</span>
            <br />
            <span className="text-slate-300">{t("headline_3")}</span>
          </motion.h1>

          <motion.p variants={ITEM_VARIANTS} className="body-lg max-w-2xl mb-10">
            {t("description")}
          </motion.p>

          <motion.div
            variants={ITEM_VARIANTS}
            className="flex flex-col sm:flex-row gap-3"
          >
            <Button asChild size="xl" variant="primary" className="group">
              <Link href={`/${locale}/contato`}>
                {t("cta_primary")}
                <ArrowRight
                  size={18}
                  className="transition-transform duration-200 group-hover:translate-x-1"
                />
              </Link>
            </Button>
            <Button asChild size="xl" variant="secondary">
              <Link href={`/${locale}/servicos`}>{t("cta_secondary")}</Link>
            </Button>
          </motion.div>

          <motion.div
            variants={ITEM_VARIANTS}
            className="mt-20 flex flex-col items-start gap-3"
          >
            <div className="flex items-center gap-6 text-xs text-slate-600 uppercase tracking-widest">
              <span className="w-8 h-px bg-surface-600" />
              <span>Stack</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {["React", "Next.js", "React Native", "Node", "Python", "TailwindCSS"].map(
                (tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 text-xs font-medium text-slate-400 bg-surface-800/60 border border-surface-600/40 rounded-full"
                  >
                    {tech}
                  </span>
                )
              )}
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2"
        >
          <span className="text-xs text-slate-600 uppercase tracking-widest">
            {t("scroll_hint")}
          </span>
          <ChevronDown
            size={16}
            className="text-slate-600 animate-bounce"
          />
        </motion.div>
      </div>
    </section>
  );
}
