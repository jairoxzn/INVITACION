"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { invitation } from "@/config/invitation";
import { useSeen } from "@/hooks/useSeen";
import { Rose, Sparkles } from "./Decor";
import { Photo } from "./Photo";
import { SectionTitle } from "./SectionTitle";

const TILTS = [-4, 3.5, 3, -3.5];

export function Gallery() {
  const { texts, gallery } = invitation;
  const [open, setOpen] = useState<number | null>(null);
  const [dir, setDir] = useState(1);
  const [sectionRef, seen] = useSeen<HTMLElement>(60);

  const go = useCallback(
    (step: number) => {
      setDir(step);
      setOpen((i) => (i === null ? i : (i + step + gallery.length) % gallery.length));
    },
    [gallery.length],
  );
  const close = useCallback(() => setOpen(null), []);

  // Teclado + bloqueo de scroll mientras el lightbox está abierto
  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, go, close]);

  if (gallery.length === 0) return null;

  return (
    <section ref={sectionRef} id="galeria" className="bg-ivory-section relative overflow-hidden px-4 py-20">
      <Sparkles count={10} />
      <motion.div
        initial={{ scale: 0.3, rotate: -90, opacity: 0 }}
        animate={seen ? { scale: 1, rotate: -10, opacity: 1 } : undefined}
        transition={{ type: "spring", stiffness: 70, damping: 12 }}
        className="absolute -left-8 top-2 w-28"
      >
        <Rose className="float-y w-full" style={{ "--tilt": "5deg" } as React.CSSProperties} />
      </motion.div>
      <motion.div
        initial={{ scale: 0.3, rotate: 90, opacity: 0 }}
        animate={seen ? { scale: 1, rotate: 25, opacity: 1 } : undefined}
        transition={{ type: "spring", stiffness: 70, damping: 12, delay: 0.15 }}
        className="absolute -right-9 top-6 w-24"
      >
        <Rose className="float-y w-full" style={{ "--tilt": "-5deg", "--delay": "-2s" } as React.CSSProperties} />
      </motion.div>

      <div className="relative z-10 mx-auto max-w-3xl pt-6">
        <SectionTitle kicker={texts.galleryKicker} title={texts.galleryTitle} tone="dark" />

        {/* Polaroids que caen y se acomodan */}
        <div className="grid grid-cols-2 gap-x-4 gap-y-9">
          {gallery.map((img, i) => (
            <motion.div
              key={img.src + i}
              initial={{ opacity: 0, y: 110, rotate: TILTS[i % TILTS.length] * 4, scale: 0.7 }}
              whileInView={{ opacity: 1, y: 0, rotate: TILTS[i % TILTS.length], scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ type: "spring", stiffness: 80, damping: 13, delay: (i % 2) * 0.18 }}
              whileHover={{ rotate: 0, scale: 1.06, zIndex: 20 }}
              whileTap={{ scale: 0.97 }}
              className={`relative ${i % 2 ? "mt-10" : ""}`}
            >
              <button
                onClick={() => {
                  setDir(1);
                  setOpen(i);
                }}
                aria-label={`Ampliar foto: ${img.alt}`}
                className="float-y relative block w-full bg-[#fffdf8] p-2 pb-9 shadow-[0_14px_30px_rgba(74,6,11,.28)]"
                style={{ "--tilt": "1.2deg", "--dur": `${6 + i}s`, "--delay": `${-i * 1.3}s` } as React.CSSProperties}
              >
                {/* cinta dorada */}
                <span className="absolute -top-3 left-1/2 z-10 h-5 w-16 -translate-x-1/2 -rotate-3 bg-gold/60 shadow-sm" />
                <span className="relative block aspect-[4/5] w-full overflow-hidden bg-ruby-deep">
                  <Photo src={img.src} position={img.position} alt={img.alt} sizes="(max-width:480px) 45vw, 220px" />
                </span>
                <span className="absolute inset-x-0 bottom-2 text-center font-script text-xl leading-none text-ruby">
                  Recuerdo {i + 1}
                </span>
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence custom={dir}>
        {open !== null && (
          <motion.div
            key="lightbox"
            role="dialog"
            aria-modal="true"
            aria-label="Galería ampliada"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] flex items-center justify-center bg-ruby-dark/95 backdrop-blur-md"
            onClick={close}
          >
            <button
              onClick={close}
              aria-label="Cerrar"
              className="absolute right-4 top-4 z-10 rounded-full border border-gold/60 bg-ruby-deep/80 p-2.5 text-gold-light"
            >
              <X className="h-5 w-5" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                go(-1);
              }}
              aria-label="Anterior"
              className="absolute left-2 z-10 rounded-full border border-gold/60 bg-ruby-deep/80 p-2.5 text-gold-light"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                go(1);
              }}
              aria-label="Siguiente"
              className="absolute right-2 z-10 rounded-full border border-gold/60 bg-ruby-deep/80 p-2.5 text-gold-light"
            >
              <ChevronRight className="h-6 w-6" />
            </button>

            <AnimatePresence mode="popLayout" custom={dir} initial={false}>
              <motion.div
                key={open}
                custom={dir}
                initial={{ opacity: 0, x: dir * 80, scale: 0.9, rotate: dir * 4 }}
                animate={{ opacity: 1, x: 0, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, x: dir * -80, scale: 0.9, rotate: dir * -4 }}
                transition={{ duration: 0.4 }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.4}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -70) go(1);
                  else if (info.offset.x > 70) go(-1);
                }}
                onClick={(e) => e.stopPropagation()}
                className="border-gold-metal relative h-[72svh] w-[88vw] max-w-3xl overflow-hidden rounded-2xl p-1 [--card-bg:#4A060B]"
              >
                <div className="relative h-full w-full overflow-hidden rounded-xl">
                  <Photo src={gallery[open].src} alt={gallery[open].alt} sizes="90vw" className="!object-contain" position="50% 50%" />
                </div>
              </motion.div>
            </AnimatePresence>

            <p className="absolute bottom-5 font-label text-xs tracking-[0.3em] text-gold-light">
              {open + 1} / {gallery.length}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
