import type { Categoria } from "@/interfaces/categoria.interface";
import { useProductosPaginacion } from "@/store/ProductosPaginacion";

import { useEffect, type FC, type ReactNode } from "react";
import SearchInput from "./SearchInput";
import { useSearchParams } from "react-router";

interface TabsProps {
  categories: Categoria[];
  children: ReactNode;
}

const CategoriesTabs: FC<TabsProps> = ({ categories, children }) => {
  const { setPagination, pagination } = useProductosPaginacion();
  const [searchParams, _] = useSearchParams();

  // if (isPending) return <Loader />;

  useEffect(() => {
    if (searchParams && searchParams.get("busqueda")) {
      const search = searchParams.get("busqueda");

      if (search!.length > 3) {
        setPagination((prevState) => {
          return {
            ...prevState,
            search: search!,
          };
        });
      }
    } else if (searchParams && !searchParams.get("busqueda")) {
      setPagination((prevState) => {
        return {
          ...prevState,
          search: "",
        };
      });
    }
  }, [searchParams]);

  const categorySelected = (id: string, category: string) => {
    const buttons = document.querySelectorAll(".category");
    const selectedButton = document.querySelector(`#${category}`);
    buttons.forEach((button) => button.classList.remove("btn"));
    selectedButton?.classList.toggle("btn");
    setPagination((prevState) => ({
      ...prevState,
      category: id,
    }));
  };

  const cleanSearch = () => {
    searchParams.delete("busqueda");
    setPagination((prevState) => {
      return {
        ...prevState,
        search: "",
      };
    });
  };

  return (
    <div>
      <div className="flex gap-5 items-center">
        <SearchInput placeholder="Buscar por nombre" />
        {pagination.search && (
          <button
            className="py-3 px-3 rounded-2xl bg-blue-600 cursor-pointer text-white"
            onClick={cleanSearch}
          >
            Limpiar busqueda
          </button>
        )}
      </div>

      <div className=" items-center   rounded-2xl p-3 gap-5 inline-flex my-5">
        <button
          key={"todas"}
          id={"todas"}
          className={`cursor-pointer hover:underline category  ${!pagination.category && "btn"}`}
          onClick={() => categorySelected("", "todas")}
        >
          todos los productos
        </button>
        {categories.map((category) => (
          <button
            key={category.id}
            id={category.nombre}
            className={`cursor-pointer hover:underline category  ${pagination.category == category.id && "btn"}`}
            onClick={() => categorySelected(category.id, category.nombre)}
          >
            {category.nombre}
          </button>
        ))}
      </div>

      {children}
    </div>
  );
};

export default CategoriesTabs;
