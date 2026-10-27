"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale } from "next-intl";
import { Player, type PlayerRef } from "@remotion/player";
import { Volume2, VolumeX } from "lucide-react";
import { Documentary, DOCUMENTARY } from "@/remotion/Documentary";
import { Backstage, backstageMeta } from "@/remotion/Backstage";
import { usePrefs } from "@/components/a11y/prefs";
import type { Lang } from "@/content/profile";

const style = { width: "100%", aspectRatio: "16 / 9" } as const;

/* ---------- Gerência de áudio entre os players ----------
 * Regras:
 * 1. Só um vídeo tem som por vez: ao ativar o som de um, os outros são silenciados e pausados.
 * 2. Vídeo fora da tela pausa; ao voltar, retoma (se estava tocando).
 * 3. Aba em segundo plano pausa tudo; ao voltar, retoma o que estava visível e tocando.
 */
type Entry = { ref: React.RefObject<PlayerRef | null>; visible: boolean; wantsPlay: boolean };
const registry = new Map<string, Entry>();

function claimAudio(id: string) {
  registry.forEach((e, key) => {
    if (key === id) return;
    const p = e.ref.current;
    if (p && !p.isMuted()) {
      p.mute();
      p.pause();
      e.wantsPlay = false;
    }
  });
}

if (typeof document !== "undefined") {
  document.addEventListener("visibilitychange", () => {
    registry.forEach((e) => {
      const p = e.ref.current;
      if (!p) return;
      if (document.hidden) p.pause();
      else if (e.visible && e.wantsPlay) p.play();
    });
  });
}

function useManagedPlayer(id: string, ref: React.RefObject<PlayerRef | null>, autoPlay: boolean) {
  const box = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const entry: Entry = { ref, visible: false, wantsPlay: autoPlay };
    registry.set(id, entry);
    const p = ref.current;
    const onMute = () => { if (p && !p.isMuted()) claimAudio(id); };
    const onPlay = () => { entry.wantsPlay = true; if (p && !p.isMuted()) claimAudio(id); };
    const onPause = () => { if (entry.visible && !document.hidden) entry.wantsPlay = false; };
    p?.addEventListener("mutechange", onMute);
    p?.addEventListener("play", onPlay);
    p?.addEventListener("pause", onPause);
    const io = new IntersectionObserver(([en]) => {
      entry.visible = en.isIntersecting;
      const pl = ref.current;
      if (!pl) return;
      if (!en.isIntersecting && pl.isPlaying()) { const keep = entry.wantsPlay; pl.pause(); entry.wantsPlay = keep; }
      else if (en.isIntersecting && entry.wantsPlay && !document.hidden) pl.play();
    }, { threshold: 0.35 });
    if (box.current) io.observe(box.current);
    return () => {
      io.disconnect();
      p?.removeEventListener("mutechange", onMute);
      p?.removeEventListener("play", onPlay);
      p?.removeEventListener("pause", onPause);
      registry.delete(id);
    };
  }, [id, ref, autoPlay]);
  return box;
}

const T = {
  pt: { on: "Ouvir com som", off: "Desativar som", hint: "O vídeo começa sem som. Ative para ouvir os efeitos sincronizados com a animação." },
  en: { on: "Play with sound", off: "Mute", hint: "The video starts muted. Turn sound on to hear effects synced to the animation." },
};

/** Botão de som: ao ativar, o vídeo recomeça do início com áudio (gesto do usuário libera o som no navegador). */
function SoundButton({ playerRef, dark }: { playerRef: React.RefObject<PlayerRef | null>; dark?: boolean }) {
  const t = T[useLocale() === "en" ? "en" : "pt"];
  const [muted, setMuted] = useState(true);
  useEffect(() => {
    const p = playerRef.current;
    if (!p) return;
    const sync = () => setMuted(p.isMuted());
    p.addEventListener("mutechange", sync);
    return () => p.removeEventListener("mutechange", sync);
  }, [playerRef]);
  const toggle = () => {
    const p = playerRef.current;
    if (!p) return;
    if (p.isMuted()) {
      p.unmute(); // dispara mutechange → os outros players são silenciados
      p.setVolume(1);
      p.seekTo(0);
      p.play();
    } else {
      p.mute();
    }
  };
  return (
    <div className="mt-3 flex flex-wrap items-center gap-3">
      <button type="button" onClick={toggle} aria-pressed={!muted}
        className={dark ? "inline-flex items-center gap-2 rounded-full bg-stage-ink px-4 py-2 text-sm font-semibold text-stage hover:opacity-90" : "btn-primary"}>
        {muted ? <Volume2 size={16} aria-hidden /> : <VolumeX size={16} aria-hidden />}
        {muted ? t.on : t.off}
      </button>
      <span className={dark ? "text-sm text-stage-ink/80" : "text-sm text-muted"}>{t.hint}</span>
    </div>
  );
}

export function DocumentaryPlayer({ lang, label }: { lang: Lang; label: string }) {
  const { reducedMotion } = usePrefs();
  const ref = useRef<PlayerRef>(null);
  const box = useManagedPlayer("documentario", ref, !reducedMotion);
  return (
    <div role="region" aria-label={label}>
      <div ref={box} className="overflow-hidden rounded-xl ring-1 ring-white/10">
        <Player
          ref={ref}
          component={Documentary}
          inputProps={{ lang, photoSrc: "/caio.jpg" }}
          durationInFrames={DOCUMENTARY.durationInFrames}
          fps={DOCUMENTARY.fps}
          compositionWidth={DOCUMENTARY.width}
          compositionHeight={DOCUMENTARY.height}
          style={style}
          controls
          loop
          initiallyMuted
          autoPlay={!reducedMotion}
          initialFrame={reducedMotion ? 60 : 0}
          clickToPlay
          spaceKeyToPlayOrPause={false} // senão o player rouba o foco do teclado a cada play/pause
          acknowledgeRemotionLicense
        />
      </div>
      <SoundButton playerRef={ref} dark />
    </div>
  );
}

export function BackstagePlayer({ slug, lang, label }: { slug: string; lang: Lang; label: string }) {
  const { reducedMotion } = usePrefs();
  const ref = useRef<PlayerRef>(null);
  const meta = backstageMeta(slug);
  const box = useManagedPlayer(`bastidores-${slug}-${lang}`, ref, !reducedMotion);
  return (
    <div role="region" aria-label={label}>
      <div ref={box} className="overflow-hidden rounded-xl border border-line">
        <Player
          ref={ref}
          component={Backstage}
          inputProps={{ slug, lang }}
          durationInFrames={meta.durationInFrames}
          fps={meta.fps}
          compositionWidth={meta.width}
          compositionHeight={meta.height}
          style={style}
          controls
          loop
          initiallyMuted
          autoPlay={!reducedMotion}
          initialFrame={reducedMotion ? meta.durationInFrames - 60 : 0}
          clickToPlay
          spaceKeyToPlayOrPause={false}
          acknowledgeRemotionLicense
        />
      </div>
      <SoundButton playerRef={ref} />
    </div>
  );
}
