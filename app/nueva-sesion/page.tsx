"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import clsx from "clsx";
import { Boton } from "@/components/ui/Button";
import { StepIndicator } from "@/components/ui/StepIndicator";
import { FileDropzone } from "@/components/ui/FileDropzone";
import type { DocumentoAdjunto, InfoGeneral, Institucion, Nivel, Periodo, SesionARIA } from "@/types";

const TOTAL_PASOS = 6;

const INFO_INICIAL: InfoGeneral = {
  institucion: "CEUTEC",
  nivel: "Técnico Universitario",
  periodo: "Q1",
  anio: new Date().getFullYear().toString(),
  nombreAsignatura: "",
  codigo: "",
  docente: "",
  seccion: "",
  campus: "TGU-SPS",
};

export default function NuevaSesionPage() {
  const router = useRouter();
  const [paso, setPaso] = useState(1);
  const [info, setInfo] = useState<InfoGeneral>(INFO_INICIAL);
  const [documentos, setDocumentos] = useState<DocumentoAdjunto[]>([]);

  const acento = info.institucion === "UNITEC" ? "unitec" : "ceutec";
  const acentoTexto = info.institucion === "UNITEC" ? "text-unitec" : "text-ceutec";

  function setDoc(tipo: DocumentoAdjunto["tipo"], nombre: string, texto: string) {
    setDocumentos((prev) => [...prev.filter((d) => d.tipo !== tipo), { tipo, nombre, texto }]);
  }
  function quitarDoc(tipo: DocumentoAdjunto["tipo"]) {
    setDocumentos((prev) => prev.filter((d) => d.tipo !== tipo));
  }
  const tieneSintetico = documentos.some((d) => d.tipo === "sintetico");

  function siguiente() {
    if (paso < TOTAL_PASOS) setPaso(paso + 1);
  }
  function anterior() {
    if (paso > 1) setPaso(paso - 1);
  }

  function comenzar() {
    const sesion: SesionARIA = { info, documentos };
    sessionStorage.setItem("aria-sesion", JSON.stringify(sesion));
    router.push("/taller");
  }

  const puedeAvanzar =
    (paso === 4 && info.nombreAsignatura.trim().length > 0) ||
    (paso === 5 && tieneSintetico) ||
    (paso !== 4 && paso !== 5);

  return (
    <main className="mx-auto flex min-h-screen max-w-2xl flex-col px-6 py-10">
      <div className="mb-8 flex items-center justify-between">
        <span className="font-display text-sm font-semibold">ARIA · Nueva sesión</span>
        <StepIndicator total={TOTAL_PASOS} actual={paso} />
      </div>

      <div className="flex-1 animate-fade-up" key={paso}>
        {paso === 1 && (
          <PasoInstitucion
            valor={info.institucion}
            onCambiar={(v) => setInfo({ ...info, institucion: v })}
          />
        )}
        {paso === 2 && (
          <PasoNivel valor={info.nivel} onCambiar={(v) => setInfo({ ...info, nivel: v })} />
        )}
        {paso === 3 && (
          <PasoPeriodo
            periodo={info.periodo}
            anio={info.anio}
            onCambiarPeriodo={(v) => setInfo({ ...info, periodo: v })}
            onCambiarAnio={(v) => setInfo({ ...info, anio: v })}
          />
        )}
        {paso === 4 && <PasoInfoGeneral info={info} onCambiar={setInfo} />}
        {paso === 5 && (
          <PasoDocumentos documentos={documentos} onExtraido={setDoc} onQuitar={quitarDoc} />
        )}
        {paso === 6 && <PasoConfirmacion info={info} documentos={documentos} />}
      </div>

      <div className="mt-10 flex items-center justify-between border-t border-ink/5 pt-6">
        <Boton variante="fantasma" onClick={anterior} disabled={paso === 1}>
          Atrás
        </Boton>
        {paso < TOTAL_PASOS ? (
          <Boton acento={acento} onClick={siguiente} disabled={!puedeAvanzar}>
            Continuar
          </Boton>
        ) : (
          <Boton acento={acento} onClick={comenzar}>
            Iniciar revisión →
          </Boton>
        )}
      </div>
    </main>
  );
}

// ── Pasos ──────────────────────────────────────────────────────────────

function TarjetaOpcion({
  seleccionado,
  onClick,
  children,
  acento,
}: {
  seleccionado: boolean;
  onClick: () => void;
  children: React.ReactNode;
  acento: "unitec" | "ceutec";
}) {
  return (
    <button
      onClick={onClick}
      className={clsx(
        "w-full rounded-xl2 border px-4 py-3.5 text-left text-sm transition-all",
        seleccionado
          ? acento === "unitec"
            ? "border-unitec bg-unitec-soft text-unitec"
            : "border-ceutec bg-ceutec-soft text-ceutec"
          : "border-ink/10 bg-white text-ink/70 hover:border-ink/20"
      )}
    >
      {children}
    </button>
  );
}

function Encabezado({ titulo, ayuda }: { titulo: string; ayuda: string }) {
  return (
    <div className="mb-6">
      <h1 className="font-display text-2xl font-semibold text-ink">{titulo}</h1>
      <p className="mt-1 text-sm text-ink/50">{ayuda}</p>
    </div>
  );
}

function PasoInstitucion({
  valor,
  onCambiar,
}: {
  valor: Institucion;
  onCambiar: (v: Institucion) => void;
}) {
  return (
    <div>
      <Encabezado titulo="¿UNITEC o CEUTEC?" ayuda="Define el color institucional y las plantillas que se usarán." />
      <div className="grid grid-cols-2 gap-3">
        <TarjetaOpcion seleccionado={valor === "CEUTEC"} onClick={() => onCambiar("CEUTEC")} acento="ceutec">
          <span className="font-medium">CEUTEC</span>
          <p className="mt-0.5 text-xs opacity-70">Rojo institucional</p>
        </TarjetaOpcion>
        <TarjetaOpcion seleccionado={valor === "UNITEC"} onClick={() => onCambiar("UNITEC")} acento="unitec">
          <span className="font-medium">UNITEC</span>
          <p className="mt-0.5 text-xs opacity-70">Azul institucional</p>
        </TarjetaOpcion>
      </div>
    </div>
  );
}

function PasoNivel({ valor, onCambiar }: { valor: Nivel; onCambiar: (v: Nivel) => void }) {
  const niveles: Nivel[] = ["Técnico Universitario", "Grado", "Posgrado"];
  return (
    <div>
      <Encabezado titulo="Nivel académico" ayuda="¿A qué nivel pertenece esta asignatura?" />
      <div className="space-y-2">
        {niveles.map((n) => (
          <TarjetaOpcion key={n} seleccionado={valor === n} onClick={() => onCambiar(n)} acento="ceutec">
            {n}
          </TarjetaOpcion>
        ))}
      </div>
    </div>
  );
}

function PasoPeriodo({
  periodo,
  anio,
  onCambiarPeriodo,
  onCambiarAnio,
}: {
  periodo: Periodo;
  anio: string;
  onCambiarPeriodo: (v: Periodo) => void;
  onCambiarAnio: (v: string) => void;
}) {
  return (
    <div>
      <Encabezado titulo="Período académico" ayuda="Trimestre/cuatrimestre y año." />
      <div className="mb-4 grid grid-cols-4 gap-2">
        {(["Q1", "Q2", "Q3", "Q4"] as Periodo[]).map((q) => (
          <button
            key={q}
            onClick={() => onCambiarPeriodo(q)}
            className={clsx(
              "rounded-xl2 border py-3 font-mono text-sm transition-colors",
              periodo === q ? "border-ink bg-ink text-white" : "border-ink/10 bg-white text-ink/60"
            )}
          >
            {q}
          </button>
        ))}
      </div>
      <label className="block text-xs font-medium text-ink/50">Año</label>
      <input
        value={anio}
        onChange={(e) => onCambiarAnio(e.target.value)}
        className="mt-1 w-32 rounded-xl2 border border-ink/10 bg-white px-3 py-2 text-sm outline-none focus:border-spectrum-violet/50"
      />
    </div>
  );
}

function CampoTexto({
  etiqueta,
  valor,
  onCambiar,
  placeholder,
  obligatorio,
}: {
  etiqueta: string;
  valor: string;
  onCambiar: (v: string) => void;
  placeholder?: string;
  obligatorio?: boolean;
}) {
  return (
    <div>
      <label className="block text-xs font-medium text-ink/50">
        {etiqueta}
        {obligatorio && <span className="text-ceutec"> *</span>}
      </label>
      <input
        value={valor}
        onChange={(e) => onCambiar(e.target.value)}
        placeholder={placeholder}
        className="mt-1 w-full rounded-xl2 border border-ink/10 bg-white px-3 py-2 text-sm outline-none placeholder:text-ink/25 focus:border-spectrum-violet/50"
      />
    </div>
  );
}

function PasoInfoGeneral({
  info,
  onCambiar,
}: {
  info: InfoGeneral;
  onCambiar: (i: InfoGeneral) => void;
}) {
  return (
    <div>
      <Encabezado titulo="Información general" ayuda="Lo que no venga en el sintético, lo completas aquí." />
      <div className="space-y-4">
        <CampoTexto
          etiqueta="Nombre de la asignatura"
          valor={info.nombreAsignatura}
          onCambiar={(v) => onCambiar({ ...info, nombreAsignatura: v })}
          placeholder="Elaboración de Presupuestos"
          obligatorio
        />
        <div className="grid grid-cols-2 gap-4">
          <CampoTexto
            etiqueta="Código"
            valor={info.codigo}
            onCambiar={(v) => onCambiar({ ...info, codigo: v })}
            placeholder="IR55419"
          />
          <CampoTexto
            etiqueta="Campus"
            valor={info.campus}
            onCambiar={(v) => onCambiar({ ...info, campus: v })}
            placeholder="TGU-SPS"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <CampoTexto
            etiqueta="Docente"
            valor={info.docente}
            onCambiar={(v) => onCambiar({ ...info, docente: v })}
          />
          <CampoTexto
            etiqueta="Sección"
            valor={info.seccion}
            onCambiar={(v) => onCambiar({ ...info, seccion: v })}
          />
        </div>
      </div>
    </div>
  );
}

function PasoDocumentos({
  documentos,
  onExtraido,
  onQuitar,
}: {
  documentos: DocumentoAdjunto[];
  onExtraido: (tipo: DocumentoAdjunto["tipo"], nombre: string, texto: string) => void;
  onQuitar: (tipo: DocumentoAdjunto["tipo"]) => void;
}) {
  const buscar = (tipo: DocumentoAdjunto["tipo"]) => documentos.find((d) => d.tipo === tipo)?.nombre ?? null;
  return (
    <div>
      <Encabezado titulo="Carga de documentos" ayuda="El sintético es obligatorio; el resto mejora la precisión del diagnóstico." />
      <div className="space-y-3">
        <FileDropzone
          etiqueta="Sintético de la asignatura"
          descripcion="Fuente de la Sección II y la bibliografía principal."
          obligatorio
          archivoActual={buscar("sintetico")}
          onExtraido={(n, t) => onExtraido("sintetico", n, t)}
          onQuitar={() => onQuitar("sintetico")}
        />
        <FileDropzone
          etiqueta="Sílabo anterior"
          descripcion="Opcional — activa el modo Mejora en lugar de Construcción desde cero."
          archivoActual={buscar("silabo_anterior")}
          onExtraido={(n, t) => onExtraido("silabo_anterior", n, t)}
          onQuitar={() => onQuitar("silabo_anterior")}
        />
        <FileDropzone
          etiqueta="Matriz de competencias"
          descripcion="Opcional — subcompetencias y niveles B/I/A de la carrera."
          archivoActual={buscar("matriz")}
          onExtraido={(n, t) => onExtraido("matriz", n, t)}
          onQuitar={() => onQuitar("matriz")}
        />
      </div>
    </div>
  );
}

function PasoConfirmacion({ info, documentos }: { info: InfoGeneral; documentos: DocumentoAdjunto[] }) {
  return (
    <div>
      <Encabezado titulo="Confirmar y comenzar" ayuda="Revisa el resumen antes de iniciar la revisión con el Agente 1." />
      <div className="space-y-3 rounded-xl2 border border-ink/10 bg-white p-5 text-sm shadow-panel">
        <Fila etiqueta="Institución" valor={info.institucion} />
        <Fila etiqueta="Nivel" valor={info.nivel} />
        <Fila etiqueta="Período" valor={`${info.periodo}-${info.anio}`} />
        <Fila etiqueta="Asignatura" valor={info.nombreAsignatura || "—"} />
        <Fila etiqueta="Código" valor={info.codigo || "—"} />
        <Fila
          etiqueta="Documentos"
          valor={documentos.length ? documentos.map((d) => d.nombre).join(", ") : "Ninguno"}
        />
        <Fila
          etiqueta="Modo"
          valor={documentos.some((d) => d.tipo === "silabo_anterior") ? "Mejora de sílabo existente" : "Construcción desde cero"}
        />
      </div>
    </div>
  );
}

function Fila({ etiqueta, valor }: { etiqueta: string; valor: string }) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-ink/5 pb-2.5 last:border-0 last:pb-0">
      <span className="text-ink/40">{etiqueta}</span>
      <span className="text-right font-medium text-ink">{valor}</span>
    </div>
  );
}
