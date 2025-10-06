import type { ReactTablePagination } from "@/interfaces/paginacion.interface";
import {
  createContext,
  useState,
  useContext,
  type ReactNode,
  type Dispatch,
} from "react";

interface rolPaginacion {
  setPagination: Dispatch<React.SetStateAction<ReactTablePagination>>;
  pagination: ReactTablePagination;
}
interface rolPaginacionProvider {
  children: ReactNode;
}
const rolPaginacion = createContext<rolPaginacion | null>(null);

export const RolPaginacionProvider = ({ children }: rolPaginacionProvider) => {
  const [pagination, setPagination] = useState<ReactTablePagination>({
    pageIndex: 0,
    pageSize: 10,
  });

  return (
    <rolPaginacion.Provider
      value={{
        setPagination,
        pagination,
      }}
    >
      {children}
    </rolPaginacion.Provider>
  );
};
export const useRolPaginacion = () => {
  const context = useContext(rolPaginacion);

  if (context === null) {
    throw new Error("context was used outside of the provider");
  }

  return context;
};
