import { CustomModal, Loader } from "@/components/custom";
import DataTable from "@/components/custom/DataTable";
import DeleteConfirmAction from "@/components/shared/DeleteConfirmAction";
import useObtenerRoles from "@/hooks/roles/useObtenerRoles";
import type { Role } from "@/interfaces/rol.interface";
import type { ColumnDef } from "@tanstack/react-table";
import type { FC } from "react";
import { FiEdit } from "react-icons/fi";
import CrearRol from "./CrearRol";
import ActualizarRol from "./ActualizarRol";
import useEliminarRol from "@/hooks/roles/useEliminarRol";

interface RolesProps {}
const Roles: FC<RolesProps> = ({}) => {
  const { data, error, isPending } = useObtenerRoles();
  const { mutateAsync } = useEliminarRol();

  if (isPending) return <Loader />;

  if (error)
    return (
      <span className="text-red-600 border-2 p-4 rounded-xl">
        No fue posible obtener los roles
      </span>
    );

  const columns: ColumnDef<Role>[] = [
    {
      accessorKey: "nombre",
      header: "Nombre",
      size: 80,
    },

    {
      // accessorKey: "acciones",
      header: "Acciones",
      size: 20,
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
              title={`${row.original.nombre}`}
            >
              <ActualizarRol rol={row.original} />
            </CustomModal>

            <DeleteConfirmAction
              deleteAction={async () => {
                await mutateAsync({ id: row.original.id });
              }}
              title={`¿Esta seguro que desea eliminar el rol de  ${row.original.nombre}`}
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
            triggerName="Agregar Rol"
            description="Crea un nuevo registro"
            title="Nuevo Rol"
          >
            <CrearRol />
          </CustomModal>

          <DataTable
            columns={columns}
            data={data?.roles}
          />
        </div>
      </>
    )
  );
};

export default Roles;
