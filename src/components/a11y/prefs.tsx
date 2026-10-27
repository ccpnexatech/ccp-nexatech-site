"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { MotionConfig } from "framer-motion";

export type Prefs = {
  contrast: "normal" | "high";
  theme: "light" | "dark";
  font: 0 | 1 | 2 | 3;
  motion: "auto" | "reduced";
  underline: boolean;
  spacing: boolean;
};

const DEFAULT: Prefs = { contrast: "normal", theme: "light", font: 0, motion: "auto", underline: false, spacing: false };
const KEY = "caio-a11y";

// Roda antes da hidratação (ver layout) para não piscar o tema errado.
export const PREFS_BOOT = `(function(){try{var p=JSON.parse(localStorage.getItem("${KEY}")||"{}");var r=document.documentElement;
if(p.contrast==="high")r.dataset.contrast="high";if(p.theme==="dark")r.dataset.theme="dark";if(p.font)r.dataset.font=String(p.font);
var rm=p.motion==="reduced"||(!p.motion&&window.matchMedia("(prefers-reduced-motion: reduce)").matches);if(rm)r.dataset.motion="reduced";
if(p.underline)r.dataset.underline="on";if(p.spacing)r.dataset.spacing="on";}catch(e){}})();`;

type Ctx = { prefs: Prefs; set: (p: Partial<Prefs>) => void; reset: () => void; reducedMotion: boolean };
const PrefsCtx = createContext<Ctx>({ prefs: DEFAULT, set: () => {}, reset: () => {}, reducedMotion: false });
export const usePrefs = () => useContext(PrefsCtx);

function apply(p: Prefs, systemReduced: boolean) {
  const r = document.documentElement;
  const toggle = (k: string, on: boolean, val = "on") => (on ? (r.dataset[k] = val) : delete r.dataset[k]);
  toggle("contrast", p.contrast === "high", "high");
  toggle("theme", p.theme === "dark", "dark");
  toggle("font", p.font > 0, String(p.font));
  toggle("motion", p.motion === "reduced" || systemReduced, "reduced");
  toggle("underline", p.underline);
  toggle("spacing", p.spacing);
}

export function PrefsProvider({ children }: { children: React.ReactNode }) {
  const [prefs, setPrefs] = useState<Prefs>(DEFAULT);
  const [systemReduced, setSystemReduced] = useState(false);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(KEY) || "{}");
      setPrefs({ ...DEFAULT, ...saved });
    } catch {}
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setSystemReduced(mq.matches);
    const on = (e: MediaQueryListEvent) => setSystemReduced(e.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);

  useEffect(() => {
    apply(prefs, systemReduced && prefs.motion === "auto");
    try { localStorage.setItem(KEY, JSON.stringify(prefs)); } catch {}
  }, [prefs, systemReduced]);

  const set = useCallback((p: Partial<Prefs>) => setPrefs((old) => ({ ...old, ...p })), []);
  const reset = useCallback(() => setPrefs(DEFAULT), []);
  const reducedMotion = prefs.motion === "reduced" || (prefs.motion === "auto" && systemReduced);

  return (
    <PrefsCtx.Provider value={{ prefs, set, reset, reducedMotion }}>
      <MotionConfig reducedMotion={reducedMotion ? "always" : "never"}>{children}</MotionConfig>
    </PrefsCtx.Provider>
  );
}
