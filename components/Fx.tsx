"use client";

import { motion, useInView } from "framer-motion";
import { useRef, type CSSProperties } from "react";

/* Pseudo-aleatorio determinista (enteros): evita diferencias servidor/cliente. */
const rnd = (i: number, seed = 1) => ((i * 9301 + seed * 49297 + 233) % 233280) / 233280;

const BURST_COLORS = ["#F5D77A", "#D4AF37", "#FFF9F0", "#B3121F", "#F5D77A"];

/** Ráfaga de confeti que sale de un punto (0,0 del contenedor padre). */
export function Burst({
  count = 34,
  radius = 170,
  className = "",
}: {
  count?: number;
  radius?: number;
  className?: string;
}) {
  return (
    <div className={`pointer-events-none absolute left-0 top-0 h-0 w-0 ${className}`} aria-hidden>
      {Array.from({ length: count }).map((_, i) => {
        const angle = (i / count) * Math.PI * 2 + rnd(i, 3) * 0.6;
        const dist = radius * (0.45 + rnd(i, 5) * 0.75);
        const w = 5 + Math.floor(rnd(i, 7) * 7);
        const round = i % 3 === 0;
        return (
          <motion.span
            key={i}
            className="absolute"
            style={{
              width: w,
              height: round ? w : w * 1.8,
              marginLeft: -w / 2,
              marginTop: -w / 2,
              borderRadius: round ? "50%" : 1,
              background: BURST_COLORS[i % BURST_COLORS.length],
            }}
            initial={{ x: 0, y: 0, scale: 0, opacity: 1, rotate: 0 }}
            animate={{
              x: Math.cos(angle) * dist,
              y: [0, Math.sin(angle) * dist, Math.sin(angle) * dist + 110],
              scale: [0, 1.15, 0.9],
              opacity: [1, 1, 0],
              rotate: 200 + rnd(i, 9) * 500,
            }}
            transition={{ duration: 1.5 + rnd(i, 11) * 0.8, ease: "easeOut", times: [0, 0.55, 1] }}
          />
        );
      })}
    </div>
  );
}

/** Dispara la ráfaga una sola vez cuando el elemento entra en pantalla. */
export function BurstOnView({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-25% 0px" });
  return (
    <div ref={ref} className={`absolute left-1/2 ${className}`}>
      {inView && (
        <>
          <Burst count={40} radius={200} />
          <Burst count={24} radius={120} />
        </>
      )}
    </div>
  );
}

const PETAL_COLORS = [
  "radial-gradient(circle at 30% 30%, #E23A4B, #8E0F1C)",
  "radial-gradient(circle at 30% 30%, #C21A2B, #7A0C14)",
  "radial-gradient(circle at 30% 30%, #F26B7A, #B3121F)",
  "radial-gradient(circle at 30% 30%, #FFE08A, #D4AF37)",
];

/** Pétalos de rosa que caen meciéndose. */
export function Petals({ count = 12 }: { count?: number }) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {Array.from({ length: count }).map((_, i) => {
        const size = 10 + Math.floor(rnd(i, 2) * 10);
        const style = {
          left: `${(i * 41 + 7) % 96}%`,
          width: size,
          height: size * 1.15,
          background: PETAL_COLORS[i % PETAL_COLORS.length],
          "--dur": `${13 + Math.floor(rnd(i, 4) * 9)}s`,
          "--delay": `${-Math.floor(rnd(i, 6) * 18)}s`,
        } as CSSProperties;
        return <span key={i} className="petal" style={style} />;
      })}
    </div>
  );
}

/** Corazones dorados que suben suavemente. */
export function FloatingHearts({ count = 9 }: { count?: number }) {
  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-72 overflow-hidden" aria-hidden>
      {Array.from({ length: count }).map((_, i) => {
        const size = 12 + Math.floor(rnd(i, 8) * 14);
        const style = {
          left: `${8 + ((i * 29) % 84)}%`,
          width: size,
          height: size,
          "--dur": `${4.5 + Math.floor(rnd(i, 12) * 4)}s`,
          "--delay": `${-Math.floor(rnd(i, 14) * 7)}s`,
          "--sway": `${(i % 2 ? 1 : -1) * (10 + Math.floor(rnd(i, 16) * 16))}px`,
        } as CSSProperties;
        return (
          <svg key={i} viewBox="0 0 24 24" className="heart-rise" style={style}>
            <path
              d="M12 21s-7.5-4.6-9.6-9.2C.9 8.4 2.7 5 6 5c2 0 3.4 1.1 4 2.3h4C14.6 6.1 16 5 18 5c3.3 0 5.1 3.4 3.6 6.8C19.5 16.4 12 21 12 21Z"
              fill={i % 3 === 0 ? "#B3121F" : "#F5D77A"}
              opacity=".85"
            />
          </svg>
        );
      })}
    </div>
  );
}

/** Estrella de 4 puntas que titila. */
export function Star({ className = "", style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 24 24" className={`twinkle absolute ${className}`} style={style} aria-hidden>
      <path d="M12 0 14.2 9.8 24 12 14.2 14.2 12 24 9.8 14.2 0 12 9.8 9.8Z" fill="url(#goldGrad)" />
    </svg>
  );
}
