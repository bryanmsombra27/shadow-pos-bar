import { obtenerTodasLasMesasAction } from "@/actions/mesas";
import { useQuery } from "@tanstack/react-query";

const useTodasLasMesas = () => {
  const { data, error, isPending } = useQuery({
    queryFn: obtenerTodasLasMesasAction,
    queryKey: ["todas-mesas"],
  });

  return {
    data,
    error,
    isPending,
  };
};
export default useTodasLasMesas;
