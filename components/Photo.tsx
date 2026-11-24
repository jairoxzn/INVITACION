"use client";

import Image from "next/image";
import { useState } from "react";
import { invitation } from "@/config/invitation";

interface PhotoProps {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  /** object-position, p. ej. "50% 30%" */
  position?: string;
  /** Zoom lento continuo (efecto Ken Burns) */
  kenburns?: boolean;
}

/**
 * Foto con carga diferida (next/image). Si el archivo no existe o no
 * se configuró, muestra un marcador elegante con el monograma.
 * El contenedor padre debe ser `relative` y tener tamaño.
 */
export function Photo({ src, alt, className = "", sizes = "100vw", priority, position = "50% 50%", kenburns }: PhotoProps) {
  const [failed, setFailed] = useState(!src);
  const [attempt, setAttempt] = useState(0);

  if (failed) {
    return (
      <div
        role="img"
        aria-label={alt}
        className="absolute inset-0 flex items-center justify-center overflow-hidden bg-gradient-to-br from-ruby via-ruby-deep to-ruby-dark"
      >
        <div className="absolute inset-0 opacity-40 [background:radial-gradient(circle_at_30%_20%,rgba(245,215,122,.35),transparent_55%)]" />
        <span className="text-gold-metal font-display text-[min(30vw,7rem)] leading-none select-none">
          {invitation.honoree.monogram}
        </span>
      </div>
    );
  }

  return (
    <Image
      key={attempt}
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      className={`object-cover ${kenburns ? "kenburns" : ""} ${className}`}
      style={{ objectPosition: position }}
      // Reintenta (errores transitorios de red) antes de mostrar el marcador
      onError={() => {
        if (attempt < 2) setTimeout(() => setAttempt((a) => a + 1), 700);
        else setFailed(true);
      }}
    />
  );
}
