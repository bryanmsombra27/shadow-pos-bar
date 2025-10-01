import { obtenerTodasLasCategorias } from "@/actions/categorias";
import { useQuery } from "@tanstack/react-query";

const useObtenerTodasLasCategorias = () => {
  const { data, error, isPending } = useQuery({
    queryFn: obtenerTodasLasCategorias,
    queryKey: ["todas-categorias"],
  });

  return {
    data,
    error,
    isPending,
  };
};
export default useObtenerTodasLasCategorias;
