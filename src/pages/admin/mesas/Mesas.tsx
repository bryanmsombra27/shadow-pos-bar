import { CustomModal, Loader } from "@/components/custom";
import DataTable from "@/components/custom/DataTable";
import useObtenerMesas from "@/hooks/mesas/useObtenerMesas";
import type { Mesa } from "@/interfaces/mesa.interface";
import type { ColumnDef } from "@tanstack/react-table";

import type { FC } from "react";

import CrearMesa from "./CrearMesa";
import ActualizarMesaForm from "./ActualizarMesa";
import useEliminarMesa from "@/hooks/mesas/useEliminarMesa";

interface MesasProps {}
const Mesas: FC<MesasProps> = ({}) => {
  const { data, error, isPending } = useObtenerMesas();
  const { mutateAsync } = useEliminarMesa();

  if (isPending) return <Loader />;

  if (error)
    return (
      <span className="text-red-600 border-2 p-4 rounded-xl">
        No fue posible obtener las mesas
      </span>
    );

  const columns: ColumnDef<Mesa>[] = [
    {
      accessorKey: "nombre",
      header: "Nombre",
    },
    {
      accessorKey: "es_vip",
      header: "VIP",
    },
    {
      accessorKey: "estado_actual",
      header: "Estado",
    },
    {
      accessorKey: "mesero.nombre_completo",
      header: "Mesero",
      accessorFn: (row) => row.mesero?.nombre_completo ?? "No Asignado",
    },
  ];

  return (
    data && (
      <>
        <div className="container mx-auto p-6">
          <CustomModal
            triggerName="Agregar Mesa"
            description="Crea un nuevo registro"
            title="Nueva Mesa"
          >
            <CrearMesa />
          </CustomModal>

          <DataTable
            showActions
            delete_title="Esta seguro que desea eliminar la mesa"
            delete_function={mutateAsync}
            edit_component={(row) => <ActualizarMesaForm mesa={row.original} />}
            title_property="nombre"
            columns={columns}
            data={data?.mesas}
          />
        </div>
      </>
    )
  );
};

export default Mesas;
