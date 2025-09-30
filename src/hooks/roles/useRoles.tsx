import { obtenerRolesSinPaginacion } from "@/actions/roles";
import { useQuery } from "@tanstack/react-query";

const useRoles = () => {
  const { data, error, isPending } = useQuery({
    queryKey: ["todos-roles"],
    queryFn: obtenerRolesSinPaginacion,
  });

  return {
    data,
    error,
    isPending,
  };
};
export default useRoles;
