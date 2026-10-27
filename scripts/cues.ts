// Exporta as linhas do tempo dos vídeos para o gerador de áudio (scripts/audio.py).
import { writeFileSync, mkdirSync } from "node:fs";
import { BACKSTAGE } from "../src/content/profile";
import { backstageTimeline, documentaryTimeline, FPS } from "../src/remotion/timeline";

mkdirSync("out", { recursive: true });
const all: Record<string, { fps: number; total: number; cues: unknown[] }> = {
  documentario: { fps: FPS, ...documentaryTimeline() },
};
for (const b of BACKSTAGE) all[`bastidores-${b.slug}`] = { fps: FPS, ...backstageTimeline(b.slug) };
writeFileSync("out/cues.json", JSON.stringify(all, null, 1));
for (const [k, v] of Object.entries(all)) console.log(k, `${(v.total / FPS).toFixed(1)} s`, `${v.cues.length} sons`);
