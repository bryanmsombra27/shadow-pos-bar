import { obtenerTodasLasOrdenes } from "@/actions/ordenes";
import { useQuery } from "@tanstack/react-query";

const useObtenerOrdenes = () => {
  const { data, error, isPending } = useQuery({
    queryFn: () => obtenerTodasLasOrdenes(),
    queryKey: ["ordenes"],
  });

  return {
    data,
    error,
    isPending,
  };
};
export default useObtenerOrdenes;
