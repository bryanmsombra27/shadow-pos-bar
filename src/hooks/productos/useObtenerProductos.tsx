import { useQuery } from "@tanstack/react-query";

const useObtenerProductos = () => {
  const { data, error, isPending } = useQuery({
    queryFn: () => {},
    queryKey: ["productos"],
  });

  return {
    data,
    error,
    isPending,
  };
};
export default useObtenerProductos;
