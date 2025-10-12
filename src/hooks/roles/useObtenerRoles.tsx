import { obtenerRolesPaginados } from "@/actions/roles";
import { useRolPaginacion } from "@/store/rolPaginacion";
import { useQuery } from "@tanstack/react-query";

const useObtenerRoles = () => {
  const { pagination } = useRolPaginacion();

  const { data, error, isPending } = useQuery({
    queryKey: ["roles", pagination],
    queryFn: () =>
      obtenerRolesPaginados({
        page: pagination!.pageIndex + 1,
        search: pagination.search,
      }),
  });

  return {
    data,
    error,
    isPending,
  };
};
export default useObtenerRoles;
