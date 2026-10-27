// Linha do tempo única dos vídeos: as composições usam as durações daqui e
// scripts/audio.py usa os mesmos quadros para sincronizar os efeitos sonoros.
import { BACKSTAGE, CHAPTERS, DELIVER } from "../content/profile";

export const FPS = 30;
export const TR = 15; // duração das transições (quadros)

export type CueKind = "whoosh" | "pop" | "tick" | "rise" | "hit" | "chime";
export type Cue = { at: number; kind: CueKind; note?: number };
export type Scene = { id: string; dur: number; cues: Cue[] };
export type Timeline = { total: number; scenes: (Scene & { from: number })[]; cues: Cue[] };

const words = (s: string) => s.trim().split(/\s+/).length;
/** Tempo de leitura: 1,2 s de entrada + ~3,2 palavras por segundo, dentro de limites. */
export const readFrames = (text: string, min = 75, max = 210) =>
  Math.max(min, Math.min(max, Math.round((1.2 + words(text) / 3.2) * FPS)));

// Constantes de animação compartilhadas com as cenas (kit/scenes.tsx).
export const AT = {
  deliverCard: (i: number) => 18 + i * 8,
  processStep: (i: number) => 10 + i * 18,
  callout: (i: number) => 40 + i * 22,
  deviceRise: 6,
  codeStart: 6,
  codeLine: 3,
  invitePoint: (i: number) => 22 + i * 6,
  inviteCta: 46,
};

const pops = (n: number, f: (i: number) => number, base = 0): Cue[] =>
  Array.from({ length: n }, (_, i) => ({ at: f(i), kind: "pop" as const, note: base + i }));

const codeTicks = (src: string, maxLines = 15): Cue[] => {
  const lines = Math.min(src.split("\n").length, maxLines);
  return Array.from({ length: lines }, (_, i) => ({ at: AT.codeStart + i * AT.codeLine, kind: "tick" as const }));
};

function assemble(scenes: Scene[]): Timeline {
  let from = 0;
  const placed = scenes.map((s, i) => {
    const p = { ...s, from };
    from += s.dur - (i < scenes.length - 1 ? TR : 0);
    return p;
  });
  const cues: Cue[] = [];
  placed.forEach((s, i) => {
    if (i > 0) cues.push({ at: s.from, kind: "whoosh" });
    s.cues.forEach((c) => cues.push({ ...c, at: s.from + c.at }));
  });
  return { total: from, scenes: placed, cues: cues.sort((a, b) => a.at - b.at) };
}

export function documentaryTimeline(): Timeline {
  const [c1, c2] = CHAPTERS;
  const ofix = BACKSTAGE[1];
  const codeLines = Math.min(ofix.code.src.split("\n").length, 15);
  return assemble([
    { id: "slate", dur: 90, cues: [{ at: 0, kind: "hit" }] },
    { id: "deliver", dur: 30 + readFrames(DELIVER.map((d) => d.h.pt).join(" "), 120, 170), cues: pops(DELIVER.length, AT.deliverCard) },
    { id: "chapter1", dur: readFrames(`${c1.title.pt} ${c1.lede.pt}`, 85, 110), cues: [] },
    { id: "process", dur: 120, cues: pops(4, AT.processStep, 1) },
    { id: "chapter2", dur: readFrames(`${c2.title.pt} ${c2.lede.pt}`, 85, 110), cues: [] },
    { id: "quote", dur: readFrames(c2.quote!.text.pt, 100, 140), cues: [] },
    { id: "device", dur: 180, cues: [{ at: AT.deviceRise, kind: "rise" }, ...pops(3, AT.callout, 2)] },
    { id: "code", dur: AT.codeStart + codeLines * AT.codeLine + 100, cues: codeTicks(ofix.code.src) },
    { id: "invite", dur: 150, cues: [...pops(5, AT.invitePoint), { at: AT.inviteCta, kind: "chime" }] },
  ]);
}

/** Estudo de caso: problema e decisão (tempo de leitura), dispositivo anotado, código. */
export function backstageTimeline(slug: string): Timeline & { stepDur: number[] } {
  const b = BACKSTAGE.find((x) => x.slug === slug) ?? BACKSTAGE[0];
  const stepDur = [readFrames(b.ask.pt, 110, 200), readFrames(b.decision.pt, 110, 200)];
  const codeLines = Math.min(b.code.src.split("\n").length, 15);
  const t = assemble([
    { id: "steps", dur: stepDur[0] + stepDur[1], cues: [{ at: 0, kind: "hit" }, { at: stepDur[0], kind: "pop", note: 3 }] },
    { id: "device", dur: 160, cues: [{ at: AT.deviceRise, kind: "rise" }, ...pops(3, AT.callout, 2)] },
    { id: "code", dur: AT.codeStart + codeLines * AT.codeLine + 100, cues: [...codeTicks(b.code.src), { at: AT.codeStart + codeLines * AT.codeLine + 12, kind: "chime" }] },
  ]);
  return { ...t, stepDur };
}
