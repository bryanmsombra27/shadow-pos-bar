import { shadowPosApi } from "@/api/api";
import type { CrearOrden } from "@/interfaces/orden.interface";

const crearOrden = async (body: CrearOrden) => {
  const { data } = await shadowPosApi.post("/orden", body);

  return data;
  1;
};

export { crearOrden };
