export interface NotificationResponse {
  total: number;
  notifications: Notification[];
}

export interface Notification {
  id: string;
  titulo: string;
  descripcion: string;
  link: string;
  fue_revisada: boolean;
  esta_activa: boolean;
  usuario_id: string;
}
export interface NotificacionRevisadaResponse {
  mensaje: string;
  notificacion: Notification;
}
