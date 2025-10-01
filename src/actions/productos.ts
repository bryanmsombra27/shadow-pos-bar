import { shadowPosApi } from "@/api/api";
import type {
  ProductoForm,
  ProductoResponse,
  RespuestaProducto,
} from "@/interfaces/producto.interface";

const obtenerProductos = async (): Promise<ProductoResponse> => {
  const { data } = await shadowPosApi.get<ProductoResponse>("/producto");

  return data;
};

const crearProducto = async (
  producto: ProductoForm
): Promise<RespuestaProducto> => {
  const { data } = await shadowPosApi.post<RespuestaProducto>(
    `/producto`,
    producto
  );

  return data;
};
const actualizarProducto = async (
  id: string,
  producto: ProductoForm
): Promise<RespuestaProducto> => {
  const { data } = await shadowPosApi.patch<RespuestaProducto>(
    `/producto/${id}`,
    producto
  );

  return data;
};
const eliminarProducto = async (id: string): Promise<RespuestaProducto> => {
  const { data } = await shadowPosApi.delete<RespuestaProducto>(
    `/producto/${id}`
  );

  return data;
};

export {
  obtenerProductos,
  actualizarProducto,
  eliminarProducto,
  crearProducto,
};
