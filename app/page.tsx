"use client";

import { useState } from "react";
import Link from "next/link";
import clsx from "clsx";
import { SeccionSpine } from "@/components/ui/SeccionSpine";
import { Boton } from "@/components/ui/Button";
import type { Institucion } from "@/types";

export default function LandingPage() {
  const [institucion, setInstitucion] = useState<Institucion>("CEUTEC");
  const acento = institucion === "UNITEC" ? "unitec" : "ceutec";
  const acentoTexto = institucion === "UNITEC" ? "text-unitec" : "text-ceutec";
  const acentoBg = institucion === "UNITEC" ? "bg-unitec" : "bg-ceutec";

  return (
    <main className="min-h-screen">
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col px-6 py-8 lg:px-10">
        {/* Encabezado */}
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="grid h-8 w-8 place-items-center rounded-lg bg-ink font-mono text-xs font-bold text-white">
              A
            </div>
            <span className="font-display text-sm font-semibold tracking-tight">ARIA</span>
            <span className="rounded-full border border-spectrum-violet/30 bg-spectrum-violet/5 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-spectrum-violet">
              CODISEÑADOR GEN IA
            </span>
          </div>
          <nav className="hidden items-center gap-6 text-sm text-ink/60 sm:flex">
            <a href="#como-funciona" className="hover:text-ink">Cómo funciona?</a>
            <a href="#secciones" className="hover:text-ink">Las 10 secciones</a>
          </nav>
        </header>

        {/* Hero */}
        <section className="grid flex-1 items-center gap-12 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:py-24">
          <div className="animate-fade-up">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-ink/10 bg-white px-3 py-1 shadow-panel">
              <span className={clsx("h-1.5 w-1.5 rounded-full", acentoBg)} />
              <span className="font-mono text-[11px] uppercase tracking-wide text-ink/50">
                Ecosistema de Aprendizaje UNITEC-CEUTEC
              </span>
            </div>
            <h1 className="font-display text-4xl font-semibold leading-[1.08] tracking-tight text-ink sm:text-5xl">
              Codiseñador.
              <br />
              <span className={acentoTexto}>sílabos.</span>
            </h1>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-ink/60">
              ARIA lee el sintético, cruza la matriz de competencias y redacta
              el sílabo completo — sección por sección, con cada dato marcado
              como confirmado, inferido o propuesto. Las políticas y las
              estrategias metodológicas institucionales nunca se reescriben.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link href="/nueva-sesion">
                <Boton acento={acento === "unitec" ? "unitec" : "ceutec"} className="px-6 py-3 text-base">
                  Iniciar sesión de revisión →
                </Boton>
              </Link>
              <div className="flex items-center gap-1 rounded-xl2 border border-ink/10 bg-white p-1 shadow-panel">
                {(["CEUTEC", "UNITEC"] as Institucion[]).map((opcion) => (
                  <button
                    key={opcion}
                    onClick={() => setInstitucion(opcion)}
                    className={clsx(
                      "rounded-lg px-3 py-1.5 font-mono text-xs transition-colors",
                      institucion === opcion
                        ? opcion === "UNITEC"
                          ? "bg-unitec text-white"
                          : "bg-ceutec text-white"
                        : "text-ink/40 hover:text-ink/70"
                    )}
                  >
                    {opcion}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Signature: espina de secciones en vivo */}
          <div id="secciones" className="animate-fade-up rounded-xl2 border border-ink/5 bg-white p-6 shadow-panel [animation-delay:120ms]">
            <p className="mb-4 font-mono text-[11px] uppercase tracking-wide text-ink/40">
              Estructura oficial · 10 secciones
            </p>
            <SeccionSpine institucion={institucion} aprobadas={[1, 2, 3]} activa={4} />
            <p className="mt-4 border-t border-ink/5 pt-4 text-xs text-ink/40">
              🔒 Secciones VII y IX: protegidas — ARIA solo reporta
              inconsistencias, nunca las reescribe.
            </p>
          </div>
        </section>

        {/* Cómo funciona */}
        <section id="como-funciona" className="grid gap-6 border-t border-ink/5 py-16 sm:grid-cols-3">
          {[
            {
              paso: "01",
              titulo: "Intake",
              texto: "Institución, nivel, período y los documentos de la asignatura: sintético, sílabo anterior y matriz de competencias.",
            },
            {
              paso: "02",
              titulo: "Diagnóstico",
              texto: "El agente cruza cada sección contra el catálogo institucional y presenta hallazgos — nunca corrige en silencio.",
            },
            {
              paso: "03",
              titulo: "Aprobación",
              texto: "Tú decides sección por sección. Lo aprobado se vuelve base curricular para todo lo que sigue.",
            },
          ].map((item) => (
            <div key={item.paso}>
              <p className="font-mono text-xs text-ink/30">{item.paso}</p>
              <h3 className="mt-1 font-display text-lg font-semibold text-ink">{item.titulo}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-ink/55">{item.texto}</p>
            </div>
          ))}
        </section>

        <footer className="mt-auto border-t border-ink/5 py-6 text-xs text-ink/30">
          ARIA · Ecosistema de Aprendizaje UNITEC-CEUTEC · JRMH 2026
        </footer>
      </div>
    </main>
  );
}
