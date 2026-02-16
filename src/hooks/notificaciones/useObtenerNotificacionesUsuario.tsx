import { obtenerNotificacionesPorUsuario } from "@/actions/notificaciones";
import { useQuery } from "@tanstack/react-query";

const useObtenerNotificacionesUsuario = (id: string) => {
  const { data, error, isPending, refetch } = useQuery({
    queryFn: () => obtenerNotificacionesPorUsuario(id),
    queryKey: ["notificaciones", id],
    enabled: !!id,
  });

  return {
    data,
    error,
    isPending,
    refetch,
  };
};
export default useObtenerNotificacionesUsuario;
