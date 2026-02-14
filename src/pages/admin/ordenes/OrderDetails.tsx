import { Loader } from "@/components/custom";
import DataTable from "@/components/custom/DataTable";
import { Button } from "@/components/ui/button";
import useObtenerOrdenPorMesa from "@/hooks/ordenes/useObtenerOrdenPorMesa";
import type { Pedido } from "@/interfaces/orden.interface";
import type { ColumnDef } from "@tanstack/react-table";
import { useState, type FC } from "react";
import { useNavigate, useParams } from "react-router";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import useCompletarOrden from "@/hooks/ordenes/useCompletarOrden";
import type { ReactTablePagination } from "@/interfaces/paginacion.interface";

interface OrderDetailsProps {}
const OrderDetails: FC<OrderDetailsProps> = ({}) => {
  const { id } = useParams();
  const { data, error, isPending } = useObtenerOrdenPorMesa(id!);
  const { isPending: isCompleteOrderPending, mutateAsync } =
    useCompletarOrden();
  const navigate = useNavigate();
  const [pagination, setPagination] = useState<ReactTablePagination>({
    pageIndex: 0,
    pageSize: 10,
    search: "",
  });

  const completarOrden = async () => {
    await mutateAsync(data?.orden.id!);
  };

  const total =
    data && data.orden
      ? data.orden.pedidos.reduce(
          (acc, item) => acc + item.cantidad * item.precio,
          0,
        )
      : 0;

  const columns: ColumnDef<Pedido>[] = [
    {
      accessorKey: "producto.nombre",
      header: "Nombre del producto",
      size: 80,
    },
    {
      accessorKey: "precio",
      header: "Precio del producto",
      size: 80,
    },
    {
      accessorKey: "cantidad",
      header: "Cantidad",
      size: 80,
    },
    {
      header: "Total",
      cell: ({ row }) => {
        return row.original.precio * row.original.cantidad;
      },
    },
  ];

  if (isPending) return <Loader />;

  if (error)
    return (
      <span className="text-red-600 border-2 p-4 rounded-xl">
        No fue posible obtener la orden de la mesa
      </span>
    );

  if (data)
    return (
      <>
        <div className="container px-10">
          <FaArrowAltCircleLeft
            size={40}
            className="mb-10 cursor-pointer"
            onClick={() => navigate("/ordenes")}
          />

          <DataTable
            showActions={false}
            columns={columns}
            data={data?.orden.pedidos}
            pagination={pagination}
            setPagination={setPagination}
            totalPages={data.orden.pedidos.length}
          />

          <div className="flex justify-end items-center px-10 mt-10 gap-10">
            <h5 className="font-bold text-xl ">Total a pagar: </h5>
            <p className="block font-semibold text-2xl">${total}</p>
          </div>

          <div className="flex justify-end px-10 mt-5">
            <Button
              type="button"
              onClick={completarOrden}
              disabled={isCompleteOrderPending}
              className={
                isPending
                  ? `cursor-not-allowed pointer-events-none opacity-30`
                  : ""
              }
            >
              Completar Orden{" "}
            </Button>
          </div>
        </div>
      </>
    );
};

export default OrderDetails;
