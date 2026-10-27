"use client";

import { useEffect, useMemo, useState } from "react";
import { useLocale } from "next-intl";
import { Activity, CalendarDays, Clock, ExternalLink, FolderGit2, Flame, Gauge, GitCommitHorizontal, Github, GitlabIcon } from "lucide-react";
import { langOf, PROFILE } from "@/content/profile";
import { Reveal, SectionHead } from "./reveal";
import { cn } from "@/lib/cn";

type IGit = { ok: boolean; source?: "live" | "snapshot"; updatedAt?: string; contributions?: number; activeDays?: number; last30?: number; perActiveDay?: number; bestStreak?: number; busiestMonth?: { month: string; count: number } | null; byMonth?: Record<string, number>; calendar?: Record<string, number> };
type GH = { ok: boolean; publicRepos?: number; commits90d?: number; lastPush?: string; lastRepo?: string; languages?: [string, number][] };
type Data = { fetchedAt?: string; igit: IGit; github: GH };
type Vital = { name: string; value: number; rating: "good" | "needs-improvement" | "poor" };

const IGIT_URL = "https://igit.itarget.com.br/caio.cp";

const T = {
  pt: {
    kicker: "Métricas públicas", title: "Dados públicos e verificáveis.",
    sub: "Contribuições no GitLab da empresa, projetos independentes no GitHub e o desempenho deste site medido no seu navegador. Atualizado a cada hora.",
    work: "Itarget · GitLab da empresa", workNote: "Contagem pública do perfil. Repositórios e código são privados.",
    contributions: "contribuições em 12 meses", last30: "nos últimos 30 dias", activeDays: "dias com contribuição", streak: "dias úteis seguidos (recorde)",
    heat: "Contribuições por dia, últimos 12 meses", less: "menos", more: "mais", monthly: "Contribuições por mês", busiest: "mês mais intenso",
    gh: "GitHub · projetos independentes", repos: "repositórios públicos", commits: "commits em 90 dias", last: "último push",
    langs: "Linguagens", vitals: "Este site, medido no seu navegador", waiting: "carregando…", interact: "interaja com a página",
    unavailable: "Fonte indisponível no momento.", good: "bom", ni: "a melhorar", poor: "ruim", updated: "Atualizado",
    vnames: { LCP: "Maior conteúdo visível", CLS: "Estabilidade do layout", INP: "Resposta à interação", FCP: "Primeiro conteúdo", TTFB: "Resposta do servidor" },
    open: "Abrir perfil", live: "Dados ao vivo ·", snap: "Snapshot do perfil público em",
  },
  en: {
    kicker: "Public metrics", title: "Public, verifiable data.",
    sub: "Contributions on the company GitLab, independent projects on GitHub and this site's performance measured in your browser. Refreshed hourly.",
    work: "Itarget · company GitLab", workNote: "Public profile count. Repositories and code are private.",
    contributions: "contributions in 12 months", last30: "in the last 30 days", activeDays: "days with contributions", streak: "consecutive workdays (record)",
    heat: "Contributions per day, last 12 months", less: "less", more: "more", monthly: "Contributions per month", busiest: "busiest month",
    gh: "GitHub · independent projects", repos: "public repositories", commits: "commits in 90 days", last: "last push",
    langs: "Languages", vitals: "This site, measured in your browser", waiting: "loading…", interact: "interact with the page",
    unavailable: "Source unavailable right now.", good: "good", ni: "needs work", poor: "poor", updated: "Updated",
    vnames: { LCP: "Largest content paint", CLS: "Layout stability", INP: "Interaction response", FCP: "First content", TTFB: "Server response" },
    open: "Open profile", live: "Live data ·", snap: "Public profile snapshot from",
  },
};

const fmtVital = (v: Vital) => (v.name === "CLS" ? v.value.toFixed(3) : `${Math.round(v.value)} ms`);

/** Mapa de calor estilo GitHub: 53 semanas × 7 dias. */
function Heatmap({ calendar, lang, until }: { calendar: Record<string, number>; lang: "pt" | "en"; until?: string }) {
  const t = T[lang];
  const { weeks, max } = useMemo(() => {
    const end = until ? new Date(until) : new Date(); end.setUTCHours(12, 0, 0, 0);
    const start = new Date(+end - 364 * 864e5);
    start.setUTCDate(start.getUTCDate() - start.getUTCDay()); // começa no domingo
    const weeks: { d: string; v: number }[][] = [];
    for (let cur = new Date(start); cur <= end; cur = new Date(+cur + 864e5)) {
      if (cur.getUTCDay() === 0) weeks.push([]);
      const d = cur.toISOString().slice(0, 10);
      weeks[weeks.length - 1].push({ d, v: calendar[d] ?? 0 });
    }
    return { weeks, max: Math.max(1, ...Object.values(calendar)) };
  }, [calendar, until]);
  const level = (v: number) => (v === 0 ? 0 : v < max * 0.15 ? 1 : v < max * 0.35 ? 2 : v < max * 0.6 ? 3 : 4);
  const shade = ["bg-line", "bg-accent/30", "bg-accent/55", "bg-accent/80", "bg-accent"];
  const loc = lang === "pt" ? "pt-BR" : "en-US";
  return (
    <figure>
      <figcaption className="mb-2 text-sm font-semibold">{t.heat}</figcaption>
      <div className="overflow-x-auto pb-1" tabIndex={0} aria-label={t.heat}>
        <div className="flex gap-[3px]" aria-hidden>
          {weeks.map((w, i) => (
            <div key={i} className="flex flex-col gap-[3px]">
              {w.map((c) => (
                <span key={c.d} title={`${new Date(`${c.d}T12:00:00Z`).toLocaleDateString(loc, { day: "2-digit", month: "short" })}: ${c.v}`} className={cn("block h-[11px] w-[11px] rounded-[2px]", shade[level(c.v)])} />
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="mt-2 flex items-center gap-1.5 text-xs text-muted" aria-hidden>
        {t.less}{shade.map((s, i) => <span key={i} className={cn("h-[11px] w-[11px] rounded-[2px]", s)} />)}{t.more}
      </div>
    </figure>
  );
}

function MonthlyBars({ byMonth, lang }: { byMonth: Record<string, number>; lang: "pt" | "en" }) {
  const t = T[lang];
  const entries = Object.entries(byMonth).slice(-12);
  const max = Math.max(1, ...entries.map(([, v]) => v));
  const loc = lang === "pt" ? "pt-BR" : "en-US";
  const label = (m: string) => new Date(`${m}-15T12:00:00Z`).toLocaleDateString(loc, { month: "short" }).replace(".", "");
  return (
    <figure className="mt-8">
      <figcaption className="mb-3 text-sm font-semibold">{t.monthly}</figcaption>
      <table className="sr-only">
        <caption>{t.monthly}</caption>
        <tbody>{entries.map(([m, v]) => <tr key={m}><th scope="row">{m}</th><td>{v}</td></tr>)}</tbody>
      </table>
      <div className="flex h-36 items-end gap-1.5" aria-hidden>
        {entries.map(([m, v]) => (
          <div key={m} className="flex flex-1 flex-col items-center gap-1">
            <span className="font-mono text-[10px] text-muted">{v}</span>
            <span className="w-full rounded-t bg-accent" style={{ height: `${(v / max) * 100}%`, minHeight: 2 }} />
            <span className="font-mono text-[10px] uppercase text-muted">{label(m)}</span>
          </div>
        ))}
      </div>
    </figure>
  );
}

function Kpi({ icon: Icon, value, label }: { icon: typeof Github; value?: number | string; label: string }) {
  return (
    <div>
      <dt className="flex items-start gap-1.5 text-sm text-muted"><Icon size={15} aria-hidden className="mt-0.5 shrink-0" />{label}</dt>
      <dd className="mt-1 font-serif text-4xl">{value ?? "—"}</dd>
    </div>
  );
}

export function Metrics() {
  const lang = langOf(useLocale());
  const t = T[lang];
  const [data, setData] = useState<Data | null>(null);
  const [vitals, setVitals] = useState<Record<string, Vital>>({});
  const nf = new Intl.NumberFormat(lang === "pt" ? "pt-BR" : "en-US");

  useEffect(() => {
    fetch("/api/metrics").then((r) => r.json()).then(setData).catch(() => setData({ igit: { ok: false }, github: { ok: false } }));
    import("web-vitals").then(({ onLCP, onCLS, onINP, onFCP, onTTFB }) => {
      const put = (m: Vital) => setVitals((v) => ({ ...v, [m.name]: { name: m.name, value: m.value, rating: m.rating } }));
      [onLCP, onCLS, onINP, onFCP, onTTFB].forEach((fn) => fn(put, { reportAllChanges: true }));
    });
  }, []);

  const ig = data?.igit;
  const gh = data?.github;
  const loc = lang === "pt" ? "pt-BR" : "en-US";
  const date = (s?: string) => (s ? new Date(s).toLocaleDateString(loc, { day: "2-digit", month: "short", year: "numeric" }) : undefined);
  const month = (m?: string) => (m ? new Date(`${m}-15T12:00:00Z`).toLocaleDateString(loc, { month: "long", year: "numeric" }) : "");
  const total = gh?.languages?.reduce((n, [, v]) => n + v, 0) ?? 1;
  const rate = (r: Vital["rating"]) => (r === "good" ? t.good : r === "poor" ? t.poor : t.ni);

  return (
    <section aria-labelledby="metricas-t" id="metricas" className="py-24">
      <div className="wrap">
        <SectionHead id="metricas-t" kicker={t.kicker} title={t.title} sub={t.sub} />

        <Reveal className="card p-6 md:p-8" >
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h3 className="flex items-center gap-2 font-semibold"><GitlabIcon size={18} aria-hidden />{t.work}</h3>
              <p className="mt-1 text-sm text-muted">{t.workNote}</p>
              {ig?.updatedAt && <p className="mt-1 text-xs text-muted">{ig.source === "live" ? t.live : t.snap} {new Date(ig.updatedAt).toLocaleDateString(loc, { day: "2-digit", month: "short", year: "numeric" })}</p>}
            </div>
            <a href={IGIT_URL} rel="noopener noreferrer" className="btn-ghost">{t.open}<ExternalLink size={14} aria-hidden /></a>
          </div>
          {ig && !ig.ok ? (
            <p className="mt-6 text-muted">{t.unavailable}</p>
          ) : (
            <>
              <dl className="mt-6 grid grid-cols-2 gap-6 md:grid-cols-4" aria-busy={!ig}>
                <Kpi icon={GitCommitHorizontal} value={ig?.contributions !== undefined ? nf.format(ig.contributions) : undefined} label={t.contributions} />
                <Kpi icon={Activity} value={ig?.last30} label={t.last30} />
                <Kpi icon={CalendarDays} value={ig?.activeDays} label={t.activeDays} />
                <Kpi icon={Flame} value={ig?.bestStreak} label={t.streak} />
              </dl>
              <div className="mt-8 grid gap-8 lg:grid-cols-[1.4fr_1fr]">
                <div>{ig?.calendar && <Heatmap calendar={ig.calendar} lang={lang} until={ig.updatedAt} />}</div>
                <div>
                  {ig?.byMonth && <MonthlyBars byMonth={ig.byMonth} lang={lang} />}
                  {ig?.busiestMonth && <p className="mt-3 text-sm text-muted">{t.busiest}: <span className="font-semibold text-ink">{month(ig.busiestMonth.month)}</span> · {ig.busiestMonth.count}</p>}
                </div>
              </div>
            </>
          )}
        </Reveal>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <Reveal className="card p-6 md:p-8">
            <h3 className="flex items-center gap-2 font-semibold"><Github size={18} aria-hidden />{t.gh}</h3>
            {gh && !gh.ok ? <p className="mt-4 text-muted">{t.unavailable}</p> : (
              <>
                <dl className="mt-6 grid grid-cols-3 gap-6" aria-busy={!gh}>
                  <Kpi icon={FolderGit2} value={gh?.publicRepos} label={t.repos} />
                  <Kpi icon={GitCommitHorizontal} value={gh?.commits90d} label={t.commits} />
                  <div>
                    <dt className="flex items-start gap-1.5 text-sm text-muted"><Clock size={15} aria-hidden className="mt-0.5 shrink-0" />{t.last}</dt>
                    <dd className="mt-1 text-lg font-semibold">{date(gh?.lastPush) ?? "—"}</dd>
                  </div>
                </dl>
                <h4 className="mt-6 text-sm font-semibold">{t.langs}</h4>
                <ul className="mt-3 space-y-2">
                  {(gh?.languages ?? []).map(([name, v]) => (
                    <li key={name} className="grid grid-cols-[96px_1fr_40px] items-center gap-3 text-sm">
                      <span>{name}</span>
                      <span className="h-2.5 overflow-hidden rounded-full bg-line" aria-hidden><span className="block h-full rounded-full bg-signal" style={{ width: `${(v / total) * 100}%` }} /></span>
                      <span className="text-right font-mono text-xs text-muted">{Math.round((v / total) * 100)}%</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-xs text-muted"><a className="underline" href={PROFILE.github} rel="noopener noreferrer">github.com/ccpnexatech</a></p>
              </>
            )}
          </Reveal>
          <Reveal className="card p-6 md:p-8" delay={0.1}>
            <h3 className="flex items-center gap-2 font-semibold"><Gauge size={18} aria-hidden />{t.vitals}</h3>
            <dl className="mt-4 divide-y divide-line">
              {(["LCP", "INP", "CLS", "FCP", "TTFB"] as const).map((k) => {
                const v = vitals[k];
                return (
                  <div key={k} className="flex items-baseline justify-between gap-4 py-3">
                    <dt><span className="font-mono text-xs text-muted">{k}</span> <span className="ml-1">{t.vnames[k]}</span></dt>
                    <dd className="text-right">{v ? <><span className="font-semibold">{fmtVital(v)}</span> <span className={v.rating === "good" ? "text-ok" : "text-accent"}>· {rate(v.rating)}</span></> : <span className="text-sm text-muted">{k === "INP" ? t.interact : t.waiting}</span>}</dd>
                  </div>
                );
              })}
            </dl>
            {data?.fetchedAt && <p className="mt-4 text-xs text-muted">{t.updated}: {new Date(data.fetchedAt).toLocaleString(loc)}</p>}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
