import request from '@/utils/request/v4'
import { HttpResponse } from '@/types'
const Api = {
  tendencyRun: '/api/tendency_run',
  reviewList: '/api/get_list',
  fourItem: '/api/four_item',
  table: '/api/table'
}

// requestGet
export function requestGet(url:string, params?:any): Promise<HttpResponse> {
  return request({
    url,
    method: 'get',
    params
  })
}

export function getReviewList() {
  return requestGet(Api.reviewList)
}
export function getFourItem() {
  return requestGet(Api.fourItem)
}
export function getTendencyRun() {
  return requestGet(Api.tendencyRun)
}
// 查询列表
type paramsType = {
  pageSize: number,
  pageNum: number,
  date?: string
  types?: string
  name?: string
}
export function getTable(params: paramsType) {
  return requestGet(Api.table, params)
}
// requestPost
// function requestPost(url: string, data: any) {
//   return request({
//     url: url,
//     method: 'post',
//     data
//   })
// }

// export function getUserInfo(params: any) {
//   return request({
//     url: Api.userInfo,
//     method: 'get',
//     headers: {
//       'Content-Type': 'application/json;charset=UTF-8'
//     },
//     params
//   })
// }
// export function pushLang(data: any) {
//   return requestPost(Api.getSiteInfo, data)

