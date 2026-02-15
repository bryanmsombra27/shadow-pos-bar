import type { Mesa } from "./mesa.interface";
import type { Producto } from "./producto.interface";

export interface CrearOrden {
  mesa_id: string;
  mesero_id: string;
  productos: PedidoPorOrden[];
}

interface PedidoPorOrden {
  cantidad: number;
  precio: number;
  producto_id: string;
  para_barra: boolean;
}
export interface OrdenPorMesa {
  mensaje: string;
  orden: Orden;
}

export interface Orden {
  id: string;
  mesero_id: string;
  mesa_id: string;
  estado_orden: string;
  total: null | string;
  mesero: Mesero;
  pedidos: Pedido[];
  mesa?: Pick<Mesa, "id" | "nombre">;
}

interface Mesero {
  nombre_completo: string;
}

export interface Pedido {
  id: string;
  cantidad: number;
  precio: number;
  producto: Pick<Producto, "id" | "nombre">;
  preparado?: boolean;
  entregado_a_mesa?: boolean;
  orden_id?: string;
}
interface PedidoCompletado {
  id: string;
  cantidad: number;
  precio: number;
  comentarios: string | null;
  producto_id: string;
  orden_id: string;
  para_barra: boolean;
  preparado: boolean;
}

export interface PedidoCompletadoResponse {
  mensaje: string;
  pedido: PedidoCompletado;
}

export interface OrdenPorMeseroResponse {
  mensaje: string;
  ordenes: Orden[];
}

export interface PedidoEntregadoResponse {
  mensaje: string;
  pedido: Pedido;
}

export interface OrdenEntregadaResponse {
  mensaje: string;
  orden: Orden;
}
