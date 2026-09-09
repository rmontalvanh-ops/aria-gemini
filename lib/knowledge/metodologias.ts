// Fuente: Metodologías y actividades de enseñanza-aprendizaje (Innovación
// Educativa y Desarrollo Docente, CEUTEC-UNITEC, 2021).
// Regla dura: el instrumento de evaluación se toma LITERAL de esta tabla
// para la fila exacta (metodología + actividad + nivel). Nunca se infiere
// por criterio pedagógico propio.

export type NivelTaxonomico = "Básico" | "Intermedio" | "Avanzado";

export interface FilaMetodologia {
  metodologia: string;
  actividad: string;
  entregable: string;
  instrumento: string;
}

export const CATALOGO_METODOLOGIAS: Record<NivelTaxonomico, FilaMetodologia[]> = {
  Básico: [
    { metodologia: "Lección magistral", actividad: "Lecturas", entregable: "Resumen del tema", instrumento: "Lista de cotejo" },
    { metodologia: "Lección magistral", actividad: "Lecturas", entregable: "Mapa conceptual", instrumento: "Pauta" },
    { metodologia: "Lección magistral", actividad: "Lecturas", entregable: "Mapa mental", instrumento: "Lista de cotejo" },
    { metodologia: "Lección magistral", actividad: "Discusión grupal", entregable: "Resumen del tema", instrumento: "Lista de cotejo" },
    { metodologia: "Lección magistral", actividad: "Exposición del tema", entregable: "Presentación del tema", instrumento: "Rúbrica/lista de cotejo" },
    { metodologia: "Lección magistral", actividad: "Exposición del tema", entregable: "Informe (investigación exploratoria)", instrumento: "Lista de cotejo" },
    { metodologia: "Lección magistral", actividad: "Conferencias", entregable: "Resolución de guía", instrumento: "Lista de cotejo/pauta" },
    { metodologia: "Contrato de aprendizaje", actividad: "Contrato de aprendizaje", entregable: "Contrato de aprendizaje", instrumento: "Lista de cotejo" },
    { metodologia: "Contrato de aprendizaje", actividad: "Contrato de aprendizaje", entregable: "Cronograma de trabajo", instrumento: "Lista de cotejo" },
    { metodologia: "Aprendizaje cooperativo", actividad: "Discusión grupal", entregable: "Presentación del tema", instrumento: "Rúbrica/lista de cotejo" },
    { metodologia: "Aprendizaje cooperativo", actividad: "Discusión grupal", entregable: "Resumen del tema", instrumento: "Lista de cotejo" },
    { metodologia: "Aprendizaje cooperativo", actividad: "Discusión grupal", entregable: "Mapa conceptual", instrumento: "Pauta" },
    { metodologia: "Aprendizaje cooperativo", actividad: "Discusión grupal", entregable: "Mapa mental", instrumento: "Lista de cotejo" },
    { metodologia: "Aprendizaje basado en juegos", actividad: "Juego de roles (Debate, foros, grupos focales)", entregable: "Formato de registro de la actividad", instrumento: "Lista de cotejo" },
    { metodologia: "Aprendizaje basado en juegos", actividad: "Obra de teatro", entregable: "Presentación de la obra", instrumento: "Rúbrica" },
  ],
  Intermedio: [
    { metodologia: "Aprendizaje cooperativo", actividad: "Discusión grupal", entregable: "Coevaluación grupal", instrumento: "Lista de cotejo" },
    { metodologia: "Aprendizaje cooperativo", actividad: "Debate, foros, grupos focales", entregable: "Formato de registro de la actividad", instrumento: "Lista de cotejo/rúbrica" },
    { metodologia: "Aprendizaje basado en juegos", actividad: "Juego de roles (Debate, foros, grupos focales)", entregable: "Formato de registro de la actividad", instrumento: "Lista de cotejo" },
    { metodologia: "Aprendizaje basado en juegos", actividad: "Obra de teatro", entregable: "Presentación de la obra", instrumento: "Lista de cotejo" },
    { metodologia: "Laboratorios", actividad: "Prácticas guiadas, uso de equipo", entregable: "Guías, producción de videos, documentación fotográfica", instrumento: "Lista de cotejo/rúbrica" },
    { metodologia: "Aprendizaje basado en problemas", actividad: "Análisis del problema", entregable: "Representación gráfica", instrumento: "Lista de cotejo" },
    { metodologia: "Aprendizaje basado en problemas", actividad: "Análisis del problema", entregable: "Propuesta de solución del problema", instrumento: "Rúbrica" },
    { metodologia: "Aprendizaje basado en problemas", actividad: "Cine foro", entregable: "Guía", instrumento: "Lista de cotejo" },
    { metodologia: "Simulación", actividad: "Uso de simuladores", entregable: "Reporte con análisis de datos", instrumento: "Lista de cotejo/rúbrica" },
    { metodologia: "Simulación", actividad: "Visitas de campo", entregable: "Guía, entrevistas, encuestas, guías de observación", instrumento: "Pauta/lista de cotejo" },
    { metodologia: "Estudio de casos", actividad: "Análisis de caso", entregable: "Propuesta de solución del caso, cuadros comparativos, mapas mentales", instrumento: "Rúbrica" },
    { metodologia: "Estudio de casos", actividad: "Cine foro", entregable: "Guía", instrumento: "Lista de cotejo/rúbrica" },
    { metodologia: "Aprendizaje basado en investigación", actividad: "Investigación Documental", entregable: "Informe escrito", instrumento: "Rúbrica" },
    { metodologia: "Aprendizaje basado en investigación", actividad: "Exposición de la investigación", entregable: "Presentación de la investigación", instrumento: "Rúbrica" },
    { metodologia: "Aprendizaje basado en investigación", actividad: "Análisis documental", entregable: "Ensayo", instrumento: "Rúbrica" },
    { metodologia: "Aprendizaje basado en proyectos", actividad: "Proyecto final de clase", entregable: "Propuesta de proyecto (informe escrito)", instrumento: "Rúbrica" },
    { metodologia: "Aprendizaje basado en proyectos", actividad: "Exposición de proyecto", entregable: "Presentación del proyecto", instrumento: "Rúbrica" },
    { metodologia: "Aprendizaje+Servicio", actividad: "Proyecto de vinculación", entregable: "Presentación del proyecto de vinculación", instrumento: "Rúbrica" },
    { metodologia: "Enseñanza con pensamiento de diseño", actividad: "Idea de proyecto", entregable: "Propuesta de idea de proyecto", instrumento: "Lista de cotejo/rúbrica" },
    { metodologia: "Aula invertida", actividad: "Análisis entre estudiantes", entregable: "Presentación oral", instrumento: "Lista de cotejo" },
    { metodologia: "Aula invertida", actividad: "Justo a tiempo", entregable: "Participación y presentación oral del estudiante", instrumento: "Lista de cotejo" },
    { metodologia: "Talleres", actividad: "Seminarios, prácticas guiadas", entregable: "Guías y producción de videos", instrumento: "Rúbrica" },
  ],
  Avanzado: [
    { metodologia: "Aprendizaje colaborativo", actividad: "Discusión grupal", entregable: "Heteroevaluación grupal", instrumento: "Lista de cotejo" },
    { metodologia: "Aprendizaje basado en juegos", actividad: "Uso de simuladores", entregable: "Propuesta a partir de los datos (alternativas)", instrumento: "Lista de cotejo/rúbrica" },
    { metodologia: "Aprendizaje basado en juegos", actividad: "Juego de roles (Debate, foros, grupos focales)", entregable: "Formato de registro de la actividad", instrumento: "Lista de cotejo" },
    { metodologia: "Aprendizaje basado en juegos", actividad: "Obra de teatro", entregable: "Creación de guión, escenografía y vestuario", instrumento: "Rúbrica" },
    { metodologia: "Estudio de casos", actividad: "Análisis de caso", entregable: "Propuesta de solución de caso, cuadros comparativos, mapas mentales", instrumento: "Rúbrica" },
    { metodologia: "Estudio de casos", actividad: "Cine foro", entregable: "Guía", instrumento: "Lista de cotejo/Rúbrica" },
    { metodologia: "Aprendizaje basado en investigación", actividad: "Investigación de campo", entregable: "Informe escrito", instrumento: "Rúbrica" },
    { metodologia: "Aprendizaje basado en investigación", actividad: "Análisis de campo", entregable: "Representaciones gráficas", instrumento: "Lista de cotejo" },
    { metodologia: "Aprendizaje basado en investigación", actividad: "Elaborar un artículo", entregable: "Artículo", instrumento: "Rúbrica" },
    { metodologia: "Aprendizaje basado en investigación", actividad: "Exposición de la investigación", entregable: "Presentación de la investigación", instrumento: "Rúbrica" },
    { metodologia: "Aprendizaje+Servicio", actividad: "Proyecto de vinculación", entregable: "Presentación del proyecto de vinculación", instrumento: "Rúbrica" },
    { metodologia: "Enseñanza con pensamiento de diseño", actividad: "Prototipar el proyecto", entregable: "Prototipo", instrumento: "Rúbrica" },
    { metodologia: "Enseñanza con pensamiento de diseño", actividad: "Validación de proyecto", entregable: "Resultados de validación", instrumento: "Rúbrica" },
    { metodologia: "Aula invertida", actividad: "Análisis entre estudiantes", entregable: "Presentación oral", instrumento: "Lista de cotejo" },
    { metodologia: "Aula invertida", actividad: "Justo a tiempo", entregable: "Participación y presentación oral del estudiante", instrumento: "Lista de cotejo" },
  ],
};

// Taxonomía de Bloom — verbos clave por nivel cognitivo (para validar que
// la redacción de actividades use verbos coherentes con el nivel B/I/A).
export const VERBOS_BLOOM: Record<NivelTaxonomico, string[]> = {
  Básico: [
    "elegir", "definir", "describir", "identificar", "listar", "localizar",
    "nombrar", "reconocer", "recuperar", "recitar",
  ],
  Intermedio: [
    "clasificar", "comparar", "explicar", "inferir", "parafrasear",
    "resumir", "traducir", "actuar", "calcular", "demostrar", "dramatizar",
    "emplear", "planear", "resolver",
  ],
  Avanzado: [
    "examinar", "priorizar", "atribuir", "deconstruir", "criticar",
    "valorar", "medir", "opinar", "estimar", "planear", "construir",
    "diseñar", "componer", "elaborar",
  ],
};
