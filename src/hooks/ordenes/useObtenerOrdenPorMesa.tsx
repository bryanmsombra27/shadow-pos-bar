import { obtenerOrdenPorMesa } from "@/actions/ordenes";
import { useQuery } from "@tanstack/react-query";
import { type AppError } from "../../interfaces/error.interface";
import useHandleErrors from "@/helpers/useHandleErrors";

// ESTA IMPLEMENTACION PODRIA REMOVERLA DEL BACKEND Y FRONTEND PORQUE YA CAMBIE LA FORMA DE MOSTRAR LOS DATOS DE LAS ORDENES TENER ENCUENTA
const useObtenerOrdenPorMesa = (id: string) => {
  const { handleError } = useHandleErrors();
  const { data, error, isPending } = useQuery({
    retry: false,
    queryFn: () => obtenerOrdenPorMesa(id),
    queryKey: ["orden-mesa", id],
    enabled: !!id,
    throwOnError(error: AppError, _) {
      handleError(error);
      return false;
    },
  });

  return {
    data,
    error,
    isPending,
  };
};
export default useObtenerOrdenPorMesa;
