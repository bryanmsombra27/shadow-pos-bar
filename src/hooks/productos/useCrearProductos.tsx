import { crearProducto } from "@/actions/productos";
import type {
  ProductoForm,
  ProductoResponse,
} from "@/interfaces/producto.interface";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

type BodyMutation = {
  producto: ProductoForm;
};

const useCrearProductos = () => {
  const queryClient = useQueryClient();

  const { data, error, isPending, mutateAsync } = useMutation({
    mutationFn: ({ producto }: BodyMutation) => crearProducto(producto),
    onSuccess: async (value) => {
      toast.success(value.mensaje);

      await queryClient.setQueryData(
        ["productos"],
        (state: ProductoResponse) => {
          return value.producto
            ? ({
                ...state,
                total_registros: state.total_registros + 1,
                productos: [value.producto, ...state.productos],
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
