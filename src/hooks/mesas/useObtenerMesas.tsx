import { obtenerMesasAction } from "@/actions/mesas";
import type { Pagination } from "@/interfaces/paginacion.interface";
import { useQuery } from "@tanstack/react-query";
import { type AppError } from "../../interfaces/error.interface";
import useHandleErrors from "@/helpers/useHandleErrors";

const useObtenerMesas = (pagination?: Pagination) => {
  const { handleError } = useHandleErrors();

  const { data, error, isPending } = useQuery({
    queryKey: ["Mesas", pagination],
    retry: false,
    queryFn: () => obtenerMesasAction(pagination),
    refetchOnWindowFocus: false,
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
export default useObtenerMesas;
