import { obtenerCategorias } from "@/actions/categorias";
import useHandleErrors from "@/helpers/useHandleErrors";
import { useCategoriasPaginacion } from "@/store/CategoriasPaginacion";
import { useQuery } from "@tanstack/react-query";
import { type AppError } from "../../interfaces/error.interface";

const useObtenerCategorias = () => {
  const { pagination } = useCategoriasPaginacion();
  const { handleError } = useHandleErrors();
  const { data, error, isPending } = useQuery({
    retry: false,
    queryFn: () =>
      obtenerCategorias({
        page: pagination?.pageIndex + 1,
        search: pagination.search,
      }),
    queryKey: ["categorias", pagination],
    throwOnError(error: AppError, _) {
      console.log(error, "error use query");
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
export default useObtenerCategorias;
