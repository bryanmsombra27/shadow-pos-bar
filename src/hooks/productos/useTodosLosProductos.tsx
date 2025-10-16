import { obtenerTodosLosProductos } from "@/actions/productos";
import { useQuery } from "@tanstack/react-query";
import { type AppError } from "../../interfaces/error.interface";
import useHandleErrors from "@/helpers/useHandleErrors";

const useTodosLosProductos = () => {
  const { handleError } = useHandleErrors();
  const { data, error, isPending } = useQuery({
    retry: false,
    queryFn: obtenerTodosLosProductos,
    queryKey: ["todos-productos"],
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
export default useTodosLosProductos;
