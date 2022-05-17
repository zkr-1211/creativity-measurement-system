import request from "@/utils/request/v4";

export function GetDetails () {
  return request({
    url: 'auth/v2/users/info',
    method: 'GET',
    baseURL: 'https://apis-dev.shukeapp.net'
  })
}
