import axiosInstance from "@/config/axios/client-instance"
import { AxiosResponse } from "axios";

export const fetcher = async <T>(url: string, params: any, headers: any): Promise<T> => {
  if (!headers["x-session-token"]) {
    throw new Error("Session token is missing");
  }

  const response = await axiosInstance.get<T>(url, { params: params, headers });
  return response.data;
};

export const poster = async <T, U>(url: string, data: T, headers: any): Promise<U> => {
  if (!headers["x-session-token"]) {
    throw new Error("Session token is missing");
  }

  const response = await axiosInstance.post<T, AxiosResponse<U>>(url, data);
  return response.data;
}

export const destroy = async (url: string, params: any, headers: any) => {
  if (!headers["x-session-token"]) {
    throw new Error("Session token is missing");
  }

  const response = await axiosInstance.delete(url, { params, headers })
  return response.data;
}
