import { crearCategoria } from "@/actions/categorias";
import type { CategoriaResponse } from "@/interfaces/categoria.interface";
import { useCategoriasPaginacion } from "@/store/CategoriasPaginacion";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const useCrearCategorias = () => {
  const queryClient = useQueryClient();
  const { pagination } = useCategoriasPaginacion();

  const { data, error, isPending, mutateAsync } = useMutation({
    mutationFn: crearCategoria,
    onSuccess: async (value) => {
      toast.success(value.mensaje);

      await queryClient.setQueryData(
        ["categorias", pagination],
        (state: CategoriaResponse) => {
          const total_registros = state.total_registros + 1;
          const paginaNueva = Math.ceil(total_registros / 10);

          return value.categoria
            ? ({
                ...state,
                total_registros,
                total_paginas:
                  state.total_paginas == paginaNueva
                    ? state.total_paginas
                    : paginaNueva,
                categorias:
                  total_registros > 10
                    ? [value.categoria, ...state.categorias.slice(0, 9)]
                    : [value.categoria, ...state.categorias],
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
export default useCrearCategorias;
