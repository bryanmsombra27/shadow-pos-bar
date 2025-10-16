import { useTokenStore } from "@/store/token";
import type { AxiosError } from "axios";
import { useNavigate } from "react-router";
import { toast } from "sonner";

const useHandleErrors = () => {
  const navigate = useNavigate();
  const { setToken } = useTokenStore();

  const handleError = (
    error: AxiosError<{ error: string; message: string; statusCode: number }>
  ) => {
    if (error && error.status == 401) {
      toast.error(error.response?.data?.message);
      setToken("");
      navigate("/auth/login");
    }
  };

  return {
    handleError,
  };
};
export default useHandleErrors;
