import { Loader } from "@/components/custom";
import useCompletarOrdenBarra from "@/hooks/barra/useCompletarOrdenBarra";
import useObtenerOrdenesBarra from "@/hooks/barra/useObtenerOrdenesBarra";
import type { FC } from "react";
import { FaCheckCircle } from "react-icons/fa";

interface BarraProps {}
const Barra: FC<BarraProps> = ({}) => {
  const { data, error, isPending } = useObtenerOrdenesBarra();
  const { mutateAsync } = useCompletarOrdenBarra();

  const handleCompleteOrder = async (id: string) => {
    await mutateAsync(id);
  };

  if (isPending) return <Loader />;

  if (error)
    return (
      <span className="text-red-600 border-2 p-4 rounded-xl">
        No fue posible obtener las ordenes
      </span>
    );

  return (
    <>
      <div className="grid grid-cols-4 p-5">
        {data?.ordenes.map((orden) => (
          <div className="bg-gray-100    rounded-2xl p-5">
            <h1 className="text-xl font-bold text-center">
              {orden.mesa.nombre}{" "}
            </h1>
            <p className="font-semibold text-lg mt-5">
              mesero: {orden.mesero.nombre_usuario}
            </p>

            <ul className="mt-5">
              {orden.pedidos.map((pedido) => (
                <li>
                  <div className="flex gap-5 items-center justify-between my-4">
                    <span>{pedido.cantidad}</span>
                    <span>{pedido.producto.nombre}</span>
                    <span className="h-10 w-10 bg-white rounded-full cursor-pointer">
                      <FaCheckCircle
                        size={40}
                        className={pedido.preparado ? "block" : "hidden"}
                      />
                    </span>
                  </div>
                </li>
              ))}
            </ul>

            <span className="text-2xl">{orden.estado_orden}</span>

            <button
              className="bg-green-600 p-3 rounded-xl text-white font-bold mt-10 mx-auto block cursor-pointer"
              onClick={() => handleCompleteOrder(orden.id)}
            >
              Completar Orden
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default Barra;
