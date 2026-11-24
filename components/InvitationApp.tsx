"use client";

import { AnimatePresence, MotionConfig, motion, useScroll } from "framer-motion";
import { useEffect, useState } from "react";
import { useMusic } from "@/hooks/useMusic";
import { Countdown } from "./Countdown";
import { GoldDefs, Sparkles } from "./Decor";
import { EnvelopeCover } from "./EnvelopeCover";
import { FinalMessage } from "./FinalMessage";
import { Gallery } from "./Gallery";
import { Hero } from "./Hero";
import { Locations } from "./Locations";
import { MusicAudio, MusicFloating } from "./MusicPlayer";
import { Rsvp } from "./Rsvp";
import { Timeline } from "./Timeline";
import { Welcome } from "./Welcome";

export function InvitationApp() {
  const music = useMusic();
  const [opened, setOpened] = useState(false);
  const { scrollYProgress } = useScroll();

  // Sin scroll mientras el sobre está cerrado
  useEffect(() => {
    document.documentElement.style.overflow = opened ? "" : "hidden";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [opened]);

  return (
    <MotionConfig reducedMotion="user">
      <GoldDefs />
      <MusicAudio music={music} />

      {/* Fondo estrellado (visible a los lados en pantallas anchas) */}
      <div
        aria-hidden
        className="fixed inset-0"
        style={{
          background: "radial-gradient(ellipse 90% 70% at 50% 30%, #6d0b13 0%, #3a050a 60%, #1c0206 100%)",
        }}
      >
        <Sparkles count={36} />
      </div>

      <AnimatePresence>
        {!opened && <EnvelopeCover key="cover" onOpen={music.play} onDone={() => setOpened(true)} />}
      </AnimatePresence>

      {/* Columna vertical tipo móvil, centrada */}
      {opened && (
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 mx-auto min-h-screen w-full max-w-[480px] overflow-hidden border-x border-gold/40 shadow-[0_0_80px_rgba(0,0,0,.7)]"
        >
          <Hero music={music} />
          <Welcome />
          <Countdown />
          <Gallery />
          <Timeline />
          <Locations />
          <Rsvp />
          <FinalMessage />
        </motion.main>
      )}

      {opened && (
        <motion.div
          aria-hidden
          style={{ scaleX: scrollYProgress }}
          className="bg-gold-metal fixed left-1/2 top-0 z-[65] h-[3px] w-full max-w-[480px] origin-left -translate-x-1/2 shadow-[0_0_10px_rgba(245,215,122,.8)]"
        />
      )}
      {opened && <MusicFloating music={music} />}
    </MotionConfig>
  );
}
