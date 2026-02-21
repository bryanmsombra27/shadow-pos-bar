import { obtenerOrden } from "@/actions/ordenes";
import { useQuery } from "@tanstack/react-query";

const useObtenerOrden = (order_id: string) => {
  const { data, error, isPending } = useQuery({
    queryFn: () => obtenerOrden(order_id),
    queryKey: ["orden", order_id],
    enabled: !!order_id,
  });

  return {
    data,
    error,
    isPending,
  };
};
export default useObtenerOrden;
