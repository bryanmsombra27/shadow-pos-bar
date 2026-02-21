import type { FC } from "react";
import useObtenerOrdenes from "@/hooks/ordenes/useObtenerOrdenes";
import { Loader } from "@/components/custom";
import useObtenerOrdenesPreparadas from "@/hooks/ordenes/useObtenerOrdenesPreparadas";

interface OrderListProps {
  setOrder: React.Dispatch<React.SetStateAction<string>>;
  order: string;
}
const OrderList: FC<OrderListProps> = ({ setOrder, order }) => {
  const { data, error, isPending } = useObtenerOrdenesPreparadas();

  if (isPending) return <Loader />;

  if (error)
    return (
      <span className="text-red-600 border-2 p-4 rounded-xl">
        No fue posible obtener las ordenes
      </span>
    );

  return (
    <>
      <div className="flex flex-col gap-5 p-5 overflow-y-scroll h-8/12 ">
        {data?.ordenes.map((orden) => (
          <div
            key={orden.id}
            onClick={() => setOrder(orden.id)}
            className={`p-4 border-2 border-gray-400 rounded-xl cursor-pointer hover:bg-gray-500 hover:text-white  ${order == orden.id && "bg-gray-500 text-white"} `}
          >
            <h4> Orden {orden.mesa?.nombre}</h4>
          </div>
        ))}
      </div>
    </>
  );
};

export default OrderList;
