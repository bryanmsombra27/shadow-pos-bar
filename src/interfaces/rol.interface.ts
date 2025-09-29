export interface RolResponse {
  mensaje: string;
  roles: Role[];
  pagina: number;
  total_paginas: number;
  total_registros: number;
}

export interface Role {
  id: string;
  nombre: string;
}

export interface RespuestaRole {
  mensaje: string;
  rol: Role;
}
