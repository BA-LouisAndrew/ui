import axios, { AxiosRequestConfig } from "axios"
import { ref } from "vue"

const baseUrl = import.meta.env.VITE_BACKEND_URL

export const useFetch = <T = object>(endpoint: string) => {
  const isLoading = ref(false)
  const hasError = ref(false)
 
  const url = `${baseUrl}api/v1${endpoint}`
  return {
    get: (config: AxiosRequestConfig = {}) => axios.get<T>(url, config),
    post: <R = T>(data: T, config: AxiosRequestConfig = {}) =>
      axios.post<R>(url, data, config),
    put: <R = T>(data: Partial<T>, config: AxiosRequestConfig = {}) => axios.put<R>(url, data, config),
    delete: <R = T>(config: AxiosRequestConfig = {}) => axios.delete<R>(url, config),
    isLoading,
    hasError,
    url
  }
}