export interface CategoriaResponse {
  categorias: Categoria[];
  mensaje: string;
  pagina: number;
  total_paginas: number;
  total_registros: number;
}

export interface Categoria {
  id: string;
  nombre: string;
}

export interface RespuestaCategoria {
  mensaje: string;
  categoria: Categoria;
}

export interface TodasLasCategorias {
  categorias: Categoria[];
}
