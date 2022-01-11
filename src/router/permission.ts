import NProgress from 'nprogress'
import router from '@/router'
import { useStore } from '@/store'
// import { setTitle } from '@/libs/utils'

// 进度条
import 'nprogress/nprogress.css'

const loginRoutePath = '/login'
const defaultRoutePath = '/homepage'
/**
 * 路由拦截
 * 权限验证
 */

const store = useStore()
router.beforeEach(async(to, from, next) => {
  const token = store.getToken

  // 进度条
  NProgress.start()
  // 验证当前路由所有的匹配中是否需要有登录验证的
  if (to.matched.some((r) => r.meta.auth)) {
    // 是否存有token作为验证是否登录的条件
    if (token && token !== 'undefined') {
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
  // 进度条
  NProgress.done()
  // setTitle(to.meta.title as string)
})