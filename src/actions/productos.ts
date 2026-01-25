import { shadowPosApi } from "@/api/api";
import type {
  Pagination,
  ProductoPagination,
} from "@/interfaces/paginacion.interface";
import type {
  ProductoForm,
  ProductoResponse,
  RespuestaProducto,
  TodosLosProductos,
} from "@/interfaces/producto.interface";

const obtenerProductos = async (
  pagination?: ProductoPagination,
): Promise<ProductoResponse> => {
  let endpoint = "/producto";

  // if (pagination?.page && pagination.search) {
  //   endpoint = endpoint.concat(
  //     `?page=${pagination.page}&search=${pagination.search}`,
  //   );
  // } else if (pagination?.page) {
  //   endpoint = endpoint.concat(`?page=${pagination.page}`);
  // } else if (pagination?.search) {
  //   endpoint = endpoint.concat(`?search=${pagination?.search}`);
  // }
  // const url = new URL(endpoint, "http://localhost:3000/api");

  const searchParams = new URLSearchParams();

  if (pagination?.page) {
    searchParams.append("page", pagination.page.toString());
  }
  if (pagination?.search) {
    searchParams.append("search", pagination.search);
  }

  if (pagination?.category) {
    searchParams.append("category", pagination.category);
  }

  const { data } = await shadowPosApi.get<ProductoResponse>(endpoint, {
    params: searchParams,
  });

  return data;
};
const obtenerTodosLosProductos = async (): Promise<TodosLosProductos> => {
  const { data } = await shadowPosApi.get<TodosLosProductos>("/producto/all");

  return data;
};

const crearProducto = async (
  producto: ProductoForm,
): Promise<RespuestaProducto> => {
  const { data } = await shadowPosApi.post<RespuestaProducto>(
    `/producto`,
    producto,
  );

  return data;
};
const actualizarProducto = async (
  id: string,
  producto: ProductoForm,
): Promise<RespuestaProducto> => {
  const { data } = await shadowPosApi.patch<RespuestaProducto>(
    `/producto/${id}`,
    producto,
  );

  return data;
};
const eliminarProducto = async (id: string): Promise<RespuestaProducto> => {
  const { data } = await shadowPosApi.delete<RespuestaProducto>(
    `/producto/${id}`,
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
