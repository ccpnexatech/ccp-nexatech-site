"use client";

import { useLocale } from "next-intl";
import { PROFILE } from "@/content/profile";

export function Footer() {
  const pt = useLocale() !== "en";
  return (
    <footer className="border-t border-line">
      <div className="wrap flex flex-col gap-2 py-8 text-sm text-muted sm:flex-row sm:justify-between">
        <p>© {new Date().getFullYear()} {PROFILE.name} · {PROFILE.location}</p>
        <p>Next.js · Remotion · Tailwind — <a className="underline" href="https://github.com/ccpnexatech/ccp-nexatech-site" rel="noopener noreferrer">{pt ? "código aberto" : "open source"}</a></p>
      </div>
    </footer>
  );
}
