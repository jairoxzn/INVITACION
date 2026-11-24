"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { invitation } from "@/config/invitation";

/** Control de la música de fondo. Solo suena tras una interacción del usuario. */
export function useMusic() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [available, setAvailable] = useState(Boolean(invitation.music.src));
  const [volume, setVolumeState] = useState(invitation.music.volume);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume;
  }, [volume]);

  const play = useCallback(() => {
    audioRef.current?.play().catch(() => setPlaying(false));
  }, []);

  const toggle = useCallback(() => {
    const a = audioRef.current;
    if (!a) return;
    if (a.paused) a.play().catch(() => setPlaying(false));
    else a.pause();
  }, []);

  const skip = useCallback((sec: number) => {
    const a = audioRef.current;
    if (!a) return;
    a.currentTime = Math.max(0, Math.min(a.duration || 0, a.currentTime + sec));
  }, []);

  const seek = useCallback((ratio: number) => {
    const a = audioRef.current;
    if (!a || !a.duration) return;
    a.currentTime = Math.max(0, Math.min(1, ratio)) * a.duration;
  }, []);

  const setVolume = useCallback((v: number) => setVolumeState(Math.min(1, Math.max(0, v))), []);

  return {
    audioRef,
    playing,
    setPlaying,
    available,
    setAvailable,
    volume,
    setVolume,
    time,
    setTime,
    duration,
    setDuration,
    play,
    toggle,
    skip,
    seek,
  };
}

export type MusicApi = ReturnType<typeof useMusic>;
