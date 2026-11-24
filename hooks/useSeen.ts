"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Devuelve [ref, seen]: `seen` pasa a true (una sola vez) cuando el elemento
 * entra en pantalla. Se calcula con getBoundingClientRect en scroll/resize y
 * un intervalo de respaldo, porque IntersectionObserver falla en algunos
 * navegadores móviles (Safari/iOS) con elementos SVG o con escala 0.
 * Observa siempre un contenedor SIN transformaciones de escala.
 */
export function useSeen<T extends Element = HTMLDivElement>(margin = 40) {
  const ref = useRef<T>(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    if (seen) return;
    const el = ref.current;
    if (!el) return;

    const check = () => {
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      if (r.bottom > 0 && r.top < vh - margin) setSeen(true);
    };

    check();
    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check);
    window.addEventListener("touchmove", check, { passive: true });
    const id = window.setInterval(check, 350);
    return () => {
      window.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
      window.removeEventListener("touchmove", check);
      window.clearInterval(id);
    };
  }, [seen, margin]);

  return [ref, seen] as const;
}
