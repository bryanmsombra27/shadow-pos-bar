import { obtenerMesasAction } from "@/actions/mesas";
import type { Pagination } from "@/interfaces/paginacion.interface";
import { useQuery } from "@tanstack/react-query";

const useObtenerMesas = (pagination?: Pagination) => {
  const { data, error, isPending } = useQuery({
    queryKey: ["Mesas", pagination],
    queryFn: () => obtenerMesasAction(pagination),
    refetchOnWindowFocus: false,
  });

  return {
    data,
    error,
    isPending,
  };
};
export default useObtenerMesas;
