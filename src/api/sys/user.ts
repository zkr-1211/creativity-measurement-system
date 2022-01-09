import request from '@/utils/request/v4'
import { LoginParams, LoginResultModel, GetUserInfoModel } from './model/userModel'

enum Api {
  Login = '/login',
  Logout = '/logout',
  GetUserInfo = '/getUserInfo',
  GetPermCode = '/getPermCode',
}
// requestGet
function requestGet(url: string, params: any) {
  return request({
    url,
    method: 'get',
    params
  })
}

// requestPost
function requestPost(url: string, data: any) {
  return request({
    url: url,
    method: 'post',
    data
  })
}

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
// }
// export function getStat(params: any) {
//   return requestGet(Api.getPermissions, params)
// }
