
import { createRouter, createWebHistory } from 'vue-router'
import { useStore } from '@/store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import routes from './routes'
import { NextLoading } from '@/utils/loading'

const router = createRouter({
  history: createWebHistory(),
  routes
})
const loginRoutePath = '/homePage'
const defaultRoutePath = '/homePage'
/**
 * 路由拦截
 * 权限验证
 */

NextLoading.start()
router.beforeEach((to, from, next) => {
  NProgress.start()

  const store = useStore()
  const token = store.getToken || '123'
  // 进度条
  // 验证当前路由所有的匹配中是否需要有登录验证的
  if (to.matched.some((r) => r.meta.auth)) {
    // 是否存有token作为验证是否登录的条件
    if (token) {
      if (to.path === loginRoutePath) {
        next({ path: defaultRoutePath })
      } else {
        next()
      }
    } else {
      // 没有登录的时候跳转到登录界面
      // 携带上登录成功之后需要跳转的页面完整路径
      next({
        name: 'Login',
        query: {
          redirect: to.fullPath
        }
      })
      NProgress.done()
    }
  } else {
    // 不需要身份校验 直接通过
    next()
  }
})

router.afterEach((to) => {
  NextLoading.done()
  NProgress.done()
})
export default router
