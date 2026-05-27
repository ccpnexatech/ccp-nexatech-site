"use client";

import { useEffect, useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { LocaleSwitcher } from "./locale-switcher";
import { cn } from "@/lib/cn";

const NAV_LINKS = [
  { key: "about", href: "/sobre" },
  { key: "services", href: "/servicos" },
  { key: "contact", href: "/contato" },
] as const;

export function Header() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-surface-950/90 backdrop-blur-lg border-b border-surface-700/40 shadow-xl shadow-black/20"
          : "bg-transparent"
      )}
    >
      <div className="container-site flex h-16 items-center justify-between md:h-18">
        <Link
          href={`/${locale}`}
          className="flex items-center gap-3 shrink-0"
          onClick={() => setOpen(false)}
        >
          <Image
            src="/logo.png"
            alt="CCP NEXATECH"
            width={36}
            height={36}
            className="rounded-lg"
            priority
          />
          <span className="font-bold text-sm text-slate-100 hidden sm:block">
            CCP NEXATECH
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
          {NAV_LINKS.map(({ key, href }) => (
            <Link
              key={key}
              href={`/${locale}${href}`}
              className="px-4 py-2 text-sm font-medium text-slate-400 rounded-lg hover:text-slate-100 hover:bg-surface-700/50 transition-all duration-200"
            >
              {t(key)}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <LocaleSwitcher className="hidden md:flex" />
          <Button asChild size="sm" variant="primary" className="hidden md:inline-flex">
            <Link href={`/${locale}/contato`}>{t("cta")}</Link>
          </Button>

          <button
            className="md:hidden p-2 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-surface-700/50 transition-colors"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            aria-expanded={open}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
            className="md:hidden overflow-hidden bg-surface-950/95 backdrop-blur-xl border-b border-surface-700/40"
          >
            <nav className="container-site py-4 flex flex-col gap-1">
              {NAV_LINKS.map(({ key, href }) => (
                <Link
                  key={key}
                  href={`/${locale}${href}`}
                  className="px-4 py-3 text-sm font-medium text-slate-300 rounded-xl hover:text-slate-100 hover:bg-surface-700/50 transition-all"
                  onClick={() => setOpen(false)}
                >
                  {t(key)}
                </Link>
              ))}
              <div className="mt-3 flex items-center justify-between px-4">
                <LocaleSwitcher />
                <Button asChild size="sm" variant="primary">
                  <Link href={`/${locale}/contato`} onClick={() => setOpen(false)}>
                    {t("cta")}
                  </Link>
                </Button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
