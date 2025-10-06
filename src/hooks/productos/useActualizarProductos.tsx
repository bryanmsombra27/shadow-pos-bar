import { actualizarProducto } from "@/actions/productos";
import type {
  ProductoForm,
  ProductoResponse,
} from "@/interfaces/producto.interface";
import { useProductosPaginacion } from "@/store/ProductosPaginacion";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

type BodyMutation = {
  id: string;
  producto: ProductoForm;
};

const useActualizarProductos = () => {
  const queryClient = useQueryClient();
  const { pagination } = useProductosPaginacion();

  const { data, error, isPending, mutateAsync } = useMutation({
    mutationFn: ({ id, producto }: BodyMutation) =>
      actualizarProducto(id, producto),
    onSuccess: async (value) => {
      toast.success(value.mensaje);

      await queryClient.setQueryData(
        ["productos", pagination],
        (state: ProductoResponse) => {
          return value.producto
            ? ({
                ...state,
                productos: state.productos.map((producto) => {
                  if (producto.id == value.producto.id) {
                    return value.producto;
                  }
                  return producto;
                }),
              } as ProductoResponse)
            : state;
        }
      );
    },
    onError: () => {
      toast.error("No fue posible actualizar el producto");
    },
  });

  return {
    data,
    error,
    isPending,
    mutateAsync,
  };
};
export default useActualizarProductos;
