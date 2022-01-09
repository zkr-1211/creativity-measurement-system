import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { useStore } from '@/store'
import { AppRouteRecordRaw } from '@/types'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

const routes = [
  {
    path: '/',
    name: 'Home',
    redirect: '/homepage',
    component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue'),
    children: [
      {
        path: '/homepage',
        name: 'HomePage',
        component: () => import(/* webpackChunkName: "homepage" */ '@/views/home/index.vue'),
        meta: {
          keepAlive: true
        }
      },
      {
        path: '/evaluation/allevaluation',
        name: 'AllEvaluation',
        component: () => import(/* webpackChunkName: "evaluationmanage" */ '@/views/evaluation/AllEvaluation.vue'),
        meta: {
          keepAlive: true
        }
      },
      {
        path: '/evaluation/design',
        name: 'EvaluationManage',
        component: () => import(/* webpackChunkName: "evaluationmanage" */ '@/views/evaluation/EvaluationDesign.vue'),
        meta: {
          keepAlive: true
        }
      },
      {
        path: '/evaluation/evaluationset',
        name: 'evaluationset',
        component: () => import(/* webpackChunkName: "evaluationmanage" */ '@/views/evaluation/EvaluationSet.vue'),
        meta: {
          keepAlive: true
        }
      },
      {
        path: '/evaluation/model-dimension-edit',
        name: 'ModelDimensionEdit',
        component: () => import(/* webpackChunkName: "evaluationmanage" */ '@/views/evaluation/ModelDimensionEdit.vue'),
        meta: {
          keepAlive: true
        }
      },
      {
        path: '/detailpage',
        name: 'detailPage',
        component: () => import(/* webpackChunkName: "detailpage" */ '@/views/detail/index.vue'),
        meta: {
          keepAlive: true
        }
      },
      {
        path: '/organization',
        name: 'organization',
        component: () => import(/* webpackChunkName: "organization" */ '@/views/organization/index.vue'),
        meta: {
          keepAlive: true
        }
      },
      {
        path: '/organization/addorganization',
        name: 'AddOrganization',
        component: () => import(/* webpackChunkName: "organization" */ '@/views/organization/AddOrganization.vue'),
        meta: {
          keepAlive: true
        }
      },
      {
        path: '/organization/detail',
        name: 'OrganizationDetail',
        component: () => import(/* webpackChunkName: "organization" */ '@/views/organization/OrganizationDetail.vue'),
        meta: {
          keepAlive: true
        }
      },
      {
        path: '/listpage/searchtable',
        name: 'SearchTable',
        component: () => import(/* webpackChunkName: "listpage" */ '@/views/list/SearchTable.vue'),
        meta: {
          keepAlive: true
        }
      },
      {
        path: '/personage-page',
        name: 'personagePage',
        component: () => import(/* webpackChunkName: "personagePage" */ '@/views/personage/index.vue'),
        meta: {
          keepAlive: true
        }
      },
      {
        path: '/personage-set',
        name: 'personageSet',
        component: () => import(/* webpackChunkName: "personagePage" */ '@/views/personage/personageSet.vue'),
        meta: {
          keepAlive: true
        }
      },
      {
        path: '/personnelmanage/administrator',
        name: 'Administrator',
        component: () => import(/* webpackChunkName: "personageManage" */ '@/views/personnel/Administrator.vue'),
        meta: {
          keepAlive: true
        }
      },
      {
        path: '/instrument-board/workbench',
        name: 'WorkBench',
        component: () => import(/* webpackChunkName: "instrumentBoard" */ '@/views/instrument/WorkBench.vue'),
        meta: {
          keepAlive: true
        }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})
router.beforeEach((to, from, next) => {
  NProgress.start()
  if (to.path === '/homepage') return next()
  const store = useStore()
  if (!store.getToken) return next('/homepage')
  next()
})

router.afterEach((to) => {
  NProgress.done()
})
export default router
