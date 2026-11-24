"use client";

import { motion } from "framer-motion";
import { MousePointerClick } from "lucide-react";
import { useState } from "react";
import { invitation } from "@/config/invitation";
import { Confetti, Sparkles } from "./Decor";
import { Burst } from "./Fx";
import { Photo } from "./Photo";

function Flutes({ className = "" }: { className?: string }) {
  const flute = (rot: number, x: number) => (
    <g transform={`translate(${x} 8) rotate(${rot} 12 60)`}>
      <path d="M2 0h20c0 26-4 44-10 48C6 44 2 26 2 0Z" fill="rgba(255,249,240,.18)" stroke="url(#goldGrad)" strokeWidth="1.6" />
      <path d="M4 14h16c-1 18-4 29-8 32-4-3-7-14-8-32Z" fill="url(#goldGrad)" opacity=".75" />
      <rect x="11" y="48" width="2" height="26" fill="url(#goldGrad)" />
      <ellipse cx="12" cy="76" rx="10" ry="3" fill="url(#goldGrad)" />
    </g>
  );
  return (
    <svg viewBox="-12 -4 84 98" className={className} aria-hidden overflow="visible">
      {flute(-14, 4)}
      {flute(14, 32)}
    </svg>
  );
}

/** Portada: sobre con carta y sello de cera. Al tocar el sello se rompe y la carta sale. */
export function EnvelopeCover({ onOpen, onDone }: { onOpen: () => void; onDone: () => void }) {
  const { honoree, photos, texts } = invitation;
  const [opening, setOpening] = useState(false);

  const handleOpen = () => {
    if (opening) return;
    setOpening(true);
    onOpen(); // gesto del usuario → inicia la música
    setTimeout(onDone, 2500);
  };

  const sealFace = (
    <div
      className="bg-gold-metal relative flex aspect-square w-full items-center justify-center rounded-full"
      style={{ boxShadow: "inset 0 0 0 3px rgba(255,255,255,.18), inset 0 -6px 12px rgba(120,80,0,.45), 0 8px 22px rgba(0,0,0,.55)" }}
    >
      <div className="absolute inset-[9%] rounded-full border border-ruby-deep/40" />
      <span className="font-script leading-none text-ruby-deep" style={{ fontSize: "13cqw" }}>
        {honoree.monogram}
      </span>
    </div>
  );

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden bg-ruby-dark"
      initial={{ opacity: 1, scale: 1 }}
      animate={{ opacity: opening ? 0 : 1, scale: opening ? 1.15 : 1 }}
      transition={{ duration: 0.9, delay: opening ? 1.6 : 0, ease: "easeIn" }}
      style={{
        background: "radial-gradient(ellipse 80% 60% at 50% 40%, #7A0C14 0%, #4A060B 55%, #26030a 100%)",
      }}
    >
      <Sparkles count={26} />
      <Confetti count={14} />

      {/* Destello dorado al abrir */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-20"
        style={{ background: "radial-gradient(circle at 50% 50%, rgba(255,240,180,.95), rgba(245,215,122,.55) 35%, transparent 70%)" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: opening ? [0, 0, 0.95, 0] : 0 }}
        transition={{ duration: 1.8, delay: 0.35, times: [0, 0.2, 0.55, 1] }}
      />

      <div className="relative z-10 flex w-full flex-col items-center px-4">
        <motion.button
          onClick={handleOpen}
          aria-label="Abrir invitación"
          initial={{ opacity: 0, y: 60, scale: 0.85 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="relative block w-[min(88vw,520px,calc(58svh*1.05))] cursor-pointer outline-none [container-type:inline-size]"
          style={{ aspectRatio: "1 / 0.95" }}
        >
          {/* Solapa trasera (abierta) */}
          <motion.div
            className="absolute inset-x-0 top-0 h-[34%] origin-bottom"
            style={{
              clipPath: "polygon(0 100%, 50% 0, 100% 100%)",
              background: "linear-gradient(180deg, #8f1220, #a31422)",
            }}
            animate={opening ? { opacity: 0, y: -30 } : { opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: opening ? 0.9 : 0 }}
          />
          {/* Cuerpo */}
          <motion.div
            className="absolute inset-x-0 bottom-0 h-[66%] rounded-b-md"
            style={{ background: "linear-gradient(180deg, #6d0b13, #8c101b)" }}
            animate={opening ? { opacity: 0, y: 50 } : { opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: opening ? 0.9 : 0 }}
          />

          {/* Carta: flota y, al abrir, sube y crece */}
          <motion.div
            className="absolute inset-x-[8%] bottom-[14%] top-[12%] rounded-sm bg-ivory p-[1.6cqw] shadow-xl"
            animate={
              opening
                ? { y: "-16%", scale: 1.3, boxShadow: "0 0 70px rgba(245,215,122,.9)" }
                : { y: [0, -5, 0], scale: 1 }
            }
            transition={
              opening
                ? { duration: 1.4, delay: 0.5, ease: [0.22, 1, 0.36, 1] }
                : { duration: 3.2, repeat: Infinity, ease: "easeInOut" }
            }
          >
            <div className="flex h-full flex-col items-center border border-gold/70 px-[3cqw] pt-[2.4cqw]">
              <p
                className="whitespace-nowrap font-display font-semibold uppercase tracking-[0.06em] text-ruby-deep"
                style={{ fontSize: "4.4cqw" }}
              >
                {texts.heroTitleLine1} {texts.heroTitleLine2}
              </p>
              <div className="relative mt-[2.4cqw] aspect-[4/5] h-[50%] overflow-hidden rounded-[1.6cqw] border-2 border-gold shadow-md">
                <Photo src={photos.hero.src} position="50% 20%" alt={honoree.fullName} sizes="260px" priority kenburns />
              </div>
            </div>
          </motion.div>

          {/* Bolsillo frontal */}
          <motion.svg
            viewBox="0 0 100 63"
            preserveAspectRatio="none"
            className="absolute inset-x-0 bottom-0 h-[66%] w-full"
            animate={opening ? { y: "40%", opacity: 0 } : { y: 0, opacity: 1 }}
            transition={{ duration: 0.9, delay: opening ? 0.45 : 0 }}
            aria-hidden
          >
            <defs>
              <linearGradient id="pkL" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0" stopColor="#7e0f1a" />
                <stop offset="1" stopColor="#a31422" />
              </linearGradient>
              <linearGradient id="pkR" x1="1" y1="0" x2="0" y2="0">
                <stop offset="0" stopColor="#7e0f1a" />
                <stop offset="1" stopColor="#a31422" />
              </linearGradient>
              <linearGradient id="pkB" x1="0" y1="1" x2="0" y2="0">
                <stop offset="0" stopColor="#5e0912" />
                <stop offset="1" stopColor="#8f1220" />
              </linearGradient>
            </defs>
            <path d="M0 0 53 37 0 63Z" fill="url(#pkL)" stroke="#F5D77A" strokeOpacity=".4" strokeWidth=".35" />
            <path d="M100 0 47 37 100 63Z" fill="url(#pkR)" stroke="#F5D77A" strokeOpacity=".4" strokeWidth=".35" />
            <path d="M0 63 50 28 100 63Z" fill="url(#pkB)" stroke="#F5D77A" strokeOpacity=".5" strokeWidth=".35" />
          </motion.svg>

          {/* Copas decorativas (brindis) */}
          <motion.div
            className="absolute -bottom-[2%] right-[1%] w-[21%]"
            animate={opening ? { opacity: 0, y: 30 } : { opacity: 1, y: 0, rotate: [0, -3, 0, 3, 0] }}
            transition={opening ? { duration: 0.5 } : { duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <Flutes className="w-full drop-shadow-lg" />
          </motion.div>

          {/* Sello de cera */}
          <div className="absolute left-1/2 top-[58%] w-[27%] -translate-x-1/2 -translate-y-1/2">
            {!opening ? (
              <motion.div animate={{ scale: [1, 1.07, 1] }} transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}>
                <span className="pulse-ring absolute inset-0 rounded-full" />
                {sealFace}
                <MousePointerClick
                  className="absolute -bottom-[22%] -right-[18%] w-[42%] animate-bounce text-gold-light drop-shadow-lg"
                  strokeWidth={1.6}
                  style={{ height: "auto" }}
                />
              </motion.div>
            ) : (
              <>
                {/* El sello se parte en dos mitades */}
                <motion.div
                  className="absolute inset-0"
                  style={{ clipPath: "inset(0 50% 0 0)" }}
                  initial={{ x: 0, y: 0, rotate: 0, opacity: 1 }}
                  animate={{ x: "-110%", y: "70%", rotate: -35, opacity: 0 }}
                  transition={{ duration: 0.9, ease: "easeIn" }}
                >
                  {sealFace}
                </motion.div>
                <motion.div
                  className="absolute inset-0"
                  style={{ clipPath: "inset(0 0 0 50%)" }}
                  initial={{ x: 0, y: 0, rotate: 0, opacity: 1 }}
                  animate={{ x: "110%", y: "70%", rotate: 35, opacity: 0 }}
                  transition={{ duration: 0.9, ease: "easeIn" }}
                >
                  {sealFace}
                </motion.div>
                {/* Ondas de luz */}
                {[0, 0.18, 0.36].map((d) => (
                  <motion.span
                    key={d}
                    className="absolute inset-0 rounded-full border-2 border-gold-light"
                    initial={{ scale: 1, opacity: 0.9 }}
                    animate={{ scale: 5.5, opacity: 0 }}
                    transition={{ duration: 1.2, delay: d, ease: "easeOut" }}
                  />
                ))}
                {/* Ráfaga de confeti */}
                <div className="absolute left-1/2 top-1/2">
                  <Burst count={44} radius={210} />
                  <Burst count={22} radius={110} />
                </div>
              </>
            )}
          </div>
        </motion.button>

        <motion.p
          className="mt-8 text-center font-label text-xs font-semibold uppercase tracking-[0.32em] text-gold-light"
          animate={{ opacity: opening ? 0 : [0.45, 1, 0.45] }}
          transition={opening ? { duration: 0.3 } : { duration: 2.2, repeat: Infinity }}
        >
          Toca el sello para abrir
        </motion.p>
      </div>
    </motion.div>
  );
}
