import { actualizarMesaAction } from "@/actions/mesas";
import type { ActualizarMesa, MesaResponse } from "@/interfaces/mesa.interface";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface BodyMutationVariables {
  mesa: ActualizarMesa;
}

const useActualizarMesa = (id: string) => {
  const queryClient = useQueryClient();
  const { mutateAsync, isPending } = useMutation({
    mutationFn: ({ mesa }: BodyMutationVariables) =>
      actualizarMesaAction(id, mesa),
    mutationKey: ["actualizar-mesa", id],
    onSuccess: async (value) => {
      toast.success(value.mensaje);

      await queryClient.setQueryData(["Mesas"], (oldData: MesaResponse) =>
        value.mesa
          ? {
              ...oldData,
              mesas: oldData.mesas.map((item) => {
                if (item.id == id) {
                  return value.mesa;
                }
                return item;
              }),
            }
          : oldData
      );
    },
    onError: () => {
      toast.error("No fue posible actualizar la mesa");
    },
  });

  return { mutateAsync, isPending };
};
export default useActualizarMesa;
