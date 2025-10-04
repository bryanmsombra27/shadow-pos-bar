import type { Mesa } from "@/interfaces/mesa.interface";
import type { FC } from "react";
import { PiPicnicTableBold } from "react-icons/pi";
import { Button } from "../ui/button";
import useActualizarEstadoMesa from "@/hooks/mesas/useActualizarEstadoMesa";
import { useMesaStore } from "@/store/mesa";
import { useNavigate } from "react-router";

const mesero_id = "212069e5-105a-47d1-b347-64327949b52b";
const admin_id = "9b22e543-1787-404c-9925-099c2eb76de6";

interface TableClientProps {
  mesa: Mesa;
  isAdmin?: boolean;
}
const TableClient: FC<TableClientProps> = ({ mesa, isAdmin = false }) => {
  const { isPending, mutateAsync } = useActualizarEstadoMesa();
  const { setMesa } = useMesaStore();
  const navigate = useNavigate();

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
    setMesa(mesa.id);

    await mutateAsync({
      id: mesa.id,
      body: {
        // mesero_id: mesa.mesero_id,
        mesero_id: mesero_id,

        estado_actual: "OCUPADO",
      },
    });

    navigate("/menu");
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

      {admin_id && isAdmin && (
        <Button
          className="mt-3"
          onClick={() => navigate(`/admin/orden/${mesa.id}`)}
        >
          Ver Orden
        </Button>
      )}
    </div>
  );
};

export default TableClient;
