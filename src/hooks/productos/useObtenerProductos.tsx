import { obtenerProductos } from "@/actions/productos";
import { useProductosPaginacion } from "@/store/ProductosPaginacion";
import { useQuery } from "@tanstack/react-query";
import { type AppError } from "../../interfaces/error.interface";
import useHandleErrors from "@/helpers/useHandleErrors";

const useObtenerProductos = () => {
  const { pagination } = useProductosPaginacion();
  const { handleError } = useHandleErrors();

  const { data, error, isPending } = useQuery({
    retry: false,
    queryFn: () =>
      obtenerProductos({
        page: pagination.pageIndex + 1,
        search: pagination.search,
        category: pagination.category,
      }),
    queryKey: ["productos", pagination],
    throwOnError(error: AppError, _) {
      handleError(error);
      return false;
    },
  });

  return {
    data,
    error,
    isPending,
  };
};
export default useObtenerProductos;
