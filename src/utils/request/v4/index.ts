import axios from 'axios'
import { BASE_URI } from '@/config'
import RequestInterceptors from './interceptors/request'
import ResponseInterceptors from './interceptors/response'

const service = axios.create({
  baseURL: BASE_URI,
  withCredentials: true,
  timeout: 5000
})
RequestInterceptors(service)
ResponseInterceptors(service)

export default service
