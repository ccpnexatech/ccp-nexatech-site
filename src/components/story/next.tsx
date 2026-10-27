"use client";

import { useLocale } from "next-intl";
import { EDUCATION, GOALS, PROFILE, langOf, pick } from "@/content/profile";
import { Reveal, SectionHead } from "./reveal";

export function NextChapter() {
  const lang = langOf(useLocale());
  const pt = lang === "pt";
  return (
    <section aria-labelledby="prox-t" id="proximo" className="bg-surface py-24">
      <div className="wrap">
        <SectionHead id="prox-t" kicker={pt ? "Próximos passos" : "Next steps"} title={pt ? "Formação e objetivos." : "Education and goals."} sub={pick(PROFILE.availability, lang)} />
        <div className="grid gap-14 lg:grid-cols-2">
          <div>
            <h3 className="font-serif text-2xl">{pt ? "Objetivos" : "Goals"}</h3>
            <ol className="mt-6 space-y-6">
              {GOALS.map((g, i) => (
                <Reveal as="li" key={i} delay={i * 0.08} className="grid grid-cols-[2.5rem_1fr] gap-3">
                    <span className="font-serif text-3xl text-accent">{i + 1}</span>
                    <div><p className="text-lg font-semibold">{pick(g.title, lang)}</p><p className="mt-1 text-muted">{pick(g.text, lang)}</p></div>
                </Reveal>
              ))}
            </ol>
          </div>
          <div>
            <h3 className="font-serif text-2xl">{pt ? "Formação" : "Education"}</h3>
            <ul className="mt-6 divide-y divide-line border-y border-line">
              {EDUCATION.map((e, i) => (
                <Reveal as="li" key={i} delay={i * 0.05} className="flex flex-col py-4 sm:flex-row sm:items-baseline sm:justify-between">
                    <span className="text-lg font-semibold">{pick(e.title, lang)}</span>
                    <span className="text-muted">{pick(e.where, lang)}</span>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
