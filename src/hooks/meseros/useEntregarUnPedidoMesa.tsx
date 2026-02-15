import { completarUnaEntregaDeUnaOrden } from "@/actions/ordenes";
import type { OrdenPorMeseroResponse } from "@/interfaces/orden.interface";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const useEntregarUnPedidoMesa = (id: string) => {
  const queryClient = useQueryClient();

  const { data, error, isPending, mutateAsync } = useMutation({
    mutationFn: (id: string) => completarUnaEntregaDeUnaOrden(id),
    onSuccess: async (value) => {
      toast.success(value.mensaje);

      await queryClient.setQueryData(
        ["ordenes-por-mesero", id],
        (state: OrdenPorMeseroResponse) => {
          return value.pedido
            ? ({
                ...state,
                ordenes: state.ordenes.map((orden) => {
                  if (orden.id == value.pedido.orden_id) {
                    return {
                      ...orden,
                      pedidos: orden.pedidos.map((pedido) => {
                        if (pedido.id == value.pedido.id) {
                          return value.pedido;
                        }
                        return pedido;
                      }),
                    };
                  }
                  return orden;
                }),
              } as OrdenPorMeseroResponse)
            : state;
        },
      );
    },
    onError: () => {
      toast.error("No fue posible entregar el pedido");
    },
  });

  return {
    data,
    error,
    isPending,
    mutateAsync,
  };
};
export default useEntregarUnPedidoMesa;
