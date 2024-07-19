"use client"

import { useState} from "react";

import { getColumns } from "./components/columns"
import { DataTable, DataTableFilters } from "./components/data-table"

import useSubjectList from "@/hooks/useSubjectsList"


export default function Page() {

  const [queryParams, setQueryParams] = useState<DataTableFilters>({
    page: 1,
    per_page: 10,
    search: undefined,
    sort_by: undefined,
    order: undefined
  })

  const { subjectListLoading, subjectListData, refetchSubjectList } = useSubjectList(queryParams)

  const updateQueryParam = <K extends keyof DataTableFilters>(key: K, value: DataTableFilters[K]) => {
    setQueryParams((prevParams) => {
      const newParams = { ...prevParams, [key]: value };
      if (JSON.stringify(newParams) !== JSON.stringify(prevParams)) {
        return newParams;
      }
      return prevParams;
    });
  }

  return (
    <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Subjects</h2>
          <p className="text-muted-foreground">
            Manage subjects and view their details.
          </p>
        </div>
      </div>
      <DataTable
        data={subjectListData?.list || []}
        columns={getColumns({refetch: refetchSubjectList})}
        isLoading={subjectListLoading}
        updateQueryParams={updateQueryParam}
      />
    </div>
  )
}
