import { obtenerUsuarios } from "@/actions/usuarios";
import { useQuery } from "@tanstack/react-query";

const useObtenerUsuarios = () => {
  const { data, error, isPending } = useQuery({
    queryKey: ["usuarios"],
    queryFn: obtenerUsuarios,
  });

  return {
    data,
    error,
    isPending,
  };
};
export default useObtenerUsuarios;
