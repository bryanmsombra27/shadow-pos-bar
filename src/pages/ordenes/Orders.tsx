import { Loader } from "@/components/custom";
import { Button } from "@/components/ui/button";
import useProfile from "@/hooks/auth/useProfile";
import useObtenerOrdenesPorMesero from "@/hooks/ordenes/useObtenerOrdenesPorMesero";
import type { FC } from "react";

interface OrdersProps {}
const Orders: FC<OrdersProps> = ({}) => {
  const {
    data: profileData,
    isPending: profileIsPending,
    error: profileError,
  } = useProfile();

  const { data, error, isPending } = useObtenerOrdenesPorMesero(
    profileData?.id!,
  );

  if (profileIsPending || isPending) return <Loader />;

  if (profileError || error)
    return (
      <span className="text-red-600 border-2 p-4 rounded-xl">
        No fue posible obtener las ordenes del mesero
      </span>
    );

  return (
    <>
      <h1 className="text-center font-semibold text-2xl">Mis ordenes</h1>

      <div className="grid grid-cols-4 gap-5 mx-5 ">
        {data?.ordenes.map((orden) => (
          <div
            className="py-4 px-2 rounded-3xl flex flex-col bg-gray-100 "
            key={orden.id}
          >
            <h3 className="text-center">Orden - {orden.mesa?.nombre}</h3>

            <ul className="space-y-10 my-10 mx-3 overflow-y-scroll">
              {orden.pedidos.map((pedido) => (
                <>
                  <li className="flex gap-5 items-center">
                    <input
                      className="w-5 h-5 cursor-pointer"
                      type="checkbox"
                      name=""
                      id={pedido.producto.id}
                      defaultChecked={pedido.entregado_a_mesa}
                    />

                    <label
                      htmlFor={pedido.producto.id}
                      className="cursor-pointer"
                    >
                      {pedido.producto.nombre}
                    </label>
                  </li>
                </>
              ))}
            </ul>

            <Button
              className="mt-3 mx-3"
              onClick={() => {}}
            >
              Entregar a Mesa
            </Button>
          </div>
        ))}
      </div>
    </>
  );
};

export default Orders;
