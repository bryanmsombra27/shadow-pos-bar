import { obtenerUnaOrdenPreparada } from "@/actions/ordenes";
import { useQuery } from "@tanstack/react-query";

const useObtenerOrdenPreparada = (id: string) => {
  const { data, error, isPending } = useQuery({
    queryFn: () => obtenerUnaOrdenPreparada(id),
    queryKey: ["orden", id],
    enabled: !!id,
  });

  return {
    data,
    error,
    isPending,
  };
};
export default useObtenerOrdenPreparada;
