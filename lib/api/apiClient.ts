import axiosInstance from "@/config/axios/client-instance"
import { AxiosResponse } from "axios";

export const fetcher = async <T>(url: string, params: any, headers: any): Promise<T> => {
  const response = await axiosInstance.get<T>(url, { params: params, headers });
  return response.data;
};

export const poster = async <T, U>(url: string, data: T): Promise<U> => {
  const response = await axiosInstance.post<T, AxiosResponse<U>>(url, data);
  return response.data;
}
