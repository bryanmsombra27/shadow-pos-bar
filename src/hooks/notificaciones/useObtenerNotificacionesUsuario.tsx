import { obtenerNotificacionesPorUsuario } from "@/actions/notificaciones";
import { useQuery } from "@tanstack/react-query";

const useObtenerNotificacionesUsuario = (id: string) => {
  const { data, error, isPending } = useQuery({
    queryFn: () => obtenerNotificacionesPorUsuario(id),
    queryKey: ["notificaciones", id],
    enabled: !!id,
  });

  return {
    data,
    error,
    isPending,
  };
};
export default useObtenerNotificacionesUsuario;
