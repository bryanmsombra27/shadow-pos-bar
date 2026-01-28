import { shadowPosApi } from "@/api/api";
import type { BarraResponse } from "@/interfaces/barra";

const obtenerOrdenesParaBarra = async (): Promise<BarraResponse> => {
  const { data } = await shadowPosApi.get<BarraResponse>("/orden/barra");

  return data;
};

export { obtenerOrdenesParaBarra };
