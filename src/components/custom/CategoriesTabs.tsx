import type { Categoria } from "@/interfaces/categoria.interface";
import { useProductosPaginacion } from "@/store/ProductosPaginacion";

import type { FC, ReactNode } from "react";

interface TabsProps {
  categories: Categoria[];
  children: ReactNode;
}

const CategoriesTabs: FC<TabsProps> = ({ categories, children }) => {
  const { setPagination, pagination } = useProductosPaginacion();

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

  return (
    <div>
      <div className=" items-center   rounded-2xl p-3 gap-5 inline-flex mb-5">
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
