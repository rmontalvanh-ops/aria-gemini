import type { Config } from "tailwindcss";

// ── Sistema de tokens ARIA · edición Gemini ──────────────────────────────
// Paleta pensada para un espacio de co-autoría de documentos oficiales:
// un lienzo frío y tranquilo (no el crema+terracota genérico de IA),
// con el azul/rojo institucional como el único acento "de marca" y un
// hilo espectral violeta→cian reservado exclusivamente para lo que
// generó el modelo (nunca decorativo, siempre informativo).
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: {
          DEFAULT: "#F5F7FA",
          dim: "#EAEEF3",
          panel: "#FFFFFF",
        },
        ink: {
          DEFAULT: "#12213B",
          soft: "#4A5A76",
          faint: "#8A97AC",
        },
        unitec: {
          DEFAULT: "#1B4F8A",
          soft: "#E7EFF8",
        },
        ceutec: {
          DEFAULT: "#C8102E",
          soft: "#FBE9EC",
        },
        spectrum: {
          violet: "#6D5AE6",
          cyan: "#22D3C0",
        },
        estado: {
          confirmado: "#12213B",
          inferido: "#0E9488",
          propuesto: "#B7791F",
          pendiente: "#BE185D",
        },
      },
      fontFamily: {
        display: ["var(--font-poppins)", "sans-serif"],
        doc: ["var(--font-source-serif)", "serif"],
        mono: ["var(--font-jetbrains)", "monospace"],
      },
      backgroundImage: {
        "spectrum-thread":
          "linear-gradient(90deg, #6D5AE6 0%, #22D3C0 100%)",
      },
      boxShadow: {
        panel: "0 1px 2px rgba(18,33,59,0.04), 0 8px 24px rgba(18,33,59,0.06)",
      },
      borderRadius: {
        xl2: "1.25rem",
      },
      keyframes: {
        "fill-spine": {
          "0%": { transform: "scaleY(0)" },
          "100%": { transform: "scaleY(1)" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(6px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fill-spine": "fill-spine 400ms ease-out forwards",
        "fade-up": "fade-up 300ms ease-out forwards",
      },
    },
  },
  plugins: [],
};
export default config;
