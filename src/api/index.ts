import request from '@/utils/request/v4'
import { HttpResponse } from '@/types'
const Api = {
  tendencyRun: 'api/tendency_run',
  reviewList: '/api/getList',
  fourItem: 'api/four_item'
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

