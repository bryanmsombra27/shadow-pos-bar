import { shadowPosApi } from "@/api/api";
import type {
  CrearOrden,
  OrdenPorMesa,
  OrdenPorMeseroResponse,
  PedidoCompletadoResponse,
} from "@/interfaces/orden.interface";

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

const completarUnPedidoDeUnaOrden = async (
  id: string,
): Promise<PedidoCompletadoResponse> => {
  const { data } = await shadowPosApi.patch<PedidoCompletadoResponse>(
    `/orden/completar-un-pedido/${id}`,
  );

  return data;
};
const ObtenerOrdenesPorMesero = async (
  id: string,
): Promise<OrdenPorMeseroResponse> => {
  const { data } = await shadowPosApi.get<OrdenPorMeseroResponse>(
    `/orden/mesero/${id}`,
  );

  return data;
};

export {
  crearOrden,
  obtenerOrdenPorMesa,
  completarOrden,
  completarUnPedidoDeUnaOrden,
  ObtenerOrdenesPorMesero,
};
