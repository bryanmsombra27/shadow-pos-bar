import { obtenerTodasLasMesasAction } from "@/actions/mesas";
import useHandleErrors from "@/helpers/useHandleErrors";
import { useQuery } from "@tanstack/react-query";
// import {AxiosError} from "axios";
import { type AppError } from "../../interfaces/error.interface";

const useTodasLasMesas = () => {
  const { handleError } = useHandleErrors();

  const { data, error, isPending } = useQuery({
    queryFn: obtenerTodasLasMesasAction,
    queryKey: ["todas-mesas"],
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
export default useTodasLasMesas;
