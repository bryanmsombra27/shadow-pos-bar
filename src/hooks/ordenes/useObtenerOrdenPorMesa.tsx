import { obtenerOrdenPorMesa } from "@/actions/ordenes";
import { useQuery } from "@tanstack/react-query";

const useObtenerOrdenPorMesa = (id: string) => {
  const { data, error, isPending } = useQuery({
    queryFn: () => obtenerOrdenPorMesa(id),
    queryKey: ["orden-mesa", id],
    enabled: !!id,
  });

  return {
    data,
    error,
    isPending,
  };
};
export default useObtenerOrdenPorMesa;
