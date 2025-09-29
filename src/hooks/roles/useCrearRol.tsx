import { crearRol } from "@/actions/roles";
import type { RolResponse } from "@/interfaces/rol.interface";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

type BodyMutation = {
  nombre: string;
};

const useCrearRol = () => {
  const queryClient = useQueryClient();

  const { data, isPending, error, mutateAsync } = useMutation({
    mutationFn: ({ nombre }: BodyMutation) => crearRol(nombre),
    onSuccess: async (value) => {
      toast.success("Rol agregado con exito!");

      await queryClient.setQueryData(["roles"], (state: RolResponse) => {
        return value.rol
          ? ({
              ...state,
              total_registros: state.total_registros + 1,
              roles: [...state.roles, value.rol],
            } as RolResponse)
          : state;
      });
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
