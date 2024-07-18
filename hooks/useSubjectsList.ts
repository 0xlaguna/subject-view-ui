"use client"

import { fetcher } from "@/lib/api/apiClient"
import { useQuery } from "@tanstack/react-query"

import { getCookie } from "cookies-next"

interface SubjectListData {
  list: Subject[];
  pages: number;
}

interface Subject {
  id: number;
  name: string;
  sex: string;
  diagnosis_date: string;
  created_at: string;
  status: string;
}

interface QueryParams {
  page: number;
  search: string | undefined;
  per_page: number;
  sort_by: string | undefined;
  order: string | undefined;
}

const useSubjectList = (params: QueryParams) => {
  const xSession = getCookie("x-session")
  const session = JSON.parse(xSession as string)

  const headers = {
    "x-session-token": session.token
  }

  const { isError, isLoading, isSuccess, data } = useQuery<SubjectListData, Error>({
    queryKey: ["subject-list"],
    queryFn: () => fetcher<SubjectListData>("/subject/", params, headers)
  })

  return {
    subjectListError: isError,
    subjectListLoading: isLoading,
    subjectListSuccess: isSuccess,
    subjectListData: data
  }
}

export default useSubjectList;
