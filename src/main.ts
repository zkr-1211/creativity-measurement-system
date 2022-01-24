import { createApp } from 'vue'
import { createPinia } from 'pinia'
import 'normalize.css'
import App from './App.vue'
import router from './router'
import { setupAntd } from '@/plugin/antd-ui'
import './assets/scss/style.scss'
const pinia = createPinia()
import mitt from 'mitt'
const app = createApp(App)
app.config.globalProperties.$mybus = mitt()
setupAntd(app)
app.use(router)
app.use(pinia)
app.mount('#app')