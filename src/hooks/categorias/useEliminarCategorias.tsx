import { eliminarCategoria } from "@/actions/categorias";
import type { CategoriaResponse } from "@/interfaces/categoria.interface";
import { useCategoriasPaginacion } from "@/store/CategoriasPaginacion";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface BodyMutation {
  id: string;
}

const useEliminarCategorias = () => {
  const queryClient = useQueryClient();
  const { pagination } = useCategoriasPaginacion();

  const { data, error, isPending, mutateAsync } = useMutation({
    mutationFn: ({ id }: BodyMutation) => eliminarCategoria(id),
    onSuccess: async (value) => {
      toast.success(value.mensaje);

      await queryClient.setQueryData(
        ["categorias", pagination],
        (state: CategoriaResponse) => {
          const total_registros = state.total_registros - 1;
          const paginaAnterior = Math.ceil(total_registros / 10);

          return value.categoria
            ? ({
                ...state,
                total_registros,
                total_paginas:
                  state.total_paginas == paginaAnterior
                    ? state.total_paginas
                    : paginaAnterior,
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
