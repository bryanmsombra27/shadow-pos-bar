import type { ReactTablePagination } from "@/interfaces/paginacion.interface";
import {
  createContext,
  useState,
  useContext,
  type ReactNode,
  type Dispatch,
} from "react";

interface UsuariosPaginacion {
  setPagination: Dispatch<React.SetStateAction<ReactTablePagination>>;
  pagination: ReactTablePagination;
}
interface UsuariosPaginacionProvider {
  children: ReactNode;
}
const UsuariosPaginacion = createContext<UsuariosPaginacion | null>(null);

export const UsuariosPaginacionProvider = ({
  children,
}: UsuariosPaginacionProvider) => {
  const [pagination, setPagination] = useState<ReactTablePagination>({
    pageIndex: 0,
    pageSize: 10,
  });

  return (
    <UsuariosPaginacion.Provider
      value={{
        pagination,
        setPagination,
      }}
    >
      {children}
    </UsuariosPaginacion.Provider>
  );
};
export const useUsuariosPaginacion = () => {
  const context = useContext(UsuariosPaginacion);

  if (context === null) {
    throw new Error("context was used outside of the provider");
  }

  return context;
};
