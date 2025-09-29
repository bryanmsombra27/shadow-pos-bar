import { crearMesaAction } from "@/actions/mesas";
import type { MesaResponse } from "@/interfaces/mesa.interface";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const useCrearMesa = () => {
  const queryClient = useQueryClient();

  const { data, error, isPending, mutateAsync } = useMutation({
    mutationKey: ["crear-mesa"],
    mutationFn: crearMesaAction,
    onSuccess: async (val) => {
      toast.success(val.mensaje);

      //   await queryClient.invalidateQueries({
      //     queryKey: ["Mesas"],
      //   });

      await queryClient.setQueryData(["Mesas"], (oldData: MesaResponse) =>
        val.mesa
          ? {
              ...oldData,
              total_registros: oldData.total_registros + 1,
              mesas: [...oldData.mesas, val.mesa],
            }
          : oldData
      );
    },
    onError: () => {
      toast.error("No fue posible crear la mesa");
    },
  });

  return {
    data,
    error,
    isPending,
    mutateAsync,
  };
};
export default useCrearMesa;
