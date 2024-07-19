"use client"

import { destroy } from "@/lib/api/apiClient"
import { useMutation } from "@tanstack/react-query"
import { useSession } from 'next-auth/react';
import { useEffect } from "react";

interface QueryParams {
  id: number
}

const useDeleteSubject = (params: QueryParams) => {
  const session = useSession()

  useEffect(() => {}, [session]);

  const token = session.data?.accessToken
  const headers = {
    "x-session-token": token
  };

  const { isError, isSuccess, data, mutate } = useMutation<any, Error>({
    mutationFn: () => destroy("/subject/", params, headers),
  })

  return {
    subjecDestroyError: isError,
    subjectDestroySuccess: isSuccess,
    subjecDestroyData: data,
    destroySubject: mutate
  }
}

export default useDeleteSubject;
