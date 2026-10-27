import React from "react";
import { Audio, staticFile } from "remotion";
import { linearTiming, springTiming, TransitionSeries, type TransitionPresentation } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { wipe } from "@remotion/transitions/wipe";
import { slide } from "@remotion/transitions/slide";
import { BACKSTAGE, CHAPTERS, DELIVER, PROFILE, pick, type Lang } from "../content/profile";
import { ChapterCard, CodeScene, Deliver, DeviceStage, Invite, ProcessMap, Quote, Slate } from "./kit/scenes";
import { documentaryTimeline, TR } from "./timeline";

export type DocumentaryProps = { lang: Lang; photoSrc: string };

// Durações e sons vêm de timeline.ts (mesma conta usada por scripts/audio.py).
const TL = documentaryTimeline();
const S = TL.scenes.map((x) => x.dur);
export const DOCUMENTARY = { fps: 30, width: 1280, height: 720, durationInFrames: TL.total };

const T = {
  pt: { kicker: "Trajetória profissional", deliver: "O que eu entrego", process: ["Pedido", "Regra", "Processo", "Documento"], processTitle: "Do pedido à especificação", inviteK: "Disponível para novas vagas", invite: "Desenvolvedor Front-End & Mobile disponível para novas oportunidades.", points: ["React Native", "React + TypeScript", "APIs REST", "Firebase · Clarity", "Discovery"], cta: "Entre em contato" },
  en: { kicker: "Professional path", deliver: "What I deliver", process: ["Request", "Rule", "Process", "Document"], processTitle: "From request to specification", inviteK: "Open to new roles", invite: "Front-End & Mobile Developer available for new opportunities.", points: ["React Native", "React + TypeScript", "REST APIs", "Firebase · Clarity", "Discovery"], cta: "Get in touch" },
};

export const Documentary: React.FC<DocumentaryProps> = ({ lang, photoSrc }) => {
  const t = T[lang];
  const [c1, c2, c3] = CHAPTERS;
  const app = BACKSTAGE[0];
  const ofix = BACKSTAGE[1];
  const scenes = [
    <Slate key="s" kicker={t.kicker} title={PROFILE.name} meta={`${pick(PROFILE.role, lang).toUpperCase()} · FORTALEZA · 2022 — 2026`} />,
    <Deliver key="dv" photo={photoSrc} name={PROFILE.name} role={pick(PROFILE.role, lang)} title={t.deliver} items={DELIVER.map((d) => ({ h: pick(d.h, lang), p: pick(d.proof, lang) }))} />,
    <ChapterCard key="c1" lang={lang} n={c1.n} years={pick(c1.years, lang)} title={pick(c1.title, lang)} lede={pick(c1.lede, lang)} />,
    <ProcessMap key="pm" title={t.processTitle} steps={t.process} />,
    <ChapterCard key="c2" lang={lang} n={c2.n} years={pick(c2.years, lang)} title={pick(c2.title, lang)} lede={pick(c2.lede, lang)} />,
    <Quote key="q" text={pick(c2.quote!.text, lang)} by={pick(c2.quote!.by, lang)} />,
    <DeviceStage key="d" lang={lang} kind="phone" slug={app.slug} brand={app.color} title={pick(c3.title, lang)} callouts={app.callouts.map((c) => pick(c, lang))} />,
    <CodeScene key="code" file={ofix.code.file} src={ofix.code.src} note={pick(ofix.code.note, lang)} focusLine={ofix.code.focus} />,
    <Invite key="inv" kicker={t.inviteK} title={t.invite} points={t.points} cta={t.cta} contact="linkedin.com/in/caio-cesar-ponte" />,
  ];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const presentations: TransitionPresentation<any>[] = [fade(), wipe({ direction: "from-left" }), fade(), slide({ direction: "from-right" }), fade(), wipe({ direction: "from-bottom" }), slide({ direction: "from-bottom" }), fade()];
  return (
    <>
    <Audio src={staticFile("audio/documentario.mp3")} />
    <TransitionSeries>
      {scenes.map((sc, i) => (
        <React.Fragment key={i}>
          <TransitionSeries.Sequence durationInFrames={S[i]}>{sc}</TransitionSeries.Sequence>
          {i < scenes.length - 1 && (
            <TransitionSeries.Transition presentation={presentations[i]} timing={i % 2 ? springTiming({ config: { damping: 200 }, durationInFrames: TR }) : linearTiming({ durationInFrames: TR })} />
          )}
        </React.Fragment>
      ))}
    </TransitionSeries>
    </>
  );
};
