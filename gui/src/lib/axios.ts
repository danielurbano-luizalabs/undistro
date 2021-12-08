import Axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'

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
  // if needed
  // Do something before request is sent
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
