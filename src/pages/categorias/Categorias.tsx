import { CustomModal } from "@/components/custom";
import DataTable from "@/components/custom/DataTable";
import DeleteConfirmAction from "@/components/shared/DeleteConfirmAction";
import useObtenerCategorias from "@/hooks/categorias/useObtenerCategorias";
import type { Categoria } from "@/interfaces/categoria.interface";
import type { ColumnDef } from "@tanstack/react-table";
import { Loader } from "lucide-react";
import type { FC } from "react";
import { FiEdit } from "react-icons/fi";
import CrearCategoria from "./CrearCategoria";
import ActualizarCategoria from "./ActualizarCategoria";
import useEliminarCategorias from "@/hooks/categorias/useEliminarCategorias";

interface CategoriasProps {}
const Categorias: FC<CategoriasProps> = ({}) => {
  const { data, error, isPending } = useObtenerCategorias();
  const { mutateAsync } = useEliminarCategorias();

  if (isPending) return <Loader />;

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
              <h2>kaso</h2>
              <ActualizarCategoria categoria={row.original} />
            </CustomModal>

            <DeleteConfirmAction
              deleteAction={async () => {
                await mutateAsync({ id: row.original.id });
              }}
              title={`¿Esta seguro que desea eliminar la categoria de  ${row.original.nombre}`}
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
            triggerName="Agregar Categoria"
            description="Crea un nuevo registro"
            title="Nueva Categoria"
          >
            <CrearCategoria />
          </CustomModal>

          <DataTable
            columns={columns}
            data={data?.categorias}
          />
        </div>
      </>
    )
  );
};

export default Categorias;
