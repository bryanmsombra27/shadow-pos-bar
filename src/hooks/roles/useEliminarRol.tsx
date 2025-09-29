import { eliminarRol } from "@/actions/roles";
import type { RolResponse } from "@/interfaces/rol.interface";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface BodyMutation {
  id: string;
}

const useEliminarRol = () => {
  const queryClient = useQueryClient();
  const { data, error, mutateAsync } = useMutation({
    mutationFn: ({ id }: BodyMutation) => eliminarRol(id),
    onSuccess: async (value) => {
      toast.success(value.mensaje);

      await queryClient.setQueryData(["roles"], (state: RolResponse) => {
        return value.rol
          ? ({
              ...state,
              total_registros: state.total_registros - 1,
              roles: state.roles.filter((rol) => rol.id != value.rol.id),
            } as RolResponse)
          : state;
      });
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
