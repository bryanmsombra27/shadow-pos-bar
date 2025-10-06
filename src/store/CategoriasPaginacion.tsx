import type { ReactTablePagination } from "@/interfaces/paginacion.interface";
import {
  createContext,
  useState,
  useContext,
  type ReactNode,
  type Dispatch,
} from "react";

interface CategoriasPaginacion {
  setPagination: Dispatch<React.SetStateAction<ReactTablePagination>>;
  pagination: ReactTablePagination;
}
interface CategoriasPaginacionProvider {
  children: ReactNode;
}
const CategoriasPaginacion = createContext<CategoriasPaginacion | null>(null);

export const CategoriasPaginacionProvider = ({
  children,
}: CategoriasPaginacionProvider) => {
  const [pagination, setPagination] = useState<ReactTablePagination>({
    pageIndex: 0,
    pageSize: 10,
  });

  return (
    <CategoriasPaginacion.Provider
      value={{
        setPagination,
        pagination,
      }}
    >
      {children}
    </CategoriasPaginacion.Provider>
  );
};
export const useCategoriasPaginacion = () => {
  const context = useContext(CategoriasPaginacion);

  if (context === null) {
    throw new Error("context was used outside of the provider");
  }

  return context;
};
