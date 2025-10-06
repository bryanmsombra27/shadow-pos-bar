import { eliminarRol } from "@/actions/roles";
import type { RolResponse } from "@/interfaces/rol.interface";
import { useRolPaginacion } from "@/store/rolPaginacion";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface BodyMutation {
  id: string;
}

const useEliminarRol = () => {
  const queryClient = useQueryClient();
  const { pagination } = useRolPaginacion();

  const { data, error, mutateAsync } = useMutation({
    mutationFn: ({ id }: BodyMutation) => eliminarRol(id),
    onSuccess: async (value) => {
      toast.success(value.mensaje);

      await queryClient.setQueryData(
        ["roles", pagination],
        (state: RolResponse) => {
          const total_registros = state.total_registros - 1;
          const paginaActual = Math.ceil(total_registros / 10);

          return value.rol
            ? ({
                ...state,
                total_registros,
                roles: state.roles.filter((rol) => rol.id != value.rol.id),
                total_paginas:
                  state.total_paginas == paginaActual
                    ? state.total_paginas
                    : paginaActual,
              } as RolResponse)
            : state;
        }
      );
    },
    onError: () => {
      toast.error(
        "No fue posible eliminar el rol, es probable que ya este asignado a un usuario"
      );
    },
  });

  return {
    data,
    error,
    mutateAsync,
  };
};
export default useEliminarRol;
