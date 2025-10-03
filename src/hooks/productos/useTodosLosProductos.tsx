import { obtenerTodosLosProductos } from "@/actions/productos";
import { useQuery } from "@tanstack/react-query";

const useTodosLosProductos = () => {
  const { data, error, isPending } = useQuery({
    queryFn: obtenerTodosLosProductos,
    queryKey: ["todos-productos"],
  });

  return {
    data,
    error,
    isPending,
  };
};
export default useTodosLosProductos;
