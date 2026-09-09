import type { Metadata } from "next";
import { Poppins, Source_Serif_4, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-source-serif",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ARIA · Ecosistema de Aprendizaje UNITEC-CEUTEC",
  description:
    "Copiloto de sílabos y planners del Ecosistema de Aprendizaje UNITEC-CEUTEC, edición Gemini.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body
        className={`${poppins.variable} ${sourceSerif.variable} ${jetbrainsMono.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
