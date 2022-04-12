import request from "@/utils/request/v4";
import qs from "qs";
export function getCourseList(query) {
  return request({
    url: "https://apis-dev.shukeapp.net/course/v2/admin/course",
    method: "GET",
    params: query,
  });
}
export function createCourse(data) {
  return request({
    url: "https://apis-dev.shukeapp.net/course/v2/admin/course",
    method: "POST",
    data: qs.stringify(data),
  });
}

export function editCourse(courseId, data) {
  return request({
    url: `https://apis-dev.shukeapp.net/course/v2/admin/course/${courseId}`,
    method: "PUT",
    data,
  });
}

export function deleteCourse(courseId) {
  return request({
    url: `https://apis-dev.shukeapp.net/course/v2/admin/course/${courseId}`,
    method: "DELETE",
  });
}
