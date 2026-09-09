# ARIA · edición Gemini

Copiloto de sílabos del Ecosistema de Aprendizaje UNITEC-CEUTEC, construido
sobre **Next.js 14 (App Router) + TypeScript + Tailwind** y la **API de
Gemini** (`@google/genai`). Es la contraparte de la versión Claude/Anthropic
del mismo sistema — mismo conocimiento institucional, backend distinto.

Repo nuevo, proyecto Vercel nuevo, sin dependencias del código anterior.

## Qué incluye esta versión

- **Landing** (`/`) con el toggle UNITEC/CEUTEC y la "espina de secciones"
  (I–X) como elemento visual central.
- **Asistente de nueva sesión** (`/nueva-sesion`): wizard de 6 pasos
  (institución, nivel, período, información general, carga de documentos,
  confirmación).
- **Taller** (`/taller`): vista dividida — progreso del sílabo y pipeline
  de agentes a la izquierda, chat en streaming a la derecha.
- **Agente 1 — Revisor de Sílabo**: diagnostica y propone el sílabo
  completo (`lib/prompts/agente1.ts`).
- **Agente 2 — Validador de Coherencia** (`lib/prompts/agente2.ts`): una
  vez el usuario aprueba el sílabo del Agente 1, el botón **"Sílabo
  aprobado — enviar a Agente 2 →"** en el panel lateral cambia de rol
  dentro del MISMO hilo de conversación (mismo `historial`, nuevo
  `systemInstruction`) e inyecta un turno de transición. Gemini ve todo lo
  que el Agente 1 ya propuso porque el historial completo viaja en cada
  llamada — no hace falta repetir el sílabo. El Agente 2 audita 4 cruces
  (subcompetencias vs. matriz, metodología↔nivel↔instrumento literal del
  catálogo, verbos de Bloom por nivel, ponderación = 100%) y devuelve un
  veredicto: **APROBADO PARA AGENTE 3** o **DEVUELTO A AGENTE 1**.
- **Agente 3 — Constructor del Planner** (`lib/prompts/agente3.ts`): una vez
  el Agente 2 da "APROBADO PARA AGENTE 3", el botón **"Validación aprobada
  — enviar a Agente 3 →"** hace el mismo tipo de hand-off. Traduce el
  sílabo ya validado (Secciones V y VIII) a **un único Planner de 10
  semanas** (confirmado contigo: no son 2 planners por parcial) en el
  formato del marco CGS (Common Ground Collaborative): Identidad del
  Curso, Pregunta Atractiva, Gran Idea, El Porqué, Metas 3Cs+L2L,
  Preguntas Marco, Evidencia GRASPS, Secuencias (Constructivista/DIP/CAR
  según el tipo de meta) y Reflexión. El conocimiento CGS (Comunalidades
  Humanas, Principios de Aprendizaje, Retrato del Egresado, reglas de
  redacción por sección) está en `lib/knowledge/ecosistemaCGS.ts`,
  extraído de `cgsknowledge/unitecplanner`. El Toolkit
  (`cgsknowledge/toolkit`, rediseño de actividades) es un SPA que carga
  contenido bajo demanda — no se pudo extraer por fetch estático; si
  consigues el `raw_knowledge_base.json` que menciona esa página, se puede
  sumar como quinta fuente de conocimiento.
- **Exportar a Word (v1)** (`/api/exportar-docx` + `lib/docx/generarDocx.ts`):
  cualquier respuesta larga del agente (el sílabo propuesto, el reporte de
  validación) se puede descargar como `.docx` con el botón que aparece en
  cada mensaje. Convierte el markdown ligero del agente (`##`, tablas con
  `|`, listas, **negritas**) en un documento navegable y editable, con el
  color institucional en encabezados y tablas — **todavía no es la
  plantilla oficial CEUTEC byte a byte** (ver "Sobre el docx" abajo).
- **Conocimiento institucional embebido** en `lib/knowledge/`: las
  Secciones VII y IX protegidas, el catálogo de competencias transversales,
  el catálogo de metodologías por nivel B/I/A y los ejemplos de redacción.
  Esta carpeta es la única fuente de verdad — si la universidad actualiza
  un documento oficial, se actualiza aquí, nunca en los prompts.
- **Extracción de texto** (`/api/extraer-texto`) para `.docx`, `.pdf`,
  `.xlsx/.xls`, `.txt/.md/.csv` — así el sintético, el sílabo anterior y la
  matriz llegan al modelo como texto plano.
- **Streaming de Gemini** (`/api/gemini`) con `generateContentStream`.

## Sobre el docx: v1 vs. v2

**v1 (esta versión, lista para demo):** un `.docx` estructuralmente
correcto — títulos, tablas, texto protegido íntegro, color institucional —
generado desde cero con la librería `docx`. Un docente puede abrirlo,
editarlo y entregarlo. No tiene el membrete/márgenes/estilos exactos de
`Formato_de_sílabo_por_competencias_CEUTEC_año_2025.docx`.

**v2 (siguiente iteración, cuando el flujo ya esté validado con docentes
reales):** en vez de construir el documento desde cero, rellenar la
plantilla oficial existente — abrir el `.docx` real como plantilla (con
`docxtemplater` o manipulando el XML directamente) e inyectar el contenido
del agente en sus tablas y estilos ya definidos, para que el resultado sea
visualmente idéntico al que la universidad espera. Vale la pena hacerlo
recién cuando el contenido (no el formato) ya esté probado.

## Diferencia de arquitectura frente a la versión Claude

La versión Claude usa el "Knowledge" de un Proyecto de claude.ai: archivos
que el modelo consulta bajo demanda. Gemini (vía API pura, sin un
equivalente directo a Projects) no tiene ese mecanismo persistente, así que
aquí el conocimiento institucional se **inserta directamente en cada
`systemInstruction`** (ver `lib/prompts/agente1.ts`). Es más verboso por
llamada, pero más confiable: el modelo nunca "olvida" abrir un archivo.

Los documentos específicos de cada sílabo (sintético, sílabo anterior,
matriz) sí son por sesión: se extraen a texto en el navegador → API route →
y viajan como parte del primer mensaje de la conversación.

## Puesta en marcha

```bash
npm install
cp .env.example .env.local
# Pega tu GEMINI_API_KEY (https://aistudio.google.com/apikey) en .env.local
npm run dev
```

Abre `http://localhost:3000`.

## Despliegue en Vercel

1. Sube este repo a GitHub (repo nuevo, como lo pediste).
2. En Vercel → New Project → importa el repo.
3. En Environment Variables agrega `GEMINI_API_KEY` (y opcionalmente
   `GEMINI_MODEL`).
4. Deploy. No requiere base de datos para esta primera versión — la sesión
   vive en `sessionStorage` del navegador mientras se prueba con docentes.

## Lo que falta (siguiente iteración, cuando quieras escalar)

| Prioridad | Elemento | Nota |
|---|---|---|
| 1 | Toolkit CGS de rediseño de actividades | Necesita el JSON crudo de `cgsknowledge/toolkit` — no se pudo extraer por fetch estático |
| 2 | Docx v2 — rellenar la plantilla oficial byte a byte | Ver sección "Sobre el docx" arriba; ahora aplica tanto al sílabo como al Planner |
| 3 | Persistencia (Postgres/Neon) + auth por código de invitación | Para no depender de `sessionStorage` y permitir retomar sesiones |
| 4 | Historial de sílabos/planners por docente/coordinador | Requiere lo anterior |

## Notas sobre el modelo de Gemini

El nombre exacto de los modelos de Gemini cambia con frecuencia. Este
proyecto usa `gemini-2.5-pro` por defecto vía la variable de entorno
`GEMINI_MODEL` — antes de un lanzamiento real, verifica en
[Google AI Studio](https://aistudio.google.com/) cuál es el modelo vigente
recomendado para tareas de razonamiento largo, y actualiza la variable de
entorno (no hace falta tocar código).
