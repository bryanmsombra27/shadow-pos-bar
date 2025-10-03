import type { Producto } from "@/interfaces/producto.interface";
import { useMenuStore } from "@/store/menu";
import { useState, type FC } from "react";
import { FaMinus, FaPlus } from "react-icons/fa6";

interface MenuItemProps {
  producto: Producto;
}
const MenuItem: FC<MenuItemProps> = ({ producto }) => {
  const [counter, setCounter] = useState<number>(0);
  const { setPedido } = useMenuStore();

  const handleMinusCounter = () => {
    if (counter > 0) {
      setCounter((prevState) => prevState - 1);
      setPedido(producto.id, -1, producto.precio);
    }
  };

  const handleAddCounter = () => {
    setCounter((prevState) => prevState + 1);
    setPedido(producto.id, 1, producto.precio);
  };

  return (
    <div className="flex gap-20 mt-10">
      <img
        src={`http://localhost:3000/images${producto.imagen}`}
        alt={`${producto.imagen}`}
        className="w-30 h-30 rounded-2xl object-cover "
      />
      <div>
        <h4 className=" text-lg"> {producto.nombre} </h4>
        <div className="flex items-center gap-4 mt-5">
          <button
            type="button"
            className="bg-gray-200 p-3 rounded-2xl cursor-pointer"
            onClick={handleMinusCounter}
          >
            <FaMinus />
          </button>
          <span>{counter}</span>
          <button
            type="button"
            className="bg-gray-200 p-3 rounded-2xl cursor-pointer"
            onClick={handleAddCounter}
          >
            <FaPlus />
          </button>
        </div>
      </div>

      <span className="font-semibold text-xl">${producto.precio}</span>
    </div>
  );
};

export default MenuItem;
