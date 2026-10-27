"use client";

import { useEffect, useState } from "react";
import { useLocale } from "next-intl";
import { Accessibility, Contrast, Moon, Sun, Pause, Play, Underline, RotateCcw, ChevronDown, Space } from "lucide-react";
import { usePrefs } from "./prefs";
import { cn } from "@/lib/cn";

const T = {
  pt: {
    skip: [["#conteudo", "Ir para o conteúdo", "1"], ["#menu", "Ir para o menu", "2"], ["#contato", "Ir para o contato", "3"]],
    label: "Acessibilidade", contrast: "Alto contraste", bigger: "Aumentar fonte", smaller: "Diminuir fonte", normal: "Fonte padrão",
    motion: "Reduzir movimento", motionOn: "Movimento reduzido", dark: "Tema escuro", light: "Tema claro", underline: "Sublinhar links", spacing: "Espaçar texto", reset: "Restaurar",
    region: "Barra de acessibilidade", shortcuts: "Atalhos de teclado",
  },
  en: {
    skip: [["#conteudo", "Skip to content", "1"], ["#menu", "Skip to menu", "2"], ["#contato", "Skip to contact", "3"]],
    label: "Accessibility", contrast: "High contrast", bigger: "Larger text", smaller: "Smaller text", normal: "Default text",
    motion: "Reduce motion", motionOn: "Motion reduced", dark: "Dark theme", light: "Light theme", underline: "Underline links", spacing: "Text spacing", reset: "Reset",
    region: "Accessibility bar", shortcuts: "Keyboard shortcuts",
  },
};

export function A11yBar() {
  const t = T[useLocale() === "en" ? "en" : "pt"];
  const { prefs, set, reset, reducedMotion } = usePrefs();
  const [open, setOpen] = useState(false);

  // Atalhos estilo gov.br: Alt+1, Alt+2, Alt+3
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!e.altKey) return;
      const hit = t.skip.find(([, , k]) => k === e.key);
      if (!hit) return;
      e.preventDefault();
      const el = document.querySelector<HTMLElement>(hit[0]);
      el?.focus({ preventScroll: true });
      el?.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth" });
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [t, reducedMotion]);

  const btn = (active: boolean) =>
    cn("inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-semibold transition-colors",
      active ? "bg-accent text-accent-ink" : "text-paper/90 hover:bg-paper/15");

  const controls = (
    <>
      <button type="button" aria-pressed={prefs.contrast === "high"} onClick={() => set({ contrast: prefs.contrast === "high" ? "normal" : "high" })} className={btn(prefs.contrast === "high")}>
        <Contrast size={14} aria-hidden />{t.contrast}
      </button>
      <span role="group" aria-label={t.label} className="inline-flex items-center rounded-md border border-paper/25">
        <button type="button" onClick={() => set({ font: Math.max(0, prefs.font - 1) as 0 })} className={btn(false)} aria-label={t.smaller}>A−</button>
        <button type="button" onClick={() => set({ font: 0 })} className={btn(prefs.font === 0)} aria-label={t.normal} aria-pressed={prefs.font === 0}>A</button>
        <button type="button" onClick={() => set({ font: Math.min(3, prefs.font + 1) as 3 })} className={btn(false)} aria-label={t.bigger}>A+</button>
      </span>
      <button type="button" aria-pressed={reducedMotion} onClick={() => set({ motion: reducedMotion ? "auto" : "reduced" })} className={btn(reducedMotion)}>
        {reducedMotion ? <Play size={14} aria-hidden /> : <Pause size={14} aria-hidden />}{reducedMotion ? t.motionOn : t.motion}
      </button>
      <button type="button" aria-pressed={prefs.theme === "dark"} onClick={() => set({ theme: prefs.theme === "dark" ? "light" : "dark" })} className={btn(prefs.theme === "dark")}>
        {prefs.theme === "dark" ? <Sun size={14} aria-hidden /> : <Moon size={14} aria-hidden />}{prefs.theme === "dark" ? t.light : t.dark}
      </button>
      <button type="button" aria-pressed={prefs.underline} onClick={() => set({ underline: !prefs.underline })} className={btn(prefs.underline)}>
        <Underline size={14} aria-hidden />{t.underline}
      </button>
      <button type="button" aria-pressed={prefs.spacing} onClick={() => set({ spacing: !prefs.spacing })} className={btn(prefs.spacing)}>
        <Space size={14} aria-hidden />{t.spacing}
      </button>
      <button type="button" onClick={reset} className={btn(false)}><RotateCcw size={14} aria-hidden />{t.reset}</button>
    </>
  );

  return (
    <div role="region" aria-label={t.region} className="relative z-[60] bg-[#17140F] text-[#F7F3EC] [:root[data-contrast=high]_&]:bg-black [:root[data-contrast=high]_&]:border-b [:root[data-contrast=high]_&]:border-white" style={{ ["--paper" as string]: "247 243 236" }}>
      <div className="wrap flex flex-wrap items-center justify-between gap-2 py-1.5">
        <nav aria-label={t.shortcuts} className="flex flex-wrap gap-x-4 gap-y-1 text-xs">
          {t.skip.map(([href, label, key]) => (
            <a key={href} href={href} accessKey={key} className="rounded px-1 py-1 text-paper/90 hover:underline">
              {label} <kbd className="ml-1 rounded bg-paper/15 px-1.5 font-mono">{key}</kbd>
            </a>
          ))}
        </nav>
        <div className="hidden flex-wrap items-center gap-1 lg:flex">{controls}</div>
        <button type="button" className="inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-semibold hover:bg-paper/15 lg:hidden"
          aria-expanded={open} aria-controls="a11y-panel" onClick={() => setOpen((v) => !v)}>
          <Accessibility size={15} aria-hidden />{t.label}<ChevronDown size={14} aria-hidden className={cn("transition-transform", open && "rotate-180")} />
        </button>
      </div>
      {open && <div id="a11y-panel" className="wrap flex flex-wrap gap-1 pb-3 lg:hidden">{controls}</div>}
    </div>
  );
}
