import { obtenerUsuarios } from "@/actions/usuarios";
import { useUsuariosPaginacion } from "@/store/UsuariosPaginacion";
import { useQuery } from "@tanstack/react-query";

const useObtenerUsuarios = () => {
  const { pagination } = useUsuariosPaginacion();

  const { data, error, isPending } = useQuery({
    queryKey: ["usuarios", pagination],
    queryFn: () =>
      obtenerUsuarios({
        page: pagination.pageIndex + 1,
        search: pagination.search,
      }),
  });

  return {
    data,
    error,
    isPending,
  };
};
export default useObtenerUsuarios;
