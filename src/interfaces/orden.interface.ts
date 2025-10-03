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
