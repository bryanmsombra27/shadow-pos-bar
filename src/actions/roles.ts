import { shadowPosApi } from "@/api/api";
import type { Pagination } from "@/interfaces/paginacion.interface";
import type {
  RespuestaRole,
  Role,
  RolResponse,
} from "@/interfaces/rol.interface";

const obtenerRolesPaginados = async (
  pagination?: Pagination
): Promise<RolResponse> => {
  let endpoint = "/rol";

  if (pagination?.page && pagination.search) {
    endpoint = endpoint.concat(
      `?page=${pagination.page}&search=${pagination.search}`
    );
  } else if (pagination?.page) {
    endpoint = endpoint.concat(`?page=${pagination.page}`);
  } else if (pagination?.search) {
    endpoint = endpoint.concat(`?search=${pagination?.search}`);
  }

  const { data } = await shadowPosApi.get<RolResponse>(endpoint);

  return data;
};

const crearRol = async (nombre: string): Promise<RespuestaRole> => {
  const { data } = await shadowPosApi.post<RespuestaRole>("/rol", {
    nombre,
  });

  return data;
};
const actualizarRol = async (
  id: string,
  nombre: string
): Promise<RespuestaRole> => {
  const { data } = await shadowPosApi.patch<RespuestaRole>(`/rol/${id}`, {
    nombre,
  });

  return data;
};

const eliminarRol = async (id: string): Promise<RespuestaRole> => {
  const { data } = await shadowPosApi.delete<RespuestaRole>(`/rol/${id}`);

  return data;
};

const obtenerRolesSinPaginacion = async (): Promise<{ roles: Role[] }> => {
  const { data } = await shadowPosApi.get<{ roles: Role[] }>("/rol/all");

  return data;
};

export {
  obtenerRolesPaginados,
  crearRol,
  actualizarRol,
  eliminarRol,
  obtenerRolesSinPaginacion,
};
