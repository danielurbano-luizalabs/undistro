import Axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'
import { getToken } from '@/lib/auth'
import { btoa } from '@/helpers/encoding'

export interface ErrorMessage {
  type: 'error'
  message: string
  status: number
}

export function handleAxiosError(error: AxiosError): ErrorMessage {
  const message: string = error?.response?.data?.error
  const status: number = error?.response?.status
  throw { message, status }
}

const instance = Axios.create({
  baseURL: process.env.UNDISTRO_API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

instance.interceptors.request.use((config: AxiosRequestConfig) => {
  const token = getToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  
  return config
})

instance.interceptors.response.use(
  (data: AxiosResponse) => {
    if (data?.data) {
      // if needed
      // Do something with response data
    }

    return data
  },
  (error: AxiosError) => {
    if (error.isAxiosError) {
      return handleAxiosError(error)
    }

    throw error
  }
)

export default instance
