"use client";

import { Heart } from "lucide-react";
import { invitation } from "@/config/invitation";
import { Confetti, Sparkles } from "./Decor";
import { BurstOnView, FloatingHearts, Petals } from "./Fx";
import { Photo } from "./Photo";
import { Reveal } from "./Reveal";
import { ShareButton } from "./ShareButton";
import { WordReveal } from "./TextFx";
import { motion } from "framer-motion";

export function FinalMessage() {
  const { texts, honoree, photos } = invitation;

  return (
    <section
      id="despedida"
      className="bg-ruby-section texture-gold relative overflow-hidden px-5 pb-32 pt-20 text-center"
    >
      <Confetti count={16} />
      <Petals count={8} />
      <Sparkles count={10} />
      <FloatingHearts />
      <BurstOnView className="top-[22%]" />
      <div className="relative z-10 mx-auto max-w-md">
        <Reveal scale={0.9}>
          <div className="relative mx-auto h-64 w-64">
            <div className="spin-slow absolute -inset-1.5 rounded-full [background:conic-gradient(from_0deg,#9C7A1E,#F5D77A,#D4AF37,#FFF9F0,#D4AF37,#9C7A1E)]" />
            <div className="absolute inset-0 rounded-full border-[5px] border-ruby-dark" />
            <div className="absolute inset-[5px] overflow-hidden rounded-full">
              <Photo src={photos.final.src} position={photos.final.position} alt={honoree.shortName} sizes="300px" kenburns />
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <motion.div animate={{ scale: [1, 1.25, 1, 1.18, 1] }} transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }} className="mx-auto mt-8 w-fit"><Heart className="h-7 w-7 fill-gold text-gold" /></motion.div>
          <WordReveal text={texts.finalText} className="mt-4 font-display text-lg italic leading-relaxed text-ivory/90" />
        </Reveal>

        <Reveal delay={0.15}>
          <p className="text-gold-metal mt-8 font-script text-5xl leading-tight">{texts.finalHighlight}</p>
          <p className="mt-6 font-label text-sm uppercase tracking-[0.25em] text-gold-light">{texts.finalSignature}</p>
        </Reveal>

        <Reveal delay={0.2} className="mt-10">
          <ShareButton />
        </Reveal>
      </div>
    </section>
  );
}
