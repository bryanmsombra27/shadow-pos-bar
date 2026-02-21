import { shadowPosApi } from "@/api/api";
import type {
  CrearOrden,
  Orden,
  OrdenEntregadaResponse,
  OrdenesResponse,
  OrdenPorMesa,
  OrdenPorMeseroResponse,
  PedidoCompletadoResponse,
  PedidoEntregadoResponse,
} from "@/interfaces/orden.interface";
import type { Pagination } from "@/interfaces/paginacion.interface";

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

const completarUnaEntregaDeUnaOrden = async (
  id: string,
): Promise<PedidoEntregadoResponse> => {
  const { data } = await shadowPosApi.patch<PedidoEntregadoResponse>(
    `/orden/completar-una-entrega/${id}`,
  );

  return data;
};
const entregarUnaOrden = async (
  id: string,
): Promise<OrdenEntregadaResponse> => {
  const { data } = await shadowPosApi.patch<OrdenEntregadaResponse>(
    `/orden/entregada/${id}`,
  );

  return data;
};

const obtenerTodasLasOrdenes = async (
  pagination?: Pagination,
): Promise<OrdenesResponse> => {
  const searchParams = new URLSearchParams();

  if (pagination?.page) {
    searchParams.append("page", pagination.page.toString());
  }
  if (pagination?.search) {
    searchParams.append("search", pagination.search);
  }

  const { data } = await shadowPosApi.get<OrdenesResponse>("/orden", {
    params: searchParams,
  });
  return data;
};
const obtenerTodasLasOrdenesPreparadas = async (
  pagination?: Pagination,
): Promise<OrdenesResponse> => {
  const searchParams = new URLSearchParams();

  if (pagination?.page) {
    searchParams.append("page", pagination.page.toString());
  }
  if (pagination?.search) {
    searchParams.append("search", pagination.search);
  }

  const { data } = await shadowPosApi.get<OrdenesResponse>(
    "/orden/preparadas",
    {
      params: searchParams,
    },
  );
  return data;
};

const obtenerUnaOrdenPreparada = async (id: string): Promise<Orden> => {
  const { data } = await shadowPosApi.get<Orden>(`orden/preparada/${id}`);
  return data;
};

const obtenerOrden = async (id: string): Promise<Orden> => {
  const { data } = await shadowPosApi.get<Orden>(`orden/${id}`);

  return data;
};

export {
  crearOrden,
  obtenerOrdenPorMesa,
  completarOrden,
  completarUnPedidoDeUnaOrden,
  ObtenerOrdenesPorMesero,
  completarUnaEntregaDeUnaOrden,
  entregarUnaOrden,
  obtenerTodasLasOrdenes,
  obtenerTodasLasOrdenesPreparadas,
  obtenerUnaOrdenPreparada,
  obtenerOrden,
};
