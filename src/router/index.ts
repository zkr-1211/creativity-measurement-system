
import { createRouter, createWebHistory } from 'vue-router'
// import { useStore } from '@/store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import routes from './routes'

const router = createRouter({
  history: createWebHistory(),
  routes
})
router.beforeEach((to, from, next) => {
  NProgress.start()
  // if (to.path === '/homepage') return next()
  // const store = useStore()
  // if (!store.getToken) return next('/homepage')
  next()
})

router.afterEach((to) => {
  NProgress.done()
})
export default router
