"use client";

import { useState } from "react";
import { useLocale } from "next-intl";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { motion, useScroll, useSpring } from "framer-motion";
import { LocaleSwitcher } from "./locale-switcher";

const NAV = {
  pt: [["#entrego", "O que entrego"], ["#bastidores", "Bastidores"], ["#capitulos", "Trajetória"], ["#metricas", "Métricas"], ["#projetos", "Projetos"]],
  en: [["#entrego", "What I deliver"], ["#bastidores", "Backstage"], ["#capitulos", "Path"], ["#metricas", "Metrics"], ["#projetos", "Projects"]],
};

export function Header() {
  const locale = useLocale();
  const lang = locale === "en" ? "en" : "pt";
  const [open, setOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30 });

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper/90 backdrop-blur">
      <motion.div style={{ scaleX: progress }} className="absolute inset-x-0 bottom-0 h-0.5 origin-left bg-accent" aria-hidden />
      <div className="wrap flex h-16 items-center justify-between gap-4">
        <Link href={`/${locale}`} className="font-serif text-xl">Caio Ponte</Link>
        <nav id="menu" tabIndex={-1} aria-label={lang === "pt" ? "Menu principal" : "Main menu"} className="hidden md:block">
          <ul className="flex items-center gap-1">
            {NAV[lang].map(([href, label]) => (
              <li key={href}><a href={href} className="rounded-full px-3 py-2 text-sm font-medium text-muted hover:text-ink">{label}</a></li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-3">
          <LocaleSwitcher className="hidden sm:flex" />
          <a href="#contato" className="btn-primary hidden sm:inline-flex">{lang === "pt" ? "Contato" : "Contact"}</a>
          <button type="button" className="rounded-full p-2 md:hidden" aria-expanded={open} aria-controls="menu-movel" aria-label={open ? (lang === "pt" ? "Fechar menu" : "Close menu") : (lang === "pt" ? "Abrir menu" : "Open menu")} onClick={() => setOpen((v) => !v)}>
            {open ? <X size={22} aria-hidden /> : <Menu size={22} aria-hidden />}
          </button>
        </div>
      </div>
      {open && (
        <nav id="menu-movel" aria-label={lang === "pt" ? "Menu" : "Menu"} className="border-t border-line md:hidden">
          <ul className="wrap flex flex-col py-3">
            {NAV[lang].map(([href, label]) => <li key={href}><a href={href} onClick={() => setOpen(false)} className="block py-3 text-base font-medium">{label}</a></li>)}
            <li className="pt-2"><LocaleSwitcher /></li>
          </ul>
        </nav>
      )}
    </header>
  );
}
