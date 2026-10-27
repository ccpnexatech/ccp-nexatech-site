"use client";

import { useLocale } from "next-intl";
import { motion } from "framer-motion";
import { GraduationCap, Target } from "lucide-react";
import { EDUCATION, GOALS, langOf, pick } from "@/content/profile";
import { Heading } from "./heading";

export function Education() {
  const lang = langOf(useLocale());
  return (
    <section id="formacao" className="section-padding">
      <div className="container-site">
        <Heading index="05" label={lang === "pt" ? "formação" : "education"} title={lang === "pt" ? "Aprendendo em duas frentes: código e negócio." : "Learning on two fronts: code and business."} />
        <div className="grid gap-5 sm:grid-cols-2">
          {EDUCATION.map((e, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
              whileHover={{ y: -4 }} className="surface-card flex gap-4 rounded-3xl p-6">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brand-500/15 text-brand-300"><GraduationCap size={22} /></div>
              <div>
                <h3 className="text-lg font-bold text-slate-100">{pick(e.title, lang)}</h3>
                <p className="text-sm text-accent-300">{pick(e.org, lang)}</p>
                <p className="mt-1 text-sm text-slate-400">{pick(e.note, lang)}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Goals() {
  const lang = langOf(useLocale());
  return (
    <section id="objetivos" className="section-padding bg-surface-900/40">
      <div className="container-site">
        <Heading index="06" label={lang === "pt" ? "objetivos" : "goals"} title={lang === "pt" ? "Para onde estou indo." : "Where I'm heading."} />
        <div className="grid gap-6 md:grid-cols-3">
          {GOALS.map((g, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15, duration: 0.6 }}
              className="relative overflow-hidden rounded-3xl border border-surface-600/50 bg-surface-900 p-7">
              <span className="absolute right-5 top-3 text-7xl font-black text-surface-700/60">{i + 1}</span>
              <div className="relative">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-accent-500/15 px-3 py-1 text-xs font-semibold text-accent-300"><Target size={13} />{pick(g.horizon, lang)}</div>
                <h3 className="text-xl font-bold text-slate-100">{pick(g.title, lang)}</h3>
                <p className="mt-3 text-slate-400">{pick(g.text, lang)}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
