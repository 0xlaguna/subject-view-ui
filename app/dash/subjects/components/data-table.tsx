"use client"

import * as React from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { LoadingSpinner } from "@/components/ui/spinner"

import { DataTablePagination } from "./data-table-pagination"
import { DataTableToolbar } from "./data-table-toolbar"

export interface DataTableFilters {
  page: number
  per_page: number
  search: string | undefined
  sort_by: string | undefined
  order: string | undefined
}

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  isLoading: boolean
  updateQueryParams: (updates: Array<{
      key: keyof DataTableFilters;
      value: DataTableFilters[keyof DataTableFilters];
    }>) => void
  pageSize: number
  pageIndex: number
  pageCount: number
  refetch: () => void
  sortId?: string,
  sortDesc?: string
}

export function DataTable<TData, TValue>({
  columns,
  data,
  isLoading,
  updateQueryParams,
  pageSize,
  pageIndex,
  pageCount,
  refetch,
  sortDesc,
  sortId
}: DataTableProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = React.useState({})
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )

  const sorting: SortingState = []

  if (typeof sortId !== null && sortDesc !== null) {
    const desc = sortDesc === "desc"

    sorting.push({ id: sortId!!, desc: desc })
  }

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting: sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
      pagination: { pageSize, pageIndex },
    },
    enableRowSelection: true,
    manualPagination: true,
    pageCount: pageCount,
    manualSorting: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: (sortingUpdater) => {
      if (typeof sortingUpdater !== "function") return;

      const sortingInfo = sortingUpdater(table.getState().sorting);
      if (sortingInfo.length === 0) {
        return;
      }

      const sort = sortingInfo[0]
      const sortBy = sort.id
      const order = sort.desc ? "desc" : "asc";

      updateQueryParams([
        {key: "sort_by", value: sortBy},
        {key: "order", value: order}
      ])
    },
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    onPaginationChange: (updater) => {
      if (typeof updater !== "function") return;

      const newPageInfo = updater(table.getState().pagination);

      updateQueryParams([
        {key: "per_page", value: newPageInfo.pageSize},
        {key: "page", value: newPageInfo.pageIndex + 1}
      ])
    },
  })

  const toolbarOnSearch = (value: string | undefined) => updateQueryParams([{key: "search", value: value}])

  return (
    <div className="space-y-4">
      <DataTableToolbar table={table} onSearch={toolbarOnSearch} refetch={refetch} />
      <div className="rounded-md border">
        {isLoading ? (
          <div className="flex h-24 items-center justify-center">
            <LoadingSpinner />
          </div>
        ) : (
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id} colSpan={header.colSpan}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    );
                  })}
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
        )}
      </div>
      <DataTablePagination table={table} />
    </div>
  );
}
