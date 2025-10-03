export interface MesaResponse {
  mensaje: string;
  total_paginas: number;
  pagina: number;
  total_registros: number;
  mesas: Mesa[];
}
export interface TodasLasMesas {
  mesas: Mesa[];
}

export interface RespuestaMesa {
  mensaje: string;
  mesa: Mesa;
}

export interface Mesa {
  id: string;
  nombre: string;
  es_vip: boolean;
  estado_actual: EstadoMesa;
  mesero_id: null | string;
  mesero: null | Mesero;
}

export type ActualizarMesa = Pick<
  Mesa,
  "es_vip" | "estado_actual" | "mesero_id" | "nombre"
>;

export type ActualizarEstadoMesa = Pick<Mesa, "estado_actual" | "mesero_id">;

type EstadoMesa = "DISPONIBLE" | "OCUPADO" | "RESERVADO";

interface Mesero {
  id: string;
  rol_id: string;
  nombre_completo: string;
}
