"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
import { useLocale } from "next-intl";
import { motion } from "framer-motion";
import { ArrowDown, Github, Linkedin, Mail, MapPin } from "lucide-react";
import { PROFILE, langOf, pick } from "@/content/profile";

const ShowreelPlayer = dynamic(() => import("./players").then((m) => m.ShowreelPlayer), {
  ssr: false,
  loading: () => <div className="aspect-video w-full rounded-3xl surface-card animate-pulse" />,
});

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] } },
};

export function Hero() {
  const lang = langOf(useLocale());
  const words = pick(PROFILE.role, lang).split(" ");

  return (
    <section id="top" className="relative overflow-hidden pt-28 pb-20 md:pt-36">
      <div className="absolute inset-0 mesh-gradient" aria-hidden />
      <div className="absolute inset-0 noise-texture" aria-hidden />
      <div className="container-site relative z-10 grid gap-14 lg:grid-cols-[1.05fr_1fr] lg:items-center">
        <motion.div initial="hidden" animate="show" variants={{ show: { transition: { staggerChildren: 0.1 } } }}>
          <motion.div variants={item} className="flex items-center gap-4 mb-8">
            <div className="relative h-20 w-20 shrink-0 rounded-full p-[3px] bg-gradient-to-tr from-brand-500 via-accent-400 to-brand-400 animate-gradient-x bg-300%">
              <Image src={PROFILE.photo} alt={PROFILE.name} width={160} height={160} priority className="h-full w-full rounded-full object-cover" />
            </div>
            <div className="text-sm">
              <p className="font-semibold text-slate-100">{PROFILE.name}</p>
              <p className="flex items-center gap-1.5 text-slate-500"><MapPin size={13} />{PROFILE.location}</p>
              <p className="mt-1 inline-flex items-center gap-1.5 text-emerald-400"><span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />{lang === "pt" ? "Disponível para novas vagas" : "Available for new roles"}</p>
            </div>
          </motion.div>

          <h1 className="heading-xl mb-6">
            {words.map((w, i) => (
              <motion.span key={i} variants={item} className={`inline-block mr-[0.25em] ${i >= words.length - 2 ? "text-gradient" : "text-slate-100"}`}>
                {w}
              </motion.span>
            ))}
          </h1>
          <motion.p variants={item} className="body-lg max-w-xl mb-8">{pick(PROFILE.pitch, lang)}</motion.p>

          <motion.div variants={item} className="flex flex-wrap gap-3">
            <a href="#projetos" className="group inline-flex items-center gap-2 rounded-xl bg-brand-500 px-6 py-3 font-semibold text-white hover:bg-brand-400 transition-colors">
              {lang === "pt" ? "Ver projetos" : "See projects"}
              <ArrowDown size={17} className="transition-transform group-hover:translate-y-0.5" />
            </a>
            {[
              { href: PROFILE.linkedin, icon: Linkedin, label: "LinkedIn" },
              { href: PROFILE.github, icon: Github, label: "GitHub" },
              { href: `mailto:${PROFILE.email}`, icon: Mail, label: "E-mail" },
            ].map(({ href, icon: Icon, label }) => (
              <a key={label} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" aria-label={label}
                className="inline-flex items-center gap-2 rounded-xl surface-card px-4 py-3 text-sm font-medium text-slate-300 hover:text-white hover:-translate-y-0.5 transition-all">
                <Icon size={16} />{label}
              </a>
            ))}
          </motion.div>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.94, rotate: 1.5 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} transition={{ delay: 0.3, duration: 0.8 }} className="relative">
          <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-tr from-brand-500/30 to-accent-500/20 blur-2xl" aria-hidden />
          <div className="relative rounded-3xl border border-surface-600/50 bg-surface-900 p-2 shadow-2xl">
            <ShowreelPlayer lang={lang} />
          </div>
          <p className="mt-3 text-center font-mono text-xs text-slate-500">
            {lang === "pt" ? "▶ showreel feito em código com Remotion" : "▶ showreel coded with Remotion"}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
