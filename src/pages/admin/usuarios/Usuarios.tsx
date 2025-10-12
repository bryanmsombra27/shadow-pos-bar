import { CustomModal, Loader, SearchInput } from "@/components/custom";
import DataTable from "@/components/custom/DataTable";
import useObtenerUsuarios from "@/hooks/usuarios/useObtenerUsuarios";
import type { Usuario } from "@/interfaces/usuario.interface";
import type { ColumnDef } from "@tanstack/react-table";
import { useEffect, type FC } from "react";
import CrearUsuario from "./CrearUsuario";
import ActualizarUsuario from "./ActualizarUsuario";
import useEliminarUsuarios from "@/hooks/usuarios/useEliminarUsuarios";
import { useUsuariosPaginacion } from "@/store/UsuariosPaginacion";
import { useSearchParams } from "react-router";

interface UsuariosProps {}
const Usuarios: FC<UsuariosProps> = ({}) => {
  const { data, error, isPending } = useObtenerUsuarios();
  const { mutateAsync } = useEliminarUsuarios();
  const { pagination, setPagination } = useUsuariosPaginacion();
  const [searchParams, _] = useSearchParams();

  // if (isPending) return <Loader />;
  useEffect(() => {
    if (searchParams && searchParams.get("busqueda")) {
      const search = searchParams.get("busqueda");

      if (search!.length > 3) {
        setPagination((prevState) => {
          return {
            ...prevState,
            search: search!,
          };
        });
      }
    } else if (searchParams && !searchParams.get("busqueda")) {
      setPagination((prevState) => {
        return {
          ...prevState,
          search: "",
        };
      });
    }
  }, [searchParams]);

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
    <>
      <div className="container mx-auto p-6">
        <div className="flex justify-between items-center mb-10">
          <SearchInput placeholder="Buscar por Nombre,Telefono" />

          <CustomModal
            triggerName="Agregar Usuario"
            description="Crea un nuevo registro"
            title="Nueva Usuario"
            className="sm:max-w-[1000px]"
          >
            <CrearUsuario />
            {/* <CrearMesa /> */}
          </CustomModal>
        </div>

        {isPending ? (
          <Loader />
        ) : (
          <DataTable
            columns={columns}
            data={data?.usuarios!}
            pagination={pagination}
            setPagination={setPagination}
            totalPages={data!.total_paginas}
            showActions
            title_property="nombre_usuario"
            delete_title="Esta seguro que desa eliminar el usuario"
            delete_function={mutateAsync}
            edit_component={(row) => (
              <ActualizarUsuario usuario={row.original} />
            )}
          />
        )}
      </div>
    </>
  );
};

export default Usuarios;
