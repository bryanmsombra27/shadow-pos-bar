import { eliminarCategoria } from "@/actions/categorias";
import type { CategoriaResponse } from "@/interfaces/categoria.interface";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface BodyMutation {
  id: string;
}

const useEliminarCategorias = () => {
  const queryClient = useQueryClient();

  const { data, error, isPending, mutateAsync } = useMutation({
    mutationFn: ({ id }: BodyMutation) => eliminarCategoria(id),
    onSuccess: async (value) => {
      toast.success(value.mensaje);

      await queryClient.setQueryData(
        ["categorias"],
        (state: CategoriaResponse) => {
          return value.categoria
            ? ({
                ...state,
                total_registros: state.total_registros - 1,
                categorias: state.categorias.filter(
                  (categoria) => categoria.id != value.categoria.id
                ),
              } as CategoriaResponse)
            : state;
        }
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
export default useEliminarCategorias;
