import {
  Document,
  Paragraph,
  TextRun,
  HeadingLevel,
  Table,
  TableRow,
  TableCell,
  WidthType,
  BorderStyle,
  AlignmentType,
  ShadingType,
} from "docx";
import type { Institucion } from "@/types";

// ─────────────────────────────────────────────────────────────────────────
// v1: convierte el texto que redactó el agente (markdown ligero: ##, ###,
// tablas con "|", listas, **negritas**, > citas) en un .docx navegable y
// bien estructurado. NO es todavía la plantilla oficial CEUTEC byte a
// byte — eso es la v2 (rellenar Formato_de_sílabo...docx directamente).
// Para una demo con docentes, esto ya es un documento que se puede abrir,
// editar y entregar.
// ─────────────────────────────────────────────────────────────────────────

const COLOR_UNITEC = "1B4F8A";
const COLOR_CEUTEC = "C8102E";

function colorInstitucion(institucion: Institucion) {
  return institucion === "UNITEC" ? COLOR_UNITEC : COLOR_CEUTEC;
}

function runsConNegrita(texto: string, size?: number): TextRun[] {
  const partes = texto.split("**");
  return partes.map(
    (parte, i) =>
      new TextRun({
        text: parte,
        bold: i % 2 === 1,
        ...(size ? { size } : {}),
      })
  );
}

function esLineaDeTabla(linea: string) {
  return linea.trim().startsWith("|") && linea.trim().endsWith("|");
}

function esSeparadorDeTabla(linea: string) {
  return /^\|?[\s:|-]+\|?$/.test(linea.trim());
}

function celdasDeLinea(linea: string): string[] {
  return linea
    .trim()
    .replace(/^\|/, "")
    .replace(/\|$/, "")
    .split("|")
    .map((c) => c.trim());
}

function construirTabla(lineas: string[], colorAcento: string): Table {
  const encabezado = celdasDeLinea(lineas[0]);
  const filas = lineas.slice(2).map((l) => celdasDeLinea(l));

  const filaEncabezado = new TableRow({
    tableHeader: true,
    children: encabezado.map(
      (texto) =>
        new TableCell({
          shading: { type: ShadingType.SOLID, color: colorAcento, fill: colorAcento },
          children: [
            new Paragraph({
              children: [new TextRun({ text: texto, bold: true, color: "FFFFFF", size: 18 })],
            }),
          ],
        })
    ),
  });

  const filasDatos = filas
    .filter((f) => f.length > 0 && f.some((c) => c.length > 0))
    .map(
      (fila) =>
        new TableRow({
          children: (encabezado.length ? encabezado : fila).map((_, idx) => {
            const contenido = fila[idx] ?? "";
            return new TableCell({
              children: [new Paragraph({ children: runsConNegrita(contenido, 18) })],
            });
          }),
        })
    );

  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: [filaEncabezado, ...filasDatos],
  });
}

export function generarDocxDesdeTexto(
  texto: string,
  opciones: { titulo: string; institucion: Institucion; subtitulo?: string }
): Document {
  const colorAcento = colorInstitucion(opciones.institucion);
  const lineas = texto.replace(/\r\n/g, "\n").split("\n");
  const hijos: (Paragraph | Table)[] = [];

  hijos.push(
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 100 },
      children: [
        new TextRun({ text: opciones.institucion, bold: true, color: colorAcento, size: 22 }),
      ],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      heading: HeadingLevel.TITLE,
      spacing: { after: 200 },
      children: [new TextRun({ text: opciones.titulo })],
    })
  );
  if (opciones.subtitulo) {
    hijos.push(
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 300 },
        children: [new TextRun({ text: opciones.subtitulo, italics: true, color: "666666" })],
      })
    );
  }

  let i = 0;
  while (i < lineas.length) {
    const linea = lineas[i];
    const limpia = linea.trim();

    if (!limpia) {
      i++;
      continue;
    }

    // Tabla
    if (esLineaDeTabla(linea) && lineas[i + 1] && esSeparadorDeTabla(lineas[i + 1])) {
      const bloque: string[] = [linea, lineas[i + 1]];
      let j = i + 2;
      while (j < lineas.length && esLineaDeTabla(lineas[j])) {
        bloque.push(lineas[j]);
        j++;
      }
      hijos.push(construirTabla(bloque, colorAcento));
      hijos.push(new Paragraph({ text: "", spacing: { after: 150 } }));
      i = j;
      continue;
    }

    // Encabezados
    if (limpia.startsWith("### ")) {
      hijos.push(
        new Paragraph({
          heading: HeadingLevel.HEADING_3,
          spacing: { before: 200, after: 100 },
          children: [new TextRun({ text: limpia.replace(/^###\s+/, ""), color: colorAcento })],
        })
      );
      i++;
      continue;
    }
    if (limpia.startsWith("## ")) {
      hijos.push(
        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 280, after: 120 },
          children: [new TextRun({ text: limpia.replace(/^##\s+/, ""), color: colorAcento })],
          border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: colorAcento } },
        })
      );
      i++;
      continue;
    }

    // Regla horizontal
    if (/^-{3,}$/.test(limpia)) {
      hijos.push(
        new Paragraph({
          border: { bottom: { style: BorderStyle.SINGLE, size: 2, color: "CCCCCC" } },
          spacing: { after: 200 },
        })
      );
      i++;
      continue;
    }

    // Cita
    if (limpia.startsWith("> ")) {
      hijos.push(
        new Paragraph({
          indent: { left: 400 },
          spacing: { after: 100 },
          children: [new TextRun({ text: limpia.replace(/^>\s?/, ""), italics: true, color: "666666" })],
        })
      );
      i++;
      continue;
    }

    // Lista con viñeta
    if (/^[-•]\s+/.test(limpia)) {
      hijos.push(
        new Paragraph({
          bullet: { level: 0 },
          spacing: { after: 60 },
          children: runsConNegrita(limpia.replace(/^[-•]\s+/, "")),
        })
      );
      i++;
      continue;
    }

    // Lista numerada
    if (/^\d+[.)]\s+/.test(limpia)) {
      hijos.push(
        new Paragraph({
          numbering: { reference: "lista-numerada", level: 0 },
          spacing: { after: 60 },
          children: runsConNegrita(limpia.replace(/^\d+[.)]\s+/, "")),
        })
      );
      i++;
      continue;
    }

    // Párrafo normal
    hijos.push(
      new Paragraph({
        spacing: { after: 120 },
        children: runsConNegrita(limpia),
      })
    );
    i++;
  }

  return new Document({
    numbering: {
      config: [
        {
          reference: "lista-numerada",
          levels: [{ level: 0, format: "decimal", text: "%1.", alignment: AlignmentType.START }],
        },
      ],
    },
    sections: [{ children: hijos }],
  });
}
