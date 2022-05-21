import axios, { AxiosRequestConfig } from "axios"

const baseUrl = import.meta.env.VITE_BACKEND_URL

export const useFetch = <T = any>(endpoint: string) => {
  const url = `${baseUrl}/api/v1${endpoint}`
  return {
    get: (config: AxiosRequestConfig = {}) => axios.get(url, config),
    post: (data: T, config: AxiosRequestConfig = {}) =>
      axios.post(url, data, config),
    put: (data: T, config: AxiosRequestConfig = {}) => axios.put(url, data, config),
    delete: (config: AxiosRequestConfig = {}) => axios.delete(url, config)
  }
}
