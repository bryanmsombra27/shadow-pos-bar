import { CustomModal, Loader } from "@/components/custom";
import DataTable from "@/components/custom/DataTable";
import DeleteConfirmAction from "@/components/shared/DeleteConfirmAction";
import useEliminarProductos from "@/hooks/productos/useEliminarProductos";
import useObtenerProductos from "@/hooks/productos/useObtenerProductos";
import type { Producto } from "@/interfaces/producto.interface";
import type { ColumnDef } from "@tanstack/react-table";
import type { FC } from "react";
import { FiEdit } from "react-icons/fi";
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
              <ActualizarProductos producto={row.original} />
            </CustomModal>

            <DeleteConfirmAction
              deleteAction={async () => {
                await mutateAsync({ id: row.original.id });
              }}
              title={`¿Esta seguro que desea eliminar el producto de  ${row.original.nombre}`}
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
            triggerName="Agregar Producto"
            description="Crea un nuevo registro"
            title="Nuevo Producto"
          >
            <CrearProductos />
          </CustomModal>

          <DataTable
            columns={columns}
            data={data?.productos}
          />
        </div>
      </>
    )
  );
};

export default Productos;
