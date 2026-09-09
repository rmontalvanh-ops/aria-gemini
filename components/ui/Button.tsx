"use client";

import { ButtonHTMLAttributes } from "react";
import clsx from "clsx";

interface BotonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variante?: "primario" | "secundario" | "fantasma";
  acento?: "unitec" | "ceutec" | "espectro";
}

export function Boton({
  variante = "primario",
  acento = "espectro",
  className,
  children,
  ...props
}: BotonProps) {
  const acentoClases = {
    unitec: "bg-unitec hover:bg-unitec/90 focus-visible:outline-unitec",
    ceutec: "bg-ceutec hover:bg-ceutec/90 focus-visible:outline-ceutec",
    espectro:
      "bg-ink hover:bg-ink/90 focus-visible:outline-spectrum-violet",
  }[acento];

  const varianteClases = {
    primario: clsx("text-white shadow-panel", acentoClases),
    secundario:
      "bg-white text-ink border border-ink/10 hover:border-ink/20 shadow-panel",
    fantasma: "bg-transparent text-ink/70 hover:text-ink hover:bg-ink/5",
  }[variante];

  return (
    <button
      className={clsx(
        "inline-flex items-center justify-center gap-2 rounded-xl2 px-5 py-2.5 text-sm font-medium transition-all duration-150 disabled:opacity-40 disabled:pointer-events-none",
        varianteClases,
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
