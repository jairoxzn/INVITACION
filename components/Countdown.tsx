"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { invitation } from "@/config/invitation";
import { Confetti, GoldDivider } from "./Decor";
import { BurstOnView } from "./Fx";
import { Reveal } from "./Reveal";

const target = new Date(invitation.event.dateISO).getTime();

function diff(now: number) {
  const ms = Math.max(0, target - now);
  const s = Math.floor(ms / 1000);
  return {
    done: ms === 0,
    days: Math.floor(s / 86400),
    hours: Math.floor((s % 86400) / 3600),
    minutes: Math.floor((s % 3600) / 60),
    seconds: s % 60,
  };
}

const R = 46;
const C = 2 * Math.PI * R;

function Block({ value, max, label, index }: { value: number; max: number; label: string; index: number }) {
  const text = String(value).padStart(2, "0");
  const ratio = Math.min(1, value / max);
  const prev = useRef(ratio);
  const growing = ratio > prev.current; // reinicio de ciclo: sin transición
  useEffect(() => {
    prev.current = ratio;
  }, [ratio]);

  return (
    <motion.div
      className="flex flex-col items-center"
      initial={{ opacity: 0, scale: 0.3, y: 40 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ type: "spring", stiffness: 140, damping: 12, delay: 0.15 + index * 0.12 }}
    >
      <div className="relative flex h-[4.6rem] w-[4.6rem] items-center justify-center rounded-full bg-ruby-dark/60 shadow-[0_0_24px_rgba(212,175,55,.25)] backdrop-blur-sm">
        <svg viewBox="0 0 100 100" className="absolute inset-0 -rotate-90" aria-hidden>
          <circle cx="50" cy="50" r={R} fill="none" stroke="rgba(212,175,55,.28)" strokeWidth="3" />
          <circle
            cx="50"
            cy="50"
            r={R}
            fill="none"
            stroke="url(#goldGrad)"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={C}
            strokeDashoffset={C * (1 - ratio)}
            style={{ transition: growing ? "none" : "stroke-dashoffset 1s linear" }}
          />
        </svg>
        <div className="relative h-8 overflow-hidden">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.span
              key={text}
              initial={{ y: "70%", opacity: 0, scale: 0.8 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: "-70%", opacity: 0 }}
              transition={{ duration: 0.35 }}
              className="text-gold-metal block font-display text-3xl font-bold leading-8 tabular-nums"
            >
              {text}
            </motion.span>
          </AnimatePresence>
        </div>
      </div>
      <span className="mt-3 font-label text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-gold-light">
        {label}
      </span>
    </motion.div>
  );
}

export function Countdown() {
  const { texts, event } = invitation;
  const [t, setT] = useState<ReturnType<typeof diff> | null>(null);

  useEffect(() => {
    const tick = () => setT(diff(Date.now()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const v = t ?? { done: false, days: 0, hours: 0, minutes: 0, seconds: 0 };

  return (
    <section
      id="cuenta-regresiva"
      className="bg-ruby-section texture-gold relative overflow-hidden px-5 py-20 text-center"
    >
      {v.done && <Confetti count={30} />}
      <div className="relative z-10 mx-auto max-w-xl">
        <Reveal>
          <p className="font-script text-4xl text-gold-light">{texts.countdownKicker}</p>
          <p className="text-gold-metal mt-2 font-display text-3xl font-bold tracking-[0.12em]">
            {event.weekday} {event.dateCompact}
          </p>
          <GoldDivider className="mt-5" />
        </Reveal>

        {v.done ? (
          <Reveal className="mt-10">
            <p className="text-gold-metal font-script text-6xl leading-tight">{texts.countdownDone}</p>
          </Reveal>
        ) : (
          <>
            <Reveal delay={0.1}>
              <p className="mb-6 mt-8 font-label text-sm uppercase tracking-[0.4em] text-ivory/90">
                {texts.countdownLead}
              </p>
            </Reveal>
            <div className="flex items-start justify-center gap-3" aria-live="off">
              <Block value={v.days} max={100} label="Días" index={0} />
              <Block value={v.hours} max={24} label="Horas" index={1} />
              <Block value={v.minutes} max={60} label="Minutos" index={2} />
              <Block value={v.seconds} max={60} label="Segundos" index={3} />
            </div>
          </>
        )}
      </div>
      <BurstOnView className="top-[58%]" />
    </section>
  );
}
