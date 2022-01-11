import { RouteRecordRaw } from 'vue-router'

// 主框架内显示的路由
export const frameIn: Array<RouteRecordRaw> = [
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
          keepAlive: true,
          title: '首页',
          auth: true
        }
      },
      {
        path: '/evaluation/allevaluation',
        name: 'AllEvaluation',
        component: () => import(/* webpackChunkName: "evaluationmanage" */ '@/views/evaluation/AllEvaluation.vue'),
        meta: {
          keepAlive: true,
          title: '全部测评',
          auth: true
        }
      },
      {
        path: '/evaluation/design',
        name: 'EvaluationManage',
        component: () => import(/* webpackChunkName: "evaluationmanage" */ '@/views/evaluation/EvaluationDesign.vue'),
        meta: {
          keepAlive: true,
          isCache: false, // 是否缓存
          title: '测评设计',
          auth: true
        }
      },
      {
        path: '/evaluation/evaluationset',
        name: 'evaluationset',
        component: () => import(/* webpackChunkName: "evaluationmanage" */ '@/views/evaluation/EvaluationSet.vue'),
        meta: {
          keepAlive: true,
          title: '测评设置'
        }
      },
      {
        path: '/evaluation/model-dimension-edit',
        name: 'ModelDimensionEdit',
        component: () => import(/* webpackChunkName: "evaluationmanage" */ '@/views/evaluation/ModelDimensionEdit.vue'),
        meta: {
          keepAlive: true,
          title: '测评设置'

        }
      },
      {
        path: '/detailpage',
        name: 'detailPage',
        // component: () => import(/* webpackChunkName: "detailpage" */ '@/views/detail/index.vue'),
        meta: {
          keepAlive: true,
          title: '详情页'
        }
      },
      {
        path: '/organization',
        name: 'organization',
        component: () => import(/* webpackChunkName: "organization" */ '@/views/organization/index.vue'),
        meta: {
          keepAlive: true,
          title: '机构'

        }
      },
      {
        path: '/organization/addorganization',
        name: 'AddOrganization',
        component: () => import(/* webpackChunkName: "organization" */ '@/views/organization/AddOrganization.vue'),
        meta: {
          keepAlive: true,
          title: '添加机构'
        }
      },
      {
        path: '/organization/detail',
        name: 'OrganizationDetail',
        component: () => import(/* webpackChunkName: "organization" */ '@/views/organization/OrganizationDetail.vue'),
        meta: {
          keepAlive: true,
          title: '机构详情'
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
          keepAlive: true,
          title: '测评师'
        }
      },
      {
        path: '/personage-set',
        name: 'personageSet',
        component: () => import(/* webpackChunkName: "personagePage" */ '@/views/personage/personageSet.vue'),
        meta: {
          keepAlive: true,
          title: '个人页设置'
        }
      },
      {
        path: '/personnelmanage/administrator',
        name: 'Administrator',
        component: () => import(/* webpackChunkName: "personageManage" */ '@/views/personnel/Administrator.vue'),
        meta: {
          keepAlive: true,
          title: '管理员'
        }
      },
      {
        path: '/instrument-board/workbench',
        name: 'WorkBench',
        component: () => import(/* webpackChunkName: "instrumentBoard" */ '@/views/instrument/WorkBench.vue'),
        meta: {
          keepAlive: true,
          title: '工作台'
        }
      }
    ]
  }
]
// 主框架外显示的路由
// const frameOut = [
//   {
//     path: '/user/login',
//     name: 'Login',
//     component: () => import('@/views/sys/login/index.vue'),
//     meta: {
//       title: '登录'
//     }
//   }
// ]

// const errorPage = [
//   {
//     path: '/:pathMatch(.*)*',
//     name: 'NotFound',
//     component: () => import('@/views/sys/error/404.vue')
//   }
// ]

export default [
  ...frameIn
  // ...frameOut,
  // ...errorPage
]