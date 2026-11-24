# Invitación digital — 50 años de Gisella Massiel Huaracha Anccori

Next.js (App Router) + TypeScript + Tailwind CSS v4 + Framer Motion + Lucide.

## Ejecutar en local

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start   # versión de producción
```

## Cómo funciona

1. **Portada:** sobre rojo con la carta (título + foto de portada) y sello de cera dorado con la "G".
2. Al **tocar el sello** el sobre se abre, empieza la música y aparece la invitación.
3. La invitación es una **columna vertical** (máx. 480 px): en celular ocupa toda la pantalla; en computadora queda centrada sobre un fondo estrellado.

## Qué editar (todo en `config/invitation.ts`)

| Qué | Dónde en el archivo |
|---|---|
| Nombre, edad | `honoree` |
| Fecha/hora (cuenta regresiva) | `event.dateISO` (ISO con `-05:00`, hora Lima) |
| Textos de cada sección | `texts` |
| Fotos de portada, bienvenida y familia | `photos` |
| Galería | `gallery` |
| Cronograma (ocultar con `visible: false`) | `timeline` |
| Ubicaciones y enlaces de Maps (admite varias) | `locations` |
| **WhatsApp del organizador** | `rsvp.whatsappNumber` → p. ej. `"51987654321"` |
| Música | `music.src` |
| Colores (variables CSS) | `theme` |

### Datos que quedaron POR DEFINIR (no se inventaron)

- `rsvp.whatsappNumber` está vacío: mientras no lo completes, el botón de
  confirmación abre WhatsApp para elegir contacto en vez de enviarlo al organizador.
- Hora de **recepción** y de **celebración** (`timeline[].time = null` → se muestra "Por confirmar").
- Nombre del lugar (ahora usa el nombre de la dirección) y foto del lugar.

## Fotos y audio

Las 4 fotos ya están en `public/images/` (`portada.jpg`, `sombrero.jpg`, `ventana.jpg`, `grupo.jpg`)
y se asignan en `photos` y `gallery` de la configuración. Cada una tiene `position`
(punto de enfoque del recorte): ajústalo si una cara queda cortada.

Falta la música: copia tu archivo a `public/audio/musica.mp3`. Mientras no exista,
el reproductor se oculta. Opcional: `public/images/og.jpg` (1200×630) y `meta.ogImage: "/images/og.jpg"`.

## Publicar

**Vercel**: sube el proyecto a GitHub → vercel.com → *Add New Project* → importar → *Deploy*.

**Netlify**: *Add new site → Import from Git* → comando `npm run build`
(el plugin de Next.js se detecta solo) → *Deploy*.

Después de publicar, define la variable `NEXT_PUBLIC_SITE_URL` con tu dominio
final (p. ej. `https://gisella50.vercel.app`) para que la imagen de vista
previa de WhatsApp (Open Graph) use la URL correcta, y vuelve a desplegar.
Comparte el enlace por WhatsApp: se verá la tarjeta "50 · Gisella Huaracha".
