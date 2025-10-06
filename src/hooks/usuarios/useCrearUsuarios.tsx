import { crearUsuario } from "@/actions/usuarios";
import type { UsuarioResponse } from "@/interfaces/usuario.interface";
import { useUsuariosPaginacion } from "@/store/UsuariosPaginacion";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const useCrearUsuarios = () => {
  const queryClient = useQueryClient();
  const { pagination } = useUsuariosPaginacion();

  const { data, error, isPending, mutateAsync } = useMutation({
    mutationFn: crearUsuario,
    mutationKey: ["crear-usuarios"],
    onSuccess: async (value) => {
      toast.success(value.mensaje);

      await queryClient.setQueryData(
        ["usuarios", pagination],
        (state: UsuarioResponse) => {
          const total_registros = state.total_registros + 1;
          const paginaActual = Math.ceil(total_registros / 10);

          return value.usuario
            ? ({
                ...state,
                total_paginas:
                  state.total_paginas == paginaActual
                    ? state.total_paginas
                    : paginaActual,
                usuarios:
                  total_registros > 10
                    ? [value.usuario, ...state.usuarios.slice(0, 9)]
                    : [value.usuario, ...state.usuarios],
                total_registros,
              } as UsuarioResponse)
            : state;
        }
      );
    },
    onError: () => {
      toast.error(
        "No fue posible crear el usuario, probablemente el usuario ya haya sido registrado o el nombre de usuario ya no se encuentra disponible"
      );
    },
  });

  return {
    data,
    error,
    isPending,
    mutateAsync,
  };
};
export default useCrearUsuarios;
