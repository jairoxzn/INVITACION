"use client";

import { motion } from "framer-motion";
import type { CSSProperties } from "react";

/* ============================================================
 *  Elementos decorativos (SVG/CSS): laurel con 50, confeti,
 *  destellos, globos, rosas y divisores dorados.
 * ============================================================ */

const GOLD_GRADIENT_ID = "goldGrad";

export function GoldDefs() {
  return (
    <svg width="0" height="0" className="absolute" aria-hidden>
      <defs>
        <linearGradient id={GOLD_GRADIENT_ID} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#9C7A1E" />
          <stop offset="35%" stopColor="#D4AF37" />
          <stop offset="55%" stopColor="#F5D77A" />
          <stop offset="80%" stopColor="#D4AF37" />
          <stop offset="100%" stopColor="#9C7A1E" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/* ---------- Laurel con el número ---------- */
export function Laurel({
  number = "50",
  caption = "AÑOS",
  className = "",
  tone = "light",
}: {
  number?: string;
  caption?: string;
  className?: string;
  /** "light" = texto marfil (sobre rojo) · "dark" = texto rojo (sobre marfil) */
  tone?: "light" | "dark";
}) {
  const leaves: { x: number; y: number; rot: number; s: number }[] = [];
  const count = 15;
  for (let i = 0; i < count; i++) {
    const t = i / (count - 1);
    const theta = ((100 + t * 150) * Math.PI) / 180; // 100° → 250°
    const r = 104;
    const cx = 150 + r * Math.cos(theta);
    const cy = 152 + r * Math.sin(theta);
    const tangent = (theta * 180) / Math.PI + 90;
    const s = 1.05 - t * 0.4;
    leaves.push({ x: cx + 8 * Math.cos(theta), y: cy + 8 * Math.sin(theta), rot: tangent - 90 + 34, s });
    leaves.push({ x: cx - 8 * Math.cos(theta), y: cy - 8 * Math.sin(theta), rot: tangent - 90 - 34, s });
  }

  const textFill = tone === "light" ? "#FFF9F0" : "#7A0C14";

  const vp = { once: true, margin: "-80px" } as const;

  const branch = (mirror: boolean) => (
    <g transform={mirror ? "translate(300 0) scale(-1 1)" : undefined}>
      <motion.path
        d="M 132 252 A 104 104 0 0 1 70 70"
        fill="none"
        stroke={`url(#${GOLD_GRADIENT_ID})`}
        strokeWidth="2.2"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={vp}
        transition={{ duration: 1.6, ease: "easeInOut" }}
      />
      {leaves.map((l, i) => (
        <g key={i} transform={`rotate(${l.rot} ${l.x} ${l.y})`}>
          <motion.ellipse
            cx={l.x}
            cy={l.y}
            rx={5.2 * l.s}
            ry={15 * l.s}
            fill={`url(#${GOLD_GRADIENT_ID})`}
            style={{ transformBox: "fill-box", transformOrigin: "50% 100%" }}
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 0.95 }}
            viewport={vp}
            transition={{ delay: 0.25 + i * 0.045, type: "spring", stiffness: 210, damping: 13 }}
          />
        </g>
      ))}
    </g>
  );

  return (
    <svg viewBox="0 0 300 300" className={className} role="img" aria-label={`${number} ${caption}`}>
      {branch(false)}
      {branch(true)}
      <motion.text
        x="150"
        y="172"
        textAnchor="middle"
        fontSize="92"
        fontWeight="700"
        style={{ fontFamily: "var(--font-playfair), Georgia, serif", transformBox: "fill-box", transformOrigin: "center" }}
        fill={`url(#${GOLD_GRADIENT_ID})`}
        initial={{ scale: 0.4, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={vp}
        transition={{ delay: 0.9, type: "spring", stiffness: 140, damping: 11 }}
      >
        {number}
      </motion.text>
      <motion.text
        x="150"
        y="204"
        textAnchor="middle"
        fontSize="17"
        letterSpacing="9"
        style={{ fontFamily: "var(--font-cinzel), Georgia, serif" }}
        fill={textFill}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={vp}
        transition={{ delay: 1.5, duration: 0.8 }}
      >
        {caption}
      </motion.text>
    </svg>
  );
}

/* ---------- Confeti cayendo (determinista: sin hydration mismatch) ---------- */
const CONFETTI_COLORS = ["#D4AF37", "#F5D77A", "#FFF9F0", "#B3121F", "#D4AF37"];

export function Confetti({ count = 26 }: { count?: number }) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {Array.from({ length: count }).map((_, i) => {
        const w = 5 + ((i * 7) % 7);
        const round = i % 3 === 0;
        const style = {
          left: `${(i * 37 + 11) % 100}%`,
          width: w,
          height: round ? w : w * 1.9,
          borderRadius: round ? "50%" : 1,
          background: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
          "--dur": `${9 + ((i * 13) % 8)}s`,
          "--delay": `${-((i * 1.9) % 14)}s`,
          "--drift": `${((i % 5) - 2) * 22}px`,
          "--spin": `${360 + ((i * 47) % 540)}deg`,
          opacity: 0.85,
        } as CSSProperties;
        return <span key={i} className="confetti-piece" style={style} />;
      })}
    </div>
  );
}

/* ---------- Destellos ---------- */
export function Sparkles({ count = 14 }: { count?: number }) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {Array.from({ length: count }).map((_, i) => {
        const size = 8 + ((i * 5) % 14);
        const style = {
          left: `${(i * 53 + 7) % 96}%`,
          top: `${(i * 31 + 5) % 94}%`,
          width: size,
          height: size,
          "--dur": `${2.4 + ((i * 3) % 4)}s`,
          "--delay": `${-((i * 0.7) % 5)}s`,
        } as CSSProperties;
        return (
          <svg key={i} viewBox="0 0 24 24" className="twinkle absolute" style={style}>
            <path
              d="M12 0 14.2 9.8 24 12 14.2 14.2 12 24 9.8 14.2 0 12 9.8 9.8Z"
              fill={`url(#${GOLD_GRADIENT_ID})`}
            />
          </svg>
        );
      })}
    </div>
  );
}

/* ---------- Globo ---------- */
export function Balloon({
  color = "#B3121F",
  className = "",
  style,
}: {
  color?: string;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <svg viewBox="0 0 60 110" className={`float-y ${className}`} style={style} aria-hidden>
      <ellipse cx="30" cy="34" rx="25" ry="31" fill={color} />
      <ellipse cx="21" cy="22" rx="6" ry="10" fill="#fff" opacity=".28" transform="rotate(25 21 22)" />
      <path d="M30 65 25 72h10Z" fill={color} />
      <path
        d="M30 72c-6 10 6 16 0 26s4 8 0 12"
        fill="none"
        stroke="#F5D77A"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
    </svg>
  );
}

/* ---------- Rosa roja estilizada ---------- */
export function Rose({ className = "", style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 100 100" className={className} style={style} aria-hidden>
      <defs>
        <radialGradient id="roseG" cx="50%" cy="45%" r="60%">
          <stop offset="0%" stopColor="#D8283A" />
          <stop offset="100%" stopColor="#7A0C14" />
        </radialGradient>
      </defs>
      <ellipse cx="30" cy="78" rx="22" ry="9" fill="#3E5A2B" transform="rotate(-25 30 78)" opacity=".85" />
      <ellipse cx="72" cy="80" rx="22" ry="9" fill="#4A6B33" transform="rotate(22 72 80)" opacity=".85" />
      <circle cx="50" cy="48" r="34" fill="url(#roseG)" />
      <path d="M50 20c18 2 30 16 26 32-2 8-10 14-20 14-12 0-20-8-18-18 2-8 10-12 16-10" fill="none" stroke="#F5D77A" strokeOpacity=".5" strokeWidth="1.6" />
      <path d="M50 30c10 2 16 10 13 19-2 6-8 9-14 8-7-1-10-7-8-12 2-5 7-7 11-5" fill="none" stroke="#F5D77A" strokeOpacity=".55" strokeWidth="1.5" />
      <circle cx="50" cy="46" r="5" fill="#4A060B" opacity=".55" />
    </svg>
  );
}

/* ---------- Divisor dorado (se dibuja al aparecer) ---------- */
export function GoldDivider({ className = "" }: { className?: string }) {
  const vp = { once: true } as const;
  return (
    <div className={`flex items-center justify-center gap-3 ${className}`} aria-hidden>
      <motion.span
        className="h-px w-14 origin-right bg-gradient-to-r from-transparent to-gold"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={vp}
        transition={{ duration: 0.9, delay: 0.2 }}
      />
      <motion.svg
        width="14"
        height="14"
        viewBox="0 0 14 14"
        initial={{ scale: 0, rotate: -180 }}
        whileInView={{ scale: 1, rotate: 0 }}
        viewport={vp}
        transition={{ type: "spring", stiffness: 160, damping: 12, delay: 0.1 }}
      >
        <path d="M7 0 14 7 7 14 0 7Z" fill={`url(#${GOLD_GRADIENT_ID})`} />
      </motion.svg>
      <motion.span
        className="h-px w-14 origin-left bg-gradient-to-l from-transparent to-gold"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={vp}
        transition={{ duration: 0.9, delay: 0.2 }}
      />
    </div>
  );
}
