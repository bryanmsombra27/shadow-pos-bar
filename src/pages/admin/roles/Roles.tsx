import { CustomModal, Loader, SearchInput } from "@/components/custom";
import DataTable from "@/components/custom/DataTable";
import useObtenerRoles from "@/hooks/roles/useObtenerRoles";
import type { Role } from "@/interfaces/rol.interface";
import type { ColumnDef } from "@tanstack/react-table";
import { useEffect, type FC } from "react";
import CrearRol from "./CrearRol";
import ActualizarRol from "./ActualizarRol";
import useEliminarRol from "@/hooks/roles/useEliminarRol";
import { useRolPaginacion } from "@/store/rolPaginacion";
import { useSearchParams } from "react-router";

interface RolesProps {}
const Roles: FC<RolesProps> = ({}) => {
  const { data, error, isPending } = useObtenerRoles();
  const { pagination, setPagination } = useRolPaginacion();
  const { mutateAsync } = useEliminarRol();
  const [searchParams, _] = useSearchParams();

  // if (isPending) return <Loader />;

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
  ];

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

  return (
    <>
      <div className="container mx-auto p-6">
        <div className="flex justify-between items-center mb-10">
          <SearchInput placeholder="Buscar por rol" />

          <CustomModal
            triggerName="Agregar Rol"
            description="Crea un nuevo registro"
            title="Nuevo Rol"
          >
            <CrearRol />
          </CustomModal>
        </div>

        {isPending ? (
          <Loader />
        ) : (
          <DataTable
            showActions
            delete_title="Esta seguro que desea eliminar el rol de"
            delete_function={mutateAsync}
            edit_component={(row) => <ActualizarRol rol={row.original} />}
            title_property="nombre"
            columns={columns}
            data={data?.roles!}
            pagination={pagination}
            setPagination={setPagination}
            totalPages={data!.total_paginas}
          />
        )}
      </div>
    </>
  );
};

export default Roles;
