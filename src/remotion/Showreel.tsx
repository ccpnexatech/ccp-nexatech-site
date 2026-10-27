import React from "react";
import {
  AbsoluteFill,
  Img,
  Sequence,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  Easing,
} from "remotion";
import { PROFILE, PROJECTS, SKILL_GROUPS, pick, type Lang } from "../content/profile";

export const SHOWREEL = { fps: 30, width: 1280, height: 720, durationInFrames: 480 };
export type ShowreelProps = { lang: Lang; photoSrc: string };

const C = {
  bg: "#05080F",
  card: "#0F1629",
  line: "#1E2D4A",
  brand: "#618EFF",
  accent: "#FF9F54",
  text: "#F1F5F9",
  dim: "#94A3B8",
};
const FONT = "var(--font-jakarta), 'Plus Jakarta Sans', system-ui, sans-serif";
const MONO = "var(--font-mono), 'JetBrains Mono', monospace";

const fadeOut = (f: number, end: number, len = 12) =>
  interpolate(f, [end - len, end], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

const Grid: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill
      style={{
        backgroundColor: C.bg,
        backgroundImage: `linear-gradient(${C.line}55 1px, transparent 1px), linear-gradient(90deg, ${C.line}55 1px, transparent 1px)`,
        backgroundSize: "64px 64px",
        backgroundPosition: `0 ${(f * 0.6) % 64}px`,
      }}
    >
      <AbsoluteFill
        style={{
          background: `radial-gradient(circle at ${30 + Math.sin(f / 40) * 10}% 30%, ${C.brand}33, transparent 45%), radial-gradient(circle at 80% 80%, ${C.accent}22, transparent 40%)`,
        }}
      />
    </AbsoluteFill>
  );
};

// 1 — Nome letra a letra + foto revelada
const Intro: React.FC<ShowreelProps> = ({ lang, photoSrc }) => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const letters = PROFILE.name.split("");
  const ring = spring({ frame: f - 4, fps, config: { damping: 14 } });
  const roleIn = interpolate(f, [40, 60], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", gap: 28, opacity: fadeOut(f, 105) }}>
      <div
        style={{
          width: 210,
          height: 210,
          borderRadius: "50%",
          padding: 5,
          background: `conic-gradient(from ${f * 4}deg, ${C.brand}, ${C.accent}, ${C.brand})`,
          transform: `scale(${ring})`,
        }}
      >
        <Img src={photoSrc} style={{ width: "100%", height: "100%", borderRadius: "50%", objectFit: "cover" }} />
      </div>
      <div style={{ display: "flex", fontFamily: FONT, fontSize: 78, fontWeight: 800, color: C.text, letterSpacing: -2 }}>
        {letters.map((ch, i) => {
          const s = spring({ frame: f - 12 - i * 1.4, fps, config: { damping: 12, mass: 0.6 } });
          return (
            <span key={i} style={{ display: "inline-block", transform: `translateY(${(1 - s) * 60}px)`, opacity: s, whiteSpace: "pre" }}>
              {ch}
            </span>
          );
        })}
      </div>
      <div style={{ fontFamily: MONO, fontSize: 26, color: C.accent, opacity: roleIn, transform: `translateY(${(1 - roleIn) * 16}px)` }}>
        {"<"}{pick(PROFILE.role, lang)}{" />"}
      </div>
    </AbsoluteFill>
  );
};

// 2 — Stack orbitando
const Stack: React.FC<{ lang: Lang }> = ({ lang }) => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const items = SKILL_GROUPS.slice(0, 3).flatMap((g) => g.items).slice(0, 18);
  const title = spring({ frame: f, fps, config: { damping: 16 } });
  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", opacity: fadeOut(f, 105) }}>
      <div style={{ position: "absolute", fontFamily: FONT, fontWeight: 800, fontSize: 56, color: C.text, textAlign: "center", transform: `scale(${title})`, lineHeight: 1.1 }}>
        {lang === "pt" ? "Da tela" : "From screen"}
        <br />
        <span style={{ color: C.brand }}>{lang === "pt" ? "à loja." : "to store."}</span>
      </div>
      {items.map((t, i) => {
        const a = (i / items.length) * Math.PI * 2 + f / 90;
        const r = 250 + (i % 3) * 45;
        const s = spring({ frame: f - i * 2, fps, config: { damping: 14 } });
        return (
          <div
            key={t}
            style={{
              position: "absolute",
              left: 640 + Math.cos(a) * r * 1.35 * s - 60,
              top: 360 + Math.sin(a) * r * 0.8 * s - 18,
              fontFamily: MONO,
              fontSize: 18,
              color: i % 4 === 0 ? C.accent : C.text,
              background: C.card,
              border: `1px solid ${C.line}`,
              borderRadius: 999,
              padding: "6px 14px",
              opacity: s,
              whiteSpace: "nowrap",
            }}
          >
            {t}
          </div>
        );
      })}
    </AbsoluteFill>
  );
};

// 3 — Projetos em destaque
const ProjectCard: React.FC<{ idx: number; lang: Lang }> = ({ idx, lang }) => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = PROJECTS.filter((x) => x.featured)[idx];
  const inS = spring({ frame: f, fps, config: { damping: 15 } });
  const out = interpolate(f, [44, 55], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.in(Easing.cubic) });
  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
      <div
        style={{
          width: 900,
          padding: 48,
          borderRadius: 32,
          background: C.card,
          border: `1px solid ${p.color}66`,
          boxShadow: `0 0 120px -30px ${p.color}`,
          transform: `translateX(${(1 - inS) * 700 - out * 900}px) rotate(${(1 - inS) * 6}deg)`,
          opacity: 1 - out,
          fontFamily: FONT,
        }}
      >
        <div style={{ fontFamily: MONO, color: p.color, fontSize: 20, marginBottom: 10 }}>
          0{idx + 1} / 03 · {lang === "pt" ? "projeto" : "project"}
        </div>
        <div style={{ fontSize: 64, fontWeight: 800, color: C.text, letterSpacing: -1.5 }}>{p.name}</div>
        <div style={{ fontSize: 28, color: C.dim, marginTop: 8 }}>{pick(p.tagline, lang)}</div>
        <div style={{ display: "flex", gap: 10, marginTop: 28, flexWrap: "wrap" }}>
          {p.stack.map((s, i) => {
            const c = spring({ frame: f - 10 - i * 3, fps });
            return (
              <span key={s} style={{ fontFamily: MONO, fontSize: 18, color: C.text, border: `1px solid ${p.color}88`, borderRadius: 999, padding: "6px 14px", transform: `scale(${c})` }}>
                {s}
              </span>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};

// 4 — Números + chamada
const Outro: React.FC<{ lang: Lang }> = ({ lang }) => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cta = spring({ frame: f - 50, fps, config: { damping: 12 } });
  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", gap: 56, fontFamily: FONT }}>
      <div style={{ display: "flex", gap: 64 }}>
        {PROFILE.stats.map((s, i) => {
          const p = interpolate(f, [i * 6, 40 + i * 6], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
          return (
            <div key={i} style={{ textAlign: "center", opacity: p }}>
              <div style={{ fontSize: 76, fontWeight: 800, color: i % 2 ? C.accent : C.brand }}>
                {Math.round(s.value * p)}
                {s.suffix}
              </div>
              <div style={{ fontSize: 18, color: C.dim, maxWidth: 200 }}>{pick(s.label, lang)}</div>
            </div>
          );
        })}
      </div>
      <div style={{ transform: `scale(${cta})`, fontSize: 40, fontWeight: 800, color: C.bg, background: C.text, padding: "18px 40px", borderRadius: 999 }}>
        {lang === "pt" ? "Vamos construir juntos →" : "Let's build together →"}
      </div>
      <div style={{ fontFamily: MONO, fontSize: 20, color: C.dim, opacity: cta }}>linkedin.com/in/caio-cesar-ponte</div>
    </AbsoluteFill>
  );
};

export const Showreel: React.FC<ShowreelProps> = (props) => (
  <AbsoluteFill>
    <Grid />
    <Sequence durationInFrames={105}>
      <Intro {...props} />
    </Sequence>
    <Sequence from={105} durationInFrames={105}>
      <Stack lang={props.lang} />
    </Sequence>
    {[0, 1, 2].map((i) => (
      <Sequence key={i} from={210 + i * 55} durationInFrames={55}>
        <ProjectCard idx={i} lang={props.lang} />
      </Sequence>
    ))}
    <Sequence from={375}>
      <Outro lang={props.lang} />
    </Sequence>
  </AbsoluteFill>
);
