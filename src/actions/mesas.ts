import { shadowPosApi } from "@/api/api";
import type {
  ActualizarMesa,
  RespuestaMesa,
  MesaResponse,
  TodasLasMesas,
  ActualizarEstadoMesa,
} from "@/interfaces/mesa.interface";

const obtenerMesasAction = async (): Promise<MesaResponse> => {
  const { data } = await shadowPosApi.get<MesaResponse>("/mesas");

  return data;
};
const obtenerTodasLasMesasAction = async (): Promise<TodasLasMesas> => {
  const { data } = await shadowPosApi.get<TodasLasMesas>("/mesas/all");

  return data;
};

const crearMesaAction = async (nombre: string): Promise<RespuestaMesa> => {
  const { data } = await shadowPosApi.post<RespuestaMesa>("/mesas", {
    nombre,
  });

  return data;
};
const actualizarMesaAction = async (
  mesa_id: string,
  mesa: ActualizarMesa
): Promise<RespuestaMesa> => {
  const { data } = await shadowPosApi.patch<RespuestaMesa>(
    `/mesas/${mesa_id}`,
    {
      nombre: mesa.nombre,
      mesero_id: mesa.mesero_id,
      estado_actual: mesa.estado_actual,
      es_vip: mesa.es_vip,
    }
  );

  return data;
};
const actualizarEstadoMesa = async (
  mesa_id: string,
  estado: ActualizarEstadoMesa
) => {
  const { data } = await shadowPosApi.patch<RespuestaMesa>(
    `/mesas/${mesa_id}`,
    {
      mesa_id,
      mesero_id: estado.mesero_id,
      estado_mesa: estado.estado_actual,
    }
  );

  return data;
};

const eliminarMesaAction = async (mesa_id: string): Promise<RespuestaMesa> => {
  const { data } = await shadowPosApi.delete<RespuestaMesa>(
    `/mesas/${mesa_id}`
  );

  return data;
};

export {
  obtenerMesasAction,
  crearMesaAction,
  actualizarMesaAction,
  eliminarMesaAction,
  obtenerTodasLasMesasAction,
  actualizarEstadoMesa,
};
