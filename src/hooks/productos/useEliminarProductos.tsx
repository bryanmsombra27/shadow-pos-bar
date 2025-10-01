import { eliminarProducto } from "@/actions/productos";
import type { ProductoResponse } from "@/interfaces/producto.interface";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

type BodyMutation = {
  id: string;
};

const useEliminarProductos = () => {
  const queryClient = useQueryClient();

  const { data, error, isPending, mutateAsync } = useMutation({
    mutationFn: ({ id }: BodyMutation) => eliminarProducto(id),
    onSuccess: async (value) => {
      toast.success(value.mensaje);

      await queryClient.setQueryData(
        ["productos"],
        (state: ProductoResponse) => {
          return value.producto
            ? ({
                ...state,
                total_registros: state.total_registros - 1,
                productos: state.productos.filter(
                  (producto) => producto.id !== value.producto.id
                ),
              } as ProductoResponse)
            : state;
        }
      );
    },
    onError: () => {
      toast.error("No fue posible eliminar el producto");
    },
  });

  return {
    data,
    error,
    isPending,
    mutateAsync,
  };
};
export default useEliminarProductos;
