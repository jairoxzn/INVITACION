/**
 * ============================================================
 *  CONFIGURACIÓN CENTRAL DE LA INVITACIÓN
 *  Todo lo editable vive en este archivo. Para reutilizar el
 *  proyecto en otro evento, cambia solo los valores de aquí
 *  (y las fotos en /public/images y el audio en /public/audio).
 * ============================================================
 *
 *  Campos con `null` o "" = POR DEFINIR (no se inventan datos).
 */

export type TimelineIcon =
  | "church"
  | "users"
  | "party"
  | "wine"
  | "utensils"
  | "cake"
  | "music";

export interface TimelineItem {
  id: string;
  /** Hora visible, p. ej. "1:00 pm". `null` => se muestra "Por confirmar". */
  time: string | null;
  title: string;
  description: string;
  icon: TimelineIcon;
  /** `false` oculta el ítem sin borrarlo. */
  visible: boolean;
}

export interface LocationItem {
  id: string;
  /** Etiqueta superior, p. ej. "Misa y celebración". */
  label: string;
  /** Nombre del lugar. */
  name: string;
  address: string;
  /** Hora de inicio visible. `null` la oculta. */
  time: string | null;
  mapsUrl: string;
  /** Foto del lugar (opcional). "" para no mostrarla. */
  photo: string;
  visible: boolean;
}

export interface GalleryImage {
  src: string;
  alt: string;
  /** Punto de enfoque del recorte, p. ej. "50% 30%". */
  position?: string;
}

export const invitation = {
  /* ---------- Metadatos / SEO / Open Graph ---------- */
  meta: {
    title: "50 · Gisella Huaracha",
    description:
      "¡Estás cordialmente invitado! Acompáñanos a celebrar los 50 años de Gisella Massiel Huaracha Anccori el jueves 3 de diciembre de 2026.",
    /** Imagen para compartir (1200×630) en /public. Si está vacío, se genera una automática. */
    ogImage: "",
    themeColor: "#7A0C14",
  },

  /* ---------- Homenajeada ---------- */
  honoree: {
    fullName: "Gisella Massiel Huaracha Anccori",
    shortName: "Gisella",
    monogram: "G",
    age: 50,
    occasion: "Cumpleaños número 50",
  },

  /* ---------- Fecha y hora ---------- */
  event: {
    /** ISO con zona horaria de Lima (UTC-05:00). Es la hora de la misa. */
    dateISO: "2026-12-03T13:00:00-05:00",
    timeZone: "America/Lima",
    weekday: "JUEVES",
    dateShort: "03 · 12 · 26",
    dateCompact: "03|12|26",
    dateLong: "Jueves 3 de diciembre de 2026",
    timeLabel: "1:00 pm",
  },

  /* ---------- Textos ---------- */
  texts: {
    heroKicker: "¡Estás cordialmente invitado!",
    heroTitleLine1: "¡50 AÑOS",
    heroTitleLine2: "PARA CELEBRAR!",
    heroButton: "ABRIR INVITACIÓN",

    welcomeKicker: "Te invito a mis:",
    welcomeText:
      "Hoy celebramos no solo un cumpleaños, sino cinco décadas de vida, aprendizajes, alegrías y recuerdos compartidos.",
    welcomeLead: "Acompáñanos a celebrar los 50 años de:",

    countdownKicker: "Separa tu fecha.",
    countdownLead: "Faltan",
    countdownDone: "¡Hoy es el gran día!",

    galleryKicker: "Momentos",
    galleryTitle: "Galería de Recuerdos",

    timelineKicker: "Programa",
    timelineTitle: "Cronograma del día",

    locationKicker: "¿Dónde?",
    locationTitle: "Ubicación",
    locationButton: "VER UBICACIÓN",

    rsvpKicker: "Confirmación",
    rsvpTitle: "¿Nos acompañas?",
    rsvpText:
      "Para nosotros será muy especial contar con tu presencia en esta celebración. Te agradeceremos confirmar tu asistencia.",
    rsvpClosing: "¡Esperamos celebrar juntos estos 50 años!",

    finalText:
      "Nos sentimos agradecidos de tenerte bien y con salud para celebrar un año más de vida.",
    finalHighlight: "¡Esperamos contar contigo!",
    finalSignature: "Atte. tu querida familia",
  },

  /* ---------- Fotografías (archivos en /public/images) ----------
   * `position` = punto de enfoque del recorte (object-position CSS). */
  photos: {
    hero: { src: "/images/portada.jpg", position: "50% 22%" },
    welcome: { src: "/images/sombrero.jpg", position: "50% 30%" },
    final: { src: "/images/ventana.jpg", position: "50% 35%" },
  },

  gallery: [
    { src: "/images/portada.jpg", alt: "Gisella con vestido rojo", position: "50% 25%" },
    { src: "/images/sombrero.jpg", alt: "Gisella con sombrero", position: "50% 30%" },
    { src: "/images/ventana.jpg", alt: "Gisella junto a la ventana", position: "50% 35%" },
    { src: "/images/grupo.jpg", alt: "Gisella con sus amigas", position: "50% 70%" },
  ] as GalleryImage[],

  /* ---------- Cronograma ---------- */
  timeline: [
    {
      id: "misa",
      time: "1:00 pm",
      title: "Misa",
      description: "Damos gracias a Dios por cinco décadas de vida.",
      icon: "church",
      visible: true,
    },
    {
      id: "celebracion",
      time: "Luego",
      title: "Celebración y fiesta",
      description: "Brindemos juntos por este día tan especial.",
      icon: "party",
      visible: true,
    },
  ] as TimelineItem[],

  /* ---------- Ubicaciones (admite varias tarjetas) ---------- */
  locations: [
    {
      id: "principal",
      label: "Lugar del evento",
      name: "Víctor Andrés Belaúnde",
      address: "Víctor Andrés Belaúnde, Mz. P, Lote 9, Comité 13",
      time: "1:00 pm",
      mapsUrl: "https://maps.app.goo.gl/nsUDodE9tETJtxPt9",
      photo: "/images/lugar.jpg", // opcional: "/images/lugar.jpg"
      visible: true,
    },
  ] as LocationItem[],

  /* ---------- RSVP por WhatsApp ---------- */
  rsvp: {
    /** Número con código de país, solo dígitos. Ej.: "51987654321".
     *  POR_DEFINIR: vacío => WhatsApp abre para elegir el contacto. */
    whatsappNumber: "51953431010", // PRUEBA: reemplazar por el número definitivo
    maxCompanions: 10,
  },

  /* ---------- Música de fondo (archivo en /public/audio) ---------- */
  music: {
    src: "/audio/musica.mp3",
    title: "Música de fondo",
    volume: 0.5,
  },

  /* ---------- Colores / tokens (CSS variables) ---------- */
  theme: {
    "--color-gold": "#D4AF37",
    "--color-gold-light": "#F5D77A",
    "--color-gold-dark": "#9C7A1E",
    "--color-ivory": "#FFF9F0",
    "--color-ruby": "#B3121F",
    "--color-ruby-deep": "#7A0C14",
    "--color-ruby-dark": "#4A060B",
  } as Record<string, string>,
};

export type Invitation = typeof invitation;
