import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import CustomModal from "./CustomModal";
import { FiEdit } from "react-icons/fi";
import type { Dispatch, ReactNode } from "react";
import DeleteConfirmAction from "../shared/DeleteConfirmAction";
import type { UseMutateAsyncFunction } from "@tanstack/react-query";
import type { ReactTablePagination } from "@/interfaces/paginacion.interface";
import { Button } from "../ui/button";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  edit_component?: (row: any) => ReactNode;
  title_property?: any;
  delete_title?: string;
  delete_function?: UseMutateAsyncFunction<any, Error, any, unknown>;
  showActions: boolean;
  pagination: ReactTablePagination;
  setPagination: Dispatch<React.SetStateAction<ReactTablePagination>>;
  totalPages: number;
}
function DataTable<TData, TValue>({
  columns,
  data,
  edit_component,
  title_property,
  delete_title,
  delete_function,
  showActions = true,
  setPagination,
  pagination,
  totalPages,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    state: {
      pagination,
    },
    getCoreRowModel: getCoreRowModel(),
    onPaginationChange: setPagination,
    manualPagination: true,
    pageCount: totalPages,
  });

  return (
    <>
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
                {showActions && <TableHead>Acciones</TableHead>}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}

                  {showActions && (
                    <TableCell className="flex gap-5 my-2">
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
                        title={`${(row as any).original[title_property]}`}
                      >
                        {edit_component && edit_component(row)}
                      </CustomModal>

                      <DeleteConfirmAction
                        deleteAction={async () => {
                          // await mutateAsync({ id: row.original.id });
                          if (delete_function)
                            await delete_function({
                              id: (row as any).original.id,
                            });
                        }}
                        title={`¿${delete_title}  ${
                          (row as any).original[title_property]
                        }?`}
                      />
                    </TableCell>
                  )}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        <div className="flex items-center justify-end space-x-2 mt-4 py-4 px-6 gap-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>

          <span className="text-sm">
            Página {table.getState().pagination.pageIndex + 1} de{" "}
            {table.getPageCount()}
          </span>

          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              // console.log(table.getPageCount(), "PAGINA CUENTA");
              table.nextPage();
            }}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </>
  );
}

export default DataTable;
