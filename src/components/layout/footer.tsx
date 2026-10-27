import { useTranslations } from "next-intl";
import { Linkedin, Github, Mail, MapPin } from "lucide-react";
import { PROFILE } from "@/content/profile";

export function Footer() {
  const t = useTranslations("footer");
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-surface-700/40 bg-surface-950">
      <div className="container-site flex flex-col gap-6 py-12 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-bold text-slate-100">{PROFILE.name}</p>
          <p className="text-sm text-slate-500">{t("tagline")}</p>
          <p className="mt-1 flex items-center gap-1.5 text-xs text-slate-600"><MapPin size={12} />{PROFILE.location}</p>
        </div>
        <div className="flex gap-3">
          {[
            { href: PROFILE.linkedin, Icon: Linkedin, label: "LinkedIn" },
            { href: PROFILE.github, Icon: Github, label: "GitHub" },
            { href: `mailto:${PROFILE.email}`, Icon: Mail, label: "E-mail" },
          ].map(({ href, Icon, label }) => (
            <a key={label} href={href} aria-label={label} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-xl surface-card text-slate-400 transition-all hover:-translate-y-0.5 hover:text-white"><Icon size={17} /></a>
          ))}
        </div>
      </div>
      <div className="container-site border-t border-surface-700/30 py-5 text-xs text-slate-600">
        {t("copyright", { year })} · {t("made_in")}
      </div>
    </footer>
  );
}
