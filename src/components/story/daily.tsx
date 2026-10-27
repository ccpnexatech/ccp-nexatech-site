"use client";

import { useState } from "react";
import { useLocale } from "next-intl";
import { motion } from "framer-motion";
import { DAILY, TOOLBOX, langOf, pick } from "@/content/profile";
import { Reveal, SectionHead } from "./reveal";
import { cn } from "@/lib/cn";

export function Daily() {
  const lang = langOf(useLocale());
  const pt = lang === "pt";
  const [tool, setTool] = useState<string | null>(null);
  return (
    <section aria-labelledby="dia-t" id="dia-a-dia" className="py-24">
      <div className="wrap">
        <SectionHead id="dia-t" kicker={pt ? "Dia a dia" : "Day to day"} title={pt ? "Rotina de trabalho." : "Working routine."}
          sub={pt ? "Selecione uma ferramenta para ver em que etapa ela é usada." : "Select a tool to see which step uses it."} />
        <div className="grid gap-12 lg:grid-cols-[1fr_340px]">
          <ol className="relative space-y-4 border-l-2 border-line pl-8">
            {DAILY.map((d, i) => {
              const hit = tool ? d.tools.includes(tool) : true;
              return (
                <Reveal as="li" key={i} delay={i * 0.05} className={cn("relative rounded-2xl border p-5 transition-all", hit ? "border-line bg-surface" : "border-transparent opacity-40")}>
                    <span aria-hidden className={cn("absolute -left-[42px] top-6 h-4 w-4 rounded-full border-2 border-paper", hit ? "bg-accent" : "bg-line")} />
                    <p className="font-mono text-xs uppercase tracking-[0.16em] text-accent">{pick(d.when, lang)}</p>
                    <p className="mt-1 text-lg">{pick(d.what, lang)}</p>
                    <p className="mt-2 font-mono text-xs text-muted">{d.tools.join(" · ")}</p>
                </Reveal>
              );
            })}
          </ol>
          <div>
            <div className="lg:sticky lg:top-28">
              <p className="text-sm font-semibold" id="caixa">{pt ? "Caixa de ferramentas" : "Toolbox"}</p>
              <div role="group" aria-labelledby="caixa" className="mt-3 space-y-5">
                {TOOLBOX.map((g) => (
                  <div key={g.group.pt}>
                    <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted">{pick(g.group, lang)}</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {g.items.map((it) => {
                        const used = DAILY.some((d) => d.tools.includes(it));
                        return (
                          <motion.button key={it} type="button" whileTap={{ scale: 0.95 }} aria-pressed={tool === it} disabled={!used}
                            onClick={() => setTool(tool === it ? null : it)}
                            className={cn("rounded-full border px-3 py-1.5 text-sm", tool === it ? "border-ink bg-ink text-paper" : used ? "border-ink/30 hover:border-ink" : "cursor-default border-line text-muted")}>
                            {it}
                          </motion.button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-sm text-muted" aria-live="polite">{tool ? (pt ? `Mostrando onde uso ${tool}.` : `Showing where I use ${tool}.`) : (pt ? "Ferramentas com borda escura fazem parte da rotina." : "Tools with a dark border are part of the routine.")}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
