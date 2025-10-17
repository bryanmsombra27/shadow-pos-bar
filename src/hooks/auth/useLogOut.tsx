import { logout } from "@/actions/auth";
import { useTokenStore } from "@/store/token";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { toast } from "sonner";

const useLogOut = () => {
  const { setToken } = useTokenStore();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data, error, isPending, mutateAsync } = useMutation({
    mutationFn: logout,
    onSuccess: async (value) => {
      toast.success(value.mensaje);
      setToken("");

      queryClient.removeQueries({
        queryKey: ["profile"],
      });

      navigate("/auth/login");
    },
    onError: () => {
      toast.error("No fue posible crear la categoria");
    },
  });

  return {
    data,
    error,
    isPending,
    mutateAsync,
  };
};
export default useLogOut;
