"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import clsx from "clsx";
import { ChatPanel } from "@/components/ChatPanel";
import { SeccionSpine } from "@/components/ui/SeccionSpine";
import { construirInstruccionAgente1 } from "@/lib/prompts/agente1";
import { construirInstruccionAgente2 } from "@/lib/prompts/agente2";
import { construirInstruccionAgente3 } from "@/lib/prompts/agente3";
import { NOMBRES_SECCIONES_SILABO, SECCIONES_PROTEGIDAS } from "@/lib/knowledge";
import type { Fase, Mensaje, SesionARIA } from "@/types";

function idAleatorio() {
  return Math.random().toString(36).slice(2, 10);
}

function construirMensajeInicial(sesion: SesionARIA): string {
  const { info, documentos } = sesion;
  const modo = documentos.some((d) => d.tipo === "silabo_anterior")
    ? "MODO A — Mejora (hay sílabo anterior)"
    : "MODO B — Construcción desde cero (solo sintético)";

  const bloques = documentos
    .map(
      (d) =>
        `### Documento: ${d.nombre} (tipo: ${d.tipo})\n\`\`\`\n${d.texto.slice(0, 18000)}\n\`\`\``
    )
    .join("\n\n");

  return `Inicia la revisión en ${modo}.

Asignatura: ${info.nombreAsignatura} (${info.codigo || "código pendiente"})
Institución: ${info.institucion} · Nivel: ${info.nivel} · Período: ${info.periodo}-${info.anio}
Docente: ${info.docente || "(pendiente)"} · Sección: ${info.seccion || "(pendiente)"} · Campus: ${info.campus}

Documentos adjuntos:
${bloques || "(ninguno además del sintético)"}

Genera el diagnóstico completo siguiendo el formato de salida definido.`;
}

const ETIQUETAS_FASE: Record<Fase, string> = {
  agente1: "Agente 1 · Revisor de Sílabo",
  agente2: "Agente 2 · Validador de Coherencia",
  agente3: "Agente 3 · Constructor del Planner",
};

export default function TallerPage() {
  const router = useRouter();
  const [sesion, setSesion] = useState<SesionARIA | null>(null);
  const [historial, setHistorial] = useState<Mensaje[]>([]);
  const [fase, setFase] = useState<Fase>("agente1");
  const [transmitiendo, setTransmitiendo] = useState(false);
  const [exportando, setExportando] = useState(false);
  const [aprobadas, setAprobadas] = useState<number[]>([]);
  const [cargando, setCargando] = useState(true);
  const arrancado = useMemo(() => historial.length > 0, [historial]);

  useEffect(() => {
    const crudo = sessionStorage.getItem("aria-sesion");
    if (!crudo) {
      router.replace("/nueva-sesion");
      return;
    }
    setSesion(JSON.parse(crudo));
    setCargando(false);
  }, [router]);

  const instruccionActual = useMemo(() => {
    if (!sesion) return "";
    if (fase === "agente1") return construirInstruccionAgente1(sesion.info);
    if (fase === "agente2") return construirInstruccionAgente2(sesion.info);
    return construirInstruccionAgente3(sesion.info);
  }, [sesion, fase]);

  async function enviarConHistorial(
    historialConNuevo: Mensaje[],
    systemInstruction: string,
    faseMensaje: Fase
  ) {
    setTransmitiendo(true);
    const idRespuesta = idAleatorio();
    setHistorial([...historialConNuevo, { id: idRespuesta, rol: "model", texto: "", fase: faseMensaje }]);

    try {
      const res = await fetch("/api/gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ systemInstruction, historial: historialConNuevo }),
      });
      if (!res.body) throw new Error("Sin cuerpo de respuesta.");
      const lector = res.body.getReader();
      const decodificador = new TextDecoder();
      let acumulado = "";
      while (true) {
        const { done, value } = await lector.read();
        if (done) break;
        acumulado += decodificador.decode(value, { stream: true });
        setHistorial((prev) =>
          prev.map((m) => (m.id === idRespuesta ? { ...m, texto: acumulado } : m))
        );
      }
    } catch (e) {
      const mensaje = e instanceof Error ? e.message : "Error de conexión con Gemini.";
      setHistorial((prev) =>
        prev.map((m) => (m.id === idRespuesta ? { ...m, texto: `⚠️ ${mensaje}` } : m))
      );
    } finally {
      setTransmitiendo(false);
    }
  }

  // Arranque automático de la sesión con el Agente 1
  useEffect(() => {
    if (!sesion || arrancado) return;
    const primerMensaje: Mensaje = { id: idAleatorio(), rol: "user", texto: construirMensajeInicial(sesion) };
    enviarConHistorial([primerMensaje], construirInstruccionAgente1(sesion.info), "agente1");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sesion]);

  function manejarEnvioUsuario(texto: string) {
    enviarConHistorial([...historial, { id: idAleatorio(), rol: "user", texto }], instruccionActual, fase);
  }

  function avanzarAAgente2() {
    if (!sesion || fase !== "agente1") return;
    setFase("agente2");
    const mensajeTransicion =
      "El sílabo propuesto arriba fue APROBADO por el coordinador/docente. A partir de este mensaje cambias de rol: eres el Agente 2 — Validador de Coherencia. Realiza los 4 cruces obligatorios contra el catálogo institucional y, si aplica, la matriz de competencias adjuntada al inicio de esta conversación, y entrega el Reporte de Validación de Coherencia en el formato definido.";
    enviarConHistorial(
      [...historial, { id: idAleatorio(), rol: "user", texto: mensajeTransicion }],
      construirInstruccionAgente2(sesion.info),
      "agente2"
    );
  }

  function avanzarAAgente3() {
    if (!sesion || fase !== "agente2") return;
    setFase("agente3");
    const mensajeTransicion =
      "El Reporte de Validación de Coherencia dio APROBADO PARA AGENTE 3. A partir de este mensaje cambias de rol: eres el Agente 3 — Constructor del Planner. Traduce el sílabo ya validado (especialmente las Secciones V y VIII) a un único Planner de 10 semanas, siguiendo la estructura CGS definida.";
    enviarConHistorial(
      [...historial, { id: idAleatorio(), rol: "user", texto: mensajeTransicion }],
      construirInstruccionAgente3(sesion.info),
      "agente3"
    );
  }

  async function exportarComoDocx(texto: string) {
    if (!sesion) return;
    setExportando(true);
    try {
      const res = await fetch("/api/exportar-docx", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          texto,
          titulo: sesion.info.nombreAsignatura || "Sílabo",
          subtitulo: `${sesion.info.institucion} · ${sesion.info.periodo}-${sesion.info.anio} · ${sesion.info.codigo || ""}`,
          institucion: sesion.info.institucion,
        }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({ error: "Error al generar el documento." }));
        throw new Error(err.error);
      }
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${(sesion.info.nombreAsignatura || "silabo").toLowerCase().replace(/[^a-z0-9]+/g, "-")}.docx`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch (e) {
      alert(e instanceof Error ? e.message : "No se pudo exportar el documento.");
    } finally {
      setExportando(false);
    }
  }

  if (cargando || !sesion) {
    return (
      <div className="grid min-h-screen place-items-center text-sm text-ink/40">
        Cargando sesión…
      </div>
    );
  }

  const acentoTexto = sesion.info.institucion === "UNITEC" ? "text-unitec" : "text-ceutec";

  function alternar(n: number) {
    setAprobadas((prev) => (prev.includes(n) ? prev.filter((x) => x !== n) : [...prev, n]));
  }

  return (
    <main className="grid h-screen grid-cols-1 lg:grid-cols-[300px_1fr]">
      {/* Panel lateral */}
      <aside className="hidden flex-col border-r border-ink/5 bg-paper-panel p-6 lg:flex">
        <div className="mb-1 flex items-center gap-2">
          <div className="grid h-7 w-7 place-items-center rounded-md bg-ink font-mono text-[10px] font-bold text-white">
            A
          </div>
          <span className="font-display text-sm font-semibold">ARIA</span>
        </div>
        <p className={clsx("mb-6 font-mono text-[11px] uppercase tracking-wide", acentoTexto)}>
          {sesion.info.institucion} · {sesion.info.periodo}-{sesion.info.anio}
        </p>

        <div className="mb-4 rounded-xl2 border border-ink/5 bg-white p-4 shadow-panel">
          <p className="truncate text-sm font-medium text-ink">
            {sesion.info.nombreAsignatura || "Asignatura sin nombre"}
          </p>
          <p className="mt-0.5 font-mono text-xs text-ink/40">{sesion.info.codigo || "código pendiente"}</p>
        </div>

        {/* Fases del pipeline */}
        <div className="mb-2 flex items-center gap-1">
          {(["agente1", "agente2", "agente3"] as Fase[]).map((f, idx, arr) => {
            const ordenFase: Fase[] = ["agente1", "agente2", "agente3"];
            const completada = ordenFase.indexOf(fase) > idx;
            return (
              <div key={f} className="flex flex-1 items-center gap-1">
                <div
                  className={clsx(
                    "grid h-6 w-6 shrink-0 place-items-center rounded-full font-mono text-[10px]",
                    fase === f
                      ? "bg-spectrum-violet text-white"
                      : completada
                      ? "bg-ink/15 text-ink/50"
                      : "bg-ink/5 text-ink/30"
                  )}
                >
                  {idx + 1}
                </div>
                {idx < arr.length - 1 && <div className="h-px flex-1 bg-ink/10" />}
              </div>
            );
          })}
        </div>
        <p className="mb-6 font-mono text-[10px] text-ink/40">{ETIQUETAS_FASE[fase]}</p>

        {fase === "agente1" && (
          <button
            onClick={avanzarAAgente2}
            disabled={transmitiendo || historial.length < 2}
            className="mb-6 w-full rounded-xl2 border border-spectrum-violet/30 bg-spectrum-violet/5 px-3 py-2.5 text-left text-xs font-medium text-spectrum-violet transition-colors hover:bg-spectrum-violet/10 disabled:opacity-40"
          >
            ✓ Sílabo aprobado — enviar a Agente 2 →
          </button>
        )}
        {fase === "agente2" && (
          <button
            onClick={avanzarAAgente3}
            disabled={transmitiendo}
            className="mb-6 w-full rounded-xl2 border border-spectrum-violet/30 bg-spectrum-violet/5 px-3 py-2.5 text-left text-xs font-medium text-spectrum-violet transition-colors hover:bg-spectrum-violet/10 disabled:opacity-40"
          >
            ✓ Validación aprobada — enviar a Agente 3 →
          </button>
        )}

        <p className="mb-3 font-mono text-[11px] uppercase tracking-wide text-ink/30">
          Progreso del sílabo
        </p>
        <SeccionSpine institucion={sesion.info.institucion} aprobadas={aprobadas} />

        <div className="mt-4 space-y-1">
          {NOMBRES_SECCIONES_SILABO.map((_, idx) => {
            const n = idx + 1;
            const protegida = SECCIONES_PROTEGIDAS.includes(n);
            return (
              <label
                key={n}
                className={clsx(
                  "flex cursor-pointer items-center gap-2 rounded-md px-1.5 py-1 text-[11px] text-ink/40 hover:bg-ink/5",
                  protegida && "cursor-not-allowed opacity-40"
                )}
              >
                <input
                  type="checkbox"
                  disabled={protegida}
                  checked={aprobadas.includes(n)}
                  onChange={() => alternar(n)}
                  className="h-3 w-3 accent-ink"
                />
                Marcar sección {n} como aprobada
              </label>
            );
          })}
        </div>

        <p className="mt-auto pt-6 text-[11px] leading-relaxed text-ink/30">
          Marca las secciones a medida que las apruebes en el chat — esto solo
          actualiza tu vista, no envía nada al modelo.
        </p>
      </aside>

      {/* Chat */}
      <section className="flex flex-col overflow-hidden">
        <div className="flex items-center justify-between border-b border-ink/5 px-6 py-3 lg:hidden">
          <span className="font-display text-sm font-semibold">ARIA</span>
          <span className={clsx("font-mono text-[11px] uppercase", acentoTexto)}>
            {sesion.info.institucion}
          </span>
        </div>
        <ChatPanel
          historial={historial}
          transmitiendo={transmitiendo}
          onEnviar={manejarEnvioUsuario}
          onExportar={exportarComoDocx}
          exportando={exportando}
          institucion={sesion.info.institucion}
          etiquetasFase={ETIQUETAS_FASE}
          faseActual={fase}
        />
      </section>
    </main>
  );
}
