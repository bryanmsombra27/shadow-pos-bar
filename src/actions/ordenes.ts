import { shadowPosApi } from "@/api/api";
import type { CrearOrden, OrdenPorMesa } from "@/interfaces/orden.interface";

const crearOrden = async (body: CrearOrden) => {
  const { data } = await shadowPosApi.post("/orden", body);

  return data;
};

const obtenerOrdenPorMesa = async (id: string): Promise<OrdenPorMesa> => {
  const { data } = await shadowPosApi.get<OrdenPorMesa>(`/orden/mesa/${id}`);

  return data;
};

const completarOrden = async (id: string) => {
  const { data } = await shadowPosApi.patch(`/orden/completado/${id}`);

  return data;
};

export { crearOrden, obtenerOrdenPorMesa, completarOrden };
