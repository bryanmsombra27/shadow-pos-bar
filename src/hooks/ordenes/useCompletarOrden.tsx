import { completarOrden } from "@/actions/ordenes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const useCompletarOrden = () => {
  const queryClient = useQueryClient();

  const { data, error, isPending, mutateAsync } = useMutation({
    mutationFn: completarOrden,
    onSuccess: async (value) => {
      toast.success(value.mensaje);

      await queryClient.invalidateQueries({
        queryKey: ["todas-mesas"],
      });
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
export default useCompletarOrden;
