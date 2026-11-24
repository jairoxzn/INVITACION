"use client";

import { motion, useScroll } from "framer-motion";
import { Cake, Church, Music, PartyPopper, Users, Utensils, Wine, type LucideIcon } from "lucide-react";
import { useRef } from "react";
import { invitation, type TimelineIcon } from "@/config/invitation";
import { Reveal } from "./Reveal";
import { SectionTitle } from "./SectionTitle";

const ICONS: Record<TimelineIcon, LucideIcon> = {
  church: Church,
  users: Users,
  party: PartyPopper,
  wine: Wine,
  utensils: Utensils,
  cake: Cake,
  music: Music,
};

export function Timeline() {
  const { texts, timeline } = invitation;
  const items = timeline.filter((t) => t.visible);
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 72%", "end 62%"] });
  if (items.length === 0) return null;

  return (
    <section id="cronograma" className="bg-ruby-section texture-gold relative overflow-hidden px-6 py-20">
      <div className="relative z-10 mx-auto max-w-md">
        <SectionTitle kicker={texts.timelineKicker} title={texts.timelineTitle} />

        <div ref={ref} className="relative">
          {/* Línea vertical: se va llenando de dorado al hacer scroll */}
          <div className="absolute bottom-6 left-7 top-6 w-px bg-gold/20" />
          <motion.div
            style={{ scaleY: scrollYProgress }}
            className="absolute bottom-6 left-[1.7rem] top-6 w-[3px] origin-top rounded-full bg-gradient-to-b from-gold-light via-gold to-gold-dark shadow-[0_0_12px_rgba(245,215,122,.7)]"
          />

          <ol className="space-y-12">
            {items.map((item, i) => {
              const Icon = ICONS[item.icon] ?? PartyPopper;
              return (
                <li key={item.id} className="relative">
                  <div className="flex items-start gap-5">
                    <motion.div
                      initial={{ scale: 0, rotate: -120 }}
                      whileInView={{ scale: 1, rotate: 0 }}
                      viewport={{ once: true, margin: "-60px" }}
                      transition={{ type: "spring", stiffness: 190, damping: 12, delay: 0.1 }}
                      className="relative z-10 shrink-0"
                    >
                      <span className="pulse-ring absolute inset-0 rounded-full" style={{ animationDelay: `${i * 0.5}s` }} />
                      <div className="bg-gold-metal relative flex h-14 w-14 items-center justify-center rounded-full border-4 border-ruby-deep shadow-lg shadow-black/40">
                        <Icon className="h-6 w-6 text-ruby-deep" strokeWidth={2} />
                      </div>
                    </motion.div>
                    <Reveal x={40} y={0} delay={0.15} className="pt-1 text-left">
                      <p className="text-gold-metal font-display text-3xl font-bold">{item.time ?? "Por confirmar"}</p>
                      <h3 className="mt-1 font-label text-base font-semibold uppercase tracking-[0.18em] text-ivory">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-ivory/75">{item.description}</p>
                    </Reveal>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
