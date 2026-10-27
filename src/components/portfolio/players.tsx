"use client";

import { Player } from "@remotion/player";
import { Showreel, SHOWREEL } from "@/remotion/Showreel";
import { ProjectReel, PROJECT_REEL } from "@/remotion/ProjectReel";
import type { Lang } from "@/content/profile";

export function ShowreelPlayer({ lang }: { lang: Lang }) {
  return (
    <Player
      component={Showreel}
      inputProps={{ lang, photoSrc: "/caio.jpg" }}
      {...SHOWREEL}
      compositionWidth={SHOWREEL.width}
      compositionHeight={SHOWREEL.height}
      style={{ width: "100%", aspectRatio: "16 / 9", borderRadius: 24, overflow: "hidden" }}
      autoPlay
      loop
      controls
      clickToPlay
      acknowledgeRemotionLicense
    />
  );
}

export function ProjectReelPlayer({ slug, lang }: { slug: string; lang: Lang }) {
  return (
    <Player
      key={slug}
      component={ProjectReel}
      inputProps={{ slug, lang }}
      {...PROJECT_REEL}
      compositionWidth={PROJECT_REEL.width}
      compositionHeight={PROJECT_REEL.height}
      style={{ width: "100%", aspectRatio: "16 / 9", borderRadius: 20, overflow: "hidden" }}
      autoPlay
      loop
      controls
      acknowledgeRemotionLicense
    />
  );
}
