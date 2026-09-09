"use client";

import { useEffect, useRef, useState } from "react";
import type { Fase, Institucion, Mensaje } from "@/types";
import { RespuestaMarkdown } from "./RespuestaMarkdown";
import { Boton } from "./ui/Button";

interface ChatPanelProps {
  historial: Mensaje[];
  transmitiendo: boolean;
  onEnviar: (texto: string) => void;
  onExportar: (texto: string) => void;
  exportando: boolean;
  institucion: Institucion;
  etiquetasFase: Record<Fase, string>;
  faseActual: Fase;
}

export function ChatPanel({
  historial,
  transmitiendo,
  onEnviar,
  onExportar,
  exportando,
  institucion,
  etiquetasFase,
  faseActual,
}: ChatPanelProps) {
  const [entrada, setEntrada] = useState("");
  const finRef = useRef<HTMLDivElement>(null);

  const acentoTexto = institucion === "UNITEC" ? "text-unitec" : "text-ceutec";
  const acentoBg = institucion === "UNITEC" ? "bg-unitec" : "bg-ceutec";

  useEffect(() => {
    finRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [historial]);

  function manejarEnvio() {
    const texto = entrada.trim();
    if (!texto || transmitiendo) return;
    setEntrada("");
    onEnviar(texto);
  }

  return (
    <div className="flex h-full flex-col">
      <div className="flex-1 space-y-4 overflow-y-auto px-6 py-6">
        {historial.map((m, i) => {
          const esLargo = m.rol === "model" && m.texto.length > 400;
          return (
            <div
              key={m.id}
              className="animate-fade-up"
              style={{ animationDelay: `${Math.min(i, 3) * 40}ms` }}
            >
              {m.rol === "user" ? (
                <div className="ml-auto max-w-[85%] rounded-xl2 rounded-tr-sm bg-ink px-4 py-2.5 text-sm text-white shadow-panel">
                  {m.texto}
                </div>
              ) : (
                <div className="max-w-[95%] rounded-xl2 rounded-tl-sm border border-ink/5 bg-white px-5 py-4 shadow-panel">
                  <div className="mb-2 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5">
                      <span className={`h-1.5 w-1.5 rounded-full ${acentoBg}`} />
                      <span className={`font-mono text-[10px] uppercase tracking-wider ${acentoTexto}`}>
                        {etiquetasFase[m.fase ?? faseActual]}
                      </span>
                    </div>
                    {esLargo && !transmitiendo && (
                      <button
                        onClick={() => onExportar(m.texto)}
                        disabled={exportando}
                        className="rounded-md border border-ink/10 px-2 py-1 font-mono text-[10px] uppercase tracking-wide text-ink/50 hover:border-spectrum-violet/40 hover:text-spectrum-violet disabled:opacity-40"
                      >
                        {exportando ? "Generando…" : "⬇ Word (.docx)"}
                      </button>
                    )}
                  </div>
                  {m.texto ? (
                    <RespuestaMarkdown texto={m.texto} />
                  ) : (
                    <span className="inline-flex gap-1 py-1">
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-ink/30 [animation-delay:-0.2s]" />
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-ink/30 [animation-delay:-0.1s]" />
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-ink/30" />
                    </span>
                  )}
                </div>
              )}
            </div>
          );
        })}
        <div ref={finRef} />
      </div>

      <div className="border-t border-ink/5 bg-paper-panel px-4 py-3">
        <div className="flex items-end gap-2 rounded-xl2 border border-ink/10 bg-paper px-3 py-2 focus-within:border-spectrum-violet/50">
          <textarea
            value={entrada}
            onChange={(e) => setEntrada(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                manejarEnvio();
              }
            }}
            rows={1}
            placeholder='Ej. "APROBAR TODO", "CORREGIR V: la subcompetencia 2 es Avanzado, no Intermedio"…'
            className="max-h-32 flex-1 resize-none bg-transparent text-sm outline-none placeholder:text-ink/30"
          />
          <Boton onClick={manejarEnvio} disabled={transmitiendo || !entrada.trim()} className="shrink-0">
            {transmitiendo ? "…" : "Enviar"}
          </Boton>
        </div>
      </div>
    </div>
  );
}
