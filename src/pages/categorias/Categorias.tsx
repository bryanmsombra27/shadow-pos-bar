import { CustomModal, Loader, SearchInput } from "@/components/custom";
import DataTable from "@/components/custom/DataTable";
import useObtenerCategorias from "@/hooks/categorias/useObtenerCategorias";
import type { Categoria } from "@/interfaces/categoria.interface";
import type { ColumnDef } from "@tanstack/react-table";
import { useEffect, type FC } from "react";
import CrearCategoria from "./CrearCategoria";
import ActualizarCategoria from "./ActualizarCategoria";
import useEliminarCategorias from "@/hooks/categorias/useEliminarCategorias";
import { useCategoriasPaginacion } from "@/store/CategoriasPaginacion";
import { useSearchParams } from "react-router";

interface CategoriasProps {}
const Categorias: FC<CategoriasProps> = ({}) => {
  const { mutateAsync } = useEliminarCategorias();
  const { pagination, setPagination } = useCategoriasPaginacion();
  const { data, error, isPending } = useObtenerCategorias();
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
        No fue posible obtener los roles
      </span>
    );

  const columns: ColumnDef<Categoria>[] = [
    {
      accessorKey: "nombre",
      header: "Categoria",
      size: 80,
    },
  ];

  return (
    <>
      <div className="container mx-auto p-6">
        <div className="flex justify-between items-center mb-10">
          <SearchInput placeholder="Buscar por Nombre,Categoria" />
          <CustomModal
            triggerName="Agregar Categoria"
            description="Crea un nuevo registro"
            title="Nueva Categoria"
          >
            <CrearCategoria />
          </CustomModal>
        </div>

        {isPending ? (
          <Loader />
        ) : (
          <DataTable
            pagination={pagination}
            setPagination={setPagination}
            totalPages={data!.total_paginas}
            columns={columns}
            data={data?.categorias!}
            title_property="nombre"
            showActions
            delete_title="Esta seguro de eliminar la categoria de"
            delete_function={mutateAsync}
            edit_component={(row) => (
              <ActualizarCategoria categoria={row.original} />
            )}
          />
        )}
      </div>
    </>
  );
};

export default Categorias;
