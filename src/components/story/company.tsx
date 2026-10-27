"use client";

import { useLocale } from "next-intl";
import { Lock } from "lucide-react";
import { COMPANY_WORK, langOf, pick } from "@/content/profile";
import { Reveal, SectionHead } from "./reveal";

export function CompanyWork() {
  const lang = langOf(useLocale());
  const pt = lang === "pt";
  return (
    <section aria-labelledby="empresa-t" id="empresa" className="border-t border-line py-24">
      <div className="wrap">
        <SectionHead id="empresa-t" kicker={pt ? "Itarget Tecnologia" : "Itarget Tecnologia"} title={pt ? "Projetos na empresa." : "Company projects."}
          sub={pt ? "Código proprietário, sem link público. A participação é a parcela aproximada da minha atividade no GitLab da empresa desde julho de 2025." : "Proprietary code, no public link. Share is the approximate portion of my activity on the company GitLab since July 2025."} />
        <ul className="grid gap-4 md:grid-cols-2">
          {COMPANY_WORK.map((w, i) => (
            <Reveal as="li" key={w.name.pt} delay={i * 0.05} className="card flex flex-col p-6">
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-lg font-semibold">{pick(w.name, lang)}</h3>
                <span className="inline-flex shrink-0 items-center gap-1 rounded-full border border-line px-2.5 py-0.5 font-mono text-xs"><Lock size={11} aria-hidden />{w.role}</span>
              </div>
              <p className="mt-2 flex-1 text-muted">{pick(w.desc, lang)}</p>
              <p className="mt-3 font-mono text-xs text-muted">{w.stack}</p>
              <div className="mt-4">
                <div className="flex justify-between text-xs"><span className="text-muted">{pt ? "Participação na minha atividade" : "Share of my activity"}</span><span className="font-mono font-semibold">{w.share > 0 ? `${w.share}%` : "<1%"}</span></div>
                <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-line" aria-hidden><div className="h-full rounded-full bg-accent" style={{ width: `${Math.max(w.share, 1)}%` }} /></div>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
