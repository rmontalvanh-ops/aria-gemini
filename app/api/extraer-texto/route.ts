import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const maxDuration = 60;

async function extraerDeDocx(buffer: Buffer): Promise<string> {
  const mammoth = (await import("mammoth")).default;
  const resultado = await mammoth.extractRawText({ buffer });
  return resultado.value;
}

async function extraerDePdf(buffer: Buffer): Promise<string> {
  const pdfParse = (await import("pdf-parse")).default;
  const resultado = await pdfParse(buffer);
  return resultado.text;
}

async function extraerDeHojaCalculo(buffer: Buffer): Promise<string> {
  const XLSX = await import("xlsx");
  const libro = XLSX.read(buffer, { type: "buffer" });
  return libro.SheetNames.map((nombre) => {
    const hoja = libro.Sheets[nombre];
    const csv = XLSX.utils.sheet_to_csv(hoja);
    return `--- Hoja: ${nombre} ---\n${csv}`;
  }).join("\n\n");
}

export async function POST(req: NextRequest) {
  const datosFormulario = await req.formData();
  const archivo = datosFormulario.get("file");

  if (!(archivo instanceof File)) {
    return NextResponse.json(
      { error: "No se recibió ningún archivo." },
      { status: 400 }
    );
  }

  const nombre = archivo.name.toLowerCase();
  const buffer = Buffer.from(await archivo.arrayBuffer());

  try {
    let texto = "";
    if (nombre.endsWith(".docx")) {
      texto = await extraerDeDocx(buffer);
    } else if (nombre.endsWith(".pdf")) {
      texto = await extraerDePdf(buffer);
    } else if (nombre.endsWith(".xlsx") || nombre.endsWith(".xls")) {
      texto = await extraerDeHojaCalculo(buffer);
    } else if (
      nombre.endsWith(".txt") ||
      nombre.endsWith(".md") ||
      nombre.endsWith(".csv")
    ) {
      texto = buffer.toString("utf-8");
    } else {
      return NextResponse.json(
        {
          error:
            "Formato no soportado. Usa .docx, .pdf, .xlsx, .xls, .txt, .md o .csv.",
        },
        { status: 415 }
      );
    }

    if (!texto.trim()) {
      return NextResponse.json(
        { error: "El archivo se leyó pero no contiene texto extraíble." },
        { status: 422 }
      );
    }

    return NextResponse.json({ nombre: archivo.name, texto });
  } catch (error) {
    const mensaje =
      error instanceof Error ? error.message : "Error desconocido al leer el archivo.";
    return NextResponse.json({ error: mensaje }, { status: 500 });
  }
}
