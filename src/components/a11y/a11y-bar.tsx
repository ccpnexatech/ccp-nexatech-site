"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { useLocale } from "next-intl";
import {
  Accessibility, AudioLines, BookOpenText, Contrast, Hand, Minus, MoveHorizontal, Pause, Plus, RotateCcw, Ruler, Type, Underline, X,
} from "lucide-react";
import { FONT_SCALE, usePrefs, type Contrast as ContrastMode, type Prefs } from "./prefs";
import { cn } from "@/lib/cn";

const T = {
  pt: {
    region: "Barra de acessibilidade", shortcuts: "Atalhos de teclado",
    skip: [["#conteudo", "Ir para o conteúdo", "1"], ["#menu", "Ir para o menu", "2"], ["#contato", "Ir para o contato", "3"]] as const,
    open: "Acessibilidade", close: "Fechar painel de acessibilidade", panel: "Opções de acessibilidade",
    quickContrast: "Alto contraste", smaller: "Diminuir texto", bigger: "Aumentar texto", size: "Tamanho do texto",
    visual: "Visual", contrastLabel: "Contraste", modes: { normal: "Padrão", high: "Alto contraste", dark: "Escuro" },
    reading: "Leitura", legible: "Fonte de alta legibilidade", spacing: "Espaçamento do texto", underline: "Sublinhar links", guide: "Guia de leitura",
    motionGroup: "Movimento", motion: "Reduzir movimento", motionHint: "Pausa vídeos e animações",
    listen: "Ouvir e Libras", speak: "Ouvir trecho", stop: "Parar leitura", speakHint: "Lê o texto selecionado ou a seção visível",
    libras: "Libras (VLibras)", librasHint: "Tradutor oficial do Governo Federal",
    reset: "Restaurar padrões", status: "Preferências salvas neste navegador.",
  },
  en: {
    region: "Accessibility bar", shortcuts: "Keyboard shortcuts",
    skip: [["#conteudo", "Skip to content", "1"], ["#menu", "Skip to menu", "2"], ["#contato", "Skip to contact", "3"]] as const,
    open: "Accessibility", close: "Close accessibility panel", panel: "Accessibility options",
    quickContrast: "High contrast", smaller: "Smaller text", bigger: "Larger text", size: "Text size",
    visual: "Visual", contrastLabel: "Contrast", modes: { normal: "Default", high: "High contrast", dark: "Dark" },
    reading: "Reading", legible: "High-legibility font", spacing: "Text spacing", underline: "Underline links", guide: "Reading guide",
    motionGroup: "Motion", motion: "Reduce motion", motionHint: "Pauses videos and animations",
    listen: "Listen", speak: "Read aloud", stop: "Stop reading", speakHint: "Reads the selected text or the visible section",
    libras: "", librasHint: "",
    reset: "Reset to defaults", status: "Preferences saved in this browser.",
  },
};

/** Interruptor acessível (role=switch). */
function Switch({ on, onChange, label, hint, icon: Icon }: { on: boolean; onChange: (v: boolean) => void; label: string; hint?: string; icon: typeof Type }) {
  const id = useId();
  return (
    <button type="button" role="switch" aria-checked={on} aria-describedby={hint ? id : undefined} onClick={() => onChange(!on)}
      className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left hover:bg-ink/5">
      <Icon size={18} aria-hidden className="shrink-0 text-muted" />
      <span className="flex-1">
        <span className="block text-sm font-semibold">{label}</span>
        {hint && <span id={id} className="block text-xs text-muted">{hint}</span>}
      </span>
      <span aria-hidden className={cn("relative h-6 w-11 shrink-0 rounded-full border-2 transition-colors", on ? "border-accent bg-accent" : "border-muted bg-transparent")}>
        <span className={cn("absolute top-0.5 h-4 w-4 rounded-full transition-all", on ? "left-[22px] bg-accent-ink" : "left-0.5 bg-muted")} />
      </span>
    </button>
  );
}

/** Lê em voz alta (Web Speech API) o texto selecionado ou a seção mais visível. */
function useSpeech(lang: "pt" | "en") {
  const [speaking, setSpeaking] = useState(false);
  const [supported, setSupported] = useState(false);
  useEffect(() => setSupported("speechSynthesis" in window), []);
  const stop = useCallback(() => { if (supported) window.speechSynthesis.cancel(); setSpeaking(false); }, [supported]);
  const speak = useCallback(() => {
    if (!supported) return;
    let text = window.getSelection()?.toString().trim() ?? "";
    if (!text) {
      const sections = [...document.querySelectorAll<HTMLElement>("main section")];
      const mid = window.innerHeight / 2;
      const current = sections.find((s) => { const r = s.getBoundingClientRect(); return r.top <= mid && r.bottom >= mid; }) ?? sections[0];
      text = current?.innerText ?? "";
    }
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text.slice(0, 4000));
    u.lang = lang === "pt" ? "pt-BR" : "en-US";
    u.rate = 1;
    u.onend = () => setSpeaking(false);
    u.onerror = () => setSpeaking(false);
    setSpeaking(true);
    window.speechSynthesis.speak(u);
  }, [lang, supported]);
  useEffect(() => stop, [stop]);
  return { speaking, speak, stop, supported };
}

/** VLibras: carregado só quando a pessoa ativa. */
function useVLibras(on: boolean) {
  useEffect(() => {
    if (!on) {
      document.getElementById("vlibras-root")?.remove();
      return;
    }
    if (document.getElementById("vlibras-root")) return;
    const root = document.createElement("div");
    root.id = "vlibras-root";
    root.setAttribute("vw", "");
    root.className = "enabled";
    root.innerHTML = '<div vw-access-button class="active"></div><div vw-plugin-wrapper><div class="vw-plugin-top-wrapper"></div></div>';
    document.body.appendChild(root);
    const s = document.createElement("script");
    s.src = "https://vlibras.gov.br/app/vlibras-plugin.js";
    s.onload = () => {
      const w = window as unknown as { VLibras?: { Widget: new (url: string) => unknown } };
      if (w.VLibras) new w.VLibras.Widget("https://vlibras.gov.br/app");
    };
    document.body.appendChild(s);
  }, [on]);
}

/** Faixa horizontal que acompanha o ponteiro para guiar a leitura linha a linha. */
function ReadingGuide() {
  const [y, setY] = useState(-100);
  useEffect(() => {
    const on = (e: PointerEvent) => setY(e.clientY);
    window.addEventListener("pointermove", on, { passive: true });
    return () => window.removeEventListener("pointermove", on);
  }, []);
  return (
    <div aria-hidden className="pointer-events-none fixed inset-x-0 z-[70]" style={{ top: y - 22, height: 44, boxShadow: "0 0 0 100vmax rgba(0,0,0,0.35)", borderTop: "2px solid rgb(var(--accent))", borderBottom: "2px solid rgb(var(--accent))" }} />
  );
}

export function A11yBar() {
  const lang = useLocale() === "en" ? "en" : "pt";
  const t = T[lang];
  const { prefs, set, reset, reducedMotion } = usePrefs();
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const openerRef = useRef<HTMLButtonElement>(null);
  const { speaking, speak, stop, supported } = useSpeech(lang);
  useVLibras(lang === "pt" && prefs.libras);

  // Atalhos estilo gov.br: Alt+1, Alt+2, Alt+3
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) { setOpen(false); openerRef.current?.focus(); return; }
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
  }, [t, reducedMotion, open]);

  useEffect(() => {
    if (open) panelRef.current?.querySelector<HTMLElement>("button, [href]")?.focus();
  }, [open]);

  const font = (d: 1 | -1) => set({ font: Math.max(0, Math.min(4, prefs.font + d)) as Prefs["font"] });
  const pill = (active: boolean) => cn("inline-flex h-9 items-center gap-1.5 rounded-lg px-3 text-sm font-semibold transition-colors", active ? "bg-accent text-accent-ink" : "text-paper hover:bg-paper/15");

  return (
    <>
      <div role="region" aria-label={t.region} className="relative z-[60] border-b border-black bg-[#17140F] text-[#F7F3EC] [:root[data-contrast=high]_&]:border-white [:root[data-contrast=high]_&]:bg-black" style={{ ["--paper" as string]: "247 243 236" }}>
        <div className="wrap flex flex-wrap items-center justify-between gap-x-4 gap-y-1 py-1.5">
          <nav aria-label={t.shortcuts}>
            <ul className="flex flex-wrap gap-x-4 gap-y-1 text-sm">
              {t.skip.map(([href, label, key]) => (
                <li key={href}><a href={href} accessKey={key} className="inline-flex h-9 items-center gap-1.5 rounded px-1 text-paper hover:underline">{label}<kbd className="rounded bg-paper/15 px-1.5 font-mono text-xs">{key}</kbd></a></li>
              ))}
            </ul>
          </nav>
          <div className="flex items-center gap-1">
            <button type="button" aria-pressed={prefs.contrast === "high"} onClick={() => set({ contrast: prefs.contrast === "high" ? "normal" : "high" })} className={pill(prefs.contrast === "high")}>
              <Contrast size={16} aria-hidden /><span className="hidden sm:inline">{t.quickContrast}</span><span className="sr-only sm:hidden">{t.quickContrast}</span>
            </button>
            <div role="group" aria-label={t.size} className="flex items-center rounded-lg border border-paper/25">
              <button type="button" onClick={() => font(-1)} disabled={prefs.font === 0} aria-label={t.smaller} className={cn(pill(false), "disabled:opacity-40")}>A<Minus size={12} aria-hidden /></button>
              <output aria-live="polite" className="min-w-[3.2rem] text-center font-mono text-xs">{FONT_SCALE[prefs.font]}%</output>
              <button type="button" onClick={() => font(1)} disabled={prefs.font === 4} aria-label={t.bigger} className={cn(pill(false), "disabled:opacity-40")}>A<Plus size={12} aria-hidden /></button>
            </div>
            <button ref={openerRef} type="button" aria-expanded={open} aria-controls="a11y-panel" onClick={() => setOpen((v) => !v)} className={pill(open)}>
              <Accessibility size={18} aria-hidden />{t.open}
            </button>
          </div>
        </div>
      </div>

      {open && (
        <div id="a11y-panel" ref={panelRef} role="dialog" aria-modal="false" aria-labelledby="a11y-panel-title"
          className="fixed right-3 top-14 z-[65] max-h-[calc(100vh-5rem)] w-[min(24rem,calc(100vw-1.5rem))] overflow-y-auto rounded-2xl border border-line bg-surface p-4 text-ink shadow-2xl">
          <div className="mb-2 flex items-center justify-between">
            <h2 id="a11y-panel-title" className="flex items-center gap-2 text-base font-semibold"><Accessibility size={18} aria-hidden />{t.panel}</h2>
            <button type="button" onClick={() => { setOpen(false); openerRef.current?.focus(); }} aria-label={t.close} className="rounded-lg p-2 hover:bg-ink/5"><X size={18} aria-hidden /></button>
          </div>

          <fieldset className="mt-2">
            <legend className="px-3 text-xs font-semibold uppercase tracking-wide text-muted">{t.visual}</legend>
            <div role="radiogroup" aria-label={t.contrastLabel} className="mx-3 mt-2 grid grid-cols-3 gap-1 rounded-xl border border-line p-1">
              {(["normal", "high", "dark"] as ContrastMode[]).map((m) => (
                <button key={m} type="button" role="radio" aria-checked={prefs.contrast === m} onClick={() => set({ contrast: m })}
                  className={cn("rounded-lg px-2 py-2 text-xs font-semibold", prefs.contrast === m ? "bg-ink text-paper" : "hover:bg-ink/5")}>{t.modes[m]}</button>
              ))}
            </div>
            <div className="mx-3 mt-3 flex items-center justify-between">
              <span className="text-sm font-semibold" id="size-l">{t.size}</span>
              <div role="group" aria-labelledby="size-l" className="flex items-center gap-1">
                <button type="button" onClick={() => font(-1)} disabled={prefs.font === 0} aria-label={t.smaller} className="rounded-lg border border-line p-2 disabled:opacity-40"><Minus size={14} aria-hidden /></button>
                <span className="min-w-[3.5rem] text-center font-mono text-sm">{FONT_SCALE[prefs.font]}%</span>
                <button type="button" onClick={() => font(1)} disabled={prefs.font === 4} aria-label={t.bigger} className="rounded-lg border border-line p-2 disabled:opacity-40"><Plus size={14} aria-hidden /></button>
              </div>
            </div>
          </fieldset>

          <fieldset className="mt-4">
            <legend className="px-3 text-xs font-semibold uppercase tracking-wide text-muted">{t.reading}</legend>
            <Switch icon={Type} label={t.legible} on={prefs.legible} onChange={(v) => set({ legible: v })} />
            <Switch icon={MoveHorizontal} label={t.spacing} on={prefs.spacing} onChange={(v) => set({ spacing: v })} />
            <Switch icon={Underline} label={t.underline} on={prefs.underline} onChange={(v) => set({ underline: v })} />
            <Switch icon={Ruler} label={t.guide} on={prefs.guide} onChange={(v) => set({ guide: v })} />
          </fieldset>

          <fieldset className="mt-4">
            <legend className="px-3 text-xs font-semibold uppercase tracking-wide text-muted">{t.motionGroup}</legend>
            <Switch icon={Pause} label={t.motion} hint={t.motionHint} on={reducedMotion} onChange={(v) => set({ motion: v ? "reduced" : "auto" })} />
          </fieldset>

          <fieldset className="mt-4">
            <legend className="px-3 text-xs font-semibold uppercase tracking-wide text-muted">{t.listen}</legend>
            {supported && (
              <button type="button" onClick={speaking ? stop : speak} aria-pressed={speaking} className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left hover:bg-ink/5">
                <AudioLines size={18} aria-hidden className="text-muted" />
                <span className="flex-1"><span className="block text-sm font-semibold">{speaking ? t.stop : t.speak}</span><span className="block text-xs text-muted">{t.speakHint}</span></span>
                <BookOpenText size={16} aria-hidden className="text-muted" />
              </button>
            )}
            {lang === "pt" && <Switch icon={Hand} label={t.libras} hint={t.librasHint} on={prefs.libras} onChange={(v) => set({ libras: v })} />}
          </fieldset>

          <div className="mt-4 flex items-center justify-between border-t border-line px-3 pt-3">
            <span className="text-xs text-muted">{t.status}</span>
            <button type="button" onClick={reset} className="inline-flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-sm font-semibold hover:bg-ink/5"><RotateCcw size={14} aria-hidden />{t.reset}</button>
          </div>
        </div>
      )}
      {prefs.guide && <ReadingGuide />}
    </>
  );
}
