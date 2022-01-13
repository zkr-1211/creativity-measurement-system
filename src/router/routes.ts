import { RouteRecordRaw } from 'vue-router'

// 主框架内显示的路由
export const frameIn: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    redirect: '/homepage',
    component: () => import(/* webpackChunkName: "home" */ '@/layouts/BasicLayout.vue'),
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
          title: '模型设置'

        }
      },
      {
        path: '/detailpage',
        name: 'detailPage',
        component: () => import(/* webpackChunkName: "detailpage" */ '@/views/detail/index.vue'),
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
      },
      {
        path: '/school-administrator',
        name: 'SchoolAdministrator',
        component: () => import(/* webpackChunkName: "School" */ '@/views/school/SchoolAdministrator.vue'),
        meta: {
          keepAlive: true,
          title: '校区管理员'
        }
      },
      {
        path: '/school-manage',
        name: 'SchoolManage',
        component: () => import(/* webpackChunkName: "School" */ '@/views/school/SchoolManage.vue'),
        meta: {
          keepAlive: true,
          title: '校区管理'
        }
      },
      {
        path: '/student-manage',
        name: 'StudentManage',
        component: () => import(/* webpackChunkName: "StudentManage" */ '@/views/person/student/StudentManage.vue'),
        meta: {
          keepAlive: true,
          title: '学生管理'
        }
      },
      {
        path: '/teacher-manage',
        name: 'TeacherManage',
        component: () => import(/* webpackChunkName: "TeacherManage" */ '@/views/person/teacher/TeacherManage.vue'),
        meta: {
          keepAlive: true,
          title: '老师管理'
        }
      },
      {
        path: '/class-manage',
        name: 'ClassManage',
        component: () => import(/* webpackChunkName: "ClassManage" */ '@/views/class/ClassManage.vue'),
        meta: {
          keepAlive: true,
          title: '班级管理'
        }
      }
    ]
  }
]
// 主框架外显示的路由
// const frameOut: Array<RouteRecordRaw> = [
//   {
//     path: '/user/login',
//     name: 'Login',
//     component: () => import('@/views/layouts/login/index.vue'),
//     meta: {
//       title: '登录'
//     }
//   }
// ]

const errorPage: Array<RouteRecordRaw> = [
  {
    path: '/403',
    name: '403',
    component: () => import('@/views/exception/403.vue')
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/exception/404.vue')
  },
  {
    path: '/500',
    name: '500',
    component: () => import('@/views/exception/500.vue')
  }
]

export default [
  ...frameIn,
  // ...frameOut,
  ...errorPage
]