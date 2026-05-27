import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import Image from "next/image";
import { Linkedin, Github, MapPin } from "lucide-react";

const LINKEDIN_URL = "https://www.linkedin.com/in/ccp-nexatech/";

export function Footer() {
  const t = useTranslations("footer");
  const locale = useLocale();
  const year = new Date().getFullYear();

  const navLinks = [
    { label: useTranslations("nav")("about"), href: `/${locale}/sobre` },
    { label: useTranslations("nav")("services"), href: `/${locale}/servicos` },
    { label: useTranslations("nav")("contact"), href: `/${locale}/contato` },
  ];

  return (
    <footer className="border-t border-surface-700/40 bg-surface-950">
      <div className="container-site py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="flex flex-col gap-4">
            <Link href={`/${locale}`} className="flex items-center gap-3 w-fit">
              <Image src="/logo.png" alt="CCP NEXATECH" width={40} height={40} className="rounded-xl" />
              <span className="font-bold text-slate-100">CCP NEXATECH</span>
            </Link>
            <p className="text-sm text-slate-500 max-w-xs leading-relaxed">
              {t("tagline")}
            </p>
            <div className="flex items-center gap-1.5 text-xs text-slate-600">
              <MapPin size={12} />
              <span>Fortaleza, Ceará — Nordeste do Brasil</span>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <span className="text-xs font-semibold uppercase tracking-widest text-slate-500">
              {t("links_label")}
            </span>
            <nav className="flex flex-col gap-2">
              {navLinks.map(({ label, href }) => (
                <Link
                  key={href}
                  href={href}
                  className="text-sm text-slate-400 hover:text-slate-100 transition-colors w-fit"
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex flex-col gap-4">
            <span className="text-xs font-semibold uppercase tracking-widest text-slate-500">
              Social
            </span>
            <div className="flex flex-col gap-2">
              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-slate-400 hover:text-brand-300 transition-colors w-fit"
              >
                <Linkedin size={15} />
                LinkedIn
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-slate-400 hover:text-slate-100 transition-colors w-fit"
              >
                <Github size={15} />
                GitHub
              </a>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-6 border-t border-surface-700/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="text-xs text-slate-600">
            {t("copyright", { year })}
          </p>
          <div className="flex items-center gap-1.5 text-xs text-slate-600">
            <span className="text-accent-500/80">♥</span>
            <span>{t("made_in")}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
