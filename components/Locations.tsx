"use client";

import { motion } from "framer-motion";
import { Clock, MapPin, Navigation } from "lucide-react";
import { invitation } from "@/config/invitation";
import { Rose } from "./Decor";
import { Photo } from "./Photo";
import { Reveal } from "./Reveal";
import { SectionTitle } from "./SectionTitle";

export function Locations() {
  const { texts, locations } = invitation;
  const items = locations.filter((l) => l.visible);
  if (items.length === 0) return null;

  return (
    <section id="ubicacion" className="bg-ivory-section relative overflow-hidden px-5 py-20">
      <Rose className="absolute -right-10 top-4 w-32 rotate-[20deg] opacity-80" />
      <div className="relative z-10 mx-auto max-w-md">
        <SectionTitle kicker={texts.locationKicker} title={texts.locationTitle} tone="dark" />

        <div className="space-y-10">
          {items.map((loc, i) => (
            <Reveal key={loc.id} delay={i * 0.1}>
              <article className="border-gold-metal relative overflow-hidden rounded-[2rem] p-[5px] shadow-2xl shadow-ruby-deep/25 [--card-bg:#fffdf8]">
                <div className="overflow-hidden rounded-[1.6rem] bg-[#fffdf8]">
                  {loc.photo && (
                    <div className="relative h-44 w-full">
                      <Photo src={loc.photo} alt={loc.name} sizes="450px" />
                    </div>
                  )}
                  <div className="bg-gradient-to-b from-ruby to-ruby-deep px-6 py-5 text-center">
                    <p className="font-script text-3xl text-gold-light">{loc.label}</p>
                  </div>
                  <div className="px-6 pb-8 pt-6 text-center">
                    <div className="relative mx-auto h-10 w-10">
                      <motion.div
                        animate={{ y: [0, -9, 0] }}
                        transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
                      >
                        <MapPin className="mx-auto h-9 w-9 text-ruby" />
                      </motion.div>
                      <motion.span
                        className="absolute bottom-0 left-1/2 h-1.5 w-5 -translate-x-1/2 rounded-full bg-ruby-dark/30"
                        animate={{ scaleX: [1, 0.6, 1], opacity: [0.5, 0.2, 0.5] }}
                        transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
                      />
                    </div>
                    <h3 className="mt-3 font-display text-2xl font-semibold text-ruby-deep">{loc.name}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-ruby-dark/80">{loc.address}</p>

                    {loc.time && (
                      <p className="mt-4 inline-flex items-center gap-2 rounded-full border border-gold/60 px-4 py-1.5 font-label text-sm tracking-[0.12em] text-ruby-deep">
                        <Clock className="h-4 w-4 text-gold-dark" />
                        {loc.time}
                      </p>
                    )}

                    <motion.div className="mt-6" animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}>
                      <a
                        href={loc.mapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-b from-ruby to-ruby-deep px-7 py-3.5 font-label text-sm font-semibold tracking-[0.2em] text-ivory shadow-lg shadow-ruby-deep/40 transition active:scale-95"
                      >
                        <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-gold-light/40 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                        <Navigation className="relative h-4 w-4 text-gold-light" />
                        <span className="relative">{texts.locationButton}</span>
                      </a>
                    </motion.div>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
