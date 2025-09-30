import { CustomModal, Loader } from "@/components/custom";
import DataTable from "@/components/custom/DataTable";
import DeleteConfirmAction from "@/components/shared/DeleteConfirmAction";
import useObtenerUsuarios from "@/hooks/usuarios/useObtenerUsuarios";
import type { Usuario } from "@/interfaces/usuario.interface";
import type { ColumnDef } from "@tanstack/react-table";
import type { FC } from "react";
import { FiEdit } from "react-icons/fi";
import CrearUsuario from "./CrearUsuario";
import ActualizarUsuario from "./ActualizarUsuario";
import useEliminarUsuarios from "@/hooks/usuarios/useEliminarUsuarios";

interface UsuariosProps {}
const Usuarios: FC<UsuariosProps> = ({}) => {
  const { data, error, isPending } = useObtenerUsuarios();
  const { mutateAsync } = useEliminarUsuarios();

  if (isPending) return <Loader />;

  if (error)
    return (
      <span className="text-red-600 border-2 p-4 rounded-xl">
        No fue posible obtener las mesas
      </span>
    );

  const columns: ColumnDef<Usuario>[] = [
    {
      accessorKey: "nombre_completo",
      header: "Nombre Completo",
    },
    {
      accessorKey: "nombre_usuario",
      header: "Usuario",
    },
    {
      accessorKey: "telefono",
      header: "Telefono",
    },
    {
      accessorKey: "rol.nombre",
      header: "Puesto",
      //   accessorFn: (row) => row.mesero?.nombre_completo ?? "No Asignado",
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
              title={`Usuario ${row.original.nombre_usuario}`}
            >
              <ActualizarUsuario usuario={row.original} />
            </CustomModal>

            <DeleteConfirmAction
              deleteAction={async () => {
                await mutateAsync({ id: row.original.id });
              }}
              title={`¿Esta seguro que desea eliminar el usuario ${row.original.nombre_usuario}`}
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
            triggerName="Agregar Usuario"
            description="Crea un nuevo registro"
            title="Nueva Usuario"
            className="sm:max-w-[1000px]"
          >
            <CrearUsuario />
            {/* <CrearMesa /> */}
          </CustomModal>

          <DataTable
            columns={columns}
            data={data?.usuarios}
          />
        </div>
      </>
    )
  );
};

export default Usuarios;
