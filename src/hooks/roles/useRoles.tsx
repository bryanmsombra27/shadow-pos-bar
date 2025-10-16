import { obtenerRolesSinPaginacion } from "@/actions/roles";
import { useQuery } from "@tanstack/react-query";
import { type AppError } from "../../interfaces/error.interface";
import useHandleErrors from "@/helpers/useHandleErrors";

const useRoles = () => {
  const { handleError } = useHandleErrors();
  const { data, error, isPending } = useQuery({
    retry: false,
    queryKey: ["todos-roles"],
    queryFn: obtenerRolesSinPaginacion,
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
export default useRoles;
