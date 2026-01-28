import { ordenCompletadaBarra } from "@/actions/barra";
import type { BarraResponse } from "@/interfaces/barra";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const useCompletarOrdenBarra = () => {
  const queryClient = useQueryClient();

  const { data, error, isPending, mutateAsync } = useMutation({
    mutationFn: (id: string) => ordenCompletadaBarra(id),
    onSuccess: async (value) => {
      toast.success(value.mensaje);

      await queryClient.setQueryData(
        ["ordenes-barra"],
        (state: BarraResponse) => {
          return value.orden
            ? ({
                ...state,
                ordenes: state.ordenes
                  .map((orden) => {
                    if (orden.id == value.orden.id) {
                      return value.orden;
                    }
                    return orden;
                  })
                  .filter((orden) => orden.estado_orden == "PENDIENTE"),
              } as BarraResponse)
            : state;
        },
      );
    },
    onError: () => {
      toast.error("No fue posible completar la orden");
    },
  });

  return {
    data,
    error,
    isPending,
    mutateAsync,
  };
};
export default useCompletarOrdenBarra;
