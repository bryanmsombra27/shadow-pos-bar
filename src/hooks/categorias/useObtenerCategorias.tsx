import { obtenerCategorias } from "@/actions/categorias";
import { useQuery } from "@tanstack/react-query";

const useObtenerCategorias = () => {
  const { data, error, isPending } = useQuery({
    queryFn: obtenerCategorias,
    queryKey: ["categorias"],
  });

  return {
    data,
    error,
    isPending,
  };
};
export default useObtenerCategorias;
