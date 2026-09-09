export type Institucion = "UNITEC" | "CEUTEC";

export type Nivel = "Técnico Universitario" | "Grado" | "Posgrado";

export type Periodo = "Q1" | "Q2" | "Q3" | "Q4";

export type EstadoDato = "CONFIRMADO" | "INFERIDO" | "PROPUESTO" | "PENDIENTE";

export interface InfoGeneral {
  institucion: Institucion;
  nivel: Nivel;
  periodo: Periodo;
  anio: string;
  nombreAsignatura: string;
  codigo: string;
  docente: string;
  seccion: string;
  campus: string;
}

export interface DocumentoAdjunto {
  nombre: string;
  tipo: "sintetico" | "silabo_anterior" | "matriz";
  texto: string;
}

export interface SesionARIA {
  info: InfoGeneral;
  documentos: DocumentoAdjunto[];
}

export type RolMensaje = "user" | "model";

export interface Mensaje {
  id: string;
  rol: RolMensaje;
  texto: string;
  fase?: Fase;
}

export type Fase = "agente1" | "agente2" | "agente3";

export interface SeccionEstado {
  numero: number; // I..X → 1..10
  nombre: string;
  protegida: boolean;
  aprobada: boolean;
}
