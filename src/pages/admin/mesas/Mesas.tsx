import { CustomModal, Loader } from "@/components/custom";
import DataTable from "@/components/custom/DataTable";
import useObtenerMesas from "@/hooks/mesas/useObtenerMesas";
import type { Mesa } from "@/interfaces/mesa.interface";
import type { ColumnDef } from "@tanstack/react-table";
import { FiEdit } from "react-icons/fi";

import type { FC } from "react";

import CrearMesa from "./CrearMesa";
import ActualizarMesaForm from "./ActualizarMesa";
import DeleteConfirmAction from "@/components/shared/DeleteConfirmAction";
import useEliminarMesa from "@/hooks/mesas/useEliminarMesa";

interface MesasProps {}
const Mesas: FC<MesasProps> = ({}) => {
  const { data, error, isPending } = useObtenerMesas();
  const { isPending: isMutationPending, mutateAsync } = useEliminarMesa();

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
    {
      // accessorKey: "acciones",
      header: "Acciones",
      cell: ({ row }) => {
        // console.log(row, "quejso");
        return (
          <div className="flex gap-5 my-2">
            <CustomModal
              isManualTrigger
              description="Actualiza la informacion del registro"
              trigger={
                <>
                  <FiEdit
                    className="cursor-pointer"
                    size={22}
                  />
                </>
              }
              title={`Mesa ${row.original.nombre}`}
            >
              <ActualizarMesaForm mesa={row.original} />
            </CustomModal>

            <DeleteConfirmAction
              deleteAction={async () => {
                await mutateAsync({ id: row.original.id });
              }}
              title={`¿Esta seguro que desea eliminar la mesa ${row.original.nombre}`}
            />
          </div>
        );
      },
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
            columns={columns}
            data={data?.mesas}
          />
        </div>
      </>
    )
  );
};

export default Mesas;
