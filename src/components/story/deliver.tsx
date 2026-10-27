"use client";

import { useLocale } from "next-intl";
import { Activity, ArrowRight, MessagesSquare, Plug, Smartphone } from "lucide-react";
import { DELIVER, langOf, pick } from "@/content/profile";
import { Reveal, SectionHead } from "./reveal";

const ICONS = { smartphone: Smartphone, plug: Plug, activity: Activity, "messages-square": MessagesSquare } as const;

export function DeliverSection() {
  const lang = langOf(useLocale());
  const pt = lang === "pt";
  return (
    <section aria-labelledby="entrego-t" id="entrego" className="py-20">
      <div className="wrap">
        <SectionHead id="entrego-t" kicker={pt ? "Competências" : "Capabilities"} title={pt ? "O que eu entrego." : "What I deliver."} />
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {DELIVER.map((d, i) => {
            const Icon = ICONS[d.icon];
            return (
              <Reveal as="li" key={d.icon} delay={i * 0.07} className="card group flex flex-col p-6 transition-colors hover:border-ink">
                <Icon size={26} strokeWidth={1.6} className="text-accent" aria-hidden />
                <h3 className="mt-5 text-lg font-semibold leading-snug">{pick(d.h, lang)}</h3>
                <p className="mt-2 flex-1 text-muted">{pick(d.p, lang)}</p>
                <a href={d.href} className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold underline-offset-4 hover:underline">
                  {pick(d.proof, lang)}<ArrowRight size={15} aria-hidden className="transition-transform group-hover:translate-x-1" />
                </a>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
