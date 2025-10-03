import type { Mesa } from "@/interfaces/mesa.interface";
import type { FC } from "react";
import { PiPicnicTableBold } from "react-icons/pi";
import { Button } from "../ui/button";
import useActualizarEstadoMesa from "@/hooks/mesas/useActualizarEstadoMesa";

const mesero_id = "212069e5-105a-47d1-b347-64327949b52b";

interface TableClientProps {
  mesa: Mesa;
}
const TableClient: FC<TableClientProps> = ({ mesa }) => {
  const { isPending, mutateAsync } = useActualizarEstadoMesa();

  const estadoMesa = (estado: string) => {
    let span;

    switch (estado) {
      case "DISPONIBLE":
        span = (
          <span className="font-bold text-lg text-green-500 ">Disponible</span>
        );
        break;
      case "OCUPADO":
        span = <span className="font-bold text-lg text-red-500 ">Ocupada</span>;
        break;
      case "RESERVADO":
        span = <span className="font-bold text-lg text-red-500 ">Ocupada</span>;
        break;

      default:
        span = (
          <span className="font-bold text-lg text-yellow-500 ">Reservada</span>
        );
        break;
    }

    return span;
  };

  const tomarMesa = async () => {
    mutateAsync({
      id: mesa.id,
      body: {
        // mesero_id: mesa.mesero_id,
        mesero_id: mesero_id,

        estado_actual: "OCUPADO",
      },
    });
  };

  return (
    <div className="flex flex-col p-6 border-2 gap-4 border-gray-400 w-50 rounded-xl mx-auto">
      <PiPicnicTableBold
        size={60}
        className="mx-auto"
      />
      <h4 className="text-xl font-bold ">{mesa.nombre} </h4>
      {mesa.mesero && (
        <>
          <span>Te atiende: </span>
          <p>{mesa.mesero?.nombre_completo}</p>
        </>
      )}

      {estadoMesa(mesa.estado_actual)}

      {!mesa.mesero && mesa.estado_actual == "DISPONIBLE" && (
        <Button
          className="mt-3"
          onClick={tomarMesa}
        >
          Tomar Mesa
        </Button>
      )}
    </div>
  );
};

export default TableClient;
