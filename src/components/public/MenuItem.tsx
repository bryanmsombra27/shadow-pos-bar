import type { Producto } from "@/interfaces/producto.interface";
import { useMenuStore } from "@/store/menu";
import { useEffect, useState, type FC } from "react";
import { FaMinus, FaPlus } from "react-icons/fa6";

interface MenuItemProps {
  producto: Producto;
  producto_eliminado: string;
}
const MenuItem: FC<MenuItemProps> = ({ producto, producto_eliminado }) => {
  const { setPedido } = useMenuStore();
  const [counter, setCounter] = useState<number>(0);

  useEffect(() => {
    if (producto.id == producto_eliminado) {
      setCounter(0);
    }
  }, [producto_eliminado]);

  const handleMinusCounter = () => {
    if (counter > 0) {
      setCounter((prevState) => prevState - 1);
      setPedido(
        producto.id,
        -1,
        producto.precio,
        producto.nombre,
        producto.categoria.nombre,
      );
    }
  };

  const handleAddCounter = () => {
    setCounter((prevState) => prevState + 1);
    setPedido(
      producto.id,
      1,
      producto.precio,
      producto.nombre,
      producto.categoria.nombre,
    );
  };

  return (
    <div className="flex flex-col justify-center items-center  gap-2">
      <img
        src={`http://localhost:3000/images${producto.imagen}`}
        alt={`${producto.imagen}`}
        className="w-30 h-30 rounded-2xl object-cover "
      />
      <div>
        <h4 className=" text-lg"> {producto.nombre} </h4>
        <div className="flex items-center justify-center gap-4 ">
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
