import clsx from "clsx";
import type { EstadoDato } from "@/types";

const ESTILOS: Record<EstadoDato, string> = {
  CONFIRMADO: "bg-ink/5 text-ink border-ink/15",
  INFERIDO: "bg-estado-inferido/10 text-estado-inferido border-estado-inferido/30 border-dashed",
  PROPUESTO: "bg-estado-propuesto/10 text-estado-propuesto border-estado-propuesto/30 border-dashed",
  PENDIENTE: "bg-estado-pendiente/10 text-estado-pendiente border-estado-pendiente/30 border-dashed",
};

const ETIQUETAS: Record<EstadoDato, string> = {
  CONFIRMADO: "Confirmado",
  INFERIDO: "Inferido",
  PROPUESTO: "Propuesto",
  PENDIENTE: "Pendiente de validación",
};

export function EstadoChip({ estado }: { estado: EstadoDato }) {
  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-mono uppercase tracking-wide",
        ESTILOS[estado]
      )}
    >
      {ETIQUETAS[estado]}
    </span>
  );
}
