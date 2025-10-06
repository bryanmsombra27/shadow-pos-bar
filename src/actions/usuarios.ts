import { shadowPosApi } from "@/api/api";
import type { Pagination } from "@/interfaces/paginacion.interface";
import type {
  RespuestaUsuario,
  Usuario,
  UsuarioResponse,
} from "@/interfaces/usuario.interface";

type CrearUsuario = {
  nombre_completo: string;
  nombre_usuario: string;
  contrasena: string;
  telefono: string;
  rol_id: string;
};
export type ActualizarUsuario = Omit<CrearUsuario, "contrasena">;

const crearUsuario = async (body: CrearUsuario): Promise<RespuestaUsuario> => {
  const { data } = await shadowPosApi.post<RespuestaUsuario>("/usuario", body);

  return data;
};
const actualizarUsuario = async (
  id: string,
  body: ActualizarUsuario
): Promise<RespuestaUsuario> => {
  const { data } = await shadowPosApi.patch<RespuestaUsuario>(
    `/usuario/${id}`,
    body
  );

  return data;
};

const obtenerUsuarios = async (
  pagination?: Pagination
): Promise<UsuarioResponse> => {
  let endpoint = "/usuario";

  if (pagination?.page && pagination.search) {
    endpoint = endpoint.concat(
      `?page=${pagination.page}&search=${pagination.search}`
    );
  } else if (pagination?.page) {
    endpoint = endpoint.concat(`?page=${pagination.page}`);
  } else if (pagination?.search) {
    endpoint = endpoint.concat(`?search=${pagination?.search}`);
  }

  const { data } = await shadowPosApi.get<UsuarioResponse>(endpoint);

  return data;
};
const eliminarUsuarios = async (id: string): Promise<RespuestaUsuario> => {
  const { data } = await shadowPosApi.delete<RespuestaUsuario>(
    `/usuario/${id}`
  );

  return data;
};

const obtenerMeseros = async (): Promise<{ meseros: Usuario[] }> => {
  const { data } = await shadowPosApi.get<{ meseros: Usuario[] }>(
    "/usuario/meseros"
  );

  return data;
};

export {
  obtenerUsuarios,
  crearUsuario,
  actualizarUsuario,
  eliminarUsuarios,
  obtenerMeseros,
};
