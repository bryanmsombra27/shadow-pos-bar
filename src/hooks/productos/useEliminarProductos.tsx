import { eliminarProducto } from "@/actions/productos";
import type { ProductoResponse } from "@/interfaces/producto.interface";
import { useProductosPaginacion } from "@/store/ProductosPaginacion";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

type BodyMutation = {
  id: string;
};

const useEliminarProductos = () => {
  const queryClient = useQueryClient();
  const { pagination } = useProductosPaginacion();

  const { data, error, isPending, mutateAsync } = useMutation({
    mutationFn: ({ id }: BodyMutation) => eliminarProducto(id),
    onSuccess: async (value) => {
      toast.success(value.mensaje);

      await queryClient.setQueryData(
        ["productos", pagination],
        (state: ProductoResponse) => {
          const total_registros = state.total_registros - 1;
          const paginaAnterior = Math.ceil(total_registros / 10);
          return value.producto
            ? ({
                ...state,
                total_registros,
                total_paginas:
                  state.total_paginas == paginaAnterior
                    ? state.total_paginas
                    : paginaAnterior,
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
