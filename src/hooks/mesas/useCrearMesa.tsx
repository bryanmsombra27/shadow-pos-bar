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
          const total_registros = oldData.total_registros + 1;
          const paginaNueva = Math.ceil(total_registros / 10);

          return val.mesa
            ? ({
                ...oldData,
                total_registros,
                total_paginas:
                  oldData.total_paginas == paginaNueva
                    ? oldData.total_paginas
                    : paginaNueva,
                mesas:
                  total_registros > 10
                    ? [val.mesa, ...oldData.mesas.slice(0, 9)]
                    : [val.mesa, ...oldData.mesas],
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
