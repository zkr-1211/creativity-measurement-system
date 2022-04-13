import { RouteRecordRaw } from "vue-router";
// import BasicLayout from '@/layouts/BasicLayout.vue'
// import ChildrenLayout from '@/layouts/ChildrenLayout.vue'
// 主框架内显示的路由
export const frameIn: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    redirect: "/homepage",
    component: () =>
      import(/* webpackChunkName: "BasicLayout" */ "@/layouts/BasicLayout.vue"),
    meta: {
      title: "首页",
    },
    children: [
      {
        path: "homepage",
        name: "HomePage",
        component: () =>
          import(/* webpackChunkName: "homepage" */ "@/views/home/index.vue"),
        meta: {
          keepAlive: true,
          title: "首页",
          auth: true,
        },
      },
    ],
  },
  {
    path: "/organization",
    name: "Organization",
    redirect: "/organization",
    component: () =>
      import(/* webpackChunkName: "BasicLayout" */ "@/layouts/BasicLayout.vue"),
    meta: {
      title: "机构",
    },
    children: [
      {
        path: "",
        name: "organization",
        component: () =>
          import(
            /* webpackChunkName: "organization" */ "@/views/organization/index.vue"
          ),
        meta: {
          keepAlive: true,
          title: "机构",
          auth: true,
        },
      },
      {
        path: "addorganization",
        name: "AddOrganization",
        component: () =>
          import(
            /* webpackChunkName: "organization" */ "@/views/organization/AddOrganization.vue"
          ),
        meta: {
          keepAlive: true,
          title: "添加机构",
        },
      },
      {
        path: "/organization/detail",
        name: "OrganizationDetail",
        redirect: "/organization/detail",
        component: () =>
          import(
            /* webpackChunkName: "ChildrenLayout" */ "@/layouts/ChildrenLayout.vue"
          ),
        meta: {
          keepAlive: true,
          title: "机构详情",
        },
        children: [
          {
            path: "/organization/detail",
            name: "OrganizationDetail",
            component: () =>
              import(
                /* webpackChunkName: "organization" */ "@/views/organization/OrganizationDetail.vue"
              ),
            meta: {
              keepAlive: true,
              title: "机构详情页",
            },
          },
          {
            path: "/school-administrator",
            name: "SchoolAdministrator",
            component: () =>
              import(
                /* webpackChunkName: "School" */ "@/views/school/SchoolAdministrator.vue"
              ),
            meta: {
              keepAlive: true,
              title: "校区管理员",
            },
          },
          {
            path: "/school-manage",
            name: "SchoolManage",
            component: () =>
              import(
                /* webpackChunkName: "School" */ "@/views/school/SchoolManage.vue"
              ),
            meta: {
              keepAlive: true,
              title: "校区管理",
            },
          },
          {
            path: "/student-manage",
            name: "StudentManage",
            component: () =>
              import(
                /* webpackChunkName: "StudentManage" */ "@/views/person/student/StudentManage.vue"
              ),
            meta: {
              keepAlive: true,
              title: "学生管理",
            },
          },
          {
            path: "/teacher-manage",
            name: "TeacherManage",
            component: () =>
              import(
                /* webpackChunkName: "TeacherManage" */ "@/views/person/teacher/TeacherManage.vue"
              ),
            meta: {
              keepAlive: true,
              title: "教师管理",
            },
          },
          {
            path: "/class-manage",
            name: "ClassManage",
            component: () =>
              import(
                /* webpackChunkName: "ClassManage" */ "@/views/class/ClassManage.vue"
              ),
            meta: {
              keepAlive: true,
              title: "班级管理",
            },
          },
          {
            path: "/student-record",
            name: "StudentRecord",
            component: () =>
              import(
                /* webpackChunkName: "StudentRecord" */ "@/views/person/student/StudentRecord.vue"
              ),
            meta: {
              keepAlive: true,
              title: "学生档案",
            },
          },
          {
            path: "/studentinfo-set",
            name: "StudentInfoSet",
            component: () =>
              import(
                /* webpackChunkName: "InfoSet" */ "@/views/person/student/StudentInfoSet.vue"
              ),
            meta: {
              keepAlive: true,
              title: "学生信息设置",
            },
          },
          {
            path: "/teacher-record",
            name: "TeacherRecord",
            component: () =>
              import(
                /* webpackChunkName: "Record" */ "@/views/person/teacher/TeacherRecord.vue"
              ),
            meta: {
              keepAlive: true,
              title: "教师档案",
            },
          },
          {
            path: "/teacherinfo-set",
            name: "TeacherInfoSet",
            component: () =>
              import(
                /* webpackChunkName: "InfoSet" */ "@/views/person/teacher/TeacherInfoSet.vue"
              ),
            meta: {
              keepAlive: true,
              title: "教师信息设置",
            },
          },
        ],
      },
      {
        path: "orgevaluation-detail",
        name: "OrgEvaluationDetail",
        component: () =>
          import(
            /* webpackChunkName: "organization" */ "@/views/organization/OrgEvaluationDetail.vue"
          ),
        meta: {
          keepAlive: true,
          title: "机构测评详情",
        },
      },
    ],
  },
  {
    path: "/personnelmanage",
    name: "personnelmanage",
    redirect: "/personnelmanage/administrator",
    component: () =>
      import(/* webpackChunkName: "BasicLayout" */ "@/layouts/BasicLayout.vue"),
    meta: {
      keepAlive: true,
      title: "人员管理",
      auth: true,
      id: "personnel",
    },
    children: [
      {
        path: "administrator",
        name: "administrator",
        component: () =>
          import(
            /* webpackChunkName: "personageManage" */ "@/views/personnel/Administrator.vue"
          ),
        meta: {
          keepAlive: true,
          title: "管理员",
          auth: true,
        },
      },
      {
        path: "evaluator",
        name: "evaluator",
        component: () =>
          import(
            /* webpackChunkName: "personageManage" */ "@/views/personnel/Evaluator.vue"
          ),
        meta: {
          keepAlive: true,
          title: "测评师",
          auth: true,
        },
      },
    ],
  },
  {
    path: "/personage",
    name: "personage",
    redirect: "/personage/center",
    component: () =>
      import(/* webpackChunkName: "BasicLayout" */ "@/layouts/BasicLayout.vue"),
    meta: {
      keepAlive: true,
      title: "个人管理",
      auth: true,
      id: "personage",
    },
    children: [
      {
        path: "center",
        name: "center",
        component: () =>
          import(
            /* webpackChunkName: "personage" */ "@/views/personage/index.vue"
          ),
        meta: {
          keepAlive: true,
          title: "个人中心",
          auth: true,
        },
      },
    ],
  },
  {
    path: "/evaluation",
    redirect: "/evaluation/allevaluation",
    component: () =>
      import(/* webpackChunkName: "BasicLayout" */ "@/layouts/BasicLayout.vue"),
    name: "Evaluation",
    meta: {
      title: "测评管理",
      id: "evaluation",
    },
    children: [
      {
        path: "allevaluation",
        name: "allevaluation",
        component: () =>
          import(
            /* webpackChunkName: "evaluationmanage" */ "@/views/evaluation/AllEvaluation.vue"
          ),
        meta: {
          keepAlive: true,
          title: "全部测评",
          auth: true,
        },
      },
      {
        path: "design",
        name: "design",
        component: () =>
          import(
            /* webpackChunkName: "evaluationmanage" */ "@/views/evaluation/EvaluationDesign.vue"
          ),
        meta: {
          keepAlive: true,
          title: "测评设计",
          auth: true,
        },
      },
      {
        path: "evaluation-detail",
        name: "EvaluationDetail",
        component: () =>
          import(
            /* webpackChunkName: "evaluationmanage" */ "@/views/evaluation/EvaluationDetail.vue"
          ),
        meta: {
          keepAlive: true,
          title: "测评详情",
          auth: true,
        },
      },
      {
        path: "evaluationset",
        name: "evaluationset",
        component: () =>
          import(
            /* webpackChunkName: "evaluationmanage" */ "@/views/evaluation/EvaluationSet.vue"
          ),
        meta: {
          keepAlive: true,
          title: "测评设置",
        },
      },
      {
        path: "model-dimension-edit",
        name: "ModelDimensionEdit",
        component: () =>
          import(
            /* webpackChunkName: "evaluationmanage" */ "@/views/evaluation/ModelDimensionEdit.vue"
          ),
        meta: {
          keepAlive: true,
          title: "模型设置",
        },
      },
    ],
  },
];
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
    path: "/403",
    name: "403",
    component: () => import("@/views/exception/403.vue"),
  },
  {
    path: "/404",
    name: "404",
    component: () => import("@/views/exception/404.vue"),
  },
  {
    path: "/500",
    name: "500",
    component: () => import("@/views/exception/500.vue"),
  },
];

export default [
  ...frameIn,
  // ...frameOut,
  ...errorPage,
];
