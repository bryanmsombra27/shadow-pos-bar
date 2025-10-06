import { shadowPosApi } from "@/api/api";
import type { Pagination } from "@/interfaces/paginacion.interface";
import type {
  ProductoForm,
  ProductoResponse,
  RespuestaProducto,
  TodosLosProductos,
} from "@/interfaces/producto.interface";

const obtenerProductos = async (
  pagination?: Pagination
): Promise<ProductoResponse> => {
  let endpoint = "/producto";

  if (pagination?.page && pagination.search) {
    endpoint = endpoint.concat(
      `?page=${pagination.page}&search=${pagination.search}`
    );
  } else if (pagination?.page) {
    endpoint = endpoint.concat(`?page=${pagination.page}`);
  } else if (pagination?.search) {
    endpoint = endpoint.concat(`?search=${pagination?.search}`);
  }

  const { data } = await shadowPosApi.get<ProductoResponse>(endpoint);

  return data;
};
const obtenerTodosLosProductos = async (): Promise<TodosLosProductos> => {
  const { data } = await shadowPosApi.get<TodosLosProductos>("/producto/all");

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
  obtenerTodosLosProductos,
};
