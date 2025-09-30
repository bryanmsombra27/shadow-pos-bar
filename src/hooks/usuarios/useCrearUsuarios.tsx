import { crearUsuario } from "@/actions/usuarios";
import type { UsuarioResponse } from "@/interfaces/usuario.interface";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const useCrearUsuarios = () => {
  const queryClient = useQueryClient();

  const { data, error, isPending, mutateAsync } = useMutation({
    mutationFn: crearUsuario,
    mutationKey: ["crear-usuarios"],
    onSuccess: async (value) => {
      toast.success(value.mensaje);

      await queryClient.setQueryData(["usuarios"], (state: UsuarioResponse) => {
        return value.usuario
          ? ({
              ...state,
              usuarios: [value.usuario, ...state.usuarios],
              total_registros: state.total_registros + 1,
            } as UsuarioResponse)
          : state;
      });
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
