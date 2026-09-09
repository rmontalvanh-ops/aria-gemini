// ─────────────────────────────────────────────────────────────────────────
// Fuente viva: Formato de sílabo por competencias CEUTEC (año 2025).
// Este archivo es la ÚNICA fuente de verdad para texto institucional
// protegido. Si la universidad actualiza el formato oficial, actualiza
// SOLO este archivo — nunca los prompts de los agentes.
//
// Nota de discrepancia conocida (sin resolver institucionalmente):
// el Manual de llenado dice "Guías didácticas a través de Blackboard."
// El Formato DOCX vigente (fuente canónica, usada abajo) dice solo
// "Guías didácticas." El agente debe advertir esta discrepancia en
// cada diagnóstico hasta que la Dirección de Innovación Educativa la
// resuelva — ver DISCREPANCIA_SECCION_VII más abajo.
// ─────────────────────────────────────────────────────────────────────────

export const SECCION_VII_TEXTO_BASE = `En la Modalidad B-Learning la interacción del docente con los estudiantes se da en dos vías: Cara a cara o presencial y Virtual o en línea. En la estrategia de aprendizaje de CEUTEC, el estudiante es el eje central del proceso de aprendizaje y las metodologías son activas e interactivas. En este modelo el estudiante tiene un rol activo en la construcción de los conocimientos y el docente es un mediador entre el conocimiento y la comprensión del estudiante.
El modelo posee herramientas de auto aprendizaje en el aula virtual, requiere de preparación previa del estudiante, desarrollo de actividades en línea y de tutorías presenciales.

Describir las estrategias de aprendizaje a usar en el desarrollo de la asignatura, por ejemplo:
• Guías didácticas.
• Videos. Tutorías individuales.
• Prácticas de laboratorio
• Trabajos colaborativos y de cooperación.
• Trabajos individuales.
• Retroalimentación de trabajos calificados.
• Foros. Acceso a sitios web. Chat o interacción en línea.
• Actividades de análisis y reflexión que lleven a compromisos personales de actuación. Actividades de resolución de casos.
• Análisis de modelos.
• Simulaciones
• Prácticas de campo
• Investigación`;

export const DISCREPANCIA_SECCION_VII =
  'Existe una discrepancia sin resolver entre el Manual de llenado ("Guías didácticas a través de Blackboard") y el Formato DOCX vigente ("Guías didácticas"). Esta app usa el Formato DOCX vigente como fuente canónica. Verificar con la Dirección de Innovación Educativa antes de aprobar el sílabo a escala.';

export const SECCION_IX_POLITICAS = `Políticas de la clase ► (No se modifica)

• Políticas de asistencia y puntualidad en las tutorías presenciales
El compromiso de estudiante en sus estudios es una premisa fundamental en el aprendizaje. Por lo tanto, la asistencia y puntualidad a las tutorías presenciales son parte de esa responsabilidad y el estudiante debe cumplir con lo establecido en el art. 50 y 51 del Reglamento Académico que se resume a continuación:
1. La asistencia a clases presenciales y de distancia es obligatoria y se contabiliza desde el primer día.
2. El alumno queda Sin Derecho cuando acumula inasistencias así:

Asistencia semanal programada | Máxima inasistencia tolerada | Inasistencia por la que se pierde derecho
1 vez | 3 veces | 4 veces
2 veces | 6 veces | 7 veces
3 veces | 6 veces | 7 veces *

3. En el sistema de control de asistencia a clase solo se permite un margen de 15 minutos al inicio de la hora académica para registrarla.

• Políticas de participación en el Aula Virtual
1. Es responsabilidad del estudiante revisar diariamente las aulas virtuales de sus cursos matriculados. Las responsabilidades incluyen:
2. Actualizar su perfil de estudiante.
3. Revisar diariamente el foro de comunicación donde el docente informa o notifica sobre el desarrollo de la asignatura.
4. Estudiar los recursos obligatorios asignados por el docente cada semana.
5. Participar en las actividades asignadas a través del aula virtual de acuerdo al cuadro de actividades.

• Políticas de comportamiento
1. Como parte de la comunidad de CEUTEC, se espera que todo estudiante trate con respeto a toda persona en la institución en toda interacción sea esta presencial o virtual.
2. Dentro del aula presencial se espera que los estudiantes estén comprometidos con su aprendizaje y estén enfocados en las actividades e instrucciones que se den. Para este efecto, el docente puede solicitar respetuosamente a los estudiantes dejar cualquier otra actividad ajena a la clase a fin de concentrarse en la dinámica que se desarrolla en el aula.
3. Se espera que todos los estudiantes actúen de acuerdo a las normas sociales y a las buenas costumbres. Para lo cual aplican el Reglamento Académico y el Reglamento de Disciplina de los Estudiantes vigentes en la Institución y accesibles en el Portal.

• Políticas de comunicación
1. La comunicación entre estudiantes y docentes se da tanto en el aula virtual como en la tutoría presencial. Es responsabilidad de cada uno estar pendiente de las instrucciones que se den.
2. La comunicación escrita referente a temas de la clase entre docente y estudiante debe desarrollarse a través de los canales oficiales que son: el foro "Pregúntale al Docente" y el foro "Anuncios".
3. Es responsabilidad del docente estar pendiente de las consultas académicas y postear por los canales oficiales la información del curso en un periodo máximo de 48 horas.
4. El sílabo y el cuadro de actividades ubicado en el aula virtual son la guía de desarrollo de la clase. Es responsabilidad de los estudiantes conocerlo y seguirlo.

• Políticas de Tareas ► (Revisar y puede agregar otras que considere importantes para la entrega de las asignaciones)
1. Realizar las tareas acordes a un nivel universitario, que contenga una portada, introducción, un contenido acorde a lo solicitado, y bibliografía.
2. El envío de la tarea no implicará la obtención de todos los puntos acordados para la misma.
3. La participación de foros o el envío de tareas fuera del plazo del tiempo señalado, no será calificado.`;

export const REQUISITOS_INDISPENSABLES_BASE = [
  "Acceso a una computadora personal",
  "Acceso a internet",
  "Tener usuario y clave de acceso al portal de la universidad (https://portal.unitec.edu/)",
  "Tener el acceso al aula virtual de clase.",
];

export interface CompetenciaTransversal {
  nombre: string;
  descripcion: string;
}

export const COMPETENCIAS_TRANSVERSALES: CompetenciaTransversal[] = [
  {
    nombre: "Análisis y resolución de problemas",
    descripcion:
      "Evalúa la información de manera crítica y propone soluciones acertadas y viables.",
  },
  {
    nombre: "Buen trabajo con los demás",
    descripcion:
      "Valora e incorpora diversos puntos de vista y apoya las decisiones del equipo.",
  },
  {
    nombre: "Cumplimiento de objetivos",
    descripcion:
      "Establecer objetivos exigentes, evaluar los resultados del trabajo para garantizar la calidad.",
  },
  {
    nombre: "Aprendizaje y desarrollo personal",
    descripcion:
      "Evalúa las fortalezas y las debilidades de manera crítica y aprende de los éxitos y los fracasos.",
  },
  {
    nombre: "Adaptación al cambio",
    descripcion:
      "Ajustar el estilo para adaptarse a situaciones diferentes, trabajar eficazmente en casos de ambigüedad.",
  },
  {
    nombre: "Pensamiento Crítico",
    descripcion:
      "Cuestiona la realidad, plantea sus propios puntos de vista y toma en cuenta las opiniones de los demás.",
  },
];

export const NOMBRES_SECCIONES_SILABO = [
  "Información General",
  "Descripción de la asignatura",
  "Conocimientos previos y requisitos",
  "Competencias Transversales",
  "Competencias del programa",
  "Descripción de actividades",
  "Estrategias metodológicas",
  "Programación Semanal",
  "Políticas de la clase",
  "Recursos",
] as const;

export const SECCIONES_PROTEGIDAS = [7, 9]; // VII y IX, 1-indexado
