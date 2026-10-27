"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { Globe } from "lucide-react";
import { cn } from "@/lib/cn";
import { routing } from "@/i18n/routing";

const LOCALE_LABELS: Record<string, string> = {
  "pt-BR": "PT",
  en: "EN",
};

export function LocaleSwitcher({ className }: { className?: string }) {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const switchLocale = (next: string) => {
    const segments = pathname.split("/");
    segments[1] = next;
    router.push(segments.join("/"));
  };

  return (
    <div className={cn("flex items-center gap-1", className)}>
      <Globe size={14} className="text-muted" aria-hidden />
      {routing.locales.map((loc) => (
        <button
          key={loc}
          onClick={() => switchLocale(loc)}
          className={cn(
            "text-sm font-semibold px-1.5 py-1 rounded-md transition-colors",
            locale === loc ? "text-ink underline underline-offset-4" : "text-muted hover:text-ink"
          )}
          aria-label={loc === "en" ? "EN — English" : "PT — Português"}
          aria-current={locale === loc ? "true" : undefined}
          lang={loc}
        >
          {LOCALE_LABELS[loc]}
        </button>
      ))}
    </div>
  );
}
