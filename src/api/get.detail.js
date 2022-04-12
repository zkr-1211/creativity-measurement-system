import request from "@/utils/request/v4";

export function GetDetails (data) {
  return request({
    url: '/api/get-details',
    method: 'post',
    data,
    baseURL: 'https://apis-dev.shukeapp.net'
  })
}
