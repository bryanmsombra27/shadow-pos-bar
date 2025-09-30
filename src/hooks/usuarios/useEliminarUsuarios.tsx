import { eliminarUsuarios } from "@/actions/usuarios";
import type { UsuarioResponse } from "@/interfaces/usuario.interface";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

type BodyMutation = {
  id: string;
};

const useEliminarUsuarios = () => {
  const queryClient = useQueryClient();

  const { isPending, mutateAsync } = useMutation({
    mutationFn: ({ id }: BodyMutation) => eliminarUsuarios(id),
    onSuccess: async (value) => {
      toast.success(value.mensaje);

      await queryClient.setQueryData(["usuarios"], (state: UsuarioResponse) => {
        return value.usuario
          ? ({
              ...state,
              total_registros: state.total_registros - 1,
              usuarios: state.usuarios.filter(
                (usuario) => usuario.id != value.usuario.id
              ),
            } as UsuarioResponse)
          : state;
      });
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
