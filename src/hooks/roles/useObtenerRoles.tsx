import { obtenerRolesPaginados } from "@/actions/roles";
import { useRolPaginacion } from "@/store/rolPaginacion";
import { useQuery } from "@tanstack/react-query";
import { type AppError } from "../../interfaces/error.interface";
import useHandleErrors from "@/helpers/useHandleErrors";

const useObtenerRoles = () => {
  const { pagination } = useRolPaginacion();
  const { handleError } = useHandleErrors();

  const { data, error, isPending } = useQuery({
    retry: false,
    queryKey: ["roles", pagination],
    queryFn: () =>
      obtenerRolesPaginados({
        page: pagination!.pageIndex + 1,
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
export default useObtenerRoles;
