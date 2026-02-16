import { shadowPosApi } from "@/api/api";
import type {
  NotificacionRevisadaResponse,
  NotificationResponse,
} from "@/interfaces/notificaciones.interface";

const obtenerNotificacionesPorUsuario = async (
  id: string,
): Promise<NotificationResponse> => {
  const { data } = await shadowPosApi.get<NotificationResponse>(
    `/notificaciones/usuario/${id}`,
  );

  return data;
};

const notificacionRevisadaPorUsuario = async (
  id: string,
): Promise<NotificacionRevisadaResponse> => {
  const { data } = await shadowPosApi.patch<NotificacionRevisadaResponse>(
    `notificaciones/vista/${id}`,
  );

  return data;
};

export { obtenerNotificacionesPorUsuario, notificacionRevisadaPorUsuario };
