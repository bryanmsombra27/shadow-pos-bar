import { obtenerRolesPaginados } from "@/actions/roles";
import { useQuery } from "@tanstack/react-query";

const useObtenerRoles = () => {
  const { data, error, isPending } = useQuery({
    queryKey: ["roles"],
    queryFn: obtenerRolesPaginados,
  });

  return {
    data,
    error,
    isPending,
  };
};
export default useObtenerRoles;
