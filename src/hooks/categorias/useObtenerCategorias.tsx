import { obtenerCategorias } from "@/actions/categorias";
import { useCategoriasPaginacion } from "@/store/CategoriasPaginacion";
import { useQuery } from "@tanstack/react-query";

const useObtenerCategorias = () => {
  const { pagination } = useCategoriasPaginacion();

  const { data, error, isPending } = useQuery({
    queryFn: () =>
      obtenerCategorias({
        page: pagination?.pageIndex + 1,
        search: pagination.search,
      }),
    queryKey: ["categorias", pagination],
  });

  return {
    data,
    error,
    isPending,
  };
};
export default useObtenerCategorias;
