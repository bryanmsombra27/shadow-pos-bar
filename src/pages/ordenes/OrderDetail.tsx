import { Loader } from "@/components/custom";
import useObtenerOrdenPreparada from "@/hooks/ordenes/useObtenerOrdenPreparada";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import type { FC } from "react";

interface OrderDetailProps {
  order: string;
}
const OrderDetail: FC<OrderDetailProps> = ({ order }) => {
  const { data, error, isPending } = useObtenerOrdenPreparada(order);

  if (isPending) return <Loader />;

  if (error)
    return (
      <span className="text-red-600 border-2 p-4 rounded-xl">
        No fue posible obtener orden
      </span>
    );

  return (
    <>
      <div className="flex justify-between mx-10">
        <div className="">
          <h4>Orden {data?.mesa?.nombre} </h4>

          <p className="text-2xl">
            Mesero: <span className="font-semibold">Koso</span>{" "}
          </p>

          <div className="grid grid-cols-3 gap-5 mt-20 text-center">
            <div className="">
              <p>Cantidad</p>
            </div>
            <div className="">
              <p>Nombre</p>
            </div>
            <div className="">
              <p>Estado</p>
            </div>
            {data?.pedidos.map((orden) => (
              <>
                <p>{orden.cantidad}</p>
                <p>{orden.producto.nombre}</p>
                <p
                  className={`font-bold ${orden.preparado ? "text-green-600" : "text-red-600"}`}
                >
                  {orden.preparado ? "PREPARADO" : "PENDIENTE"}{" "}
                </p>
              </>
            ))}
          </div>
        </div>

        <div className="">
          <Avatar className="h-6 w-6">
            <AvatarImage
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
              alt="John Doe"
              className="object-cover rounded-4xl h-30"
            />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </>
  );
};

export default OrderDetail;
