import { obtenerUsuarios } from "@/actions/usuarios";
import { useUsuariosPaginacion } from "@/store/UsuariosPaginacion";
import { useQuery } from "@tanstack/react-query";
import { type AppError } from "../../interfaces/error.interface";
import useHandleErrors from "@/helpers/useHandleErrors";

const useObtenerUsuarios = () => {
  const { pagination } = useUsuariosPaginacion();
  const { handleError } = useHandleErrors();

  const { data, error, isPending } = useQuery({
    queryKey: ["usuarios", pagination],
    retry: false,
    queryFn: () =>
      obtenerUsuarios({
        page: pagination.pageIndex + 1,
        search: pagination.search,
      }),
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
export default useObtenerUsuarios;
