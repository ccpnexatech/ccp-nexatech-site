import React from "react";
import { AbsoluteFill, Easing, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { K } from "./tokens";

export const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
export const ease = Easing.bezier(0.16, 1, 0.3, 1);

/** 0→1 entre dois frames, com curva suave. */
export const useIn = (from: number, len = 18) => {
  const f = useCurrentFrame();
  return interpolate(f, [from, from + len], [0, 1], { ...clamp, easing: ease });
};

/** Texto que sobe de dentro de uma máscara (linha editorial). */
export const MaskLine: React.FC<{ at: number; children: React.ReactNode; style?: React.CSSProperties }> = ({ at, children, style }) => {
  const t = useIn(at, 22);
  return (
    <div style={{ overflow: "hidden", paddingBottom: "0.18em", marginBottom: "-0.18em", ...style }}>
      <div style={{ transform: `translateY(${(1 - t) * 105}%)` }}>{children}</div>
    </div>
  );
};

/** Régua que se desenha da esquerda para a direita. */
export const Rule: React.FC<{ at: number; color?: string; width?: number | string; thick?: number }> = ({ at, color = K.accent, width = 120, thick = 2 }) => {
  const t = useIn(at, 20);
  return <div style={{ width, height: thick, background: color, transformOrigin: "left", transform: `scaleX(${t})` }} />;
};

/** Grão de filme determinístico. */
export const Grain: React.FC<{ opacity?: number }> = ({ opacity = 0.07 }) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{ opacity, pointerEvents: "none", mixBlendMode: "multiply" }}>
      <svg width="100%" height="100%">
        <filter id={`g${f % 8}`}><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves={2} seed={f % 8} /></filter>
        <rect width="100%" height="100%" filter={`url(#g${f % 8})`} />
      </svg>
    </AbsoluteFill>
  );
};

/** Barras de cinema que abrem/fecham. */
export const Letterbox: React.FC<{ size?: number; color?: string }> = ({ size = 0.1, color = K.ink }) => {
  const t = useIn(0, 24);
  const h = `${size * 100 * t}%`;
  return (
    <>
      <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: h, background: color }} />
      <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: h, background: color }} />
    </>
  );
};

export const Pop: React.FC<{ at: number; children: React.ReactNode; style?: React.CSSProperties }> = ({ at, children, style }) => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: f - at, fps, config: { damping: 16, mass: 0.7 } });
  return <div style={{ transform: `scale(${0.85 + s * 0.15})`, opacity: s, ...style }}>{children}</div>;
};
