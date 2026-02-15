import { ObtenerOrdenesPorMesero } from "@/actions/ordenes";
import { useQuery } from "@tanstack/react-query";
import { type AppError } from "../../interfaces/error.interface";
import useHandleErrors from "@/helpers/useHandleErrors";

const useObtenerOrdenesPorMesero = (id: string) => {
  const { handleError } = useHandleErrors();

  const { data, error, isPending } = useQuery({
    queryFn: () => ObtenerOrdenesPorMesero(id),
    queryKey: ["ordenes-por-mesero", id],
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
export default useObtenerOrdenesPorMesero;
