"use client";

import { motion } from "framer-motion";
import { invitation } from "@/config/invitation";
import { Laurel, Rose, Sparkles } from "./Decor";
import { Star } from "./Fx";
import { Photo } from "./Photo";
import { Reveal } from "./Reveal";
import { WordReveal } from "./TextFx";

export function Welcome() {
  const { texts, honoree, photos } = invitation;

  return (
    <section id="bienvenida" className="bg-ivory-section relative overflow-hidden px-5 py-20 text-center">
      <Sparkles count={10} />
      <motion.div
        initial={{ x: -80, rotate: -50, opacity: 0 }}
        whileInView={{ x: 0, rotate: -12, opacity: 0.95 }}
        viewport={{ once: true }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        className="absolute -left-8 top-6 w-28"
      >
        <Rose className="float-y w-full" style={{ "--tilt": "4deg" } as React.CSSProperties} />
      </motion.div>
      <motion.div
        initial={{ x: 80, rotate: 80, opacity: 0 }}
        whileInView={{ x: 0, rotate: 28, opacity: 0.95 }}
        viewport={{ once: true }}
        transition={{ duration: 1.4, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="absolute -bottom-5 -right-9 w-24"
      >
        <Rose className="float-y w-full" style={{ "--tilt": "-4deg", "--delay": "-3s" } as React.CSSProperties} />
      </motion.div>

      <div className="relative z-10 mx-auto flex max-w-xl flex-col items-center">
        <Reveal>
          <p className="font-script text-4xl text-ruby">{texts.welcomeKicker}</p>
        </Reveal>

        <div className="relative">
          <Laurel className="mx-auto -my-2 w-60" tone="dark" caption="AÑOS" number={String(honoree.age)} />
          <Star className="-right-6 top-6 h-7 w-7" style={{ "--dur": "2.6s" } as React.CSSProperties} />
          <Star className="-left-5 top-24 h-5 w-5" style={{ "--dur": "3.4s", "--delay": "-1s" } as React.CSSProperties} />
          <Star className="right-2 bottom-10 h-4 w-4" style={{ "--dur": "2.9s", "--delay": "-2s" } as React.CSSProperties} />
        </div>

        <WordReveal
          text={texts.welcomeText}
          delay={0.1}
          className="mx-auto max-w-md font-display text-lg italic leading-relaxed text-ruby-dark/90"
        />

        {/* Foto en arco: se revela de abajo hacia arriba */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={{
            hidden: { opacity: 0, y: 40 },
            show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
          }}
          className="my-10"
        >
          <div className="border-gold-metal relative h-[22rem] w-64 rounded-t-full p-[6px] shadow-2xl shadow-ruby-deep/30">
            <motion.div
              variants={{
                hidden: { clipPath: "inset(100% 0 0 0)" },
                show: { clipPath: "inset(0% 0 0 0)", transition: { duration: 1.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] } },
              }}
              className="relative h-full w-full overflow-hidden rounded-t-full"
            >
              <Photo src={photos.welcome.src} position={photos.welcome.position} alt={honoree.fullName} sizes="300px" kenburns />
            </motion.div>
          </div>
        </motion.div>

        <Reveal>
          <p className="font-label text-sm uppercase tracking-[0.25em] text-ruby">{texts.welcomeLead}</p>
          <h3 className="mt-3 font-display text-3xl font-semibold leading-tight text-ruby-deep">{honoree.fullName}</h3>
        </Reveal>
      </div>
    </section>
  );
}
