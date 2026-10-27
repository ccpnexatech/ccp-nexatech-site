"use client";

import { useState } from "react";
import { useLocale } from "next-intl";
import { CHAPTERS, langOf, pick, type Lang } from "@/content/profile";
import { AppScreen, Phone } from "@/remotion/kit/devices";
import { Reveal, SectionHead } from "./reveal";
import { cn } from "@/lib/cn";

const STATES = { pt: ["Início", "Carregando", "Sem conexão"], en: ["Home", "Loading", "Offline"] };
const BRANDS = { pt: [["#A8410A", "Terracota"], ["#1D4ED8", "Azul"], ["#0F766E", "Verde"]], en: [["#A8410A", "Terracotta"], ["#1D4ED8", "Blue"], ["#0F766E", "Green"]] };

/** Celular interativo: troca o estado da tela e a marca do cliente (white-label). */
function PhoneLab({ lang }: { lang: Lang }) {
  const [step, setStep] = useState(0);
  const [brand, setBrand] = useState(BRANDS.pt[0][0]);
  const pt = lang === "pt";
  return (
    <div className="card grid gap-6 p-5 sm:grid-cols-[auto_1fr] sm:items-center md:p-7">
      <div className="mx-auto" aria-hidden>
        <div style={{ width: 240, height: 496 }}><div style={{ transform: "scale(0.8)", transformOrigin: "top left" }}><Phone><AppScreen brand={brand} step={step} lang={lang} /></Phone></div></div>
      </div>
      <div>
        <p className="kicker">{pt ? "Demonstração interativa" : "Interactive demo"}</p>
        <h3 className="mt-2 font-serif text-2xl">{pt ? "Apps white-label: marca e estados de tela" : "White-label apps: brand and screen states"}</h3>
        <p className="mt-2 text-muted">{pt ? "Um mesmo código atende vários clientes. Altere a marca e o estado da tela: carregamento e ausência de conexão são tratados em todas as telas." : "One codebase serves multiple clients. Change the brand and screen state: loading and offline are handled on every screen."}</p>
        <fieldset className="mt-5">
          <legend className="text-sm font-semibold">{pt ? "Estado da tela" : "Screen state"}</legend>
          <div className="mt-2 flex flex-wrap gap-2">
            {STATES[lang].map((s, i) => (
              <button key={s} type="button" aria-pressed={step === i} onClick={() => setStep(i)} className={cn("rounded-full border px-4 py-2 text-sm font-semibold", step === i ? "border-ink bg-ink text-paper" : "border-line hover:border-ink")}>{s}</button>
            ))}
          </div>
        </fieldset>
        <fieldset className="mt-4">
          <legend className="text-sm font-semibold">{pt ? "Marca do cliente" : "Client brand"}</legend>
          <div className="mt-2 flex gap-2">
            {BRANDS[lang].map(([c, n]) => (
              <button key={c} type="button" aria-pressed={brand === c} aria-label={n} onClick={() => setBrand(c)} className={cn("h-10 w-10 rounded-full border-4", brand === c ? "border-ink" : "border-transparent")} style={{ background: c }} />
            ))}
          </div>
        </fieldset>
        <p className="sr-only" aria-live="polite">{STATES[lang][step]} · {BRANDS[lang].find((b) => b[0] === brand)?.[1]}</p>
      </div>
    </div>
  );
}

export function Chapters() {
  const lang = langOf(useLocale());
  return (
    <section aria-labelledby="capitulos-t" id="capitulos" className="py-24">
      <div className="wrap">
        <SectionHead id="capitulos-t" kicker={lang === "pt" ? "Trajetória" : "Path"} title={lang === "pt" ? "Experiência profissional." : "Professional experience."} />
        <ol className="space-y-24">
          {CHAPTERS.map((c) => (
            <li key={c.n} className="grid gap-8 md:grid-cols-[180px_1fr]">
              <Reveal>
                <div className="md:sticky md:top-28">
                  <p aria-hidden className="font-serif text-[7rem] leading-none text-line [-webkit-text-stroke:1px_rgb(var(--muted))] [color:transparent]">{c.n}</p>
                  <p className="mt-2 font-mono text-xs uppercase tracking-[0.16em] text-accent">{pick(c.years, lang)}</p>
                </div>
              </Reveal>
              <div>
                <Reveal>
                  <h3 className="display text-4xl md:text-5xl"><span className="sr-only">{lang === "pt" ? "Capítulo" : "Chapter"} {c.n}: </span>{pick(c.title, lang)}</h3>
                  <p className="mt-3 text-lg font-semibold">{pick(c.lede, lang)}</p>
                </Reveal>
                <div className="mt-6 max-w-prose2 space-y-5 text-lg leading-relaxed text-ink/90">
                  {c.body.map((b, i) => <Reveal key={i} delay={i * 0.08}><p>{pick(b, lang)}</p></Reveal>)}
                </div>
                {c.quote && (
                  <Reveal>
                    <figure className="mt-10 border-l-4 border-accent pl-6">
                      <blockquote className="font-serif text-3xl italic leading-snug md:text-4xl">“{pick(c.quote.text, lang)}”</blockquote>
                      <figcaption className="mt-3 font-mono text-xs uppercase tracking-[0.16em] text-muted">— {pick(c.quote.by, lang)}</figcaption>
                    </figure>
                  </Reveal>
                )}
                {c.n === "03" && <Reveal className="mt-10"><PhoneLab lang={lang} /></Reveal>}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
