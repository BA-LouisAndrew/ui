import axios, { AxiosRequestConfig } from "axios"
import { ref } from "vue"

const baseUrl = import.meta.env.VITE_BACKEND_URL

const makeUrl = (endpoint: string) => `${baseUrl}api/v1${endpoint}`

export const useFetch = <T = object>(endpoint: string) => {
  const isLoading = ref(false)
  const hasError = ref(false)
  const url = ref(makeUrl(endpoint))

  return {
    get: (config: AxiosRequestConfig = {}) => axios.get<T>(url.value, config),
    post: <R = T>(data: T, config: AxiosRequestConfig = {}) =>
      axios.post<R>(url.value, data, config),
    put: <R = T>(data: Partial<T>, config: AxiosRequestConfig = {}) =>
      axios.put<R>(url.value, data, config),
    delete: <R = T>(config: AxiosRequestConfig = {}) =>
      axios.delete<R>(url.value, config),
    isLoading,
    hasError,
    url: url,
    updateUrl: (newEndpoint: string) => {
      url.value = makeUrl(newEndpoint)
    },
    _delete: axios.delete,
  }
}
