import { eliminarMesaAction } from "@/actions/mesas";
import type { MesaResponse } from "@/interfaces/mesa.interface";
import type { Pagination } from "@/interfaces/paginacion.interface";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface BodyMutation {
  id: string;
}

const useEliminarMesa = (pagination?: Pagination) => {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationKey: ["eliminar-mesa"],
    mutationFn: ({ id }: BodyMutation) => eliminarMesaAction(id),
    onSuccess: async (value) => {
      toast.success("La mesa fue eliminada con exito!");

      await queryClient.setQueryData(
        ["Mesas", pagination],
        (oldData: MesaResponse) => {
          return value.mesa
            ? {
                ...oldData,
                mesas: oldData.mesas.filter((mesa) => mesa.id != value.mesa.id),
                total_registros: oldData.total_registros - 1,
              }
            : oldData;
        }
      );
    },
    onError: () => {
      toast.error("No fue posible eliminar la mesa ");
    },
  });

  return {
    mutateAsync,
    isPending,
  };
};
export default useEliminarMesa;
