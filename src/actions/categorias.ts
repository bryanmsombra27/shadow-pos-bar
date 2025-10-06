import { shadowPosApi } from "@/api/api";
import type {
  CategoriaResponse,
  RespuestaCategoria,
  TodasLasCategorias,
} from "@/interfaces/categoria.interface";
import type { Pagination } from "@/interfaces/paginacion.interface";

const obtenerCategorias = async (
  pagination?: Pagination
): Promise<CategoriaResponse> => {
  let endpoint = "/categoria";

  if (pagination?.page && pagination.search) {
    endpoint = endpoint.concat(
      `?page=${pagination.page}&search=${pagination.search}`
    );
  } else if (pagination?.page) {
    endpoint = endpoint.concat(`?page=${pagination.page}`);
  } else if (pagination?.search) {
    endpoint = endpoint.concat(`?search=${pagination?.search}`);
  }

  const { data } = await shadowPosApi.get<CategoriaResponse>(endpoint);

  return data;
};
const obtenerTodasLasCategorias = async (): Promise<TodasLasCategorias> => {
  const { data } = await shadowPosApi.get<TodasLasCategorias>("/categoria/all");

  return data;
};

const crearCategoria = async (nombre: string): Promise<RespuestaCategoria> => {
  const { data } = await shadowPosApi.post<RespuestaCategoria>("/categoria", {
    nombre,
  });

  return data;
};
const actualizarCategoria = async (
  id: string,
  nombre: string
): Promise<RespuestaCategoria> => {
  const { data } = await shadowPosApi.patch<RespuestaCategoria>(
    `/categoria/${id}`,
    {
      nombre,
    }
  );

  return data;
};
const eliminarCategoria = async (id: string): Promise<RespuestaCategoria> => {
  const { data } = await shadowPosApi.delete<RespuestaCategoria>(
    `/categoria/${id}`
  );

  return data;
};

export {
  obtenerCategorias,
  crearCategoria,
  actualizarCategoria,
  eliminarCategoria,
  obtenerTodasLasCategorias,
};
