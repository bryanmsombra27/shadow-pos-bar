import { login } from "@/actions/auth";
import { useTokenStore } from "@/store/token";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { toast } from "sonner";

interface MutationBody {
  usuario: string;
  password: string;
}

const useLogin = () => {
  const { setToken } = useTokenStore();
  const navigate = useNavigate();

  const { data, error, isPending, mutateAsync } = useMutation({
    mutationFn: ({ password, usuario }: MutationBody) =>
      login(usuario, password),
    onSuccess: async (value) => {
      toast.success(value.mensaje);
      setToken(value.token);

      navigate("/");
    },
    onError: () => {
      toast.error("No fue posible iniciar sesion");
    },
  });

  return {
    data,
    error,
    isPending,
    mutateAsync,
  };
};
export default useLogin;
