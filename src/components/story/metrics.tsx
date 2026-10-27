"use client";

import { useEffect, useState } from "react";
import { useLocale } from "next-intl";
import { Activity, GitCommitHorizontal, FolderGit2, Gauge, Github, Clock } from "lucide-react";
import { langOf, PROFILE } from "@/content/profile";
import { Reveal, SectionHead } from "./reveal";

type GH = { ok: boolean; fetchedAt?: string; publicRepos?: number; followers?: number; stars?: number; lastPush?: string; lastRepo?: string; commits90d?: number; activeDays?: number; languages?: [string, number][] };
type Vital = { name: string; value: number; rating: "good" | "needs-improvement" | "poor" };

const T = {
  pt: {
    kicker: "Métricas públicas", title: "Dados públicos e verificáveis.",
    sub: "Dados do meu GitHub público (atualizados a cada hora) e o desempenho deste site medido agora, no seu navegador.",
    gh: "GitHub público", repos: "repositórios públicos", commits: "commits nos últimos 90 dias", days: "dias com código publicado (90 dias)", last: "último push",
    langs: "Linguagens nos repositórios", vitals: "Este site, medido no seu navegador", waiting: "medindo…", unavailable: "Não consegui consultar o GitHub agora. Os dados ficam em github.com/ccpnexatech.",
    good: "bom", ni: "a melhorar", poor: "ruim", updated: "Atualizado", source: "Fonte: API pública do GitHub · Web Vitals (Google)",
    vnames: { LCP: "Maior conteúdo visível", CLS: "Estabilidade do layout", INP: "Resposta à interação", FCP: "Primeiro conteúdo", TTFB: "Resposta do servidor" },
  },
  en: {
    kicker: "Public metrics", title: "Public, verifiable data.",
    sub: "Data from my public GitHub (refreshed hourly) and this site's performance, measured right now in your browser.",
    gh: "Public GitHub", repos: "public repositories", commits: "commits in the last 90 days", days: "days with code pushed (90 days)", last: "last push",
    langs: "Languages across repositories", vitals: "This site, measured in your browser", waiting: "measuring…", unavailable: "Couldn't reach GitHub right now. The data lives at github.com/ccpnexatech.",
    good: "good", ni: "needs work", poor: "poor", updated: "Updated", source: "Source: GitHub public API · Web Vitals (Google)",
    vnames: { LCP: "Largest content paint", CLS: "Layout stability", INP: "Interaction response", FCP: "First content", TTFB: "Server response" },
  },
};

const fmt = (v: Vital) => (v.name === "CLS" ? v.value.toFixed(3) : `${Math.round(v.value)} ms`);

export function Metrics() {
  const lang = langOf(useLocale());
  const t = T[lang];
  const [gh, setGh] = useState<GH | null>(null);
  const [vitals, setVitals] = useState<Record<string, Vital>>({});

  useEffect(() => {
    fetch("/api/metrics").then((r) => r.json()).then(setGh).catch(() => setGh({ ok: false }));
    import("web-vitals").then(({ onLCP, onCLS, onINP, onFCP, onTTFB }) => {
      const put = (m: Vital) => setVitals((v) => ({ ...v, [m.name]: { name: m.name, value: m.value, rating: m.rating } }));
      [onLCP, onCLS, onINP, onFCP, onTTFB].forEach((fn) => fn(put, { reportAllChanges: true }));
    });
  }, []);

  const total = gh?.languages?.reduce((n, [, v]) => n + v, 0) ?? 1;
  const date = (s?: string) => (s ? new Date(s).toLocaleDateString(lang === "pt" ? "pt-BR" : "en-US", { day: "2-digit", month: "short", year: "numeric" }) : "—");
  const rate = (r: Vital["rating"]) => (r === "good" ? t.good : r === "poor" ? t.poor : t.ni);

  return (
    <section aria-labelledby="metricas-t" id="metricas" className="py-24">
      <div className="wrap">
        <SectionHead id="metricas-t" kicker={t.kicker} title={t.title} sub={t.sub} />
        <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
          <Reveal className="card p-6 md:p-8">
            <h3 className="flex items-center gap-2 font-semibold"><Github size={18} aria-hidden />{t.gh}</h3>
            {gh && !gh.ok ? (
              <p className="mt-4 text-muted">{t.unavailable}</p>
            ) : (
              <>
                <dl className="mt-6 grid grid-cols-2 gap-6 sm:grid-cols-4" aria-busy={!gh}>
                  {([
                    { I: FolderGit2, v: gh?.publicRepos, l: t.repos },
                    { I: GitCommitHorizontal, v: gh?.commits90d, l: t.commits },
                    { I: Activity, v: gh?.activeDays, l: t.days },
                    { I: Clock, v: gh ? date(gh.lastPush) : undefined, l: `${t.last}${gh?.lastRepo ? ` · ${gh.lastRepo}` : ""}` },
                  ] as { I: typeof Github; v: string | number | undefined; l: string }[]).map(({ I, v, l }, i) => {
                    return (
                      <div key={i}>
                        <dt className="flex items-start gap-1.5 text-sm text-muted"><I size={15} aria-hidden className="mt-0.5 shrink-0" />{l}</dt>
                        <dd className="mt-1 font-serif text-4xl">{v ?? <span className="text-base text-muted">{t.waiting}</span>}</dd>
                      </div>
                    );
                  })}
                </dl>
                <h4 className="mt-8 text-sm font-semibold">{t.langs}</h4>
                <ul className="mt-3 space-y-2">
                  {(gh?.languages ?? []).map(([name, v]) => (
                    <li key={name} className="grid grid-cols-[110px_1fr_44px] items-center gap-3 text-sm">
                      <span>{name}</span>
                      <span className="h-2.5 overflow-hidden rounded-full bg-line" aria-hidden><span className="block h-full rounded-full bg-accent" style={{ width: `${(v / total) * 100}%` }} /></span>
                      <span className="text-right font-mono text-xs text-muted">{Math.round((v / total) * 100)}%</span>
                    </li>
                  ))}
                </ul>
                {gh?.fetchedAt && <p className="mt-6 text-xs text-muted">{t.updated}: {new Date(gh.fetchedAt).toLocaleString(lang === "pt" ? "pt-BR" : "en-US")} · <a className="underline" href={PROFILE.github} rel="noopener noreferrer">github.com/ccpnexatech</a></p>}
              </>
            )}
          </Reveal>
          <Reveal className="card p-6 md:p-8" delay={0.1}>
            <h3 className="flex items-center gap-2 font-semibold"><Gauge size={18} aria-hidden />{t.vitals}</h3>
            <dl className="mt-6 divide-y divide-line">
              {(["LCP", "INP", "CLS", "FCP", "TTFB"] as const).map((k) => {
                const v = vitals[k];
                return (
                  <div key={k} className="flex items-baseline justify-between gap-4 py-3">
                    <dt><span className="font-mono text-xs text-muted">{k}</span> <span className="ml-1">{t.vnames[k]}</span></dt>
                    <dd className="text-right">
                      {v ? <><span className="font-semibold">{fmt(v)}</span> <span className={v.rating === "good" ? "text-ok" : "text-accent"}>· {rate(v.rating)}</span></> : <span className="text-sm text-muted">{k === "INP" ? (lang === "pt" ? "interaja com a página" : "interact with the page") : t.waiting}</span>}
                    </dd>
                  </div>
                );
              })}
            </dl>
            <p className="mt-4 text-xs text-muted">{t.source}</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
