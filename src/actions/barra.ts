import { shadowPosApi } from "@/api/api";
import type {
  BarraOrdenStatusResponse,
  BarraResponse,
} from "@/interfaces/barra";

const obtenerOrdenesParaBarra = async (): Promise<BarraResponse> => {
  const { data } = await shadowPosApi.get<BarraResponse>("/orden/barra");

  return data;
};

const ordenCompletadaBarra = async (
  id: string,
): Promise<BarraOrdenStatusResponse> => {
  const { data } = await shadowPosApi.patch<BarraOrdenStatusResponse>(
    `/orden/preparada/${id}`,
  );

  return data;
};

export { obtenerOrdenesParaBarra, ordenCompletadaBarra };
