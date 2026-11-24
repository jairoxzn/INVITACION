"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check, Heart, Mail, MessageCircle, Minus, Pencil, PartyPopper, Plus, User, Users } from "lucide-react";
import { useMemo, useState } from "react";
import { invitation } from "@/config/invitation";
import { Rose, Sparkles } from "./Decor";
import { Burst } from "./Fx";
import { Reveal } from "./Reveal";
import { SectionTitle } from "./SectionTitle";

type Errors = { name?: string; attending?: string };

const QUICK = ["¡Felicidades!", "Un abrazo enorme", "Nos vemos pronto", "Dios te bendiga"];

function Step({ n, children }: { n: number; children: React.ReactNode }) {
  return (
    <div className="mb-3 flex items-center gap-3">
      <span className="bg-gold-metal flex h-7 w-7 shrink-0 items-center justify-center rounded-full font-display text-sm font-bold text-ruby-deep shadow-md shadow-ruby-deep/20">
        {n}
      </span>
      <span className="font-label text-xs font-semibold uppercase tracking-[0.22em] text-ruby">{children}</span>
      <span className="h-px flex-1 bg-gradient-to-r from-gold/60 to-transparent" />
    </div>
  );
}

/** Convierte *negrita* de WhatsApp en <strong> para la vista previa. */
function WaText({ text }: { text: string }) {
  return (
    <>
      {text.split(/(\*[^*]+\*)/g).map((part, i) =>
        part.startsWith("*") && part.endsWith("*") ? <strong key={i}>{part.slice(1, -1)}</strong> : <span key={i}>{part}</span>,
      )}
    </>
  );
}

export function Rsvp() {
  const { texts, event, honoree, rsvp } = invitation;
  const [name, setName] = useState("");
  const [companions, setCompanions] = useState(0);
  const [attending, setAttending] = useState<"yes" | "no" | null>(null);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [shake, setShake] = useState(0);
  const [sentUrl, setSentUrl] = useState<string | null>(null);

  const nameOk = name.trim().length >= 3;
  const firstName = name.trim().split(/\s+/)[0] ?? "";

  const waMessage = useMemo(() => {
    const base = `Hola, soy *${name.trim() || "…"}*.`;
    const lines =
      attending === "no"
        ? [
            `${base} Lamentablemente no podré asistir a los ${honoree.age} años de ${honoree.fullName}, pero les envío un abrazo y mis mejores deseos. 💛`,
          ]
        : [
            `${base} ¡Confirmo mi asistencia a los ${honoree.age} años de ${honoree.fullName}! 🎉`,
            `📅 ${event.dateLong} · ${event.timeLabel}`,
            companions > 0
              ? `👥 Asistiré con ${companions} acompañante${companions > 1 ? "s" : ""} (total: ${companions + 1} personas).`
              : "👤 Asistiré yo solo/a.",
          ];
    if (message.trim()) lines.push(`💬 ${message.trim()}`);
    return lines.join("\n");
  }, [name, attending, companions, message, event, honoree]);

  const onSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    const e: Errors = {};
    if (!nameOk) e.name = "Escribe tu nombre completo.";
    if (!attending) e.attending = "Cuéntanos si podrás asistir.";
    setErrors(e);
    if (Object.keys(e).length) {
      setShake((s) => s + 1);
      return;
    }
    const number = rsvp.whatsappNumber.replace(/\D/g, "");
    const url = `https://wa.me/${number}?text=${encodeURIComponent(waMessage)}`;
    window.open(url, "_blank", "noopener,noreferrer");
    setSentUrl(url);
  };

  const addQuick = (q: string) =>
    setMessage((m) => (m.includes(q) ? m : `${m}${m && !/\s$/.test(m) ? " " : ""}${q}`.slice(0, 300)));

  const field =
    "w-full rounded-2xl border-2 border-gold/40 bg-white/80 text-base text-ruby-dark shadow-inner shadow-gold/10 transition placeholder:text-ruby-dark/35 focus:border-ruby focus:bg-white focus:outline-none focus:ring-4 focus:ring-ruby/10";

  return (
    <section id="confirmacion" className="bg-ivory-section relative overflow-hidden px-5 py-20">
      <Sparkles count={8} />
      <Rose className="float-y absolute -left-10 bottom-6 w-32 -rotate-12 opacity-80" style={{ "--tilt": "4deg" } as React.CSSProperties} />
      <Rose className="float-y absolute -right-10 top-4 w-28 rotate-[24deg] opacity-80" style={{ "--tilt": "-4deg", "--delay": "-2s" } as React.CSSProperties} />

      <div className="relative z-10 mx-auto max-w-md">
        <SectionTitle kicker={texts.rsvpKicker} title={texts.rsvpTitle} tone="dark" />

        <Reveal>
          <p className="mb-8 text-center font-display text-lg italic leading-relaxed text-ruby-dark/85">{texts.rsvpText}</p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="border-gold-metal relative overflow-hidden rounded-[2rem] p-[5px] shadow-2xl shadow-ruby-deep/25 [--card-bg:#fffdf8]">
            <div className="overflow-hidden rounded-[1.6rem] bg-[#fffdf8]">
              {/* Cabecera */}
              <div className="relative overflow-hidden bg-gradient-to-b from-ruby to-ruby-deep px-6 py-6 text-center">
                <Sparkles count={6} />
                <motion.div
                  className="bg-gold-metal relative mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full shadow-lg shadow-black/30"
                  animate={{ rotate: [0, -8, 8, -6, 0], y: [0, -3, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Mail className="h-6 w-6 text-ruby-deep" strokeWidth={1.8} />
                </motion.div>
                <p className="relative font-script text-3xl text-gold-light">Reserva tu lugar</p>
                <p className="relative mt-1 font-label text-[0.65rem] uppercase tracking-[0.3em] text-ivory/80">
                  {event.weekday} {event.dateCompact} · {event.timeLabel}
                </p>
              </div>

              <AnimatePresence mode="wait">
                {sentUrl ? (
                  /* ---------- Éxito ---------- */
                  <motion.div
                    key="ok"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ type: "spring", stiffness: 120, damping: 14 }}
                    className="relative px-6 pb-8 pt-9 text-center"
                  >
                    <div className="absolute left-1/2 top-24">
                      <Burst count={36} radius={150} />
                    </div>
                    <svg viewBox="0 0 80 80" className="mx-auto h-20 w-20" aria-hidden>
                      <motion.circle
                        cx="40"
                        cy="40"
                        r="35"
                        fill="none"
                        stroke="url(#goldGrad)"
                        strokeWidth="4"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.8 }}
                      />
                      <motion.path
                        d="M24 41 35 52 57 28"
                        fill="none"
                        stroke="#B3121F"
                        strokeWidth="5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.6, delay: 0.7 }}
                      />
                    </svg>
                    <p className="mt-4 font-script text-4xl text-ruby">¡Gracias{firstName ? `, ${firstName}` : ""}!</p>
                    <p className="mt-2 text-sm leading-relaxed text-ruby-dark/80">
                      {attending === "yes"
                        ? `Te esperamos el ${event.dateLong.toLowerCase()} a la ${event.timeLabel}${
                            companions > 0 ? `, con ${companions} acompañante${companions > 1 ? "s" : ""}` : ""
                          }.`
                        : "Lamentamos que no puedas venir. ¡Gracias por avisarnos y por tu cariño!"}
                    </p>
                    <p className="mx-auto mt-4 max-w-[17rem] rounded-xl bg-ruby/5 px-4 py-3 text-xs leading-relaxed text-ruby-dark/70">
                      Se abrió WhatsApp con tu mensaje. Solo falta que lo <strong>envíes</strong> para que quede confirmado.
                    </p>
                    <div className="mt-6 flex flex-col items-center gap-3">
                      <a
                        href={sentUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-b from-ruby to-ruby-deep px-6 py-3 font-label text-xs font-semibold tracking-[0.18em] text-ivory shadow-lg shadow-ruby-deep/40 active:scale-95"
                      >
                        <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-gold-light/40 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                        <MessageCircle className="relative h-4 w-4 text-gold-light" />
                        <span className="relative">ABRIR WHATSAPP DE NUEVO</span>
                      </a>
                      <button
                        onClick={() => setSentUrl(null)}
                        className="inline-flex items-center gap-1.5 text-sm text-ruby underline decoration-gold underline-offset-4"
                      >
                        <Pencil className="h-3.5 w-3.5" /> Editar mi respuesta
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  /* ---------- Formulario ---------- */
                  <motion.form
                    key="form"
                    onSubmit={onSubmit}
                    noValidate
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-8 px-5 pb-8 pt-7"
                  >
                    {/* 1 · Nombre */}
                    <div>
                      <Step n={1}>Tu nombre</Step>
                      <div className="relative">
                        <User className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gold-dark" />
                        <input
                          id="rsvp-name"
                          type="text"
                          autoComplete="name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Nombre y apellido"
                          aria-label="Nombre completo"
                          aria-invalid={!!errors.name}
                          className={`${field} py-3.5 pl-12 pr-12`}
                        />
                        <AnimatePresence>
                          {nameOk && (
                            <motion.span
                              initial={{ scale: 0, rotate: -90 }}
                              animate={{ scale: 1, rotate: 0 }}
                              exit={{ scale: 0 }}
                              className="absolute right-3.5 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full bg-ruby text-ivory"
                            >
                              <Check className="h-4 w-4" />
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </div>
                      {errors.name && <p className="mt-2 text-sm text-ruby">{errors.name}</p>}
                    </div>

                    {/* 2 · Asistencia */}
                    <div>
                      <Step n={2}>¿Nos acompañas?</Step>
                      <div className="grid grid-cols-2 gap-3">
                        {(
                          [
                            ["yes", "Sí asistiré", "¡Allí estaré!", PartyPopper],
                            ["no", "No podré asistir", "Lo sentiré mucho", Heart],
                          ] as const
                        ).map(([val, label, sub, Icon]) => {
                          const on = attending === val;
                          return (
                            <motion.button
                              type="button"
                              key={val}
                              onClick={() => setAttending(val)}
                              aria-pressed={on}
                              whileTap={{ scale: 0.95 }}
                              animate={{ scale: on ? 1.03 : 1 }}
                              className={`relative flex flex-col items-center gap-1.5 overflow-hidden rounded-2xl border-2 px-2 py-4 text-center transition-colors ${
                                on
                                  ? "border-gold bg-gradient-to-b from-ruby to-ruby-deep text-ivory shadow-xl shadow-ruby-deep/35"
                                  : "border-gold/40 bg-white/80 text-ruby-deep"
                              }`}
                            >
                              <span
                                className={`flex h-11 w-11 items-center justify-center rounded-full ${
                                  on ? "bg-gold-metal text-ruby-deep" : "bg-ruby/10 text-ruby"
                                }`}
                              >
                                <Icon className="h-5 w-5" strokeWidth={1.8} />
                              </span>
                              <span className="text-sm font-semibold leading-tight">{label}</span>
                              <span className={`text-[0.7rem] ${on ? "text-gold-light" : "text-ruby-dark/50"}`}>{sub}</span>
                              <AnimatePresence>
                                {on && (
                                  <motion.span
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    exit={{ scale: 0 }}
                                    transition={{ type: "spring", stiffness: 300, damping: 14 }}
                                    className="bg-gold-metal absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-full text-ruby-deep"
                                  >
                                    <Check className="h-3 w-3" strokeWidth={3} />
                                  </motion.span>
                                )}
                              </AnimatePresence>
                            </motion.button>
                          );
                        })}
                      </div>
                      {errors.attending && <p className="mt-2 text-sm text-ruby">{errors.attending}</p>}
                    </div>

                    {/* 3 · Acompañantes */}
                    <AnimatePresence initial={false}>
                      {attending === "yes" && (
                        <motion.div
                          key="comp"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.4 }}
                          className="overflow-hidden"
                        >
                          <Step n={3}>Acompañantes</Step>
                          <div className="rounded-2xl border-2 border-dashed border-gold/50 bg-gold/5 px-4 py-4">
                            <div className="flex items-center justify-center gap-6">
                              <button
                                type="button"
                                aria-label="Menos acompañantes"
                                onClick={() => setCompanions((c) => Math.max(0, c - 1))}
                                className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-gold bg-white text-ruby shadow-sm active:scale-90"
                              >
                                <Minus className="h-5 w-5" />
                              </button>
                              <div className="w-16 text-center">
                                <AnimatePresence mode="popLayout" initial={false}>
                                  <motion.span
                                    key={companions}
                                    initial={{ y: 14, opacity: 0, scale: 0.7 }}
                                    animate={{ y: 0, opacity: 1, scale: 1 }}
                                    exit={{ y: -14, opacity: 0 }}
                                    className="text-gold-metal block font-display text-5xl font-bold leading-none"
                                  >
                                    {companions}
                                  </motion.span>
                                </AnimatePresence>
                              </div>
                              <button
                                type="button"
                                aria-label="Más acompañantes"
                                onClick={() => setCompanions((c) => Math.min(rsvp.maxCompanions, c + 1))}
                                className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-gold bg-white text-ruby shadow-sm active:scale-90"
                              >
                                <Plus className="h-5 w-5" />
                              </button>
                            </div>
                            {/* Siluetas: una por persona */}
                            <div className="mt-4 flex min-h-8 flex-wrap items-center justify-center gap-1.5">
                              <AnimatePresence initial={false}>
                                {Array.from({ length: companions + 1 }).map((_, i) => (
                                  <motion.span
                                    key={i}
                                    layout
                                    initial={{ scale: 0, y: 10 }}
                                    animate={{ scale: 1, y: 0 }}
                                    exit={{ scale: 0 }}
                                    transition={{ type: "spring", stiffness: 300, damping: 16 }}
                                    className={`flex h-8 w-8 items-center justify-center rounded-full ${
                                      i === 0 ? "bg-ruby text-ivory" : "bg-gold-metal text-ruby-deep"
                                    }`}
                                    title={i === 0 ? "Tú" : `Acompañante ${i}`}
                                  >
                                    <User className="h-4 w-4" />
                                  </motion.span>
                                ))}
                              </AnimatePresence>
                            </div>
                            <p className="mt-2 flex items-center justify-center gap-1.5 text-xs text-ruby-dark/65">
                              <Users className="h-3.5 w-3.5 text-gold-dark" />
                              Total: <strong className="text-ruby-deep">{companions + 1}</strong>{" "}
                              {companions + 1 === 1 ? "persona" : "personas"}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Mensaje */}
                    <div>
                      <Step n={attending === "yes" ? 4 : 3}>Un mensaje (opcional)</Step>
                      <div className="relative">
                        <textarea
                          id="rsvp-msg"
                          rows={3}
                          maxLength={300}
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          placeholder="Unas palabras para Gisella…"
                          aria-label="Mensaje"
                          className={`${field} resize-none px-4 py-3.5`}
                        />
                        <span className="absolute bottom-2.5 right-4 text-[0.65rem] tabular-nums text-ruby-dark/40">
                          {message.length}/300
                        </span>
                      </div>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {QUICK.map((q) => (
                          <button
                            type="button"
                            key={q}
                            onClick={() => addQuick(q)}
                            className="rounded-full border border-gold/60 bg-white/70 px-3 py-1.5 text-xs text-ruby-deep transition hover:border-ruby hover:bg-ruby/5 active:scale-95"
                          >
                            + {q}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Vista previa estilo WhatsApp */}
                    <AnimatePresence>
                      {nameOk && attending && (
                        <motion.div
                          initial={{ opacity: 0, y: 16, height: 0 }}
                          animate={{ opacity: 1, y: 0, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="overflow-hidden"
                        >
                          <p className="mb-2 text-center font-label text-[0.62rem] uppercase tracking-[0.25em] text-ruby-dark/55">
                            Así llegará tu mensaje
                          </p>
                          <div className="relative ml-6 rounded-2xl rounded-tr-sm bg-[#e2f7cb] px-4 py-3 text-[0.82rem] leading-relaxed text-[#1f2a1a] shadow-md">
                            <span className="absolute -right-1.5 top-0 h-3 w-3 bg-[#e2f7cb] [clip-path:polygon(0_0,100%_0,0_100%)]" />
                            <p className="whitespace-pre-line">
                              <WaText text={waMessage} />
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Enviar */}
                    <motion.div key={shake} animate={shake ? { x: [0, -10, 10, -8, 8, 0] } : undefined} transition={{ duration: 0.45 }}>
                      <button
                        type="submit"
                        className="group relative flex w-full items-center justify-center gap-3 overflow-hidden rounded-full border-2 border-gold bg-gradient-to-b from-ruby to-ruby-deep px-6 py-4 font-label text-[0.8rem] font-semibold tracking-[0.18em] text-ivory shadow-xl shadow-ruby-deep/40 transition active:scale-[.98]"
                      >
                        <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-gold-light/45 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                        <span className="bg-gold-metal relative flex h-8 w-8 items-center justify-center rounded-full text-ruby-deep">
                          <MessageCircle className="h-4 w-4" />
                        </span>
                        <span className="relative">CONFIRMAR POR WHATSAPP</span>
                      </button>
                      <p className="mt-3 text-center text-[0.7rem] text-ruby-dark/50">
                        Se abrirá WhatsApp con tu respuesta lista para enviar.
                      </p>
                    </motion.div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mt-10 text-center font-script text-4xl text-ruby">{texts.rsvpClosing}</p>
        </Reveal>
      </div>
    </section>
  );
}
