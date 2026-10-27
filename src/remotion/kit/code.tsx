import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { K, MONO } from "./tokens";
import { clamp } from "./motion";

// Realce simples e determinístico (sem dependência): comentários, strings, palavras-chave, tipos.
const KW = /\b(export|async|await|const|let|return|if|throw|try|catch|class|constructor|private|readonly|public|type|function|new|import|from|extends|in)\b/;
const RULES: [RegExp, string][] = [
  [/\/\/.*$/, "#A69C8B"],
  [/(["'`])(?:\\.|(?!\1).)*\1/, "#E8A36B"],
  [/@\w+/, "#C792EA"],
  [KW, "#F08A4B"],
  [/\b[A-Z][A-Za-z0-9]*\b/, "#8DB0FF"],
  [/\b\d+\b/, "#E8A36B"],
];

export function highlight(line: string): React.ReactNode[] {
  const out: React.ReactNode[] = [];
  let rest = line;
  let k = 0;
  while (rest.length) {
    let best: { i: number; len: number; color: string } | null = null;
    for (const [re, color] of RULES) {
      const m = re.exec(rest);
      if (m && (best === null || m.index < best.i)) best = { i: m.index, len: m[0].length, color };
    }
    if (!best) { out.push(rest); break; }
    if (best.i > 0) out.push(rest.slice(0, best.i));
    out.push(<span key={k++} style={{ color: best.color }}>{rest.slice(best.i, best.i + best.len)}</span>);
    rest = rest.slice(best.i + best.len);
  }
  return out;
}

/** Cartão de código que digita linha a linha e destaca uma linha-chave. */
export const CodeCard: React.FC<{ file: string; src: string; at?: number; focusLine?: number; fontSize?: number; maxLines?: number }> = ({ file, src, at = 0, focusLine, fontSize = 20, maxLines = 14 }) => {
  const f = useCurrentFrame();
  const lines = src.split("\n").slice(0, maxLines);
  const shown = interpolate(f, [at, at + lines.length * 3], [0, lines.length], clamp);
  return (
    <div style={{ background: K.stage, color: K.stageInk, borderRadius: 18, overflow: "hidden", boxShadow: "0 40px 80px -30px rgba(0,0,0,.45)", fontFamily: MONO }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "12px 18px", borderBottom: "1px solid #2A261F", fontSize: 14, color: K.stageMuted }}>
        {["#FF605C", "#FFBD44", "#00CA4E"].map((c) => <span key={c} style={{ width: 10, height: 10, borderRadius: 9, background: c }} />)}
        <span style={{ marginLeft: 10 }}>{file}</span>
      </div>
      <div style={{ padding: "18px 0", fontSize, lineHeight: 1.55 }}>
        {lines.map((l, i) => {
          const vis = Math.min(1, Math.max(0, shown - i));
          const focus = focusLine === i;
          return (
            <div key={i} style={{ display: "flex", opacity: vis, background: focus ? "rgba(240,138,75,.14)" : "transparent", borderLeft: `3px solid ${focus ? "#F08A4B" : "transparent"}`, padding: "0 22px 0 16px", whiteSpace: "pre" }}>
              <span style={{ width: 34, color: "#8C8577", textAlign: "right", marginRight: 18 }}>{i + 1}</span>
              <span>{highlight(l)}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
