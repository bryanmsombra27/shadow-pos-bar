import { CustomModal, Loader, SearchInput } from "@/components/custom";
import DataTable from "@/components/custom/DataTable";
import useObtenerMesas from "@/hooks/mesas/useObtenerMesas";
import type { Mesa } from "@/interfaces/mesa.interface";
import type { ColumnDef } from "@tanstack/react-table";

import { useEffect, useState, type FC } from "react";

import CrearMesa from "./CrearMesa";
import ActualizarMesaForm from "./ActualizarMesa";
import useEliminarMesa from "@/hooks/mesas/useEliminarMesa";
import type { ReactTablePagination } from "@/interfaces/paginacion.interface";
import { useSearchParams } from "react-router";

interface MesasProps {}
const Mesas: FC<MesasProps> = ({}) => {
  const [searchParams, _] = useSearchParams();

  const [pagination, setPagination] = useState<ReactTablePagination>({
    pageIndex: 0,
    pageSize: 10,
    search: "",
  });

  const currentPage = pagination.pageIndex + 1;

  const { data, error, isPending } = useObtenerMesas({
    page: currentPage,
    search: pagination.search,
  });
  const { mutateAsync } = useEliminarMesa({
    page: currentPage,
  });

  useEffect(() => {
    if (searchParams && searchParams.get("busqueda")) {
      const busqueda = searchParams.get("busqueda") || "";

      if (busqueda.length > 3) {
        setPagination((prevState) => {
          return {
            ...prevState,
            search: busqueda,
          };
        });
      }
    }
  }, [searchParams]);

  // if (isPending) return <Loader />;

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
    <>
      <div className="container mx-auto p-6">
        <div className="flex justify-between items-center mb-10">
          <SearchInput placeholder="Buscar por Nombre,Mesero" />
          <CustomModal
            triggerName="Agregar Mesa"
            description="Crea un nuevo registro"
            title="Nueva Mesa"
          >
            <CrearMesa page={currentPage} />
          </CustomModal>
        </div>
        {isPending ? (
          <Loader />
        ) : (
          <DataTable
            showActions
            delete_title="Esta seguro que desea eliminar la mesa"
            delete_function={mutateAsync}
            edit_component={(row) => (
              <ActualizarMesaForm
                mesa={row.original}
                page={currentPage}
              />
            )}
            title_property="nombre"
            columns={columns}
            data={data?.mesas!}
            pagination={pagination}
            setPagination={setPagination}
            totalPages={data!.total_paginas}
          />
        )}
      </div>
    </>
  );
};

export default Mesas;
