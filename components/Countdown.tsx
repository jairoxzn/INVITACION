"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { Fragment, useEffect, useRef, useState } from "react";
import { invitation } from "@/config/invitation";
import { Clock } from "lucide-react";
import { Confetti } from "./Decor";
import { BurstOnView, Star } from "./Fx";
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
      initial={{ opacity: 0, y: 36, rotateX: -50 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ type: "spring", stiffness: 130, damping: 14, delay: 0.15 + index * 0.12 }}
      className="relative flex h-[4.9rem] w-[4.2rem] flex-col items-center justify-center overflow-hidden rounded-xl border border-gold/45 bg-gradient-to-b from-ruby/50 to-ruby-dark/80 shadow-[0_0_22px_rgba(212,175,55,.22),inset_0_1px_0_rgba(255,255,255,.12)] backdrop-blur-sm"
    >
      <div className="relative h-9 overflow-hidden">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={text}
            initial={{ y: "70%", opacity: 0, scale: 0.8 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: "-70%", opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="block font-display text-[2rem] font-bold leading-9 tabular-nums text-[#FFF1BE]"
            style={{ textShadow: "0 0 10px rgba(245,215,122,.85), 0 0 24px rgba(212,175,55,.55)" }}
          >
            {text}
          </motion.span>
        </AnimatePresence>
      </div>
      <span className="mt-1.5 font-label text-[0.55rem] font-semibold uppercase tracking-[0.16em] text-ivory/80">
        {label}
      </span>
      {/* Progreso del ciclo */}
      <span className="absolute inset-x-2 bottom-1 h-[2px] overflow-hidden rounded-full bg-gold/20">
        <span
          className="bg-gold-metal block h-full origin-left rounded-full"
          style={{
            transform: `scaleX(${ratio})`,
            transition: growing ? "none" : "transform 1s linear",
          }}
        />
      </span>
    </motion.div>
  );
}

/** Pareja bailando (estilo disco), con balanceo continuo */
function Dancers() {
  return (
    <div className="relative mx-auto mb-4 w-32">
      <motion.div
        className="absolute -inset-6 rounded-full"
        style={{ background: "radial-gradient(circle, rgba(245,215,122,.28) 0%, transparent 65%)" }}
        animate={{ opacity: [0.5, 1, 0.5], scale: [0.95, 1.1, 0.95] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.6, y: 20 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ type: "spring", stiffness: 120, damping: 12 }}
      >
        <motion.div
          animate={{ rotate: [-3, 3, -3], y: [0, -5, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: "50% 100%" }}
        >
          <Image
            src="/images/bailarines.png"
            alt=""
            aria-hidden
            width={381}
            height={359}
            className="relative w-full drop-shadow-[0_0_14px_rgba(245,215,122,.65)]"
          />
        </motion.div>
      </motion.div>
      <Star className="-left-5 top-2 h-5 w-5" style={{ "--dur": "2.4s" } as React.CSSProperties} />
      <Star className="-right-5 top-8 h-4 w-4" style={{ "--dur": "3s", "--delay": "-1s" } as React.CSSProperties} />
    </div>
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
        <Dancers />
        <Reveal>
          <p className="font-script text-4xl text-gold-light">{texts.countdownKicker}</p>
          <p className="mt-3 font-label text-lg font-bold uppercase tracking-[0.35em] text-white">{event.weekday}</p>
          <div className="mt-1 flex items-center justify-center gap-3">
            {event.dateCompact.split("|").map((part, i) => (
              <Fragment key={i}>
                {i > 0 && <span className="h-12 w-[2px] rounded-full bg-gold/70" />}
                <span className="text-gold-metal font-display text-[3.2rem] font-bold leading-none">{part}</span>
              </Fragment>
            ))}
          </div>
        </Reveal>

        {v.done ? (
          <Reveal className="mt-10">
            <p className="text-gold-metal font-script text-6xl leading-tight">{texts.countdownDone}</p>
          </Reveal>
        ) : (
          <>
            <Reveal delay={0.1}>
              <p className="mb-6 mt-9 flex items-center justify-center gap-3 font-label text-xl font-bold text-white">
                {texts.countdownLead}
                <Clock className="h-5 w-5 text-gold-light" strokeWidth={1.8} />
              </p>
            </Reveal>
            <div className="flex items-start justify-center gap-2.5" aria-live="off">
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
