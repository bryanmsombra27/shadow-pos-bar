import type { Role } from "./rol.interface";

export interface UsuarioResponse {
  mensaje: string;
  usuarios: Usuario[];
  pagina: number;
  total_paginas: number;
  total_registros: number;
}

export interface Usuario {
  created_at: Date;
  id: string;
  nombre_completo: string;
  nombre_usuario: string;
  telefono: string;
  rol: Role;
  rol_id: string;
}

export interface RespuestaUsuario {
  mensaje: string;
  usuario: Usuario;
}
export interface RespuestaLogin {
  mensaje: string;
  token: string;
}
