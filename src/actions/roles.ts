import { shadowPosApi } from "@/api/api";
import type {
  RespuestaRole,
  Role,
  RolResponse,
} from "@/interfaces/rol.interface";

const obtenerRolesPaginados = async (): Promise<RolResponse> => {
  const { data } = await shadowPosApi.get<RolResponse>("/rol");

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
