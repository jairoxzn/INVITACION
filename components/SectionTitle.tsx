"use client";

import { motion } from "framer-motion";
import { GoldDivider } from "./Decor";
import { MaskLine } from "./TextFx";

export function SectionTitle({
  kicker,
  title,
  tone = "light",
}: {
  kicker?: string;
  title?: string;
  tone?: "light" | "dark";
}) {
  return (
    <div className="mb-10 text-center">
      {kicker && (
        <motion.p
          initial={{ opacity: 0, y: 16, letterSpacing: "0.3em" }}
          whileInView={{ opacity: 1, y: 0, letterSpacing: "0em" }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className={`font-script text-4xl ${tone === "light" ? "text-gold-light" : "text-ruby"}`}
        >
          {kicker}
        </motion.p>
      )}
      {title && (
        <h2
          className={`mt-1 font-display text-3xl font-semibold leading-tight ${
            tone === "light" ? "text-ivory" : "text-ruby-deep"
          }`}
        >
          <MaskLine once delay={0.15}>
            {title}
          </MaskLine>
        </h2>
      )}
      <GoldDivider className="mt-5" />
    </div>
  );
}
