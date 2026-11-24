"use client";

import { AnimatePresence, motion } from "framer-motion";
import { FastForward, Pause, Play, Rewind, Volume2, VolumeX } from "lucide-react";
import { useEffect, useState } from "react";
import { invitation } from "@/config/invitation";
import type { MusicApi } from "@/hooks/useMusic";

/** Elemento <audio> (siempre montado). */
export function MusicAudio({ music }: { music: MusicApi }) {
  const { src } = invitation.music;
  return (
    <audio
      ref={music.audioRef}
      src={src || undefined}
      loop
      preload="none"
      onPlay={() => music.setPlaying(true)}
      onPause={() => music.setPlaying(false)}
      onError={() => music.setAvailable(false)}
      onTimeUpdate={(e) => music.setTime(e.currentTarget.currentTime)}
      onLoadedMetadata={(e) => music.setDuration(e.currentTarget.duration)}
    />
  );
}

const BARS = Array.from({ length: 44 }, (_, i) => 22 + ((i * 37 + (i % 5) * 19) % 70));

const fmt = (s: number) => {
  if (!isFinite(s) || s <= 0) return "0:00";
  return `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;
};

/** Tarjeta de música dentro del contenido: onda, progreso y controles. */
export function MusicCard({ music }: { music: MusicApi }) {
  const { available, playing, toggle, skip, seek, time, duration, volume, setVolume } = music;
  if (!available || !invitation.music.src) return null;

  const progress = duration ? time / duration : 0;
  const activeBars = Math.round(progress * BARS.length);

  return (
    <div className="w-full rounded-[1.75rem] border border-gold/50 bg-ruby-dark/55 px-5 pb-5 pt-5 shadow-[0_12px_40px_rgba(0,0,0,.45)] backdrop-blur-md">
      <div className="flex h-12 items-center justify-center gap-[3px]" aria-hidden>
        {BARS.map((h, i) => (
          <span
            key={i}
            className={`w-[3px] origin-center rounded-full ${i < activeBars ? "bg-gold-light" : "bg-gold/55"}`}
            style={{
              height: `${h}%`,
              animation: playing ? `eq ${0.6 + (i % 7) * 0.12}s ease-in-out ${(i % 9) * 0.05}s infinite` : undefined,
            }}
          />
        ))}
      </div>

      <div className="mt-3 flex items-center gap-3 text-[0.65rem] tabular-nums text-ivory/70">
        <span>{fmt(time)}</span>
        <input
          type="range"
          min={0}
          max={1}
          step={0.001}
          value={progress}
          onChange={(e) => seek(Number(e.target.value))}
          aria-label="Progreso de la canción"
          className="vol h-1 flex-1"
        />
        <span>{fmt(duration)}</span>
      </div>

      <div className="mt-3 flex items-center justify-center gap-6">
        <button onClick={() => skip(-10)} aria-label="Retroceder 10 segundos" className="p-2 text-ivory active:scale-90">
          <Rewind className="h-5 w-5 fill-ivory" />
        </button>
        <button
          onClick={toggle}
          aria-label={playing ? "Pausar" : "Reproducir"}
          className="bg-gold-metal flex h-16 w-16 items-center justify-center rounded-full border-4 border-gold/30 text-ruby-deep shadow-[0_0_28px_rgba(212,175,55,.45)] active:scale-90"
        >
          {playing ? <Pause className="h-7 w-7 fill-ruby-deep" /> : <Play className="ml-1 h-7 w-7 fill-ruby-deep" />}
        </button>
        <button onClick={() => skip(10)} aria-label="Adelantar 10 segundos" className="p-2 text-ivory active:scale-90">
          <FastForward className="h-5 w-5 fill-ivory" />
        </button>
      </div>

      <p className="text-gold-metal mt-3 text-center font-label text-lg font-bold tracking-[0.2em]">
        {playing ? "SONANDO…" : "¡ DALE PLAY !"}
      </p>

      <div className="mt-3 flex items-center justify-center gap-3">
        <button
          onClick={() => setVolume(volume === 0 ? invitation.music.volume : 0)}
          aria-label={volume === 0 ? "Activar sonido" : "Silenciar"}
          className="text-gold-light"
        >
          {volume === 0 ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
        </button>
        <input
          type="range"
          min={0}
          max={1}
          step={0.05}
          value={volume}
          onChange={(e) => setVolume(Number(e.target.value))}
          aria-label="Volumen"
          className="vol w-32"
        />
      </div>
    </div>
  );
}

/** Botón flotante mini (aparece al hacer scroll) alineado a la columna. */
export function MusicFloating({ music }: { music: MusicApi }) {
  const { available, playing, toggle } = music;
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 700);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!available || !invitation.music.src) return null;

  return (
    <div className="pointer-events-none fixed bottom-4 left-1/2 z-[60] flex w-full max-w-[480px] -translate-x-1/2 justify-end px-4 pb-[env(safe-area-inset-bottom)]">
      <AnimatePresence>
        {show && (
          <motion.button
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            onClick={toggle}
            aria-label={playing ? "Pausar música" : "Reproducir música"}
            className="bg-gold-metal pointer-events-auto flex h-12 w-12 items-center justify-center rounded-full border-2 border-ruby-dark text-ruby-deep shadow-xl shadow-black/50 active:scale-90"
          >
            {playing ? <Pause className="h-5 w-5 fill-ruby-deep" /> : <Play className="ml-0.5 h-5 w-5 fill-ruby-deep" />}
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
