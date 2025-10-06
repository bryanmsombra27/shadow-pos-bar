import { actualizarUsuario, type ActualizarUsuario } from "@/actions/usuarios";
import type { UsuarioResponse } from "@/interfaces/usuario.interface";
import { useUsuariosPaginacion } from "@/store/UsuariosPaginacion";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

type BodyMutation = {
  id: string;
  usuario: ActualizarUsuario;
};

const useActualizarUsuarios = () => {
  const queryClient = useQueryClient();
  const { pagination } = useUsuariosPaginacion();

  const { isPending, mutateAsync } = useMutation({
    mutationFn: ({ id, usuario }: BodyMutation) =>
      actualizarUsuario(id, usuario),
    onSuccess: async (value) => {
      toast.success(value.mensaje);
      await queryClient.setQueryData(
        ["usuarios", pagination],
        (state: UsuarioResponse) => {
          return value.usuario
            ? ({
                ...state,
                usuarios: state.usuarios.map((usuario) => {
                  if (usuario.id == value.usuario.id) {
                    return value.usuario;
                  }
                  return usuario;
                }),
              } as UsuarioResponse)
            : state;
        }
      );
    },
    onError: () => {
      toast.error("No fue posible actualizar el usuario");
    },
  });

  return {
    isPending,
    mutateAsync,
  };
};
export default useActualizarUsuarios;
