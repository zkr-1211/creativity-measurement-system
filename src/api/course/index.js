import request from "@/utils/request/v4";
import qs from "qs";
export function getCourseList(query) {
  return request({
    url: "",
    method: "GET",
    params: query,
  });
}
export function createCourse(data) {
  return request({
    url: "",
    method: "POST",
    data: qs.stringify(data),
  });
}

export function editCourse(courseId, data) {
  return request({
    url: `/${courseId}`,
    method: "PUT",
    data,
  });
}

export function deleteCourse(courseId) {
  return request({
    url: `/${courseId}`,
    method: "DELETE",
  });
}
