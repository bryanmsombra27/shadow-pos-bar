import type { Categoria } from "./categoria.interface";

export interface ProductoResponse {
  mensaje: string;
  pagina: number;
  productos: Producto[];
  total_paginas: number;
  total_registros: number;
}

export interface Producto {
  id: string;
  nombre: string;
  imagen: string;
  descripcion: null | string;
  marca: null | string;
  categoria_id: string;
  categoria: Categoria;
  inventario: Inventario | null;
  precio: number;
}

export interface RespuestaProducto {
  mensaje: string;
  producto: Producto;
}

export type ProductoForm = Omit<
  Producto,
  "id" | "categoria" | "imagen" | "inventario"
> & {
  cantidad_producto: number;
};
type Inventario = {
  id: string;
  cantidad: number;
  en_venta: number | null;
  producto_id: string;
};

export interface TodosLosProductos {
  productos: Producto[];
}
