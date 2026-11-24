import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

/** Favicon generado: monograma dorado sobre rojo (evita el 404 de /favicon.ico) */
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #B3121F, #4A060B)",
          borderRadius: 14,
          color: "#F5D77A",
          fontSize: 40,
          fontWeight: 700,
          fontFamily: "serif",
        }}
      >
        50
      </div>
    ),
    size,
  );
}
