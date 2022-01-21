import { useStore } from '@/store'
import { AxiosRequestConfig } from 'axios'
const store = useStore()
export default (axios) => {
  axios.interceptors.request.use(
    (config:AxiosRequestConfig) => {
      const token = store.getToken
      const appSource = import.meta.env.VITE_APP_SOURCE || 'shu.ke'
      if (appSource) {
        config.headers['app-source'] = appSource
      }
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
      return config
    },
    (error) => {
      console.log(`请求出现错误: ${error}`)
      throw error
    }
  )
}
