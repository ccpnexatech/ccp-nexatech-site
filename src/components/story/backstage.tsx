"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { useLocale } from "next-intl";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Check, Copy } from "lucide-react";
import { BACKSTAGE, langOf, pick } from "@/content/profile";
import { highlight } from "@/remotion/kit/code";
import { SectionHead } from "./reveal";
import { cn } from "@/lib/cn";

const BackstagePlayer = dynamic(() => import("./players").then((m) => m.BackstagePlayer), {
  ssr: false,
  loading: () => <div className="aspect-video w-full animate-pulse rounded-xl bg-line" />,
});

export function BackstageSection() {
  const lang = langOf(useLocale());
  const pt = lang === "pt";
  const [i, setI] = useState(0);
  const [copied, setCopied] = useState(false);
  const b = BACKSTAGE[i];

  const copy = async () => {
    try { await navigator.clipboard.writeText(b.code.src); setCopied(true); setTimeout(() => setCopied(false), 1800); } catch {}
  };

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    const n = (i + (e.key === "ArrowRight" ? 1 : -1) + BACKSTAGE.length) % BACKSTAGE.length;
    setI(n);
    document.getElementById(`tab-${BACKSTAGE[n].slug}`)?.focus();
  };

  return (
    <section aria-labelledby="bastidores-t" id="bastidores" className="border-y border-line bg-surface py-24">
      <div className="wrap">
        <SectionHead id="bastidores-t" kicker={pt ? "Bastidores" : "Backstage"} title={pt ? "Estudos de caso." : "Case studies."}
          sub={pt ? "Para cada projeto: o problema, as regras de negócio envolvidas, a decisão técnica e o código que a implementa." : "For each project: the problem, the business rules involved, the technical decision and the code that implements it."} />

        <div role="tablist" aria-label={pt ? "Projetos" : "Projects"} className="mb-8 flex flex-wrap gap-2" onKeyDown={onKey}>
          {BACKSTAGE.map((p, k) => (
            <button key={p.slug} id={`tab-${p.slug}`} role="tab" type="button" aria-selected={i === k} aria-controls={`panel-${p.slug}`} tabIndex={i === k ? 0 : -1} onClick={() => setI(k)}
              className={cn("relative rounded-full border px-4 py-2 text-sm font-semibold", i === k ? "border-ink text-paper" : "border-line text-ink hover:border-ink")}>
              {i === k && <motion.span layoutId="tab-pill" className="absolute inset-0 rounded-full bg-ink" transition={{ type: "spring", bounce: 0.2, duration: 0.5 }} />}
              <span className="relative">{p.name}</span>
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={b.slug} id={`panel-${b.slug}`} role="tabpanel" aria-labelledby={`tab-${b.slug}`} tabIndex={0}
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.35 }}>
            <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
              <div>
                <div className="overflow-hidden rounded-xl border border-line">
                  <BackstagePlayer slug={b.slug} lang={lang} label={pt ? `Vídeo de bastidores: ${b.name}` : `Backstage video: ${b.name}`} />
                </div>
                <p className="mt-2 text-sm text-muted">{pt ? "Vídeo renderizado com Remotion a partir dos mesmos dados desta página." : "Video rendered with Remotion from the same data as this page."}</p>
              </div>
              <dl className="space-y-6">
                <div><dt className="kicker">{pick(b.kind, lang)}</dt><dd className="mt-2 font-serif text-3xl">{b.name}</dd></div>
                <div><dt className="text-sm font-semibold uppercase tracking-wide text-muted">{pt ? "Problema" : "Problem"}</dt><dd className="mt-1 text-lg">{pick(b.ask, lang)}</dd></div>
                <div>
                  <dt className="text-sm font-semibold uppercase tracking-wide text-muted">{pt ? "Regras de negócio" : "Business rules"}</dt>
                  <dd><ul className="mt-2 space-y-2">{b.rules.map((r, k) => <li key={k} className="flex gap-3"><span aria-hidden className="mt-2 h-2 w-2 shrink-0 rounded-full bg-accent" />{pick(r, lang)}</li>)}</ul></dd>
                </div>
                <div><dt className="text-sm font-semibold uppercase tracking-wide text-muted">{pt ? "Decisão técnica" : "Technical decision"}</dt><dd className="mt-1 font-serif text-xl italic">{pick(b.decision, lang)}</dd></div>
              </dl>
            </div>

            <figure className="mt-12">
              <div className="overflow-hidden rounded-xl bg-stage text-stage-ink">
                <div className="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-2.5">
                  <span className="font-mono text-xs text-stage-ink/80">{b.code.file}</span>
                  <button type="button" onClick={copy} className="inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-xs font-semibold text-stage-ink hover:bg-white/10">
                    {copied ? <Check size={14} aria-hidden /> : <Copy size={14} aria-hidden />}{copied ? (pt ? "Copiado" : "Copied") : (pt ? "Copiar código" : "Copy code")}
                  </button>
                </div>
                <pre className="overflow-x-auto p-5 text-[0.85rem] leading-relaxed" tabIndex={0} aria-label={pt ? `Código: ${b.code.file}` : `Code: ${b.code.file}`}>
                  <code>{b.code.src.split("\n").map((l, k) => <div key={k} className={cn(l.includes("//") && "-mx-5 border-l-[3px] border-[#F08A4B] bg-[#F08A4B]/10 px-5")}><span aria-hidden className="mr-4 inline-block w-6 select-none text-right text-stage-ink/60">{k + 1}</span>{highlight(l)}</div>)}</code>
                </pre>
              </div>
              <figcaption className="mt-2 text-sm text-muted">{pick(b.code.note, lang)} {pt ? "A linha destacada implementa a regra de negócio." : "The highlighted line implements the business rule."}</figcaption>
            </figure>

            <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6">
              <p className="max-w-2xl"><span className="font-semibold">{pt ? "Resultado: " : "Outcome: "}</span>{pick(b.outcome, lang)}</p>
              <div className="flex flex-wrap items-center gap-2">
                {b.stack.map((s) => <span key={s} className="rounded-full border border-line px-3 py-1 font-mono text-xs">{s}</span>)}
                {b.url && <a href={b.url} className="btn-ghost" rel="noopener noreferrer">{pt ? "Ver no GitHub" : "View on GitHub"}<ArrowUpRight size={15} aria-hidden /></a>}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
