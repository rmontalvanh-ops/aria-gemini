import { NextRequest, NextResponse } from "next/server";
import { Packer } from "docx";
import { generarDocxDesdeTexto } from "@/lib/docx/generarDocx";
import type { Institucion } from "@/types";

export const runtime = "nodejs";
export const maxDuration = 30;

interface CuerpoPeticion {
  texto: string;
  titulo?: string;
  subtitulo?: string;
  institucion?: Institucion;
}

export async function POST(req: NextRequest) {
  let cuerpo: CuerpoPeticion;
  try {
    cuerpo = await req.json();
  } catch {
    return NextResponse.json({ error: "Cuerpo JSON inválido." }, { status: 400 });
  }

  if (!cuerpo.texto || !cuerpo.texto.trim()) {
    return NextResponse.json({ error: "No hay texto para exportar." }, { status: 400 });
  }

  try {
    const documento = generarDocxDesdeTexto(cuerpo.texto, {
      titulo: cuerpo.titulo || "SÍLABO",
      institucion: cuerpo.institucion || "CEUTEC",
      subtitulo: cuerpo.subtitulo,
    });
    const buffer = await Packer.toBuffer(documento);

    return new NextResponse(buffer, {
      headers: {
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "Content-Disposition": `attachment; filename="${(cuerpo.titulo || "silabo")
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")}.docx"`,
      },
    });
  } catch (error) {
    const mensaje =
      error instanceof Error ? error.message : "Error desconocido al generar el .docx.";
    return NextResponse.json({ error: mensaje }, { status: 500 });
  }
}
