import React from "react";
import { AbsoluteFill, Img, interpolate, useCurrentFrame } from "remotion";
import { K, MONO, SANS, SERIF } from "./tokens";
import { Grain, Letterbox, MaskLine, Pop, Rule, clamp, useIn } from "./motion";
import { AgendaScreen, AppScreen, Browser, Callout, JsonScreen, OrdersScreen, Phone, Rise } from "./devices";
import { CodeCard } from "./code";
import { KT } from "./i18n";
import type { Lang } from "../../content/profile";
import { Quote as QuoteIcon, ArrowRight } from "lucide-react";

const Paper: React.FC<{ children: React.ReactNode; dark?: boolean }> = ({ children, dark }) => (
  <AbsoluteFill style={{ background: dark ? K.stage : K.paper, color: dark ? K.stageInk : K.ink, fontFamily: SANS }}>
    {children}
    <Grain opacity={dark ? 0.12 : 0.06} />
  </AbsoluteFill>
);

const Kicker: React.FC<{ children: React.ReactNode; at?: number; color?: string }> = ({ children, at = 0, color = K.accent }) => {
  const t = useIn(at, 14);
  return <div style={{ fontFamily: MONO, fontSize: 18, letterSpacing: "0.2em", textTransform: "uppercase", color, opacity: t }}>{children}</div>;
};

/** Abertura de documentário: letterbox + título serifado + slate. */
export const Slate: React.FC<{ kicker: string; title: string; meta: string }> = ({ kicker, title, meta }) => {
  const f = useCurrentFrame();
  const zoom = interpolate(f, [0, 120], [1.04, 1], clamp);
  return (
    <Paper dark>
      <AbsoluteFill style={{ padding: "0 120px", justifyContent: "center", transform: `scale(${zoom})` }}>
        <Kicker at={8} color="#F08A4B">{kicker}</Kicker>
        <MaskLine at={16} style={{ marginTop: 26 }}><div style={{ fontFamily: SERIF, fontSize: 118, lineHeight: 0.95, letterSpacing: -2 }}>{title}</div></MaskLine>
        <div style={{ marginTop: 34 }}><Rule at={34} color="#F08A4B" width={160} /></div>
        <MaskLine at={40} style={{ marginTop: 20 }}><div style={{ fontFamily: MONO, fontSize: 20, letterSpacing: "0.14em", color: K.stageMuted }}>{meta}</div></MaskLine>
      </AbsoluteFill>
      <Letterbox size={0.09} color="#000" />
    </Paper>
  );
};

/** Retrato com legenda de arquivo. */
export const Portrait: React.FC<{ photo: string; caption: string; sub: string; tag: string }> = ({ photo, caption, sub, tag }) => {
  const f = useCurrentFrame();
  const kb = interpolate(f, [0, 150], [1.12, 1.0], clamp);
  const t = useIn(4, 24);
  return (
    <Paper>
      <div style={{ position: "absolute", left: 130, top: 90, width: 440, height: 540, border: `12px solid #fff`, boxShadow: `22px 26px 0 ${K.line}`, overflow: "hidden", transform: `rotate(${-1.5 * t}deg)`, opacity: t }}>
        <Img src={photo} style={{ width: "100%", height: "100%", objectFit: "cover", transform: `scale(${kb})`, filter: "sepia(.12) contrast(1.04)" }} />
      </div>
      <div style={{ position: "absolute", left: 660, right: 110, top: 220 }}>
        <Kicker at={14}>{tag}</Kicker>
        <MaskLine at={20} style={{ marginTop: 22 }}><div style={{ fontFamily: SERIF, fontSize: 66, lineHeight: 1.02 }}>{caption}</div></MaskLine>
        <MaskLine at={32} style={{ marginTop: 22 }}><div style={{ fontSize: 26, color: K.muted, lineHeight: 1.35 }}>{sub}</div></MaskLine>
      </div>
    </Paper>
  );
};

/** Cartão de capítulo com numeral grande vazado. */
export const ChapterCard: React.FC<{ n: string; title: string; lede: string; years: string; lang?: Lang }> = ({ n, title, lede, years, lang = "pt" }) => {
  const t = useIn(0, 30);
  return (
    <Paper>
      <div style={{ position: "absolute", right: 70, top: -40, fontFamily: SERIF, fontSize: 520, lineHeight: 1, color: "transparent", WebkitTextStroke: `2px ${K.line}`, transform: `translateY(${(1 - t) * 40}px)` }}>{n}</div>
      <AbsoluteFill style={{ padding: "0 130px", justifyContent: "flex-end", paddingBottom: 130 }}>
        <Kicker at={6}>{KT[lang].chapter} {n} — {years}</Kicker>
        <MaskLine at={12} style={{ marginTop: 20 }}><div style={{ fontFamily: SERIF, fontSize: 104, lineHeight: 0.98, letterSpacing: -1.5 }}>{title}</div></MaskLine>
        <MaskLine at={26} style={{ marginTop: 22 }}><div style={{ fontSize: 30, color: K.muted }}>{lede}</div></MaskLine>
      </AbsoluteFill>
    </Paper>
  );
};

/** Mapa de processo: o pedido atravessa as áreas até virar especificação. */
export const ProcessMap: React.FC<{ steps: string[]; title: string }> = ({ steps, title }) => {
  const f = useCurrentFrame();
  return (
    <Paper>
      <div style={{ position: "absolute", left: 130, top: 110 }}><Kicker>{title}</Kicker></div>
      <div style={{ position: "absolute", left: 130, right: 130, top: 300, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        {steps.map((s, i) => {
          const at = 10 + i * 18;
          const line = interpolate(f, [at + 8, at + 22], [0, 1], clamp);
          return (
            <React.Fragment key={s}>
              <Pop at={at}><div style={{ padding: "22px 26px", borderRadius: 16, background: i === steps.length - 1 ? K.ink : "#fff", color: i === steps.length - 1 ? K.paper : K.ink, border: `1.5px solid ${K.ink}`, fontSize: 26, fontWeight: 700, minWidth: 180, textAlign: "center" }}>
                <div style={{ fontFamily: MONO, fontSize: 14, color: i === steps.length - 1 ? "#F08A4B" : K.accent, marginBottom: 6 }}>0{i + 1}</div>{s}
              </div></Pop>
              {i < steps.length - 1 && <div style={{ flex: 1, height: 2, margin: "0 14px", background: `repeating-linear-gradient(90deg, ${K.ink} 0 10px, transparent 10px 18px)`, transformOrigin: "left", transform: `scaleX(${line})` }} />}
            </React.Fragment>
          );
        })}
      </div>
    </Paper>
  );
};

/** Citação de voz em off. */
export const Quote: React.FC<{ text: string; by: string }> = ({ text, by }) => (
  <Paper dark>
    <AbsoluteFill style={{ padding: "0 180px", justifyContent: "center", textAlign: "center", alignItems: "center" }}>
      <Pop at={0}><QuoteIcon size={72} color="#F08A4B" strokeWidth={1.5} style={{ marginBottom: 24 }} /></Pop>
      <MaskLine at={8}><div style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 70, lineHeight: 1.12 }}>{text}</div></MaskLine>
      <MaskLine at={28} style={{ marginTop: 34 }}><div style={{ fontFamily: MONO, fontSize: 20, letterSpacing: "0.14em", color: K.stageMuted }}>— {by}</div></MaskLine>
    </AbsoluteFill>
  </Paper>
);

/** Palco de dispositivo com anotações. */
export const DeviceStage: React.FC<{ kind: "phone" | "browser"; slug: string; brand: string; title: string; callouts: string[]; url?: string; lang?: Lang }> = ({ kind, slug, brand, title, callouts, url, lang = "pt" }) => {
  const f = useCurrentFrame();
  const step = Math.floor(interpolate(f, [0, 150], [0, 3], clamp)) % 3;
  const screen = kind === "phone" ? <AppScreen brand={brand} step={step} lang={lang} /> : slug === "ofix" ? <OrdersScreen lang={lang} /> : slug === "agendaflow" ? <AgendaScreen lang={lang} /> : <JsonScreen />;
  return (
    <Paper>
      <div style={{ position: "absolute", left: 110, top: 90, width: 440 }}>
        <Kicker>{KT[lang].backstage}</Kicker>
        <MaskLine at={6} style={{ marginTop: 18 }}><div style={{ fontFamily: SERIF, fontSize: 64, lineHeight: 1 }}>{title}</div></MaskLine>
      </div>
      {kind === "phone" ? (
        <div style={{ position: "absolute", left: 860, top: 50 }}><Rise at={6}><Phone>{screen}</Phone></Rise></div>
      ) : (
        <div style={{ position: "absolute", left: 600, top: 150 }}><Rise at={6}><Browser url={url ?? "app.local"} width={580} height={420}>{screen}</Browser></Rise></div>
      )}
      {callouts.slice(0, 3).map((c, i) => {
        // Pontos sobre a tela; rótulos sempre à esquerda, abaixo do título.
        const pts = kind === "phone" ? [[900, 330], [905, 470], [940, 590]] : [[640, 300], [700, 390], [880, 490]];
        const [x, y] = pts[i];
        return <Callout key={c} at={40 + i * 22} x={x} y={y} dx={-(x - (kind === "phone" ? 820 : 560))} label={c} />;
      })}
    </Paper>
  );
};

/** Código limpo, digitado, com linha-chave destacada. */
export const CodeScene: React.FC<{ file: string; src: string; note: string; focusLine?: number }> = ({ file, src, note, focusLine }) => (
  <Paper>
    <div style={{ position: "absolute", left: 110, right: 110, top: 70 }}>
      <Rise at={0}><CodeCard file={file} src={src} at={6} focusLine={focusLine} fontSize={19} maxLines={15} /></Rise>
      <div style={{ marginTop: 18 }}><Kicker at={40} color={K.muted}>{note}</Kicker></div>
    </div>
  </Paper>
);

/** Trilho de etapas: pedido → regra → código → tela → resultado. */
export const StepRail: React.FC<{ steps: { k: string; v: string }[] }> = ({ steps }) => {
  const f = useCurrentFrame();
  const active = Math.min(steps.length - 1, Math.floor(interpolate(f, [0, steps.length * 26], [0, steps.length], clamp)));
  return (
    <Paper>
      <div style={{ position: "absolute", left: 110, right: 110, top: 110, display: "flex", gap: 10 }}>
        {steps.map((s, i) => (
          <div key={s.k} style={{ flex: 1, height: 6, borderRadius: 9, background: i <= active ? K.accent : K.line }} />
        ))}
      </div>
      <div style={{ position: "absolute", left: 110, right: 110, top: 150, display: "flex", gap: 10 }}>
        {steps.map((s, i) => <div key={s.k} style={{ flex: 1, fontFamily: MONO, fontSize: 16, color: i === active ? K.ink : K.muted }}>{String(i + 1).padStart(2, "0")} · {s.k}</div>)}
      </div>
      <AbsoluteFill style={{ padding: "0 110px", justifyContent: "center" }}>
        <div key={active} style={{ fontFamily: SERIF, fontSize: 64, lineHeight: 1.1, maxWidth: 1050 }}>
          <MaskLine at={active * 26}>{steps[active].v}</MaskLine>
        </div>
      </AbsoluteFill>
    </Paper>
  );
};

/** O que eu entrego: competências com prova, e quem sou (avatar pequeno). */
export const Deliver: React.FC<{ photo: string; name: string; role: string; title: string; items: { h: string; p: string }[] }> = ({ photo, name, role, title, items }) => (
  <Paper>
    <div style={{ position: "absolute", left: 110, top: 80, display: "flex", alignItems: "center", gap: 16 }}>
      <Pop at={0}><Img src={photo} style={{ width: 64, height: 64, borderRadius: 99, objectFit: "cover", border: `2px solid ${K.ink}` }} /></Pop>
      <div><div style={{ fontWeight: 700, fontSize: 22 }}>{name}</div><div style={{ fontSize: 17, color: K.muted }}>{role}</div></div>
    </div>
    <div style={{ position: "absolute", left: 110, right: 110, top: 200 }}>
      <MaskLine at={6}><div style={{ fontFamily: SERIF, fontSize: 56, lineHeight: 1.05 }}>{title}</div></MaskLine>
      <div style={{ marginTop: 40, display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 18 }}>
        {items.map((it, i) => (
          <Pop key={it.h} at={18 + i * 8}>
            <div style={{ height: 210, borderRadius: 18, background: "#fff", border: `1px solid ${K.line}`, padding: 22, display: "flex", flexDirection: "column", gap: 10 }}>
              <div style={{ fontFamily: MONO, fontSize: 15, color: K.accent }}>0{i + 1}</div>
              <div style={{ fontSize: 23, fontWeight: 700, lineHeight: 1.15 }}>{it.h}</div>
              <div style={{ fontSize: 16, color: K.muted, lineHeight: 1.35 }}>{it.p}</div>
            </div>
          </Pop>
        ))}
      </div>
    </div>
  </Paper>
);

/** Convite profissional (fechamento). */
export const Invite: React.FC<{ kicker: string; title: string; points: string[]; cta: string; contact: string }> = ({ kicker, title, points, cta, contact }) => (
  <Paper>
    <AbsoluteFill style={{ padding: "0 130px", justifyContent: "center" }}>
      <Kicker>{kicker}</Kicker>
      <MaskLine at={6} style={{ marginTop: 18 }}><div style={{ fontFamily: SERIF, fontSize: 76, lineHeight: 1.02, maxWidth: 1000 }}>{title}</div></MaskLine>
      <div style={{ marginTop: 34, display: "flex", gap: 14, flexWrap: "wrap" }}>
        {points.map((p, i) => <Pop key={p} at={22 + i * 6}><div style={{ fontSize: 22, padding: "10px 18px", borderRadius: 99, border: `1.5px solid ${K.ink}` }}>{p}</div></Pop>)}
      </div>
      <div style={{ marginTop: 44, display: "flex", alignItems: "center", gap: 22 }}>
        <Pop at={46}><div style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 26, fontWeight: 700, color: "#fff", background: K.ink, padding: "16px 28px", borderRadius: 99 }}>{cta}<ArrowRight size={26} /></div></Pop>
        <MaskLine at={52}><div style={{ fontFamily: MONO, fontSize: 20, color: K.muted }}>{contact}</div></MaskLine>
      </div>
    </AbsoluteFill>
  </Paper>
);
