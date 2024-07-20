"use client"

import { poster } from "@/lib/api/apiClient"
import { useMutation } from "@tanstack/react-query"
import { useSession } from 'next-auth/react';
import { useEffect } from "react";

const useCreateSubject = () => {
  const session = useSession()

  useEffect(() => {}, [session]);

  const token = session.data?.accessToken
  const headers = {
    "x-session-token": token
  };

  const { isError, isSuccess, mutate, isPending } = useMutation<any, Error>({
    mutationFn: (newSubject) => poster("/subject/create", newSubject, headers),
  })

  return {
    subjecCreateError: isError,
    subjectCreateSuccess: isSuccess,
    createSubject: mutate,
    isPending: isPending
  }
}

export default useCreateSubject;
