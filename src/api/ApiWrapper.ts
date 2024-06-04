import axios from 'axios'
import Cookies from 'js-cookie';
import { API_URL } from '@/env';

const HTTP_STATUS_UNAUTHORIZED = 401

const axiosInstance = axios.create({
  baseURL: API_URL
})


axiosInstance.interceptors.request.use((config) => {
  const sessionStorageToken = sessionStorage.getItem('token')
  const cookieToken = Cookies.get('token')

  if (sessionStorageToken) {
    config.headers.Authorization = `Bearer ${sessionStorageToken}`
  }

  if (cookieToken) {
    config.headers.Authorization = `Bearer ${cookieToken}`
  }

  config.headers.Accept = 'application/json'

  return config
})

axiosInstance.interceptors.response.use(
  (response) => response.data,
  async (error) => {
    console.error(`🚨 API wrapper gets an error: ${error}`)

    if (error.response.status === HTTP_STATUS_UNAUTHORIZED) {
      sessionStorage.removeItem('token')
      Cookies.remove('token')
    }

    return Promise.reject(error)
  }
)

export const Api = axiosInstance