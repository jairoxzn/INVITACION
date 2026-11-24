"use client";

import { Check, Share2 } from "lucide-react";
import { useState } from "react";
import { invitation } from "@/config/invitation";

/** Compartir con Web Share API; respaldo: copiar enlace (+ enlace a WhatsApp). */
export function ShareButton() {
  const [copied, setCopied] = useState(false);
  const [fallback, setFallback] = useState(false);
  const { meta, honoree } = invitation;

  const text = `¡Estás cordialmente invitado a los ${honoree.age} años de ${honoree.fullName}! 🎉`;

  const share = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ title: meta.title, text, url });
        return;
      } catch (err) {
        if ((err as DOMException)?.name === "AbortError") return;
      }
    }
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      /* sin portapapeles */
    }
    setFallback(true);
  };

  const waHref = () =>
    `https://wa.me/?text=${encodeURIComponent(`${text}\n${typeof window !== "undefined" ? window.location.href : ""}`)}`;

  return (
    <div className="flex flex-col items-center gap-3">
      <button
        onClick={share}
        className="inline-flex items-center gap-2 rounded-full border border-gold-light bg-ruby-dark/50 px-6 py-3 font-label text-xs font-semibold tracking-[0.2em] text-gold-light backdrop-blur transition hover:bg-ruby-deep active:scale-95"
      >
        {copied ? <Check className="h-4 w-4" /> : <Share2 className="h-4 w-4" />}
        {copied ? "ENLACE COPIADO" : "COMPARTIR INVITACIÓN"}
      </button>
      {fallback && (
        <a
          href={waHref()}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-ivory/80 underline decoration-gold underline-offset-4"
        >
          Enviar por WhatsApp
        </a>
      )}
    </div>
  );
}
