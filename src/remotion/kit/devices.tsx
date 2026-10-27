import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { K, MONO, SANS } from "./tokens";
import { clamp, ease } from "./motion";
import { KT } from "./i18n";
import type { Lang } from "../../content/profile";

/* ---------- Telas procedurais (sem screenshots reais) ---------- */

const Bar: React.FC<{ w: string | number; h?: number; c?: string; r?: number; style?: React.CSSProperties }> = ({ w, h = 10, c = "#00000014", r = 6, style }) => (
  <div style={{ width: w, height: h, background: c, borderRadius: r, ...style }} />
);

/** App white-label: a marca muda por cliente (brand). */
export const AppScreen: React.FC<{ brand: string; step: number; lang?: Lang }> = ({ brand, step, lang = "pt" }) => {
  const t = KT[lang];
  const screens = [
    // 0 — início
    <div key="home" style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <div style={{ height: 150, borderRadius: 18, background: `linear-gradient(135deg, ${brand}, ${brand}AA)`, padding: 16, color: "#fff", display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
        <div style={{ fontSize: 12, opacity: 0.85 }}>{t.nextEvent}</div>
        <div style={{ fontSize: 20, fontWeight: 800 }}>{t.event}</div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        {t.tiles.map((tile) => (
          <div key={tile} style={{ height: 70, borderRadius: 14, background: "#fff", border: `1px solid ${K.line}`, padding: 10, fontSize: 13, fontWeight: 700, color: K.ink }}>
            <div style={{ width: 22, height: 22, borderRadius: 7, background: `${brand}22`, marginBottom: 8 }} />{tile}
          </div>
        ))}
      </div>
    </div>,
    // 1 — carregando (estado tratado)
    <div key="load" style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      {[0, 1, 2, 3].map((i) => (
        <div key={i} style={{ display: "flex", gap: 10, alignItems: "center", padding: 10, borderRadius: 14, background: "#fff", border: `1px solid ${K.line}` }}>
          <Bar w={44} h={44} r={10} c="#0000000F" />
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 7 }}><Bar w="80%" /><Bar w="50%" h={8} /></div>
        </div>
      ))}
    </div>,
    // 2 — erro (estado tratado)
    <div key="err" style={{ height: 300, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 10, textAlign: "center", color: K.ink }}>
      <div style={{ width: 54, height: 54, borderRadius: 99, background: `${K.accent}1F`, color: K.accent, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, fontWeight: 800 }}>!</div>
      <div style={{ fontWeight: 800, fontSize: 17 }}>{t.offline}</div>
      <div style={{ fontSize: 13, color: K.muted, maxWidth: 200 }}>{t.offlineSub}</div>
      <div style={{ marginTop: 6, padding: "8px 16px", borderRadius: 99, background: brand, color: "#fff", fontSize: 13, fontWeight: 700 }}>{t.retry}</div>
    </div>,
  ];
  return (
    <div style={{ position: "absolute", inset: 0, background: K.paper, fontFamily: SANS, padding: "54px 16px 16px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
        <div style={{ width: 30, height: 30, borderRadius: 9, background: brand }} />
        <div style={{ fontWeight: 800, fontSize: 15, color: K.ink }}>{t.org}</div>
      </div>
      {screens[step % screens.length]}
    </div>
  );
};

export const OrdersScreen: React.FC<{ lang?: Lang }> = ({ lang = "pt" }) => {
  const t = KT[lang];
  const colors = [K.accent, K.signal, "#15803D", K.signal];
  return (
  <div style={{ position: "absolute", inset: 0, background: "#fff", fontFamily: SANS, color: K.ink, padding: 22 }}>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
      <div style={{ fontWeight: 800, fontSize: 20 }}>{t.orders}</div>
      <div style={{ fontSize: 13, padding: "6px 12px", borderRadius: 99, background: `${K.signal}14`, color: K.signal, fontWeight: 700 }}>{t.branch}</div>
    </div>
    {t.rows.map(([id, d, st], i) => { const c = colors[i]; return (
      <div key={id} style={{ display: "grid", gridTemplateColumns: "70px 1fr 190px", alignItems: "center", padding: "12px 4px", borderTop: `1px solid ${K.line}`, fontSize: 15 }}>
        <span style={{ fontFamily: MONO, color: K.muted }}>{id}</span><span>{d}</span>
        <span style={{ justifySelf: "end", fontSize: 12, fontWeight: 700, color: c, background: `${c}14`, padding: "5px 10px", borderRadius: 99 }}>{st}</span>
      </div>
    ); })}
  </div>
  );
};

export const AgendaScreen: React.FC<{ lang?: Lang }> = ({ lang = "pt" }) => {
  const f = useCurrentFrame();
  const t = KT[lang];
  const bars = [42, 64, 51, 80, 72, 95, 60];
  return (
    <div style={{ position: "absolute", inset: 0, background: "#fff", fontFamily: SANS, color: K.ink, padding: 22 }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12, marginBottom: 18 }}>
        {([[t.kpis[0], 18], [t.kpis[1], 342], [t.kpis[2], 12480]] as [string, number][]).map(([l, v], i) => (
          <div key={l} style={{ border: `1px solid ${K.line}`, borderRadius: 14, padding: 12 }}>
            <div style={{ fontSize: 12, color: K.muted }}>{l}</div>
            <div style={{ fontSize: 26, fontWeight: 800 }}>{Math.round(v * interpolate(f, [10 + i * 5, 50 + i * 5], [0, 1], clamp)).toLocaleString(t.locale)}</div>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", alignItems: "flex-end", gap: 14, height: 150, borderBottom: `1px solid ${K.line}` }}>
        {bars.map((b, i) => <div key={i} style={{ flex: 1, height: `${b * interpolate(f, [20 + i * 3, 60 + i * 3], [0, 1], { ...clamp, easing: ease })}%`, background: i === 5 ? "#0F766E" : "#0F766E55", borderRadius: "8px 8px 0 0" }} />)}
      </div>
    </div>
  );
};

export const JsonScreen: React.FC = () => (
  <div style={{ position: "absolute", inset: 0, background: K.stage, fontFamily: MONO, color: K.stageInk, padding: 24, fontSize: 16, lineHeight: 1.6, whiteSpace: "pre" }}>
    <span style={{ color: "#8A8172" }}>GET /v1/empresas/12345678000190</span>{"\n"}
    {`{
  "razaoSocial": "Exemplo Serviços LTDA",
  "contratosFederais": 7,
  "score": { "valor": 72, "nivel": "moderado",
    "fatores": ["sócio em 3 empresas", "contrato recente"] },
  "stale": false
}`}
  </div>
);

/* ---------- Molduras ---------- */

export const Phone: React.FC<{ children: React.ReactNode; scale?: number; tilt?: number }> = ({ children, scale = 1, tilt = 0 }) => (
  <div style={{ width: 300 * scale, height: 620 * scale, borderRadius: 48 * scale, background: "#0E0C0A", padding: 10 * scale, boxShadow: "0 50px 90px -30px rgba(23,20,15,.55)", transform: `rotate(${tilt}deg)` }}>
    <div style={{ position: "relative", width: "100%", height: "100%", borderRadius: 38 * scale, overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, transform: `scale(${scale})`, transformOrigin: "top left", width: `${100 / scale}%`, height: `${100 / scale}%` }}>{children}</div>
      <div style={{ position: "absolute", top: 10 * scale, left: "50%", transform: "translateX(-50%)", width: 90 * scale, height: 26 * scale, borderRadius: 99, background: "#0E0C0A" }} />
    </div>
  </div>
);

export const Browser: React.FC<{ children: React.ReactNode; url: string; width?: number; height?: number }> = ({ children, url, width = 820, height = 470 }) => (
  <div style={{ width, height, borderRadius: 16, overflow: "hidden", background: "#fff", border: `1px solid ${K.line}`, boxShadow: "0 50px 90px -40px rgba(23,20,15,.5)" }}>
    <div style={{ height: 40, display: "flex", alignItems: "center", gap: 8, padding: "0 14px", background: "#F1ECE3", borderBottom: `1px solid ${K.line}` }}>
      {["#FF605C", "#FFBD44", "#00CA4E"].map((c) => <span key={c} style={{ width: 11, height: 11, borderRadius: 9, background: c }} />)}
      <div style={{ marginLeft: 12, flex: 1, height: 24, borderRadius: 8, background: "#fff", fontFamily: MONO, fontSize: 12, color: K.muted, display: "flex", alignItems: "center", padding: "0 10px" }}>{url}</div>
    </div>
    <div style={{ position: "relative", height: height - 40 }}>{children}</div>
  </div>
);

/** Device que entra subindo com mola. */
export const Rise: React.FC<{ at?: number; children: React.ReactNode }> = ({ at = 0, children }) => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: f - at, fps, config: { damping: 18, mass: 0.9 } });
  return <div style={{ transform: `translateY(${(1 - s) * 160}px)`, opacity: s }}>{children}</div>;
};

/* ---------- Anotação: ponto + linha + rótulo ---------- */
export const Callout: React.FC<{ at: number; x: number; y: number; dx: number; label: string; color?: string }> = ({ at, x, y, dx, label, color = K.accent }) => {
  const f = useCurrentFrame();
  const t = interpolate(f, [at, at + 16], [0, 1], { ...clamp, easing: ease });
  const tl = interpolate(f, [at + 10, at + 24], [0, 1], clamp);
  const left = dx < 0;
  return (
    <div style={{ position: "absolute", left: x, top: y, pointerEvents: "none" }}>
      <div style={{ position: "absolute", left: -8, top: -8, width: 16, height: 16, borderRadius: 99, border: `3px solid ${color}`, background: "#fff", transform: `scale(${t})` }} />
      <div style={{ position: "absolute", top: -1, left: left ? dx * t : 0, width: Math.abs(dx) * t, height: 2, background: color }} />
      <div style={{ position: "absolute", top: -16, [left ? "right" : "left"]: left ? -dx + 12 : dx + 12, whiteSpace: "nowrap", opacity: tl, transform: `translateX(${(1 - tl) * (left ? 10 : -10)}px)`, fontFamily: SANS, fontSize: 17, fontWeight: 700, color: K.ink, background: "#fff", border: `1.5px solid ${color}`, borderRadius: 99, padding: "5px 12px" }}>{label}</div>
    </div>
  );
};
