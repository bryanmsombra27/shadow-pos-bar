import { crearOrden } from "@/actions/ordenes";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { toast } from "sonner";

const useCrearOrden = () => {
  const navigate = useNavigate();
  const { data, error, isPending, mutateAsync } = useMutation({
    mutationFn: crearOrden,
    onSuccess: async (value) => {
      toast.success(value.mensaje);

      navigate("/");
    },
    onError: () => {
      toast.error("No fue posible crear la orden");
    },
  });

  return {
    data,
    error,
    isPending,
    mutateAsync,
  };
};
export default useCrearOrden;
