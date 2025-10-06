import type { ReactTablePagination } from "@/interfaces/paginacion.interface";
import {
  createContext,
  useState,
  useContext,
  type ReactNode,
  type Dispatch,
} from "react";

interface ProductosPaginacion {
  setPagination: Dispatch<React.SetStateAction<ReactTablePagination>>;
  pagination: ReactTablePagination;
}
interface ProductosPaginacionProvider {
  children: ReactNode;
}
const ProductosPaginacion = createContext<ProductosPaginacion | null>(null);

export const ProductosPaginacionProvider = ({
  children,
}: ProductosPaginacionProvider) => {
  const [pagination, setPagination] = useState<ReactTablePagination>({
    pageIndex: 0,
    pageSize: 10,
  });

  return (
    <ProductosPaginacion.Provider
      value={{
        pagination,
        setPagination,
      }}
    >
      {children}
    </ProductosPaginacion.Provider>
  );
};
export const useProductosPaginacion = () => {
  const context = useContext(ProductosPaginacion);

  if (context === null) {
    throw new Error("context was used outside of the provider");
  }

  return context;
};
