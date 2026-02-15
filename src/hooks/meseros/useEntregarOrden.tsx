import { entregarUnaOrden } from "@/actions/ordenes";
import type { OrdenPorMeseroResponse } from "@/interfaces/orden.interface";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const useEntregarOrden = (id: string) => {
  const queryClient = useQueryClient();

  const { data, error, isPending, mutateAsync } = useMutation({
    mutationFn: (id: string) => entregarUnaOrden(id),
    onSuccess: async (value) => {
      toast.success(value.mensaje);

      await queryClient.setQueryData(
        ["ordenes-por-mesero", id],
        (state: OrdenPorMeseroResponse) => {
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
                  .filter((orden) => orden.estado_orden == "PREPARADA"),
              } as OrdenPorMeseroResponse)
            : state;
        },
      );
    },
    onError: () => {
      toast.error("No fue posible realizar la entrega de la orden");
    },
  });

  return {
    data,
    error,
    isPending,
    mutateAsync,
  };
};
export default useEntregarOrden;
