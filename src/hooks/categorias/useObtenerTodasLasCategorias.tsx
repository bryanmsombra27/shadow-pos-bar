import { obtenerTodasLasCategorias } from "@/actions/categorias";
import useHandleErrors from "@/helpers/useHandleErrors";
import { useQuery } from "@tanstack/react-query";
import { type AppError } from "../../interfaces/error.interface";
const useObtenerTodasLasCategorias = () => {
  const { handleError } = useHandleErrors();

  const { data, error, isPending } = useQuery({
    queryFn: obtenerTodasLasCategorias,
    queryKey: ["todas-categorias"],
    retry: false,
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
export default useObtenerTodasLasCategorias;
