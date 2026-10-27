import { NextResponse } from "next/server";

// Métricas públicas do GitHub, cacheadas por 1 hora (respeita o limite da API sem token).
export const dynamic = "force-dynamic"; // a resposta é dinâmica; o cache fica nas chamadas ao GitHub
const revalidate = 3600;
const USER = "ccpnexatech";

type Repo = { name: string; fork: boolean; private: boolean; stargazers_count: number; language: string | null; pushed_at: string; size: number };
type Event = { type: string; created_at: string; payload?: { commits?: unknown[] } };

export async function GET() {
  const headers: HeadersInit = { Accept: "application/vnd.github+json", "User-Agent": "caio-portfolio" };
  if (process.env.GITHUB_TOKEN) (headers as Record<string, string>).Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  try {
    const [userRes, reposRes, eventsRes] = await Promise.all([
      fetch(`https://api.github.com/users/${USER}`, { headers, next: { revalidate } }),
      fetch(`https://api.github.com/users/${USER}/repos?per_page=100&sort=pushed`, { headers, next: { revalidate } }),
      fetch(`https://api.github.com/users/${USER}/events/public?per_page=100`, { headers, next: { revalidate } }),
    ]);
    if (!userRes.ok || !reposRes.ok) throw new Error(`GitHub ${userRes.status}/${reposRes.status}`);
    const user = await userRes.json();
    const repos: Repo[] = (await reposRes.json()).filter((r: Repo) => !r.fork);
    const events: Event[] = eventsRes.ok ? await eventsRes.json() : [];

    const languages: Record<string, number> = {};
    for (const r of repos) if (r.language) languages[r.language] = (languages[r.language] ?? 0) + Math.max(1, r.size);
    const since = Date.now() - 90 * 24 * 3600 * 1000;
    const pushes = events.filter((e) => e.type === "PushEvent" && Date.parse(e.created_at) > since);
    const commits90d = pushes.reduce((n, e) => n + (e.payload?.commits?.length ?? 1), 0);
    const activeDays = new Set(pushes.map((e) => e.created_at.slice(0, 10))).size;

    return NextResponse.json({
      ok: true,
      fetchedAt: new Date().toISOString(),
      publicRepos: user.public_repos as number,
      followers: user.followers as number,
      stars: repos.reduce((n, r) => n + r.stargazers_count, 0),
      lastPush: repos[0]?.pushed_at ?? null,
      lastRepo: repos[0]?.name ?? null,
      commits90d,
      activeDays,
      languages: Object.entries(languages).sort((a, b) => b[1] - a[1]).slice(0, 6),
    });
  } catch (e) {
    return NextResponse.json({ ok: false, error: String(e) }, { status: 200 });
  }
}
