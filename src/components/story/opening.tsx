"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
import { useLocale } from "next-intl";
import { ArrowRight, Github, Linkedin, MapPin, Play } from "lucide-react";
import { motion } from "framer-motion";
import { PROFILE, langOf, pick } from "@/content/profile";

const DocumentaryPlayer = dynamic(() => import("./players").then((m) => m.DocumentaryPlayer), {
  ssr: false,
  loading: () => <div className="aspect-video w-full animate-pulse bg-stage" />,
});

const T = {
  pt: {
    h1: "Transformo regra de negócio em apps e interfaces que funcionam em produção.",
    sub: "React Native, React e TypeScript — da conversa com a área de negócio à publicação na App Store e no Google Play.",
    available: "Disponível para novas vagas", contact: "Entrar em contato", work: "Ver competências",
    watch: "Trajetória em 30 segundos", transcript: "Ler o roteiro do vídeo", video: "Vídeo sobre a trajetória de Caio César Ponte",
    script: ["Abertura: Caio César Ponte, Desenvolvedor Front-End & Mobile, Fortaleza, 2022 a 2026.", "O que eu entrego: apps white-label em produção; migração da API legada; rotina diária de monitoramento; capacitação e code review do time.", "Capítulo 01, 2022–2024: Processos e documentação. Trainee de TI na Itarget Tecnologia.", "Do pedido à especificação: pedido, regra, processo, documento.", "Capítulo 02, 2024–atual: Front-end, mobile e integrações.", "Citação: “Programa muito bem, sem precisar repetir a orientação.” — avaliação da liderança, 2026.", "Apps em produção: app white-label em um celular, com anotações — tema e marca da configuração do cliente; estados de carregamento e erro; eventos no Firebase e sessões no Clarity.", "Código do OFIX: o tenant é obrigatório na assinatura de cada consulta.", "Encerramento: Desenvolvedor Front-End & Mobile disponível para novas oportunidades. Contato: linkedin.com/in/caio-cesar-ponte."],
  },
  en: {
    h1: "I turn business rules into apps and interfaces that work in production.",
    sub: "React Native, React and TypeScript — from the conversation with business teams to App Store and Google Play release.",
    available: "Open to new roles", contact: "Get in touch", work: "See capabilities",
    watch: "Career overview in 30 seconds", transcript: "Read the video script", video: "Video about Caio César Ponte's path",
    script: ["Opening: Caio César Ponte, Front-End & Mobile Developer, Fortaleza, 2022 to 2026.", "What I deliver: white-label apps in production; legacy API migration; daily monitoring routine; team training and code review.", "Chapter 01, 2022–2024: Processes and documentation. IT trainee at Itarget Tecnologia.", "From request to specification: request, rule, process, document.", "Chapter 02, 2024–present: Front-end, mobile and integrations.", "Quote: “Codes very well, without needing guidance repeated.” — leadership review, 2026.", "Apps in production: a white-label app on a phone, annotated — theme from client config; loading and error states; Firebase events and Clarity sessions.", "OFIX code: the tenant is required in every query signature.", "Closing: Front-End & Mobile Developer available for new opportunities. Contact: linkedin.com/in/caio-cesar-ponte."],
  },
};

export function Opening() {
  const lang = langOf(useLocale());
  const t = T[lang];
  return (
    <section aria-labelledby="titulo" className="grain">
      <div className="wrap pb-14 pt-12 md:pt-16">
        <motion.div className="flex flex-wrap items-center gap-4" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Image src={PROFILE.photo} alt="" width={112} height={112} priority className="h-14 w-14 rounded-full object-cover ring-2 ring-ink" />
          <div>
            <p className="font-semibold">{PROFILE.name}</p>
            <p className="flex flex-wrap items-center gap-x-2 text-sm text-muted">{pick(PROFILE.role, lang)}<span aria-hidden>·</span><span className="inline-flex items-center gap-1"><MapPin size={13} aria-hidden />Fortaleza, CE</span></p>
          </div>
          <span className="inline-flex items-center gap-2 rounded-full border border-ok/40 px-3 py-1 text-sm font-semibold text-ok">
            <span aria-hidden className="h-2 w-2 rounded-full bg-current" />{t.available}
          </span>
        </motion.div>
        <h1 id="titulo" className="display mt-10 max-w-5xl text-[2.6rem] md:text-7xl">
          <motion.span className="block" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>{t.h1}</motion.span>
        </h1>
        <motion.p className="mt-6 max-w-2xl text-xl text-muted" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2, duration: 0.6 }}>{t.sub}</motion.p>
        <motion.div className="mt-8 flex flex-wrap gap-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
          <a href="#contato" className="btn-primary">{t.contact}<ArrowRight size={16} aria-hidden /></a>
          <a href="#entrego" className="btn-ghost">{t.work}</a>
          <a href={PROFILE.linkedin} className="btn-ghost" rel="noopener noreferrer"><Linkedin size={16} aria-hidden />LinkedIn</a>
          <a href={PROFILE.github} className="btn-ghost" rel="noopener noreferrer"><Github size={16} aria-hidden />GitHub</a>
        </motion.div>
      </div>

      <div className="bg-stage py-10 text-stage-ink">
        <div className="wrap">
          <p className="mb-4 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-stage-ink/80"><Play size={14} aria-hidden />{t.watch}</p>
          <div className="overflow-hidden rounded-xl ring-1 ring-white/10">
            <DocumentaryPlayer lang={lang} label={t.video} />
          </div>
          <details className="mt-4 text-sm text-stage-ink/90">
            <summary className="cursor-pointer font-semibold underline underline-offset-4">{t.transcript}</summary>
            <ol className="mt-3 list-decimal space-y-1.5 pl-5">{t.script.map((s) => <li key={s}>{s}</li>)}</ol>
          </details>
        </div>
      </div>
    </section>
  );
}
