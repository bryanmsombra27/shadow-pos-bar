import { completarUnPedidoDeUnaOrden } from "@/actions/ordenes";
import type { BarraResponse } from "@/interfaces/barra";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const useCompletarPedidoDeOrden = () => {
  const queryClient = useQueryClient();

  const { data, error, isPending, mutateAsync } = useMutation({
    mutationFn: (id: string) => completarUnPedidoDeUnaOrden(id),
    onSuccess: async (value) => {
      toast.success(value.mensaje);

      await queryClient.setQueryData(
        ["ordenes-barra"],
        (state: BarraResponse) => {
          if (value.pedido) {
            const orden = state.ordenes.find(
              (orden) => orden.id == value.pedido.orden_id,
            );
            const pedidos = orden?.pedidos.map((pedido) => {
              if (pedido.id == value.pedido.id) {
                return {
                  ...pedido,
                  preparado: true,
                };
              }
              return pedido;
            });
            const ordenes = state.ordenes.map((orden) => {
              if (orden.id == value.pedido.orden_id) {
                return {
                  ...orden,
                  pedidos,
                };
              }
              return orden;
            });

            return {
              ...state,
              ordenes,
            };
          }

          return state;
        },
      );
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
export default useCompletarPedidoDeOrden;
