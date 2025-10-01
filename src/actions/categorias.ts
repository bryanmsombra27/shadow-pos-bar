import { shadowPosApi } from "@/api/api";
import type {
  CategoriaResponse,
  RespuestaCategoria,
} from "@/interfaces/categoria.interface";

const obtenerCategorias = async (): Promise<CategoriaResponse> => {
  const { data } = await shadowPosApi.get<CategoriaResponse>("/categoria");

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
};
