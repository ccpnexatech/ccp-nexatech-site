"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { useLocale } from "next-intl";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Play, X } from "lucide-react";
import { PROJECTS, langOf, pick, type Project, type Lang } from "@/content/profile";
import { Heading } from "./heading";

const ProjectReelPlayer = dynamic(() => import("./players").then((m) => m.ProjectReelPlayer), {
  ssr: false,
  loading: () => <div className="aspect-video w-full rounded-2xl bg-surface-800 animate-pulse" />,
});

const FILTERS = [
  { key: "all", pt: "Todos", en: "All" },
  { key: "web", pt: "Web", en: "Web" },
  { key: "mobile", pt: "Mobile", en: "Mobile" },
  { key: "api", pt: "APIs", en: "APIs" },
  { key: "tools", pt: "Ferramentas", en: "Tools" },
  { key: "sites", pt: "Sites", en: "Sites" },
] as const;

function Featured({ p, i, lang, onOpen }: { p: Project; i: number; lang: Lang; onOpen: () => void }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ delay: i * 0.12, duration: 0.6 }}
      whileHover={{ y: -6 }}
      className="group relative flex flex-col overflow-hidden rounded-3xl border border-surface-600/50 bg-surface-900 p-7"
      style={{ boxShadow: `0 30px 80px -50px ${p.color}` }}
    >
      <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full blur-3xl opacity-30 transition-opacity group-hover:opacity-60" style={{ background: p.color }} aria-hidden />
      <span className="font-mono text-xs" style={{ color: p.color }}>0{i + 1} · {lang === "pt" ? "destaque" : "featured"}{p.status ? ` · ${pick(p.status, lang)}` : ""}</span>
      <h3 className="mt-3 text-3xl font-extrabold text-slate-100">{p.name}</h3>
      <p className="mt-2 text-slate-400">{pick(p.tagline, lang)}</p>
      <ul className="mt-5 space-y-2 text-sm text-slate-300">
        {p.highlights.slice(0, 3).map((h, k) => <li key={k} className="flex gap-2"><span style={{ color: p.color }}>✓</span>{pick(h, lang)}</li>)}
      </ul>
      <div className="mt-5 flex flex-wrap gap-2">
        {p.stack.map((s) => <span key={s} className="rounded-full border border-surface-600/60 px-2.5 py-1 font-mono text-[11px] text-slate-400">{s}</span>)}
      </div>
      <div className="mt-auto flex gap-3 pt-7">
        <button onClick={onOpen} className="inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-white transition-transform hover:scale-105" style={{ background: p.color }}>
          <Play size={15} fill="currentColor" />{lang === "pt" ? "Assistir" : "Watch"}
        </button>
        {p.url ? (
          <a href={p.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-xl surface-card px-4 py-2.5 text-sm text-slate-300 hover:text-white">
            {lang === "pt" ? "Código" : "Code"}<ArrowUpRight size={15} />
          </a>
        ) : null}
      </div>
    </motion.article>
  );
}

export function Projects() {
  const lang = langOf(useLocale());
  const [filter, setFilter] = useState<(typeof FILTERS)[number]["key"]>("all");
  const [open, setOpen] = useState<Project | null>(null);
  const featured = PROJECTS.filter((p) => p.featured);
  const rest = PROJECTS.filter((p) => !p.featured && (filter === "all" || p.category === filter));
  const featuredShown = featured.filter((p) => filter === "all" || p.category === filter);

  return (
    <section id="projetos" className="section-padding bg-surface-900/40">
      <div className="container-site">
        <Heading
          index="02"
          label={lang === "pt" ? "projetos" : "projects"}
          title={lang === "pt" ? "Três que me representam. E todo o resto." : "Three that define me. And everything else."}
          sub={lang === "pt" ? "Clique em ▶ Assistir: cada projeto tem um mini-vídeo gerado em tempo real com Remotion." : "Hit ▶ Watch: each project has a mini video rendered live with Remotion."}
        />

        <div className="mb-10 flex flex-wrap gap-2" role="tablist">
          {FILTERS.map((f) => (
            <button key={f.key} role="tab" aria-selected={filter === f.key} onClick={() => setFilter(f.key)}
              className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors ${filter === f.key ? "text-white" : "text-slate-400 hover:text-slate-200"}`}>
              {filter === f.key && <motion.span layoutId="pill" className="absolute inset-0 rounded-full bg-brand-500" transition={{ type: "spring", bounce: 0.25 }} />}
              <span className="relative">{f[lang]}</span>
            </button>
          ))}
        </div>

        {featuredShown.length > 0 && (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featuredShown.map((p) => <Featured key={p.slug} p={p} i={featured.indexOf(p)} lang={lang} onOpen={() => setOpen(p)} />)}
          </div>
        )}

        <motion.div layout className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {rest.map((p) => (
              <motion.button layout key={p.slug} onClick={() => setOpen(p)}
                initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
                className="group surface-card rounded-2xl p-5 text-left hover:border-surface-500 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ background: p.color }} />
                  <Play size={14} className="text-slate-600 group-hover:text-white transition-colors" />
                </div>
                <h3 className="mt-3 font-bold text-slate-100">{p.name}</h3>
                <p className="mt-1 text-sm text-slate-400">{pick(p.tagline, lang)}</p>
                <p className="mt-3 font-mono text-[11px] text-slate-500">{p.stack.join(" · ")}{p.status ? ` · ${pick(p.status, lang)}` : ""}</p>
              </motion.button>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(null)} role="dialog" aria-modal aria-label={open.name}>
            <motion.div initial={{ y: 40, scale: 0.95 }} animate={{ y: 0, scale: 1 }} exit={{ y: 40, scale: 0.95 }}
              className="w-full max-w-4xl rounded-3xl border border-surface-600 bg-surface-900 p-4 md:p-6" onClick={(e) => e.stopPropagation()}>
              <div className="mb-4 flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-2xl font-extrabold text-slate-100">{open.name}</h3>
                  <p className="text-slate-400">{pick(open.tagline, lang)}</p>
                </div>
                <button onClick={() => setOpen(null)} aria-label={lang === "pt" ? "Fechar" : "Close"} className="rounded-xl p-2 text-slate-400 hover:bg-surface-700 hover:text-white"><X size={20} /></button>
              </div>
              <ProjectReelPlayer slug={open.slug} lang={lang} />
              {open.url ? (
                <a href={open.url} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-1.5 text-sm text-brand-300 hover:text-brand-200">
                  {lang === "pt" ? "Abrir no GitHub" : "Open on GitHub"}<ArrowUpRight size={15} />
                </a>
              ) : (
                <p className="mt-4 text-sm text-slate-500">{lang === "pt" ? "Código privado ou de cliente." : "Private or client code."}</p>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
