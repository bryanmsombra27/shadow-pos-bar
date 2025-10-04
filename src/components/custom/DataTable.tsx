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
import type { ReactNode } from "react";
import DeleteConfirmAction from "../shared/DeleteConfirmAction";
import type { UseMutateAsyncFunction } from "@tanstack/react-query";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  // delete_function: (param: {}) => void;
  edit_component?: (row: any) => ReactNode;
  title_property?: any;
  delete_title?: string;
  delete_function?: UseMutateAsyncFunction<any, Error, any, unknown>;
  showActions: boolean;
}
function DataTable<TData, TValue>({
  columns,
  data,
  edit_component,
  title_property,
  delete_title,
  delete_function,
  showActions = true,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
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
      </div>
    </>
  );
}

export default DataTable;
