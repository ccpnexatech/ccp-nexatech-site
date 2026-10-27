"use client";

import { Player } from "@remotion/player";
import { Documentary, DOCUMENTARY } from "@/remotion/Documentary";
import { Backstage, BACKSTAGE_REEL } from "@/remotion/Backstage";
import { usePrefs } from "@/components/a11y/prefs";
import type { Lang } from "@/content/profile";

const style = { width: "100%", aspectRatio: "16 / 9" } as const;

export function DocumentaryPlayer({ lang, label }: { lang: Lang; label: string }) {
  const { reducedMotion } = usePrefs();
  return (
    <div role="region" aria-label={label}>
      <Player
        component={Documentary}
        inputProps={{ lang, photoSrc: "/caio.jpg" }}
        durationInFrames={DOCUMENTARY.durationInFrames}
        fps={DOCUMENTARY.fps}
        compositionWidth={DOCUMENTARY.width}
        compositionHeight={DOCUMENTARY.height}
        style={style}
        controls
        loop
        autoPlay={!reducedMotion}
        initialFrame={reducedMotion ? 60 : 0}
        clickToPlay
        showVolumeControls={false}
        spaceKeyToPlayOrPause={false} // senão o player rouba o foco do teclado a cada play/pause
        acknowledgeRemotionLicense
      />
    </div>
  );
}

export function BackstagePlayer({ slug, lang, label }: { slug: string; lang: Lang; label: string }) {
  const { reducedMotion } = usePrefs();
  return (
    <div role="region" aria-label={label}>
      <Player
        key={slug + lang}
        component={Backstage}
        inputProps={{ slug, lang }}
        durationInFrames={BACKSTAGE_REEL.durationInFrames}
        fps={BACKSTAGE_REEL.fps}
        compositionWidth={BACKSTAGE_REEL.width}
        compositionHeight={BACKSTAGE_REEL.height}
        style={style}
        controls
        loop
        autoPlay={!reducedMotion}
        initialFrame={reducedMotion ? 220 : 0}
        clickToPlay
        showVolumeControls={false}
        spaceKeyToPlayOrPause={false} // senão o player rouba o foco do teclado a cada play/pause
        acknowledgeRemotionLicense
      />
    </div>
  );
}
