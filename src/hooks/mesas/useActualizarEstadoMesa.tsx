import { actualizarEstadoMesa } from "@/actions/mesas";
import type {
  ActualizarEstadoMesa,
  TodasLasMesas,
} from "@/interfaces/mesa.interface";
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

      await queryClient.setQueryData(
        ["todas-mesas"],
        (state: TodasLasMesas) => {
          return value.mesa
            ? ({
                mesas: state.mesas.map((mesa) => {
                  if (mesa.id == value.mesa.id) {
                    return value.mesa;
                  }
                  return mesa;
                }),
              } as TodasLasMesas)
            : state;
        }
      );
    },
    onError: () => {
      toast.error("No fue posible tomar la mesa");
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
