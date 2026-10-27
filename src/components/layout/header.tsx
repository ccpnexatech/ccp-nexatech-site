"use client";

import { useEffect, useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { LocaleSwitcher } from "./locale-switcher";
import { cn } from "@/lib/cn";

const NAV = ["about", "projects", "experience", "stack", "education", "goals"] as const;
const ANCHOR: Record<(typeof NAV)[number], string> = {
  about: "sobre", projects: "projetos", experience: "experiencia", stack: "stack", education: "formacao", goals: "objetivos",
};

export function Header() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30 });

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <header className={cn("fixed inset-x-0 top-0 z-50 transition-all duration-300", scrolled ? "bg-surface-950/85 backdrop-blur-lg border-b border-surface-700/40" : "bg-transparent")}>
      <motion.div style={{ scaleX: progress }} className="absolute inset-x-0 bottom-0 h-0.5 origin-left bg-gradient-to-r from-brand-400 to-accent-400" />
      <div className="container-site flex h-16 items-center justify-between">
        <Link href={`/${locale}`} className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-accent-500 font-mono text-sm font-bold text-white">CP</span>
          <span className="hidden font-bold text-slate-100 sm:block">Caio Ponte</span>
        </Link>
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main navigation">
          {NAV.map((k) => (
            <a key={k} href={`#${ANCHOR[k]}`} className="rounded-lg px-3 py-2 text-sm font-medium text-slate-400 transition-colors hover:bg-surface-700/50 hover:text-slate-100">{t(k)}</a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <LocaleSwitcher className="hidden md:flex" />
          <a href="#contact" className="hidden rounded-xl bg-brand-500 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-400 md:inline-flex">{t("cta")}</a>
          <button className="rounded-lg p-2 text-slate-400 hover:bg-surface-700/50 hover:text-slate-100 lg:hidden" onClick={() => setOpen((v) => !v)} aria-label={open ? "Fechar menu" : "Abrir menu"} aria-expanded={open}>
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
      <AnimatePresence>
        {open && (
          <motion.nav initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden border-b border-surface-700/40 bg-surface-950/95 backdrop-blur-xl lg:hidden">
            <div className="container-site flex flex-col gap-1 py-4">
              {NAV.map((k) => <a key={k} href={`#${ANCHOR[k]}`} onClick={() => setOpen(false)} className="rounded-xl px-4 py-3 text-sm font-medium text-slate-300 hover:bg-surface-700/50">{t(k)}</a>)}
              <div className="mt-3 flex items-center justify-between px-4">
                <LocaleSwitcher />
                <a href="#contact" onClick={() => setOpen(false)} className="rounded-xl bg-brand-500 px-4 py-2 text-sm font-semibold text-white">{t("cta")}</a>
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
