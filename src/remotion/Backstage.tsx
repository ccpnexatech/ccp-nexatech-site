import React from "react";
import { linearTiming, TransitionSeries } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";
import { BACKSTAGE, pick, type Lang } from "../content/profile";
import { CodeScene, DeviceStage, StepRail } from "./kit/scenes";

export type BackstageProps = { slug: string; lang: Lang };
const S = [150, 150, 160];
const TR = 16;
export const BACKSTAGE_REEL = { fps: 30, width: 1280, height: 720, durationInFrames: S.reduce((a, b) => a + b, 0) - TR * (S.length - 1) };

const K = { pt: ["Pedido", "Regra", "Decisão", "Resultado"], en: ["Ask", "Rule", "Decision", "Outcome"] };

export const Backstage: React.FC<BackstageProps> = ({ slug, lang }) => {
  const b = BACKSTAGE.find((x) => x.slug === slug) ?? BACKSTAGE[0];
  const k = K[lang];
  const steps = [
    { k: k[0], v: pick(b.ask, lang) },
    { k: k[1], v: pick(b.rules[0], lang) },
    { k: k[2], v: pick(b.decision, lang) },
    { k: k[3], v: pick(b.outcome, lang) },
  ];
  const focus = b.code.src.split("\n").findIndex((l) => l.includes("//"));
  return (
    <TransitionSeries>
      <TransitionSeries.Sequence durationInFrames={S[0]}><StepRail steps={steps} /></TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={slide({ direction: "from-right" })} timing={linearTiming({ durationInFrames: TR })} />
      <TransitionSeries.Sequence durationInFrames={S[1]}>
        <DeviceStage lang={lang} kind={b.device} slug={b.slug} brand={b.color} title={b.name} callouts={b.callouts.map((c) => pick(c, lang))} url={b.url?.replace("https://", "") ?? "localhost:8080/swagger-ui"} />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: TR })} />
      <TransitionSeries.Sequence durationInFrames={S[2]}><CodeScene file={b.code.file} src={b.code.src} note={pick(b.code.note, lang)} focusLine={focus >= 0 ? focus : undefined} /></TransitionSeries.Sequence>
    </TransitionSeries>
  );
};
