"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { invitation } from "@/config/invitation";
import type { MusicApi } from "@/hooks/useMusic";
import { Balloon, Confetti, Sparkles } from "./Decor";
import { Petals } from "./Fx";
import { MusicCard } from "./MusicPlayer";
import { Photo } from "./Photo";
import { MaskLine } from "./TextFx";

/** Primera pantalla tras abrir el sobre. */
export function Hero({ music }: { music: MusicApi }) {
  const { texts, honoree, event, photos } = invitation;
  const { scrollY } = useScroll();
  const ringY = useTransform(scrollY, [0, 700], [0, 70]);
  const layerY = useTransform(scrollY, [0, 700], [0, -40]);

  return (
    <section
      id="inicio"
      className="bg-ruby-section texture-gold relative flex flex-col items-center overflow-hidden px-5 pb-14 pt-14 text-center"
    >
      <motion.div style={{ y: layerY }} className="absolute inset-0">
        <Confetti />
        <Petals count={10} />
      </motion.div>
      <Sparkles count={14} />

      <Balloon className="absolute -left-3 top-[3%] w-14 opacity-90" style={{ "--tilt": "-6deg" } as React.CSSProperties} />
      <Balloon
        color="#D4AF37"
        className="absolute -right-2 top-[5%] w-12 opacity-90"
        style={{ "--tilt": "7deg", "--delay": "-2s", "--dur": "8s" } as React.CSSProperties}
      />

      <div className="relative z-10 flex w-full flex-col items-center">
        <motion.p
          initial={{ opacity: 0, y: -24, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.2, delay: 0.1 }}
          className="font-script text-4xl text-gold-light"
        >
          {texts.heroKicker}
        </motion.p>

        <h1 className="mt-3 font-display text-[clamp(1.9rem,8.4vw,2.6rem)] font-bold leading-[1.05]">
          <MaskLine delay={0.45} className="text-gold-metal">
            {texts.heroTitleLine1}
          </MaskLine>
          <MaskLine delay={0.65} className="text-gold-metal">
            {texts.heroTitleLine2}
          </MaskLine>
        </h1>

        {/* Marco / anillo dorado con sello monograma */}
        <motion.div style={{ y: ringY }} className="relative mt-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.4, rotate: -90 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 70, damping: 14, delay: 0.7 }}
            className="relative h-60 w-60"
          >
            <div className="spin-slow absolute -inset-2 rounded-full [background:conic-gradient(from_0deg,#9C7A1E,#F5D77A,#D4AF37,#FFF9F0,#D4AF37,#9C7A1E)]" />
            <div className="glow-pulse absolute -inset-2 rounded-full opacity-60 blur-xl [background:radial-gradient(circle,rgba(245,215,122,.6),transparent_70%)]" />
            <div className="absolute inset-0 rounded-full border-[6px] border-ruby-dark" />
            {/* La foto se revela con un círculo que se abre */}
            <motion.div
              initial={{ clipPath: "circle(0% at 50% 50%)" }}
              animate={{ clipPath: "circle(75% at 50% 50%)" }}
              transition={{ duration: 1.6, delay: 1.05, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-[6px] overflow-hidden rounded-full border-2 border-gold-light"
            >
              <Photo src={photos.hero.src} position={photos.hero.position} alt={honoree.fullName} sizes="300px" priority kenburns />
            </motion.div>
            <motion.div
              initial={{ scale: 0, rotate: -200 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 160, damping: 11, delay: 1.9 }}
              className="bg-gold-metal absolute -bottom-1 -right-1 flex h-16 w-16 items-center justify-center rounded-full border-[3px] border-ruby-dark shadow-xl shadow-black/40"
            >
              <span className="font-script text-4xl leading-none text-ruby-deep">{honoree.monogram}</span>
            </motion.div>
          </motion.div>
        </motion.div>

        <div className="mt-8 flex w-full flex-col items-center">
          <motion.h2
            initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1, delay: 1.5 }}
            className="font-label text-lg font-semibold uppercase tracking-[0.16em] text-ivory"
          >
            {honoree.fullName}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, scale: 1.4, letterSpacing: "0.6em" }}
            animate={{ opacity: 1, scale: 1, letterSpacing: "0.2em" }}
            transition={{ duration: 1.2, delay: 1.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-gold-metal mt-3 font-display text-3xl"
          >
            {event.dateShort}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 2.1, ease: [0.22, 1, 0.36, 1] }}
            className="mt-9 w-full"
          >
            <MusicCard music={music} />
          </motion.div>

          <a href="#bienvenida" aria-label="Desplazarse hacia abajo" className="mt-8 text-gold-light">
            <span className="block text-center font-label text-[0.65rem] tracking-[0.3em] opacity-80">DESLIZA</span>
            <ChevronDown className="mx-auto h-6 w-6 animate-[bounce-soft_1.8s_ease-in-out_infinite]" />
          </a>
        </div>
      </div>
    </section>
  );
}
