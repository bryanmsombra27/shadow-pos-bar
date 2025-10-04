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
  total: null;
  mesero: Mesero;
  pedidos: Pedido[];
}

interface Mesero {
  nombre_completo: string;
}

export interface Pedido {
  cantidad: number;
  precio: number;
  producto: Pick<Producto, "id" | "nombre">;
}
