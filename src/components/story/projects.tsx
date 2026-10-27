"use client";

import { useLocale } from "next-intl";
import { ArrowUpRight, Lock } from "lucide-react";
import { ALL_PROJECTS, langOf, pick } from "@/content/profile";
import { Reveal, SectionHead } from "./reveal";

export function Projects() {
  const lang = langOf(useLocale());
  const pt = lang === "pt";
  return (
    <section aria-labelledby="proj-t" id="projetos" className="border-t border-line py-24">
      <div className="wrap">
        <SectionHead id="proj-t" kicker={pt ? "Independentes" : "Independent"} title={pt ? "Projetos próprios." : "Own projects."}
          sub={pt ? "Selecionados pelo estágio e pela relevância para o meu foco. Experimentos sem continuidade ficaram de fora." : "Selected by maturity and relevance to my focus. One-off experiments were left out."} />
        <ol className="border-t border-ink">
          {ALL_PROJECTS.map((p, i) => {
            const inner = (
              <>
                <span className="font-mono text-sm text-muted">{String(i + 1).padStart(2, "0")}</span>
                <span>
                  <span className="block font-serif text-2xl md:text-3xl">{p.name}</span>
                  <span className="mt-1 inline-block rounded-full border border-line px-2.5 py-0.5 font-mono text-xs">{pick(p.status, lang)}</span>
                </span>
                <span className="text-muted md:text-right">{pick(p.desc, lang)}<span className="block font-mono text-xs">{p.stack}</span></span>
                <span aria-hidden className="hidden md:block">{p.url ? <ArrowUpRight className="transition-transform group-hover:-translate-x-0 group-hover:-translate-y-1" /> : <Lock size={18} className="text-muted" />}</span>
              </>
            );
            const cls = "group grid grid-cols-[2.5rem_1fr] items-start gap-x-4 gap-y-2 border-b border-line py-5 md:grid-cols-[3rem_1fr_1.2fr_2rem]";
            return (
              <Reveal as="li" key={p.name} delay={i * 0.03}>
                {p.url ? <a href={p.url} rel="noopener noreferrer" className={`${cls} hover:bg-surface`}>{inner}<span className="sr-only"> ({pt ? "abre o GitHub" : "opens GitHub"})</span></a> : <div className={cls}>{inner}<span className="sr-only"> ({pt ? "código privado" : "private code"})</span></div>}
              </Reveal>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
