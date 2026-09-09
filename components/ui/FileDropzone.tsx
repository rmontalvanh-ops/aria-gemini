"use client";

import { useCallback, useRef, useState } from "react";
import clsx from "clsx";

interface FileDropzoneProps {
  etiqueta: string;
  descripcion: string;
  obligatorio?: boolean;
  onExtraido: (nombre: string, texto: string) => void;
  onQuitar: () => void;
  archivoActual?: string | null;
}

type Estado = "vacio" | "cargando" | "listo" | "error";

export function FileDropzone({
  etiqueta,
  descripcion,
  obligatorio,
  onExtraido,
  onQuitar,
  archivoActual,
}: FileDropzoneProps) {
  const [estado, setEstado] = useState<Estado>(archivoActual ? "listo" : "vacio");
  const [error, setError] = useState<string | null>(null);
  const [sobreArea, setSobreArea] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const procesar = useCallback(
    async (archivo: File) => {
      setEstado("cargando");
      setError(null);
      try {
        const datos = new FormData();
        datos.append("file", archivo);
        const res = await fetch("/api/extraer-texto", { method: "POST", body: datos });
        const json = await res.json();
        if (!res.ok) throw new Error(json.error || "No se pudo leer el archivo.");
        onExtraido(json.nombre, json.texto);
        setEstado("listo");
      } catch (e) {
        setError(e instanceof Error ? e.message : "Error inesperado.");
        setEstado("error");
      }
    },
    [onExtraido]
  );

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setSobreArea(true);
      }}
      onDragLeave={() => setSobreArea(false)}
      onDrop={(e) => {
        e.preventDefault();
        setSobreArea(false);
        const archivo = e.dataTransfer.files?.[0];
        if (archivo) procesar(archivo);
      }}
      className={clsx(
        "rounded-xl2 border-2 p-4 transition-colors",
        estado === "listo"
          ? "border-solid border-estado-inferido/40 bg-estado-inferido/5"
          : estado === "error"
          ? "border-solid border-estado-pendiente/40 bg-estado-pendiente/5"
          : sobreArea
          ? "border-dashed border-spectrum-violet bg-spectrum-violet/5"
          : "border-dashed border-ink/15"
      )}
    >
      <input
        ref={inputRef}
        type="file"
        className="hidden"
        accept=".docx,.pdf,.xlsx,.xls,.txt,.md,.csv"
        onChange={(e) => {
          const archivo = e.target.files?.[0];
          if (archivo) procesar(archivo);
        }}
      />
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-ink">
            {etiqueta}
            {obligatorio && <span className="text-ceutec"> *</span>}
          </p>
          <p className="text-xs text-ink/50">{descripcion}</p>
        </div>
        {estado === "listo" ? (
          <button
            onClick={() => {
              onQuitar();
              setEstado("vacio");
              if (inputRef.current) inputRef.current.value = "";
            }}
            className="text-xs text-ink/40 hover:text-estado-pendiente"
          >
            Quitar
          </button>
        ) : (
          <button
            onClick={() => inputRef.current?.click()}
            className="text-xs font-medium text-spectrum-violet hover:underline"
          >
            {estado === "cargando" ? "Leyendo…" : "Elegir archivo"}
          </button>
        )}
      </div>
      {estado === "listo" && archivoActual && (
        <p className="mt-2 truncate text-xs text-ink/60">📄 {archivoActual}</p>
      )}
      {estado === "cargando" && (
        <p className="mt-2 text-xs text-ink/50">Extrayendo texto…</p>
      )}
      {estado === "error" && <p className="mt-2 text-xs text-estado-pendiente">{error}</p>}
      {estado === "vacio" && (
        <p className="mt-2 text-xs text-ink/30">Arrastra el archivo aquí o elige uno.</p>
      )}
    </div>
  );
}
