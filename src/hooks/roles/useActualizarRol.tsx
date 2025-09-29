import { actualizarRol } from "@/actions/roles";
import type { RolResponse } from "@/interfaces/rol.interface";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface BodyMutation {
  id: string;
  nombre: string;
}

const useActualizarRol = () => {
  const queryClient = useQueryClient();

  const { data, isPending, error, mutateAsync } = useMutation({
    mutationFn: ({ id, nombre }: BodyMutation) => actualizarRol(id, nombre),
    onSuccess: async (value) => {
      toast.success(value.mensaje);

      await queryClient.setQueryData(["roles"], (state: RolResponse) => {
        return value.rol
          ? ({
              ...state,
              roles: state.roles.map((rol) => {
                if (rol.id == value.rol.id) {
                  return value.rol;
                }
                return rol;
              }),
            } as RolResponse)
          : state;
      });
    },
    onError: () => {
      toast.error("No fue posible actualizar el rol");
    },
  });

  return {
    data,
    isPending,
    error,
    mutateAsync,
  };
};
export default useActualizarRol;
