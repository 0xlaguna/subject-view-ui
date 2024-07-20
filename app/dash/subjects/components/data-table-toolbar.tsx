"use client"

import { useState, useEffect } from "react"

import { Cross2Icon } from "@radix-ui/react-icons"
import { Table } from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DataTableViewOptions } from "./data-table-view-options"

import { genders, statuses } from "../data/data"
import { DataTableFacetedFilter } from "./data-table-faceted-filter"
import useDebounce from "@/hooks/useDebounce"

interface DataTableToolbarProps<TData> {
  table: Table<TData>
  onSearch: (value: string | undefined) => void
  refetch: () => void
}

export function DataTableToolbar<TData>({
  table,
  onSearch,
  refetch
}: DataTableToolbarProps<TData>) {
  const [searchTerm, setSearchTerm] = useState<string | undefined>(undefined);
  const debouncedSearchTerm = useDebounce<string | undefined>(searchTerm, 800);

  useEffect(() => {
    onSearch(debouncedSearchTerm || undefined);
  }, [debouncedSearchTerm, onSearch]);

  const isFiltered = table.getState().columnFilters.length > 0

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filter subjects..."
          value={searchTerm || ""}
          onChange={(event) => setSearchTerm(event.target.value)}
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {table.getColumn("status") && (
          <DataTableFacetedFilter
            column={table.getColumn("status")}
            title="Status"
            options={statuses}
          />
        )}
        {table.getColumn("sex") && (
          <DataTableFacetedFilter
            column={table.getColumn("sex")}
            title="Gender"
            options={genders}
          />
        )}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} refetch={refetch}/>
    </div>
  )
}
