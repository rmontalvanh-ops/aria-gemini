// Fuente: "Manual Completo de Diseño de Cursos UNITEC - CGS"
// https://capexfi25-30.netlify.app/cgsknowledge/unitecplanner
// (Common Ground Collaborative — Collective Growth System)
//
// Igual que con el catálogo de metodologías del sílabo: esta carpeta es
// la fuente viva. Si UNITEC actualiza el manual del Planner, se actualiza
// aquí — nunca en el texto libre del prompt del Agente 3.

export const COMUNALIDADES_HUMANAS = [
  {
    nombre: "Propósito y Equilibrio",
    descripcion:
      "Todos buscamos significado y propósito en nuestra existencia y nos esforzamos por lograr el equilibrio en nuestras vidas.",
    retrato: "Líder con Propósito",
  },
  {
    nombre: "Individuos y Grupos",
    descripcion:
      "Todos buscamos una identidad personal y un lugar al cual pertenecer. Explora cómo nos identificamos, organizamos e interactuamos.",
    retrato: "Colaborador Constructivo",
  },
  {
    nombre: "Historias y Señales",
    descripcion:
      "Todos necesitamos comunicarnos: compartir ideas, historias, emociones e información.",
    retrato: "Comunicador Efectivo",
  },
  {
    nombre: "Imaginación y Creatividad",
    descripcion:
      "Todos tenemos la capacidad de imaginar y crear, transformando ideas abstractas en realidades tangibles.",
    retrato: "Innovador Creativo",
  },
  {
    nombre: "La Tierra y los Ecosistemas",
    descripcion:
      "Todos compartimos un planeta y tenemos el deber de cuidarlo — cómo nuestras acciones impactan sistemas ambientales y sociales.",
    retrato: "Ciudadano Responsable",
  },
  {
    nombre: "Patrones y Principios",
    descripcion:
      "Todos buscamos patrones recurrentes y principios perdurables para entender la raíz de un problema complejo.",
    retrato: "Solucionador de Problemas Empático",
  },
] as const;

export const PRINCIPIOS_APRENDIZAJE = [
  { nombre: "Propósito", pregunta: "¿Por qué aprendemos?" },
  { nombre: "Posibilidad", pregunta: "¿Quiénes estamos llegando a ser?" },
  { nombre: "Personas", pregunta: "¿Con quién aprendemos?" },
  { nombre: "Autonomía", pregunta: "¿Cómo asumimos la responsabilidad?" },
] as const;

export const RETRATO_EGRESADO = [
  {
    capacidad: "Líder con Propósito",
    descripcion:
      "Ha alcanzado equilibrio personal y bienestar. Actúa con integridad, adaptabilidad y resiliencia, siempre preparado para hacer lo correcto.",
  },
  {
    capacidad: "Solucionador de Problemas Empático",
    descripcion:
      "Comprende los patrones y principios que determinan cómo funciona el mundo, combinando pensamiento crítico con empatía.",
  },
  {
    capacidad: "Innovador Creativo",
    descripcion:
      "Aporta originalidad de interpretación y creatividad de expresión; crea artefactos, soluciones y herramientas únicas.",
  },
  {
    capacidad: "Comunicador Efectivo",
    descripcion:
      "Domina la comunicación oral, escrita y digital; expresa ideas complejas de manera ética y estratégica.",
  },
  {
    capacidad: "Ciudadano Responsable",
    descripcion:
      "Siente responsabilidad por sostener sistemas sociales y ecosistemas naturales saludables; es proactivo en su comunidad.",
  },
  {
    capacidad: "Colaborador Constructivo",
    descripcion:
      "Busca y valora diversas perspectivas; trabaja efectivamente en equipo y gestiona conflictos de manera constructiva.",
  },
] as const;

// Reglas de redacción por sección del Planner — condensadas del manual,
// con el formato obligatorio y un ejemplo real por sección.
export const REGLAS_SECCIONES_PLANNER = `
1. IDENTIDAD DEL CURSO
   Fórmula obligatoria: Disciplina Académica + Comunalidad Humana Central → Capacidades del Retrato.
   Campos: Título del curso (disciplina + código), Comunalidad Humana Central (una de las 6 de abajo), Vínculos con el Retrato (2-3 capacidades que este curso desarrolla fuertemente).
   Ejemplo (Historia de Honduras, HIS101): Comunalidad = Individuos y Grupos. Retrato = Ciudadano Responsable, Colaborador Constructivo, Comunicador Efectivo.

2. PREGUNTA ATRACTIVA (Compelling Question)
   Debe: generar curiosidad genuina, ser abierta (sin una sola respuesta correcta), permitir múltiples interpretaciones, sonar como un "titular" en lenguaje estudiantil — nunca jerga académica.
   Disparador para redactarla: "¿Qué pregunta haría que un estudiante dijera 'Quiero responder eso'?"
   Ejemplo (Álgebra): "¿Es el álgebra un lenguaje... o un código secreto?"

3. GRAN IDEA (Big Idea)
   Formato OBLIGATORIO: debe empezar con "Entender que...". Es lo que el estudiante debe recordar de por vida aunque olvide los detalles. Conecta el conocimiento disciplinar con relevancia humana o social.
   Ejemplo (Álgebra): "Entender que el álgebra representa patrones y relaciones nos permite modelar y resolver problemas en la ciencia, la tecnología y la vida diaria."

4. EL PORQUÉ (The Why) — dos narrativas obligatorias, no una:
   a) Historia para el DOCENTE: por qué el curso importa para la sociedad/industria/profesión, basada en contexto real.
   b) Historia para el ESTUDIANTE: concreta, vívida, inmediata, engancha con un escenario o pregunta, y SIEMPRE termina con la frase exacta "Por eso este módulo importa."

5. EL QUÉ — Metas 3Cs + L2L (las cuatro dimensiones son obligatorias, ninguna es opcional):
   A. Meta Conceptual — prompt fijo "Entender que...". Conceptos/teorías/principios.
   B. Meta de Competencia — prompt fijo "Ser capaz de...". Habilidades prácticas con verbo de acción (Bloom); DEBEN provenir de la Sección V del sílabo ya aprobado — nunca se inventan.
   C. Meta de Carácter — prompt fijo "Convertirse en...". Valores/disposiciones (ej. Integridad, Empatía, Resiliencia, Curiosidad, Apertura).
   D. Meta L2L (Aprender a Aprender) — prompt fijo "Los estudiantes están desarrollando la capacidad de...". Es obligatorio incluir al menos una; ejemplos válidos: monitorear progreso con hitos, dar/recibir retroalimentación STAR (Específica, Oportuna, Accionable, Respetuosa), transferir estrategias entre disciplinas, autorregular tiempo/atención, reflexionar sobre cómo cambia su pensamiento.

6. PREGUNTAS MARCO (Framing Questions)
   Una por cada dimensión (Conceptual, Competencia, Carácter, L2L). Abiertas, nunca de sí/no. Guían las secuencias diarias.

7. LA EVIDENCIA — GRASPS (para la meta de Competencia, evaluación culminante)
   G-oal (objetivo del desafío), R-ole (rol que asume el estudiante, ej. Historiador/Consultor), A-udience (a quién va dirigido, real no ficticio), S-ituation (contexto), P-roduct (lo que crea, debe ser el mismo producto/entregable que ya está validado en la Sección V/VIII del sílabo), S-uccess criteria (criterios de éxito).
   Rúbrica recomendada: Punto Único o analítica simple con niveles Emergente / En Evolución / Experto / En Expansión.

8. EL CÓMO — Secuencias (elige el modelo según el TIPO de meta que se esté secuenciando esa semana; los tres pueden convivir en el mismo planner)
   - Modelo CONSTRUCTIVISTA (para metas Conceptuales): Conectar (activa previos, despierta curiosidad) → Construir (nueva comprensión vía exploración/práctica) → Contribuir (comparte/aplica en contexto auténtico).
   - Modelo DIP (para metas de Competencia): Deconstruir (analizar un desempeño/modelo experto) → Identificar (nombrar las habilidades/técnicas requeridas) → Practicar (aplicar con retroalimentación).
   - Modelo CAR (para metas de Carácter): Considerar (reflexionar sobre valores/dilemas) → Actuar (tomar decisiones, demostrar valores) → Reflexionar ("¿En quién me estoy convirtiendo?").
   Las secuencias deben mapear semana por semana contra la Sección VIII del sílabo ya aprobado — no se inventa contenido nuevo, se traduce el contenido semanal a esta coreografía.

9. REFLEXIÓN Y TRANSFERENCIA (cierre — nunca es un examen)
   Reflexión del estudiante (siempre incluir): ¿Qué aprendí? ¿Cómo lo aprendí? ¿En quién me estoy convirtiendo? ¿Qué estrategias mantendré o dejaré la próxima vez?
   Transferencia (hacerlo concreto): ¿Dónde más puedo aplicar esto? ¿Cuál es la próxima acción más allá de esta clase?
   Reflexión del docente (para el diseñador, no para el estudiante): ¿Cómo construyó este curso las capacidades del Retrato y L2L nombradas al inicio? ¿Dónde las practicaron los estudiantes y dónde está la evidencia?
`.trim();

// Checklist de calidad (Sección 10 del manual) — el agente lo usa para
// autoevaluarse antes de entregar, y solo reporta los ítems que fallan.
export const CHECKLIST_CALIDAD_PLANNER = [
  "La Pregunta Atractiva: ¿aborda un tema que realmente importa, es abierta e intrigante, funciona como llamado a la investigación?",
  "La Gran Idea: ¿es una declaración sencilla, empieza con 'Entender que...', expresa algo que vale la pena comprender profundamente?",
  "El Porqué: ¿funciona como narrativa atractiva, menciona por qué importa el módulo, y la versión para estudiante termina con 'Por eso este módulo importa'?",
  "Metas: ¿son manejables en cantidad, están alineadas con preguntas marco y evaluación, cubren las 4 dimensiones (Conceptual/Competencia/Carácter/L2L) con el prompt fijo de cada una?",
  "Metas de Competencia: ¿empiezan con verbo de acción, describen desempeños observables y evaluables, y provienen literalmente de la Sección V del sílabo?",
  "GRASPS: ¿permite transferir a un contexto real, distingue producto de propósito, está alineado con las metas de aprendizaje?",
  "Criterios de evaluación: ¿distinguen calidad de pensamiento vs. requisitos técnicos de finalización, incluyen evaluación OF/FOR/AS aprendizaje?",
  "Preguntas de encuadre: ¿son abiertas y reflejan directamente cada dimensión de meta?",
  "Secuencias: ¿usan el modelo correcto (Constructivista/DIP/CAR) según el tipo de meta, y mapean contra la programación semanal real del sílabo?",
  "Reflexión: ¿usa evidencia documentada, consolida aprendizajes clave, apoya pensamiento metacognitivo, y ayuda a planificar el futuro?",
] as const;
