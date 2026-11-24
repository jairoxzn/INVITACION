# PROMPT — Invitación Digital: 50 años de Gisella Massiel Huaracha Anccori

Actúa como un **desarrollador Full Stack Senior y diseñador UI/UX** especializado en experiencias web premium, animaciones y diseño de invitaciones digitales.

Quiero desarrollar una **página web de invitación digital** para un evento especial, tomando como referencia visual y funcional esta página: https://ceremonia-jose-caceres.netlify.app/

El objetivo es crear una experiencia **elegante, emotiva, moderna e interactiva**, que los invitados abran desde su celular mediante un enlace compartido por WhatsApp.

---

## 0. DATOS DEL EVENTO (usar exactamente estos datos)

| Dato | Valor |
|---|---|
| Homenajeada | **Gisella Massiel Huaracha Anccori** |
| Motivo | **Cumpleaños número 50** |
| Fecha | **3 de diciembre de 2026** (jueves) |
| Misa | **1:00 pm** |
| Lugar | **Víctor Andrés Belaúnde, Manzana P, Lote 9, Comité 13** |
| Enlace de Google Maps https://maps.app.goo.gl/nsUDodE9tETJtxPt9 | `
| Hora de recepción/celebración | `[POR_DEFINIR]` |
| WhatsApp del organizador | `[PEGAR_NUMERO_CON_CODIGO_51]` |
| Colores | **Dorado, blanco y rojo** |
| Zona horaria | America/Lima (UTC-05:00) |

> Si algún dato está como `[POR_DEFINIR]`, déjalo como campo editable en la configuración y no inventes valores.

---

## 1. DISEÑO Y ESTILO VISUAL

- Diseño **premium, elegante y sofisticado**, completamente **responsive, priorizando móviles**.
- **Paleta obligatoria:**
  - Dorado (acentos, títulos, bordes, brillos): `#D4AF37` / `#F5D77A` con degradados metálicos.
  - Blanco (fondos claros, tipografía sobre fondos oscuros): `#FFFFFF` / marfil `#FFF9F0`.
  - Rojo (acento emocional, botones, detalles): `#B3121F` / rojo profundo `#7A0C14`.
  - Fondos alternando rojo profundo con degradados, blanco marfil y textura dorada sutil.
- Animaciones suaves al desplazarse, aparición de textos e imágenes, transiciones elegantes.
- Fondos con texturas, degradados y elementos decorativos: destellos dorados, confeti, globos, cintas, laurel con el número **50**, flores/rosas rojas sutiles.
- Tipografías: serif elegante para títulos (ej. *Playfair Display* o *Cinzel*), script para detalles (ej. *Great Vibes*) y sans-serif limpia para texto (ej. *Montserrat* o *Lato*).
- Experiencia inmersiva: debe sentirse como una experiencia digital premium, **no como una web convencional**.

---

## 2. ESTRUCTURA NARRATIVA

**PORTADA → BIENVENIDA → CUENTA REGRESIVA → GALERÍA → CRONOGRAMA → UBICACIÓN → VESTIMENTA → CONFIRMACIÓN → DESPEDIDA**

### SECCIÓN 1: PORTADA PRINCIPAL
- Frase: **¡Estás cordialmente invitado!**
- Título: **¡50 AÑOS PARA CELEBRAR!**
- Nombre: **Gisella Massiel Huaracha Anccori**
- Fotografía principal dentro de marco/anillo dorado con sello monograma "G".
- Fecha: **03 · 12 · 26**
- Botón animado (ej. "ABRIR INVITACIÓN") que además inicia la música de fondo (interacción del usuario).
- Indicador de desplazamiento animado.

### SECCIÓN 2: BIENVENIDA
- Encabezado: "Te invito a mis:" + laurel dorado con "**50 años**".
- Texto: "Hoy celebramos no solo un cumpleaños, sino cinco décadas de vida, aprendizajes, alegrías y recuerdos compartidos."
- "Acompáñanos a celebrar los 50 años de: **Gisella Massiel Huaracha Anccori**".
- Fotografía de la homenajeada y decoraciones doradas/rojas.

### SECCIÓN 3: CONTADOR REGRESIVO
- Encabezado: "Separa tu fecha." / "**JUEVES 03|12|26**".
- "Faltan" + bloques: **Días, Horas, Minutos, Segundos**.
- Cuenta en tiempo real hacia el **3 de diciembre de 2026, 1:00 pm (hora Lima)**.
- Al llegar a cero, mostrar mensaje "¡Hoy es el gran día!".

### SECCIÓN 4: GALERÍA FOTOGRÁFICA
- Collage o carrusel con efectos de transición.
- Lightbox: visualización ampliada al tocar una foto, con navegación y cierre.
- Animaciones de aparición al hacer scroll.
- Imágenes con `next/image`, carga diferida.

### SECCIÓN 5: CRONOGRAMA
Línea de tiempo con hora, actividad, descripción e ícono (Lucide):
1. **1:00 pm — Misa** (ícono iglesia/cruz).
2. **`[POR_DEFINIR]` — Recepción de invitados**.
3. **`[POR_DEFINIR]` — Celebración y fiesta** (opcional: cena, brindis, baile).

> Mantener los ítems 2 y 3 editables y ocultables desde la configuración.

### SECCIÓN 6: UBICACIÓN
- Tarjeta con: nombre del lugar, **dirección completa: Víctor Andrés Belaúnde, Mz. P, Lote 9, Comité 13**, hora de inicio (1:00 pm), fotografía del lugar (opcional) y botón **VER UBICACIÓN** que abre el enlace real de Google Maps (`[PEGAR_ENLACE_DE_UBICACION]`).
- Si la misa y la recepción son en lugares distintos, soportar **varias tarjetas** desde la configuración.

### SECCIÓN 7: CÓDIGO DE VESTIMENTA
- Tipo de vestimenta: `[POR_DEFINIR]` (por defecto: **Elegante**).
- Descripción de la temática.
- Paleta sugerida con muestras: dorado, blanco y rojo.
- Fotografías de referencia y diseño visual atractivo.

### SECCIÓN 8: CONFIRMACIÓN DE ASISTENCIA (RSVP)
- Textos: "Para nosotros será muy especial contar con tu presencia en esta celebración. Te agradeceremos confirmar tu asistencia." / "¡Esperamos celebrar juntos estos 50 años!"
- Formulario: nombre completo, número de acompañantes, **Sí asistiré / No podré asistir**, mensaje opcional.
- Validación de campos.
- Al enviar, generar mensaje personalizado y abrir **WhatsApp** (`https://wa.me/<numero>?text=...`) con la información codificada.

### SECCIÓN 9: MENSAJE FINAL
- Mensaje emotivo de agradecimiento, por ejemplo: "Nos sentimos agradecidos de tenerte bien y con salud para celebrar un año más de vida."
- Fotografía familiar o de la homenajeada.
- Frase: **¡Esperamos contar contigo!**
- Firma: "Atte. tu querida familia".

### SECCIÓN 10: MÚSICA DE FONDO
- Reproductor elegante flotante con **PLAY / PAUSE** y **control de volumen**.
- **No** reproducir con sonido automáticamente: solo tras interacción del usuario.
- Archivo editable en la configuración.

---

## 3. FUNCIONALIDADES ESPECIALES

- Contador regresivo automático.
- Música de fondo con control.
- Galería interactiva con lightbox.
- Animaciones al hacer scroll.
- Botones de Google Maps funcionales.
- RSVP por WhatsApp.
- **Botón para compartir la invitación** (Web Share API con respaldo a copiar enlace / WhatsApp).
- Navegación fluida entre secciones (scroll suave).
- Adaptable a celular, tablet y computadora.
- Carga optimizada de imágenes y metadatos Open Graph (1200×630) para que se vea bien al compartir por WhatsApp.
- Título de pestaña: "50 · Gisella Huaracha"; `theme-color` rojo profundo.

---

## 4. TECNOLOGÍAS

- **Next.js** (App Router) + **TypeScript**
- **Tailwind CSS**
- **Framer Motion**
- **Lucide Icons**
- Componentes reutilizables y arquitectura limpia, por ejemplo:

```
/app
/components
  Hero.tsx  Welcome.tsx  Countdown.tsx  Gallery.tsx
  Timeline.tsx  Locations.tsx  DressCode.tsx
  Rsvp.tsx  FinalMessage.tsx  MusicPlayer.tsx  ShareButton.tsx
/config/invitation.ts   ← TODOS los datos editables
/public/images  /public/audio
```

---

## 5. PERSONALIZACIÓN (config centralizada)

Todos los datos deben vivir en `config/invitation.ts`:

- Nombre de la homenajeada, edad/motivo (50 años).
- Fecha y hora (ISO con zona horaria Lima).
- Fotografías (portada, galería, familia, lugar).
- Mensajes personalizados.
- Cronograma.
- Ubicaciones y enlaces de Google Maps.
- Código de vestimenta.
- Número de WhatsApp.
- Música de fondo.
- Colores y temática (tokens de Tailwind/CSS variables).

El proyecto debe poder **reutilizarse para otros eventos** cambiando solo ese archivo.

---

## 6. RESTRICCIONES IMPORTANTES

- ❌ No crear un dashboard administrativo.
- ❌ No crear una tienda virtual.
- ❌ No usar diseños genéricos.
- ❌ No colocar todas las secciones dentro de tarjetas cuadradas.
- ✅ Cuidar especialmente la **versión móvil**.
- ✅ Todas las interacciones y botones deben funcionar.
- ✅ Fotografías de alta calidad y transiciones profesionales.
- ✅ No inventar datos que estén como `[POR_DEFINIR]`.

---

## 7. ENTREGABLE

Una **invitación digital web completa, funcional, elegante y lista para publicar en Vercel o Netlify**, con instrucciones breves de despliegue y de cómo editar `config/invitation.ts` para personalizarla.
