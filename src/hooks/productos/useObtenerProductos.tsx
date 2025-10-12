import { obtenerProductos } from "@/actions/productos";
import { useProductosPaginacion } from "@/store/ProductosPaginacion";
import { useQuery } from "@tanstack/react-query";

const useObtenerProductos = () => {
  const { pagination } = useProductosPaginacion();

  const { data, error, isPending } = useQuery({
    queryFn: () =>
      obtenerProductos({
        page: pagination.pageIndex + 1,
        search: pagination.search,
      }),
    queryKey: ["productos", pagination],
  });

  return {
    data,
    error,
    isPending,
  };
};
export default useObtenerProductos;
