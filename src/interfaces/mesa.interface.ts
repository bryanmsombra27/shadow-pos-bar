export interface MesaResponse {
  mensaje: string;
  total_paginas: number;
  pagina: number;
  total_registros: number;
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
  estado_actual: string;
  mesero_id: null | string;
  mesero: null | Mesero;
}

export type ActualizarMesa = Pick<
  Mesa,
  "es_vip" | "estado_actual" | "mesero_id" | "nombre"
>;

interface Mesero {
  id: string;
  rol_id: string;
  nombre_completo: string;
}
