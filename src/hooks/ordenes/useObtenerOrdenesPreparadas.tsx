import { obtenerTodasLasOrdenesPreparadas } from "@/actions/ordenes";
import { useQuery } from "@tanstack/react-query";

const useObtenerOrdenesPreparadas = () => {
  const { data, error, isPending } = useQuery({
    queryFn: () => obtenerTodasLasOrdenesPreparadas(),
    queryKey: ["ordenes"],
  });

  return {
    data,
    error,
    isPending,
  };
};
export default useObtenerOrdenesPreparadas;
