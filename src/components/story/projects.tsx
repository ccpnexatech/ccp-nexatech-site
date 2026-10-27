"use client";

import { useLocale } from "next-intl";
import { ArrowUpRight } from "lucide-react";
import { ALL_PROJECTS, langOf, pick } from "@/content/profile";
import { Reveal, SectionHead } from "./reveal";

export function Projects() {
  const lang = langOf(useLocale());
  const pt = lang === "pt";
  return (
    <section aria-labelledby="proj-t" id="projetos" className="border-t border-line py-24">
      <div className="wrap">
        <SectionHead id="proj-t" kicker={pt ? "Índice" : "Index"} title={pt ? "Todos os projetos." : "Every project."} />
        <ol className="border-t border-ink">
          {ALL_PROJECTS.map((p, i) => {
            const inner = (
              <>
                <span className="font-mono text-sm text-muted">{String(i + 1).padStart(2, "0")}</span>
                <span className="font-serif text-2xl md:text-3xl">{p.name}</span>
                <span className="text-muted md:text-right">{pick(p.desc, lang)}<span className="block font-mono text-xs">{p.stack}</span></span>
                <span aria-hidden className="hidden md:block">{p.url ? <ArrowUpRight className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" /> : null}</span>
              </>
            );
            const cls = "group grid grid-cols-[2.5rem_1fr] items-baseline gap-x-4 gap-y-1 border-b border-line py-5 md:grid-cols-[3rem_1fr_1.2fr_2rem]";
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
