"use client";

import { useLocale } from "next-intl";
import { ArrowUpRight, Github, Globe2, Linkedin, MapPin } from "lucide-react";
import { PROFILE, langOf } from "@/content/profile";

const T = {
  pt: {
    kicker: "Contato", title: "Vamos conversar pelo LinkedIn.",
    body: "É onde respondo mais rápido e onde você vê o meu histórico completo, recomendações e publicações. Envie um convite com uma linha sobre a vaga ou o projeto.",
    cta: "Conectar no LinkedIn", gh: "Ver código no GitHub",
    facts: [["Base", "Fortaleza, Ceará, Brasil"], ["Modelo", "Remoto para times internacionais · presencial em Fortaleza"], ["Idiomas", "Português nativo · inglês avançado"], ["Fuso", "UTC−3 · sobreposição com Américas e Europa"]],
  },
  en: {
    kicker: "Contact", title: "Let's talk on LinkedIn.",
    body: "It's where I reply fastest and where you'll find my full history, recommendations and posts. Send an invitation with a line about the role or project.",
    cta: "Connect on LinkedIn", gh: "See code on GitHub",
    facts: [["Based in", "Fortaleza, Ceará, Brazil"], ["Work model", "Remote for international teams · on-site in Fortaleza"], ["Languages", "Portuguese (native) · English (advanced)"], ["Time zone", "UTC−3 · overlap with the Americas and Europe"]],
  },
};

export function Contact() {
  const lang = langOf(useLocale());
  const t = T[lang];
  return (
    <section id="contato" tabIndex={-1} aria-labelledby="contato-t" className="bg-stage py-24 text-stage-ink outline-none">
      <div className="wrap grid gap-14 lg:grid-cols-[1.2fr_1fr] lg:items-center">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-[#F08A4B] [:root[data-contrast=high]_&]:text-accent">{t.kicker}</p>
          <h2 id="contato-t" className="display mt-3 text-5xl md:text-6xl">{t.title}</h2>
          <p className="mt-5 max-w-xl text-lg text-stage-ink/85">{t.body}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={PROFILE.linkedin} rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-[#0A66C2] px-6 py-3 text-base font-semibold text-white hover:bg-[#004182] [:root[data-contrast=high]_&]:bg-accent [:root[data-contrast=high]_&]:text-accent-ink">
              <Linkedin size={18} aria-hidden />{t.cta}<ArrowUpRight size={16} aria-hidden />
            </a>
            <a href={PROFILE.github} rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-stage-ink/30 px-6 py-3 text-base font-semibold hover:border-stage-ink">
              <Github size={18} aria-hidden />{t.gh}
            </a>
          </div>
        </div>
        <dl className="grid gap-5 rounded-2xl border border-stage-ink/15 p-6 md:p-8">
          {t.facts.map(([k, v], i) => (
            <div key={k}>
              <dt className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.14em] text-stage-ink/70">
                {i === 0 ? <MapPin size={16} aria-hidden className="text-[#F08A4B]" /> : <Globe2 size={16} aria-hidden className="text-[#F08A4B]" />}{k}
              </dt>
              <dd className="mt-1 pl-6">{v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
