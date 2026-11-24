import { ImageResponse } from "next/og";
import { invitation } from "@/config/invitation";

export const alt = invitation.meta.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  const { honoree, event } = invitation;
  const gold = "#F5D77A";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background:
            "radial-gradient(circle at 50% 30%, #B3121F 0%, #7A0C14 55%, #4A060B 100%)",
        }}
      >
        <div
          style={{
            width: 1120,
            height: 550,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            border: "4px solid #D4AF37",
            borderRadius: 24,
            color: "#FFF9F0",
          }}
        >
          <div style={{ fontSize: 30, letterSpacing: 8, color: gold, display: "flex" }}>
            ESTÁS CORDIALMENTE INVITADO
          </div>
          <div
            style={{
              fontSize: 230,
              fontWeight: 800,
              lineHeight: 1,
              color: gold,
              display: "flex",
              marginTop: 8,
            }}
          >
            {String(honoree.age)}
          </div>
          <div style={{ fontSize: 34, letterSpacing: 14, color: "#FFF9F0", display: "flex" }}>
            AÑOS
          </div>
          <div style={{ fontSize: 50, marginTop: 26, display: "flex" }}>{honoree.fullName}</div>
          <div style={{ fontSize: 30, marginTop: 14, color: gold, display: "flex" }}>
            {event.dateLong}
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
