import { eliminarUsuarios } from "@/actions/usuarios";
import type { UsuarioResponse } from "@/interfaces/usuario.interface";
import { useUsuariosPaginacion } from "@/store/UsuariosPaginacion";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

type BodyMutation = {
  id: string;
};

const useEliminarUsuarios = () => {
  const queryClient = useQueryClient();
  const { pagination } = useUsuariosPaginacion();

  const { isPending, mutateAsync } = useMutation({
    mutationFn: ({ id }: BodyMutation) => eliminarUsuarios(id),
    onSuccess: async (value) => {
      toast.success(value.mensaje);

      await queryClient.setQueryData(
        ["usuarios", pagination],
        (state: UsuarioResponse) => {
          const total_registros = state.total_registros - 1;
          const paginaActual = Math.ceil(total_registros / 10);

          return value.usuario
            ? ({
                ...state,
                total_registros,
                usuarios: state.usuarios.filter(
                  (usuario) => usuario.id != value.usuario.id
                ),
                total_paginas:
                  state.total_paginas == paginaActual
                    ? state.total_paginas
                    : paginaActual,
              } as UsuarioResponse)
            : state;
        }
      );
    },
    onError: () => {
      toast.error("No fue posible eliminar el usuario");
    },
  });

  return {
    isPending,
    mutateAsync,
  };
};
export default useEliminarUsuarios;
