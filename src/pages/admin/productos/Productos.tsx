import { CustomModal, Loader, SearchInput } from "@/components/custom";
import DataTable from "@/components/custom/DataTable";
import useEliminarProductos from "@/hooks/productos/useEliminarProductos";
import useObtenerProductos from "@/hooks/productos/useObtenerProductos";
import type { Producto } from "@/interfaces/producto.interface";
import type { ColumnDef } from "@tanstack/react-table";
import { useEffect, type FC } from "react";
import CrearProductos from "./CrearProductos";
import ActualizarProductos from "./ActualizarProductos";
import { useProductosPaginacion } from "@/store/ProductosPaginacion";
import { useSearchParams } from "react-router";

interface ProductosProps {}
const Productos: FC<ProductosProps> = ({}) => {
  const { data, error, isPending } = useObtenerProductos();
  const { mutateAsync } = useEliminarProductos();
  const { pagination, setPagination } = useProductosPaginacion();
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
        No fue posible obtener los productos
      </span>
    );

  const columns: ColumnDef<Producto>[] = [
    {
      accessorKey: "nombre",
      header: "Nombre",
      size: 80,
    },
    {
      accessorKey: "categoria.nombre",
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
            className="sm:max-w-[1000px]"
            triggerName="Agregar Producto"
            description="Crea un nuevo registro"
            title="Nuevo Producto"
          >
            <CrearProductos />
          </CustomModal>
        </div>
        {isPending ? (
          <Loader />
        ) : (
          <DataTable
            showActions
            delete_title="Esta seguro que desea eliminar el producto de"
            delete_function={mutateAsync}
            edit_component={(row) => (
              <ActualizarProductos producto={row.original} />
            )}
            title_property="nombre"
            columns={columns}
            data={data?.productos!}
            pagination={pagination}
            setPagination={setPagination}
            totalPages={data!.total_paginas}
          />
        )}
      </div>
    </>
  );
};

export default Productos;
