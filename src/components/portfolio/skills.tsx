"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { PROFILE, PROJECTS, SKILL_GROUPS, GOALS, EDUCATION, langOf, pick, type Lang } from "@/content/profile";
import { Heading } from "./heading";

function answer(cmd: string, lang: Lang): string[] {
  const c = cmd.trim().toLowerCase();
  const pt = lang === "pt";
  switch (c) {
    case "help": case "ajuda":
      return [pt ? "comandos: whoami · stack · projetos · formacao · objetivos · contato · clear" : "commands: whoami · stack · projects · education · goals · contact · clear"];
    case "whoami": return [`${PROFILE.name} — ${pick(PROFILE.role, lang)}`, PROFILE.location];
    case "stack": return SKILL_GROUPS.map((g) => `${pick(g.label, lang)}: ${g.items.join(", ")}`);
    case "projetos": case "projects": return PROJECTS.map((p) => `• ${p.name} — ${pick(p.tagline, lang)}`);
    case "formacao": case "formação": case "education": return EDUCATION.map((e) => `• ${pick(e.title, lang)} — ${pick(e.org, lang)}`);
    case "objetivos": case "goals": return GOALS.map((g) => `• [${pick(g.horizon, lang)}] ${pick(g.title, lang)}`);
    case "contato": case "contact": return [PROFILE.email, PROFILE.linkedin, PROFILE.github];
    case "sudo hire caio": case "sudo contratar caio": return [pt ? "✔ permissão concedida. Role até o contato 👇" : "✔ permission granted. Scroll to contact 👇"];
    case "": return [];
    default: return [pt ? `comando não encontrado: ${c} — digite "ajuda"` : `command not found: ${c} — type "help"`];
  }
}

function Terminal({ lang }: { lang: Lang }) {
  const [lines, setLines] = useState<{ cmd?: string; out: string[] }[]>([{ out: [lang === "pt" ? 'Bem-vindo. Digite "ajuda" ou clique num comando.' : 'Welcome. Type "help" or click a command.'] }]);
  const [v, setV] = useState("");
  const box = useRef<HTMLDivElement>(null);
  useEffect(() => { box.current?.scrollTo({ top: box.current.scrollHeight, behavior: "smooth" }); }, [lines]);
  const run = (cmd: string) => {
    if (cmd.trim().toLowerCase() === "clear") return setLines([]);
    setLines((l) => [...l, { cmd, out: answer(cmd, lang) }]);
  };
  const quick = lang === "pt" ? ["whoami", "stack", "projetos", "objetivos", "sudo contratar caio"] : ["whoami", "stack", "projects", "goals", "sudo hire caio"];
  return (
    <div className="overflow-hidden rounded-3xl border border-surface-600/60 bg-[#070B14] font-mono text-sm shadow-2xl">
      <div className="flex items-center gap-2 border-b border-surface-700 px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-red-500/80" /><span className="h-3 w-3 rounded-full bg-yellow-500/80" /><span className="h-3 w-3 rounded-full bg-green-500/80" />
        <span className="ml-3 text-xs text-slate-500">caio@fortaleza:~</span>
      </div>
      <div ref={box} className="h-72 overflow-y-auto p-4 space-y-2" onClick={() => document.getElementById("term-in")?.focus()}>
        {lines.map((l, i) => (
          <div key={i}>
            {l.cmd !== undefined && <p><span className="text-emerald-400">➜</span> <span className="text-brand-300">~</span> {l.cmd}</p>}
            {l.out.map((o, k) => <p key={k} className="text-slate-400 break-words">{o}</p>)}
          </div>
        ))}
        <form onSubmit={(e) => { e.preventDefault(); run(v); setV(""); }} className="flex gap-2">
          <span className="text-emerald-400">➜</span><span className="text-brand-300">~</span>
          <input id="term-in" value={v} onChange={(e) => setV(e.target.value)} aria-label="terminal" autoComplete="off" spellCheck={false}
            className="flex-1 bg-transparent text-slate-100 outline-none caret-accent-400" />
        </form>
      </div>
      <div className="flex flex-wrap gap-2 border-t border-surface-700 p-3">
        {quick.map((q) => <button key={q} onClick={() => run(q)} className="rounded-lg bg-surface-800 px-2.5 py-1 text-xs text-slate-300 hover:bg-surface-700 hover:text-white">{q}</button>)}
      </div>
    </div>
  );
}

export function Skills() {
  const lang = langOf(useLocale());
  const [active, setActive] = useState<string>(SKILL_GROUPS[0].key);
  const group = SKILL_GROUPS.find((g) => g.key === active)!;
  return (
    <section id="stack" className="section-padding bg-surface-900/40">
      <div className="container-site">
        <Heading index="04" label="stack" title={lang === "pt" ? "Ferramentas que uso de verdade." : "Tools I actually use."} sub={lang === "pt" ? "Explore por área — ou converse com o terminal." : "Browse by area — or talk to the terminal."} />
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <div className="mb-6 flex flex-wrap gap-2">
              {SKILL_GROUPS.map((g) => (
                <button key={g.key} onClick={() => setActive(g.key)} onMouseEnter={() => setActive(g.key)}
                  className={`rounded-xl px-4 py-2 text-sm font-medium transition-all ${active === g.key ? "bg-accent-500 text-white scale-105" : "surface-card text-slate-400 hover:text-slate-200"}`}>
                  {pick(g.label, lang)}
                </button>
              ))}
            </div>
            <div className="flex min-h-[180px] flex-wrap content-start gap-3">
              <AnimatePresence mode="popLayout">
                {group.items.map((s, i) => (
                  <motion.span key={group.key + s} layout initial={{ opacity: 0, y: 20, rotate: -4 }} animate={{ opacity: 1, y: 0, rotate: 0, transition: { delay: i * 0.04 } }} exit={{ opacity: 0, scale: 0.8 }}
                    whileHover={{ scale: 1.08, rotate: -2 }}
                    className="cursor-default rounded-2xl border border-surface-600/60 bg-surface-800 px-4 py-2.5 text-base font-semibold text-slate-200">
                    {s}
                  </motion.span>
                ))}
              </AnimatePresence>
            </div>
          </div>
          <Terminal lang={lang} />
        </div>
      </div>
    </section>
  );
}
