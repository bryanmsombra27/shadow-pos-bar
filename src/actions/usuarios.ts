import { shadowPosApi } from "@/api/api";
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

const obtenerUsuarios = async (): Promise<UsuarioResponse> => {
  const { data } = await shadowPosApi.get<UsuarioResponse>("/usuario");

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
