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
        path: '/evaluation/evaluation-detail',
        name: 'EvaluationDetail',
        component: () => import(/* webpackChunkName: "evaluationmanage" */ '@/views/evaluation/EvaluationDetail.vue'),
        meta: {
          keepAlive: true,
          title: '测评详情',
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
        path: '/organization/orgevaluation-detail',
        name: 'OrgEvaluationDetail',
        component: () => import(/* webpackChunkName: "organization" */ '@/views/organization/OrgEvaluationDetail.vue'),
        meta: {
          keepAlive: true,
          title: '机构测评详情'
        }
      },
      {
        path: '/personnelmanage/evaluator',
        name: 'Evaluator',
        component: () => import(/* webpackChunkName: "personageManage" */ '@/views/personnel/Evaluator.vue'),
        meta: {
          keepAlive: true,
          title: '测评师'
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
        path: '/student-record',
        name: 'StudentRecord',
        component: () => import(/* webpackChunkName: "StudentRecord" */ '@/views/person/student/StudentRecord.vue'),
        meta: {
          keepAlive: true,
          title: '学生档案'
        }
      },
      {
        path: '/studentinfo-set',
        name: 'StudentInfoSet',
        component: () => import(/* webpackChunkName: "InfoSet" */ '@/views/person/student/StudentInfoSet.vue'),
        meta: {
          keepAlive: true,
          title: '学生信息设置'
        }
      },
      {
        path: '/teacher-record',
        name: 'TeacherRecord',
        component: () => import(/* webpackChunkName: "Record" */ '@/views/person/teacher/TeacherRecord.vue'),
        meta: {
          keepAlive: true,
          title: '教师档案'
        }
      },
      {
        path: '/teacherinfo-set',
        name: 'TeacherInfoSet',
        component: () => import(/* webpackChunkName: "InfoSet" */ '@/views/person/teacher/TeacherInfoSet.vue'),
        meta: {
          keepAlive: true,
          title: '教师信息设置'
        }
      },
      {
        path: '/teacher-manage',
        name: 'TeacherManage',
        component: () => import(/* webpackChunkName: "TeacherManage" */ '@/views/person/teacher/TeacherManage.vue'),
        meta: {
          keepAlive: true,
          title: '教师管理'
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