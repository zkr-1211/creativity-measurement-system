
import request from "@/utils/request/v4";
import qs from "qs";

// 增改测评维度
export function updateDimensions(data) {
  return request({
    url: `https://apis-dev.shukeapp.net/course/v2/admin/course/testing/dimensions`,
    method: "POST",
    data: data,
  });
}
// 获取测评维度列表
export function getDimensions(query) {
  return request({
    url: `https://apis-dev.shukeapp.net/course/v2/admin/course/testing/dimensions`,
    method: "GET",
    params: query,
  });
}
