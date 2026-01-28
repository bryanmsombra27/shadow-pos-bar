import { obtenerOrdenesParaBarra } from "@/actions/barra";
import { useQuery } from "@tanstack/react-query";

const useObtenerOrdenesBarra = () => {
  const { data, error, isPending } = useQuery({
    queryFn: obtenerOrdenesParaBarra,
    queryKey: ["ordenes-barra"],
  });

  return {
    data,
    error,
    isPending,
  };
};
export default useObtenerOrdenesBarra;
