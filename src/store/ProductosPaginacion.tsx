import type { ReactTablePagination } from "@/interfaces/paginacion.interface";
import {
  createContext,
  useState,
  useContext,
  type ReactNode,
  type Dispatch,
} from "react";

type ProductPagination = ReactTablePagination & { category?: string };

interface ProductosPaginacion {
  setPagination: Dispatch<React.SetStateAction<ProductPagination>>;
  pagination: ProductPagination;
}
interface ProductosPaginacionProvider {
  children: ReactNode;
}
const ProductosPaginacion = createContext<ProductosPaginacion | null>(null);

export const ProductosPaginacionProvider = ({
  children,
}: ProductosPaginacionProvider) => {
  const [pagination, setPagination] = useState<ProductPagination>({
    pageIndex: 0,
    pageSize: 10,
    search: "",
    category: "",
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
