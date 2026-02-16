import { useEffect, type FC } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Bell } from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { socket } from "@/config/socket";
import type {
  Notification,
  NotificationResponse,
} from "@/interfaces/notificaciones.interface";
import useObtenerNotificacionesUsuario from "@/hooks/notificaciones/useObtenerNotificacionesUsuario";
import useProfile from "@/hooks/auth/useProfile";
import Loader from "./Loader";
import useNotificacionVista from "@/hooks/notificaciones/useNotificacionVista";
import { useNavigate } from "react-router";
import { useQueryClient } from "@tanstack/react-query";

interface NotificationsProps {}
const Notifications: FC<NotificationsProps> = ({}) => {
  const navigate = useNavigate();
  const {
    data: profileData,
    error: profileError,
    isPending: profileIsPending,
  } = useProfile();
  const { data, error, isPending } = useObtenerNotificacionesUsuario(
    profileData?.id!,
  );
  const { mutateAsync } = useNotificacionVista(profileData?.id!);
  const queryClient = useQueryClient();

  useEffect(() => {
    const handleNotifications = async (notification: Notification) => {
      if (profileData && profileData?.id) {
        await queryClient.setQueryData(
          ["notificaciones", profileData!.id],
          (state: NotificationResponse) => {
            return notification
              ? ({
                  ...state,
                  total: state.total + 1,
                  notifications: [...state.notifications, notification],
                } as NotificationResponse)
              : state;
          },
        );
      }
    };

    if (socket) {
      socket.emit("room", { user: profileData?.id });
      socket.on("notificaciones", handleNotifications);
    }

    return () => {
      socket.off("notificaciones", handleNotifications);
    };
  }, [socket, profileData]);

  if (isPending || profileIsPending) {
    return <Loader />;
  }

  if (error || profileError) {
    return (
      <span className="text-red-600 border-2 p-4 rounded-xl">
        No fue posible obtener las notificaciones
      </span>
    );
  }

  const handleNotificationRedirect = async (id: string) => {
    await mutateAsync(id);
    navigate("/mis-ordenes");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative"
        >
          <Bell className="h-4 w-4" />

          {data!.total > 0 && (
            <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
              {data?.total}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-80 overflow-y-scroll h-100"
      >
        <DropdownMenuLabel>Mis Notificaciones</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {data?.notifications.map((notification) => (
          <DropdownMenuItem key={notification.id}>
            <div
              className="flex flex-col gap-1 cursor-pointer"
              onClick={() => handleNotificationRedirect(notification.id)}
            >
              <p className="text-sm font-medium">{notification.titulo}</p>
              <p className="text-xs text-muted-foreground">
                {notification.descripcion}
              </p>
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Notifications;
