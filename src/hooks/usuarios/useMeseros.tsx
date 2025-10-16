import { obtenerMeseros } from "@/actions/usuarios";
import { useQuery } from "@tanstack/react-query";
import { type AppError } from "../../interfaces/error.interface";
import useHandleErrors from "@/helpers/useHandleErrors";

const useMeseros = () => {
  const { handleError } = useHandleErrors();
  const { data, error, isPending } = useQuery({
    retry: false,
    queryFn: obtenerMeseros,
    queryKey: ["meseros"],
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
export default useMeseros;
