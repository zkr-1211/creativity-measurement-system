export default [
  {
    name: '首页',
    id: '1'
  },
  {
    name: '测评管理',
    id: '2',
    sub: [
      {
        name: '全部测评',
        path: '/evaluation/allevaluation',
        componentName: 'AllEvaluation'
      },
      {
        name: '测评设计',
        path: '/evaluation/design',
        componentName: 'EvaluationManage'
      }
    ]
  },
  {
    name: '机构或学校',
    id: '3'
  },
  {
    name: '审批管理',
    id: '4',
    sub: [
      {
        name: '全部测评',
        path: '/evaluation/allevaluation',
        componentName: 'AllEvaluation'
      },
      {
        name: '测评设计',
        path: '/evaluation/design',
        componentName: 'EvaluationManage'
      }
    ]
  },
  {
    name: '人员管理',
    id: '5',
    sub: [
      {
        name: '管理员',
        path: '/personnelmanage/administrator',
        componentName: 'Administrator'
      },
      {
        name: '测评师',
        path: '/personage-page',
        componentName: 'personagePage'
      }
    ]
  }
]
