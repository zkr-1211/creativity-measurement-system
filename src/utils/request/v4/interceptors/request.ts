import { useStore } from '@/store'
const store = useStore()

export default (axios) => {
  axios.interceptors.request.use(
    config => {
      const token = store.getToken
      const appSource = process.env.VUE_APP_SOURCE || 'shu.ke'
      if (appSource) {
        config.headers['app-source'] = appSource
      }
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`
      }
      return config
    },
    error => {
      console.log(`请求出现错误: ${error}`)
      throw error
    }
  )
}