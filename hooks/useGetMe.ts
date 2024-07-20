"use client"

import { fetcher } from "@/lib/api/apiClient"
import { useQuery } from "@tanstack/react-query"
import { useSession } from 'next-auth/react';
import { useEffect } from "react";

interface GeMeData {
  email: string
  first_name: string
  middle_name: string
  last_name: string
}

const useGetMe = () => {
  const session = useSession()

  useEffect(() => {}, [session]);

  const token = session.data?.accessToken
  const headers = {
    "x-session-token": token
  };

  const { isError, isLoading, isSuccess, data, refetch } = useQuery<GeMeData, Error>({
    queryKey: ["users-getme"],
    queryFn: () => fetcher<GeMeData>("/users/me", {}, headers),
    enabled: !!token
  })

  return {
    getMeError: isError,
    getMeLoading: isLoading,
    getMeSuccess: isSuccess,
    getMeData: data,
  }
}

export default useGetMe;
