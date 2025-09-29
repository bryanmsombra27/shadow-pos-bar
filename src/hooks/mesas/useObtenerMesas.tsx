import { obtenerMesasAction } from "@/actions/mesas";
import { useQuery } from "@tanstack/react-query";

const useObtenerMesas = () => {
  const { data, error, isPending } = useQuery({
    queryKey: ["Mesas"],
    queryFn: obtenerMesasAction,
    refetchOnWindowFocus: false,
  });

  return {
    data,
    error,
    isPending,
  };
};
export default useObtenerMesas;
