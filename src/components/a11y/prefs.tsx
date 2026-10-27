"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { MotionConfig } from "framer-motion";

export type Contrast = "normal" | "high" | "dark";
export type Prefs = {
  contrast: Contrast;
  font: 0 | 1 | 2 | 3 | 4;
  motion: "auto" | "reduced";
  underline: boolean;
  spacing: boolean;
  legible: boolean;
  guide: boolean;
  libras: boolean;
};

export const FONT_SCALE = [100, 112.5, 125, 140, 160] as const;
export const DEFAULT_PREFS: Prefs = { contrast: "normal", font: 0, motion: "auto", underline: false, spacing: false, legible: false, guide: false, libras: false };
export const PREFS_KEY = "caio-a11y";

// Roda antes da hidratação (ver layout) para não piscar o tema errado.
export const PREFS_BOOT = `(function(){try{var p=JSON.parse(localStorage.getItem("${PREFS_KEY}")||"{}");var r=document.documentElement;
if(p.contrast==="high")r.dataset.contrast="high";if(p.contrast==="dark"||p.theme==="dark")r.dataset.theme="dark";if(p.font)r.dataset.font=String(p.font);
var rm=p.motion==="reduced"||(!p.motion&&window.matchMedia("(prefers-reduced-motion: reduce)").matches);if(rm)r.dataset.motion="reduced";
if(p.underline)r.dataset.underline="on";if(p.spacing)r.dataset.spacing="on";if(p.legible)r.dataset.legible="on";}catch(e){}})();`;

type Ctx = { prefs: Prefs; set: (p: Partial<Prefs>) => void; reset: () => void; reducedMotion: boolean };
const PrefsCtx = createContext<Ctx>({ prefs: DEFAULT_PREFS, set: () => {}, reset: () => {}, reducedMotion: false });
export const usePrefs = () => useContext(PrefsCtx);

function apply(p: Prefs, reduced: boolean) {
  const r = document.documentElement;
  const toggle = (k: string, on: boolean, val = "on") => (on ? (r.dataset[k] = val) : delete r.dataset[k]);
  toggle("contrast", p.contrast === "high", "high");
  toggle("theme", p.contrast === "dark", "dark");
  toggle("font", p.font > 0, String(p.font));
  toggle("motion", reduced, "reduced");
  toggle("underline", p.underline);
  toggle("spacing", p.spacing);
  toggle("legible", p.legible);
}

export function PrefsProvider({ children }: { children: React.ReactNode }) {
  const [prefs, setPrefs] = useState<Prefs>(DEFAULT_PREFS);
  const [systemReduced, setSystemReduced] = useState(false);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(PREFS_KEY) || "{}");
      if (saved.theme === "dark" && !saved.contrast) saved.contrast = "dark"; // versão anterior
      delete saved.theme;
      setPrefs({ ...DEFAULT_PREFS, ...saved });
    } catch {}
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setSystemReduced(mq.matches);
    const on = (e: MediaQueryListEvent) => setSystemReduced(e.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);

  const reducedMotion = prefs.motion === "reduced" || (prefs.motion === "auto" && systemReduced);

  useEffect(() => {
    apply(prefs, reducedMotion);
    try { localStorage.setItem(PREFS_KEY, JSON.stringify(prefs)); } catch {}
  }, [prefs, reducedMotion]);

  const set = useCallback((p: Partial<Prefs>) => setPrefs((old) => ({ ...old, ...p })), []);
  const reset = useCallback(() => setPrefs(DEFAULT_PREFS), []);

  return (
    <PrefsCtx.Provider value={{ prefs, set, reset, reducedMotion }}>
      <MotionConfig reducedMotion={reducedMotion ? "always" : "never"}>{children}</MotionConfig>
    </PrefsCtx.Provider>
  );
}
