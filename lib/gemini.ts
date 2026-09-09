import { GoogleGenAI } from "@google/genai";
import type { Mensaje } from "@/types";

// Un solo punto de entrada al SDK de Gemini. Si Google cambia el nombre
// del modelo, se actualiza aquí o en la variable de entorno GEMINI_MODEL
// — nunca hay que tocar los agentes ni los componentes.
const apiKey = process.env.GEMINI_API_KEY;
export const MODELO_GEMINI = process.env.GEMINI_MODEL || "gemini-2.5-pro";

let cliente: GoogleGenAI | null = null;

function obtenerCliente(): GoogleGenAI {
  if (!apiKey) {
    throw new Error(
      "Falta GEMINI_API_KEY. Configúrala en .env.local (desarrollo) o en las Environment Variables de Vercel (producción)."
    );
  }
  if (!cliente) {
    cliente = new GoogleGenAI({ apiKey });
  }
  return cliente;
}

function aContenidosGemini(historial: Mensaje[]) {
  return historial.map((m) => ({
    role: m.rol === "user" ? "user" : "model",
    parts: [{ text: m.texto }],
  }));
}

/**
 * Llama a Gemini en modo streaming y devuelve un ReadableStream de texto
 * plano (UTF-8), listo para responder directamente desde una Route Handler
 * de Next.js con streaming al cliente.
 */
export function transmitirRespuestaAgente(
  systemInstruction: string,
  historial: Mensaje[]
): ReadableStream<Uint8Array> {
  const ai = obtenerCliente();
  const encoder = new TextEncoder();

  return new ReadableStream({
    async start(controller) {
      try {
        const flujo = await ai.models.generateContentStream({
          model: MODELO_GEMINI,
          contents: aContenidosGemini(historial),
          config: { systemInstruction },
        });
        for await (const trozo of flujo) {
          const texto = trozo.text;
          if (texto) controller.enqueue(encoder.encode(texto));
        }
        controller.close();
      } catch (error) {
        const mensaje =
          error instanceof Error ? error.message : "Error desconocido de Gemini.";
        controller.enqueue(
          encoder.encode(`\n\n⚠️ Error al contactar a Gemini: ${mensaje}`)
        );
        controller.close();
      }
    },
  });
}
