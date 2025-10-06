import { crearRol } from "@/actions/roles";
import type { RolResponse } from "@/interfaces/rol.interface";
import { useRolPaginacion } from "@/store/rolPaginacion";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

type BodyMutation = {
  nombre: string;
};

const useCrearRol = () => {
  const queryClient = useQueryClient();
  const { pagination } = useRolPaginacion();

  const { data, isPending, error, mutateAsync } = useMutation({
    mutationFn: ({ nombre }: BodyMutation) => crearRol(nombre),
    onSuccess: async (value) => {
      toast.success("Rol agregado con exito!");

      await queryClient.setQueryData(
        ["roles", pagination],
        (state: RolResponse) => {
          const total_registros = state.total_registros + 1;
          const paginaActual = Math.ceil(total_registros / 10);

          return value.rol
            ? ({
                ...state,
                total_registros,
                total_paginas:
                  state.total_paginas == paginaActual
                    ? state.total_paginas
                    : paginaActual,
                roles:
                  total_registros > 10
                    ? [value.rol, ...state.roles.slice(0, 9)]
                    : [value.rol, ...state.roles],
              } as RolResponse)
            : state;
        }
      );
    },
    onError: () => {
      toast.error("No fue posible crear el rol");
    },
  });

  return {
    data,
    isPending,
    error,
    mutateAsync,
  };
};
export default useCrearRol;
