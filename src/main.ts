import App from './App.vue'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { setupAntd } from '@/plugin/antd-ui'
import 'default-passive-events'
import './assets/scss/style.scss'
import router from './router'
import mitt from 'mitt'
import VueCookies from 'vue-cookies'
import 'normalize.css'
import './styles/index.scss'
const pinia = createPinia()
const app = createApp(App)
app.config.globalProperties.$emitter = mitt()
app.config.globalProperties.$cookies = VueCookies;
setupAntd(app)
app.use(router)
app.use(pinia)
app.mount('#app')