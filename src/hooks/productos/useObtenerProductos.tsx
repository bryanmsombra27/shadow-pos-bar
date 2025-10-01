import { obtenerProductos } from "@/actions/productos";
import { useQuery } from "@tanstack/react-query";

const useObtenerProductos = () => {
  const { data, error, isPending } = useQuery({
    queryFn: obtenerProductos,
    queryKey: ["productos"],
  });

  return {
    data,
    error,
    isPending,
  };
};
export default useObtenerProductos;
