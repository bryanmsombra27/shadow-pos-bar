import { obtenerMeseros } from "@/actions/usuarios";
import { useQuery } from "@tanstack/react-query";

const useMeseros = () => {
  const { data, error, isPending } = useQuery({
    queryFn: obtenerMeseros,
    queryKey: ["meseros"],
  });

  return {
    data,
    error,
    isPending,
  };
};
export default useMeseros;
