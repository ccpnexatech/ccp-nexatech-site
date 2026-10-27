"use client";

import { useRef } from "react";
import { useLocale } from "next-intl";
import { motion, useScroll, useSpring } from "framer-motion";
import { EXPERIENCE, langOf, pick } from "@/content/profile";
import { Heading } from "./heading";

export function Experience() {
  const lang = langOf(useLocale());
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 50%"] });
  const h = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <section id="experiencia" className="section-padding">
      <div className="container-site">
        <Heading index="03" label={lang === "pt" ? "trajetória" : "experience"} title={lang === "pt" ? "4 anos, uma linha contínua." : "4 years, one continuous line."} />
        <div ref={ref} className="relative pl-8 md:pl-12">
          <div className="absolute left-2 md:left-4 top-0 h-full w-px bg-surface-700" aria-hidden />
          <motion.div style={{ scaleY: h }} className="absolute left-2 md:left-4 top-0 h-full w-px origin-top bg-gradient-to-b from-brand-400 to-accent-400" aria-hidden />
          <div className="space-y-12">
            {EXPERIENCE.map((e, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.6 }} className="relative">
                <span className="absolute -left-[30px] md:-left-[38px] top-2 h-4 w-4 rounded-full border-2 border-brand-400 bg-surface-950" />
                <div className="surface-card rounded-3xl p-6 md:p-8">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="text-xl font-bold text-slate-100">{pick(e.role, lang)}</h3>
                    <span className="font-mono text-sm text-accent-400">{pick(e.period, lang)}</span>
                  </div>
                  <p className="text-slate-400">{e.org} · {pick(e.place, lang)}</p>
                  <ul className="mt-4 grid gap-2 md:grid-cols-2">
                    {e.points.map((p, k) => <li key={k} className="flex gap-2 text-sm text-slate-300"><span className="text-brand-400">▹</span>{pick(p, lang)}</li>)}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
