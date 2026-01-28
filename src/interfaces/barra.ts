export interface BarraResponse {
  mensaje: string;
  ordenes: Orden[];
}

export interface BarraOrdenStatusResponse {
  mensaje: string;
  orden: Orden;
}

interface Orden {
  id: string;
  mesero_id: string;
  mesa_id: string;
  estado_orden: string;
  total: null;
  mesa: Mesa;
  mesero: Mesero;
  pedidos: Pedido[];
}

interface Mesa {
  nombre: string;
  es_vip: boolean;
}
interface Mesero {
  nombre_usuario: string;
}

interface Pedido {
  cantidad: number;
  comentarios: null;
  preparado: boolean;
  para_barra: boolean;
  producto: Producto;
}
interface Producto {
  nombre: string;
}
