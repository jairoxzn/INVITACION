import type { Metadata, Viewport } from "next";
import { Cinzel, Great_Vibes, Montserrat, Playfair_Display } from "next/font/google";
import { invitation } from "@/config/invitation";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});
const cinzel = Cinzel({ subsets: ["latin"], variable: "--font-cinzel", display: "swap" });
const vibes = Great_Vibes({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-vibes",
  display: "swap",
});
const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : process.env.URL) ||
  "https://ceremonia-gisellamassiel-huaracha.vercel.app/";

const { meta } = invitation;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: meta.title,
  description: meta.description,
  openGraph: {
    title: meta.title,
    description: meta.description,
    type: "website",
    locale: "es_PE",
    siteName: meta.title,
    ...(meta.ogImage
      ? { images: [{ url: meta.ogImage, width: 1200, height: 630, alt: meta.title }] }
      : {}),
  },
  twitter: {
    card: "summary_large_image",
    title: meta.title,
    description: meta.description,
    ...(meta.ogImage ? { images: [meta.ogImage] } : {}),
  },
};

export const viewport: Viewport = {
  themeColor: meta.themeColor,
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="es"
      className={`${playfair.variable} ${cinzel.variable} ${vibes.variable} ${montserrat.variable}`}
      style={invitation.theme as React.CSSProperties}
    >
      <body>{children}</body>
    </html>
  );
}
