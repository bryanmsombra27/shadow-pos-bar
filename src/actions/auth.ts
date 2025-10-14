import { shadowPosApi } from "@/api/api";
import type { RespuestaLogin, Usuario } from "@/interfaces/usuario.interface";

const login = async (
  username: string,
  password: string
): Promise<RespuestaLogin> => {
  const { data } = await shadowPosApi.post<RespuestaLogin>("/auth/login", {
    usuario: username,
    password,
  });

  return data;
};

const profile = async (): Promise<Usuario> => {
  const { data } = await shadowPosApi.get("/auth/profile");

  return data;
};

const logout = async (): Promise<{ mensaje: string }> => {
  const { data } = await shadowPosApi.post<{ mensaje: string }>("/auth/logout");
  return data;
};

export { login, profile, logout };
