import { actualizarCategoria } from "@/actions/categorias";
import type { CategoriaResponse } from "@/interfaces/categoria.interface";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

type BodyMutation = {
  id: string;
  nombre: string;
};

const useActualizarCategorias = () => {
  const queryClient = useQueryClient();

  const { data, error, isPending, mutateAsync } = useMutation({
    mutationFn: ({ id, nombre }: BodyMutation) =>
      actualizarCategoria(id, nombre),
    onSuccess: async (value) => {
      toast.success(value.mensaje);

      await queryClient.setQueryData(
        ["categorias"],
        (state: CategoriaResponse) => {
          return value.categoria
            ? ({
                ...state,
                categorias: state.categorias.map((categoria) => {
                  if (categoria.id == value.categoria.id) {
                    return value.categoria;
                  }
                  return categoria;
                }),
              } as CategoriaResponse)
            : state;
        }
      );
    },
    onError: () => {
      toast.error("No fue posible actualizar la categoria");
    },
  });

  return {
    data,
    error,
    isPending,
    mutateAsync,
  };
};
export default useActualizarCategorias;
