"use client"

import { fetcher } from "@/lib/api/apiClient"
import { useQuery } from "@tanstack/react-query"
import { useSession } from 'next-auth/react';
import { useEffect } from "react";

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
  const session = useSession()

  useEffect(() => {}, [session]);

  const token = session.data?.accessToken
  const headers = {
    "x-session-token": token
  };

  const { isError, isLoading, isSuccess, data, refetch } = useQuery<SubjectListData, Error>({
    queryKey: ["subject-list", params],
    queryFn: () => fetcher<SubjectListData>("/subject/", params, headers),
    enabled: !!token
  })

  return {
    subjectListError: isError,
    subjectListLoading: isLoading,
    subjectListSuccess: isSuccess,
    subjectListData: data,
    refetchSubjectList: refetch
  }
}

export default useSubjectList;
