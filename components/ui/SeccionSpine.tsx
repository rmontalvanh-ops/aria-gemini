"use client";

import clsx from "clsx";
import type { Institucion } from "@/types";
import { NOMBRES_SECCIONES_SILABO, SECCIONES_PROTEGIDAS } from "@/lib/knowledge";

const NUMERALES_ROMANOS = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"];

interface SeccionSpineProps {
  institucion: Institucion;
  aprobadas: number[]; // números 1..10 de secciones ya aprobadas
  activa?: number;
}

export function SeccionSpine({ institucion, aprobadas, activa }: SeccionSpineProps) {
  const acento = institucion === "UNITEC" ? "bg-unitec" : "bg-ceutec";
  const acentoTexto = institucion === "UNITEC" ? "text-unitec" : "text-ceutec";
  const acentoBorde = institucion === "UNITEC" ? "border-unitec" : "border-ceutec";

  return (
    <ol className="relative flex flex-col gap-0.5 pl-1">
      <div className="absolute left-[19px] top-2 bottom-2 w-px bg-ink/10" />
      {NUMERALES_ROMANOS.map((numeral, idx) => {
        const n = idx + 1;
        const protegida = SECCIONES_PROTEGIDAS.includes(n);
        const aprobada = aprobadas.includes(n);
        const esActiva = activa === n;
        return (
          <li key={n} className="relative flex items-center gap-3 py-1.5">
            <span
              className={clsx(
                "relative z-10 grid h-9 w-9 shrink-0 place-items-center rounded-full border font-mono text-xs font-medium transition-colors",
                aprobada
                  ? clsx(acento, "border-transparent text-white")
                  : esActiva
                  ? clsx("bg-white", acentoBorde, acentoTexto)
                  : "bg-white border-ink/15 text-ink/40"
              )}
              title={protegida ? "Sección protegida — no editable" : undefined}
            >
              {numeral}
              {protegida && (
                <svg
                  viewBox="0 0 24 24"
                  className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full bg-white p-0.5 text-ink/50"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <rect x="5" y="11" width="14" height="9" rx="1.5" />
                  <path d="M8 11V8a4 4 0 0 1 8 0v3" />
                </svg>
              )}
            </span>
            <span
              className={clsx(
                "truncate text-sm",
                esActiva ? "font-medium text-ink" : "text-ink/60"
              )}
            >
              {NOMBRES_SECCIONES_SILABO[idx]}
            </span>
          </li>
        );
      })}
    </ol>
  );
}
