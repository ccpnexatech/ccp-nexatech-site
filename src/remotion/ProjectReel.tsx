import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { PROJECTS, pick, type Lang } from "../content/profile";

export const PROJECT_REEL = { fps: 30, width: 1280, height: 720, durationInFrames: 270 };
export type ProjectReelProps = { slug: string; lang: Lang };

const FONT = "var(--font-jakarta), 'Plus Jakarta Sans', system-ui, sans-serif";
const MONO = "var(--font-mono), 'JetBrains Mono', monospace";

// Mini-vídeo de um projeto: problema → nome → destaques digitados → stack.
export const ProjectReel: React.FC<ProjectReelProps> = ({ slug, lang }) => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = PROJECTS.find((x) => x.slug === slug) ?? PROJECTS[0];
  const problem = pick(p.problem, lang);
  const probOut = interpolate(f, [60, 75], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const title = spring({ frame: f - 70, fps, config: { damping: 13 } });
  const sweep = interpolate(f, [70, 100], [0, 100], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ background: "#05080F", fontFamily: FONT, color: "#F1F5F9" }}>
      <AbsoluteFill style={{ background: `radial-gradient(circle at 85% 15%, ${p.color}40, transparent 50%)` }} />
      <div style={{ position: "absolute", left: 0, top: 0, height: 6, width: `${(f / 270) * 100}%`, background: p.color }} />

      <AbsoluteFill style={{ padding: 90, justifyContent: "center", opacity: probOut }}>
        <div style={{ fontFamily: MONO, color: p.color, fontSize: 22, marginBottom: 18 }}>
          {lang === "pt" ? "// o problema" : "// the problem"}
        </div>
        <div style={{ fontSize: 50, fontWeight: 700, lineHeight: 1.2, maxWidth: 1000 }}>
          {problem.slice(0, Math.floor(interpolate(f, [0, 45], [0, problem.length], { extrapolateRight: "clamp" })))}
          <span style={{ opacity: Math.floor(f / 8) % 2 ? 1 : 0, color: p.color }}>▍</span>
        </div>
      </AbsoluteFill>

      {f >= 70 && (
        <AbsoluteFill style={{ padding: 90, justifyContent: "center" }}>
          <div style={{ fontSize: 88, fontWeight: 800, letterSpacing: -2, transform: `translateY(${(1 - title) * 40}px)`, opacity: title }}>
            {p.name}
          </div>
          <div style={{ height: 4, width: `${sweep * 4}px`, background: p.color, margin: "12px 0 30px", borderRadius: 4 }} />
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {p.highlights.slice(0, 4).map((h, i) => {
              const s = spring({ frame: f - 105 - i * 18, fps, config: { damping: 16 } });
              return (
                <div key={i} style={{ fontSize: 28, color: "#CBD5E1", opacity: s, transform: `translateX(${(1 - s) * 60}px)`, display: "flex", gap: 14 }}>
                  <span style={{ color: p.color }}>✓</span>
                  {pick(h, lang)}
                </div>
              );
            })}
          </div>
          <div style={{ display: "flex", gap: 10, marginTop: 36 }}>
            {p.stack.map((s, i) => {
              const c = spring({ frame: f - 185 - i * 4, fps });
              return (
                <span key={s} style={{ fontFamily: MONO, fontSize: 20, padding: "6px 16px", borderRadius: 999, background: `${p.color}22`, border: `1px solid ${p.color}`, transform: `scale(${c})` }}>
                  {s}
                </span>
              );
            })}
          </div>
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
};
