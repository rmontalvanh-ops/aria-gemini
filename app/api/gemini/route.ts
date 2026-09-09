import { NextRequest } from "next/server";
import { transmitirRespuestaAgente } from "@/lib/gemini";
import type { Mensaje } from "@/types";

export const runtime = "nodejs";
export const maxDuration = 60;

interface CuerpoPeticion {
  systemInstruction: string;
  historial: Mensaje[];
}

export async function POST(req: NextRequest) {
  let cuerpo: CuerpoPeticion;
  try {
    cuerpo = await req.json();
  } catch {
    return new Response("Cuerpo JSON inválido.", { status: 400 });
  }

  const { systemInstruction, historial } = cuerpo;

  if (!systemInstruction || !Array.isArray(historial) || historial.length === 0) {
    return new Response(
      "Faltan systemInstruction o historial en la petición.",
      { status: 400 }
    );
  }

  try {
    const stream = transmitirRespuestaAgente(systemInstruction, historial);
    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache",
      },
    });
  } catch (error) {
    const mensaje =
      error instanceof Error ? error.message : "Error desconocido de Gemini.";
    return new Response(mensaje, { status: 500 });
  }
}
