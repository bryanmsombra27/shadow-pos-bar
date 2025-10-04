import { CustomModal, Loader } from "@/components/custom";
import DataTable from "@/components/custom/DataTable";
import useObtenerUsuarios from "@/hooks/usuarios/useObtenerUsuarios";
import type { Usuario } from "@/interfaces/usuario.interface";
import type { ColumnDef } from "@tanstack/react-table";
import type { FC } from "react";
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
            showActions
            title_property="nombre_usuario"
            delete_title="Esta seguro que desa eliminar el usuario"
            delete_function={mutateAsync}
            edit_component={(row) => (
              <ActualizarUsuario usuario={row.original} />
            )}
          />
        </div>
      </>
    )
  );
};

export default Usuarios;
