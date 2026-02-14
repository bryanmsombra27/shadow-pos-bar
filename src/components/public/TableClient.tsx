import type { Mesa } from "@/interfaces/mesa.interface";
import { type FC } from "react";
import { PiPicnicTableBold } from "react-icons/pi";
import { Button } from "../ui/button";
import useActualizarEstadoMesa from "@/hooks/mesas/useActualizarEstadoMesa";
import { useNavigate } from "react-router";
import useProfile from "@/hooks/auth/useProfile";
import { useMenuStore } from "@/store/menu";

interface TableClientProps {
  mesa: Mesa;
}
const TableClient: FC<TableClientProps> = ({ mesa }) => {
  const { isPending, mutateAsync } = useActualizarEstadoMesa();
  const navigate = useNavigate();
  const { clearPerdidos } = useMenuStore();
  const { data, error, isPending: isPendingProfile } = useProfile();

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
    await mutateAsync({
      id: mesa.id,
      body: {
        // mesero_id: mesero_id,
        mesero_id: data!.id,
        estado_actual: "OCUPADO",
      },
    });

    navigate(`/menu/${mesa.id}`);
  };

  return (
    <div className="flex flex-col flex-wrap p-6 border-2 gap-4 border-gray-400  rounded-xl mx-auto w-50">
      <PiPicnicTableBold
        size={60}
        className="mx-auto"
      />
      <h4 className="text-xl font-bold ">{mesa.nombre} </h4>
      {mesa.mesero && (
        <>
          <span>mesa de: </span>
          <p className="font-semibold text-xl">
            {" "}
            {mesa.mesero_id == data?.id
              ? "Mia"
              : mesa.mesero?.nombre_completo}{" "}
          </p>
        </>
      )}

      {estadoMesa(mesa.estado_actual)}

      {!mesa.mesero &&
        mesa.estado_actual == "DISPONIBLE" &&
        data?.rol.nombre.toLowerCase() == "mesero" && (
          <Button
            className="mt-3"
            onClick={tomarMesa}
          >
            Tomar Mesa
          </Button>
        )}

      {mesa.estado_actual == "OCUPADO" && (
        <Button
          className="mt-3"
          onClick={() => {
            clearPerdidos();
            navigate(`/menu/${mesa.id}`);
          }}
        >
          Pedir más
        </Button>
      )}

      {data &&
        data!.rol.nombre.toLowerCase() == "admin" &&
        mesa.estado_actual == "OCUPADO" && (
          <Button
            className="mt-3"
            onClick={() => navigate(`/orden/${mesa.id}`)}
          >
            Ver Orden
          </Button>
        )}
    </div>
  );
};

export default TableClient;
