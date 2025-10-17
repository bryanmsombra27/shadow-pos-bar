import { profile } from "@/actions/auth";
import useHandleErrors from "@/helpers/useHandleErrors";
import { useTokenStore } from "@/store/token";
import { useQuery } from "@tanstack/react-query";
import { type AppError } from "../../interfaces/error.interface";

const useProfile = () => {
  const { token } = useTokenStore();
  const { handleError } = useHandleErrors();

  const { data, error, isPending, isFetching } = useQuery({
    queryFn: profile,
    queryKey: ["perfil"],
    enabled: !!token,
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
    isFetching,
  };
};
export default useProfile;
