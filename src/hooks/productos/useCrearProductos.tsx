import { crearProducto } from "@/actions/productos";
import type {
  ProductoForm,
  ProductoResponse,
} from "@/interfaces/producto.interface";
import { useProductosPaginacion } from "@/store/ProductosPaginacion";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

type BodyMutation = {
  producto: ProductoForm;
};

const useCrearProductos = () => {
  const queryClient = useQueryClient();
  const { pagination } = useProductosPaginacion();

  const { data, error, isPending, mutateAsync } = useMutation({
    mutationFn: ({ producto }: BodyMutation) => crearProducto(producto),
    onSuccess: async (value) => {
      toast.success(value.mensaje);

      await queryClient.setQueryData(
        ["productos", pagination],
        (state: ProductoResponse) => {
          const total_registros = state.total_registros + 1;
          const paginaNueva = Math.ceil(total_registros / 10);

          return value.producto
            ? ({
                ...state,
                total_registros,
                total_paginas:
                  state.total_paginas == paginaNueva
                    ? state.total_paginas
                    : paginaNueva,
                productos:
                  total_registros > 10
                    ? [value.producto, ...state.productos.slice(0, 9)]
                    : [value.producto, ...state.productos],
              } as ProductoResponse)
            : state;
        }
      );
    },
    onError: () => {
      toast.error("No fue posible crear el producto");
    },
  });

  return {
    data,
    error,
    isPending,
    mutateAsync,
  };
};
export default useCrearProductos;
