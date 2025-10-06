import { crearMesaAction } from "@/actions/mesas";
import type { MesaResponse } from "@/interfaces/mesa.interface";
import type { Pagination } from "@/interfaces/paginacion.interface";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const useCrearMesa = (pagination?: Pagination) => {
  const queryClient = useQueryClient();

  const { data, error, isPending, mutateAsync } = useMutation({
    mutationKey: ["crear-mesa"],
    mutationFn: crearMesaAction,
    onSuccess: async (val) => {
      toast.success(val.mensaje);

      //   await queryClient.invalidateQueries({
      //     queryKey: ["Mesas"],
      //   });

      await queryClient.setQueryData(
        ["Mesas", pagination],
        (oldData: MesaResponse) => {
          return val.mesa
            ? ({
                ...oldData,
                total_registros: oldData.total_registros + 1,
                mesas: [...oldData.mesas, val.mesa],
              } as MesaResponse)
            : oldData;
        }
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
