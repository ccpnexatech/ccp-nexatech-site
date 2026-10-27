import React from "react";
import { Audio, staticFile } from "remotion";
import { linearTiming, TransitionSeries } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";
import { BACKSTAGE, pick, type Lang } from "../content/profile";
import { CodeScene, DeviceStage, StepRail } from "./kit/scenes";
import { backstageTimeline, TR } from "./timeline";

export type BackstageProps = { slug: string; lang: Lang };

/** Duração varia por projeto (tempo de leitura do problema e da decisão). */
export const backstageMeta = (slug: string) => ({ fps: 30, width: 1280, height: 720, durationInFrames: backstageTimeline(slug).total });

const K = { pt: ["Problema", "Decisão técnica"], en: ["Problem", "Technical decision"] };

export const Backstage: React.FC<BackstageProps> = ({ slug, lang }) => {
  const b = BACKSTAGE.find((x) => x.slug === slug) ?? BACKSTAGE[0];
  const tl = backstageTimeline(b.slug);
  const [steps, device, code] = tl.scenes;
  return (
    <>
      <Audio src={staticFile(`audio/bastidores-${b.slug}.mp3`)} />
      <TransitionSeries>
        <TransitionSeries.Sequence durationInFrames={steps.dur}>
          <StepRail durations={tl.stepDur} steps={[{ k: K[lang][0], v: pick(b.ask, lang) }, { k: K[lang][1], v: pick(b.decision, lang) }]} />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={slide({ direction: "from-right" })} timing={linearTiming({ durationInFrames: TR })} />
        <TransitionSeries.Sequence durationInFrames={device.dur}>
          <DeviceStage lang={lang} kind={b.device} slug={b.slug} brand={b.color} title={b.name} callouts={b.callouts.map((c) => pick(c, lang))} url={(b.demo ?? b.url)?.replace("https://", "") ?? "app.local"} />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: TR })} />
        <TransitionSeries.Sequence durationInFrames={code.dur}>
          <CodeScene file={b.code.file} src={b.code.src} note={pick(b.code.note, lang)} focusLine={b.code.focus} />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </>
  );
};
