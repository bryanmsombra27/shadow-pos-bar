import { CustomModal, Loader } from "@/components/custom";
import DataTable from "@/components/custom/DataTable";
import useEliminarProductos from "@/hooks/productos/useEliminarProductos";
import useObtenerProductos from "@/hooks/productos/useObtenerProductos";
import type { Producto } from "@/interfaces/producto.interface";
import type { ColumnDef } from "@tanstack/react-table";
import type { FC } from "react";
import CrearProductos from "./CrearProductos";
import ActualizarProductos from "./ActualizarProductos";

interface ProductosProps {}
const Productos: FC<ProductosProps> = ({}) => {
  const { data, error, isPending } = useObtenerProductos();
  const { mutateAsync } = useEliminarProductos();

  if (isPending) return <Loader />;

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
    data && (
      <>
        <div className="container mx-auto p-6">
          <CustomModal
            className="sm:max-w-[1000px]"
            triggerName="Agregar Producto"
            description="Crea un nuevo registro"
            title="Nuevo Producto"
          >
            <CrearProductos />
          </CustomModal>

          <DataTable
            showActions
            delete_title="Esta seguro que desea eliminar el producto de"
            delete_function={mutateAsync}
            edit_component={(row) => (
              <ActualizarProductos producto={row.original} />
            )}
            title_property="nombre"
            columns={columns}
            data={data?.productos}
          />
        </div>
      </>
    )
  );
};

export default Productos;
