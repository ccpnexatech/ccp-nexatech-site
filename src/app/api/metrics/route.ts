import { NextResponse } from "next/server";

// Métricas públicas, cacheadas por 1 hora.
// - GitHub (projetos independentes): API pública.
// - iGit (GitLab da Itarget): calendário e feed de atividade públicos do perfil.
//   Só números agregados saem daqui — nenhum nome de projeto, branch ou commit da empresa.
export const dynamic = "force-dynamic";
// Região de São Paulo: o GitLab da empresa fica no Brasil.
export const preferredRegion = "gru1";
const revalidate = 3600;
const GH_USER = "ccpnexatech";
const IGIT = "https://igit.itarget.com.br";
const IGIT_USER = "caio.cp";

type Repo = { fork: boolean; stargazers_count: number; language: string | null; pushed_at: string; size: number; name: string };
type Event = { type: string; created_at: string; payload?: { commits?: unknown[] } };

async function github() {
  const headers: Record<string, string> = { Accept: "application/vnd.github+json", "User-Agent": "caio-portfolio" };
  if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  const [userRes, reposRes, eventsRes] = await Promise.all([
    fetch(`https://api.github.com/users/${GH_USER}`, { headers, next: { revalidate } }),
    fetch(`https://api.github.com/users/${GH_USER}/repos?per_page=100&sort=pushed`, { headers, next: { revalidate } }),
    fetch(`https://api.github.com/users/${GH_USER}/events/public?per_page=100`, { headers, next: { revalidate } }),
  ]);
  if (!userRes.ok || !reposRes.ok) throw new Error(`GitHub ${userRes.status}/${reposRes.status}`);
  const user = await userRes.json();
  const repos: Repo[] = (await reposRes.json()).filter((r: Repo) => !r.fork);
  const events: Event[] = eventsRes.ok ? await eventsRes.json() : [];
  const languages: Record<string, number> = {};
  for (const r of repos) if (r.language) languages[r.language] = (languages[r.language] ?? 0) + Math.max(1, r.size);
  const since = Date.now() - 90 * 864e5;
  const pushes = events.filter((e) => e.type === "PushEvent" && Date.parse(e.created_at) > since);
  return {
    publicRepos: user.public_repos as number,
    commits90d: pushes.reduce((n, e) => n + (e.payload?.commits?.length ?? 1), 0),
    lastPush: repos[0]?.pushed_at ?? null,
    lastRepo: repos[0]?.name ?? null,
    languages: Object.entries(languages).sort((a, b) => b[1] - a[1]).slice(0, 5),
  };
}

async function igit() {
  // O calendário de contribuições é público; o feed de atividade, sem login, só mostra
  // "contribuição privada" — por isso as métricas da empresa vêm só do calendário.
  const r = await fetch(`${IGIT}/users/${IGIT_USER}/calendar.json`, { headers: { Accept: "application/json", "User-Agent": "caio-portfolio" }, next: { revalidate } });
  if (!r.ok) throw new Error(`iGit calendar ${r.status}`);
  const calendar: Record<string, number> = await r.json();
  const days = Object.entries(calendar).sort(([a], [b]) => a.localeCompare(b));
  const total = days.reduce((n, [, v]) => n + v, 0);
  const active = days.filter(([, v]) => v > 0);
  const byMonth: Record<string, number> = {};
  for (const [d, v] of days) byMonth[d.slice(0, 7)] = (byMonth[d.slice(0, 7)] ?? 0) + v;
  const busiest = Object.entries(byMonth).sort((a, b) => b[1] - a[1])[0] ?? null;
  const since30 = new Date(Date.now() - 30 * 864e5).toISOString().slice(0, 10);
  // maior sequência de dias úteis consecutivos com contribuição (fins de semana não quebram a sequência)
  let streak = 0, best = 0, prev: Date | null = null;
  for (const [d, v] of active) {
    if (!v) continue;
    const cur = new Date(`${d}T12:00:00Z`);
    let gap = prev ? Math.round((+cur - +prev) / 864e5) : 1;
    if (prev) for (let k = 1; k < gap; k++) { const w = new Date(+prev + k * 864e5).getUTCDay(); if (w === 0 || w === 6) gap--; }
    streak = gap === 1 ? streak + 1 : 1;
    best = Math.max(best, streak);
    prev = cur;
  }
  return {
    contributions: total,
    activeDays: active.length,
    last30: days.filter(([d]) => d >= since30).reduce((n, [, v]) => n + v, 0),
    perActiveDay: active.length ? Math.round((total / active.length) * 10) / 10 : 0,
    bestStreak: best,
    busiestMonth: busiest ? { month: busiest[0], count: busiest[1] } : null,
    byMonth,
    calendar: Object.fromEntries(days),
  };
}

export async function GET() {
  const [gh, ig] = await Promise.allSettled([github(), igit()]);
  return NextResponse.json({
    fetchedAt: new Date().toISOString(),
    github: gh.status === "fulfilled" ? { ok: true, ...gh.value } : { ok: false, error: String(gh.reason) },
    igit: ig.status === "fulfilled" ? { ok: true, ...ig.value } : { ok: false, error: String(ig.reason) },
  });
}
