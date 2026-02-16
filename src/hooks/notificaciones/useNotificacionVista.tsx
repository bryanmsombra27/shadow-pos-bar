import { notificacionRevisadaPorUsuario } from "@/actions/notificaciones";
import type { NotificationResponse } from "@/interfaces/notificaciones.interface";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const useNotificacionVista = (usuario_id: string) => {
  const queryClient = useQueryClient();

  const { data, error, isPending, mutateAsync } = useMutation({
    mutationFn: (id: string) => notificacionRevisadaPorUsuario(id),
    onSuccess: async (value) => {
      toast.success(value.mensaje);

      await queryClient.setQueryData(
        ["notificaciones", usuario_id],
        (state: NotificationResponse) => {
          return value.notificacion
            ? ({
                ...state,
                total: state.total - 1,
                notifications: state.notifications.filter(
                  (notification) => notification.id !== value.notificacion.id,
                ),
              } as NotificationResponse)
            : state;
        },
      );
    },
    onError: () => {
      toast.error("No fue posible ver la notificación");
    },
  });

  return {
    data,
    error,
    isPending,
    mutateAsync,
  };
};
export default useNotificacionVista;
