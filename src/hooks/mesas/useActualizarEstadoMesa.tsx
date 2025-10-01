import { actualizarEstadoMesa } from "@/actions/mesas";
import type { ActualizarEstadoMesa } from "@/interfaces/mesa.interface";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface BodyMutation {
  id: string;
  body: ActualizarEstadoMesa;
}

const useActualizarEstadoMesa = () => {
  const queryClient = useQueryClient();

  const { data, error, isPending, mutateAsync } = useMutation({
    mutationFn: ({ body, id }: BodyMutation) => actualizarEstadoMesa(id, body),
    onSuccess: async (value) => {
      toast.success(value.mensaje);

      //  await queryClient.setQueryData(
      // ['categorias'],
      // (state: any) => {
      // return value.categoria
      // ? ({
      // ...state,
      //  total_registros: state.total_registros + 1,
      //   categorias: [value.categoria, ...state.categorias],
      //   } as )
      // : state;
      // }
      // );
    },
    onError: () => {
      toast.error("No fue posible crear la categoria");
    },
  });

  return {
    data,
    error,
    isPending,
    mutateAsync,
  };
};
export default useActualizarEstadoMesa;
