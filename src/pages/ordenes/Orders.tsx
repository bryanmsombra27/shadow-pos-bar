import { useState, type FC } from "react";
import OrderList from "./OrderList";
import OrderDetail from "./OrderDetail";

interface OrdersProps {}
const Orders: FC<OrdersProps> = ({}) => {
  const [order, setOrder] = useState<string>("");

  return (
    <div className="flex px-5 mt-10">
      <div className="flex-3/12 ">
        <OrderList
          setOrder={setOrder}
          order={order}
        />
      </div>
      <div className="flex-9/12">
        {order ? (
          <OrderDetail order={order} />
        ) : (
          <p className="text-xl text-center">No se ha seleccionado una orden</p>
        )}
      </div>
    </div>
  );
};

export default Orders;
