import request from "@/utils/request/v4";
import qs from "qs";
export function getQuestionsSetList(query) {
  return request({
    url: "/questions/set/list",
    method: "GET",
    params: query,
  });
}

export function createQuestionsSet(query, data) {
  return request({
    url: "/questions/set",
    method: "POST",
    params: query,
    data: data,
  });
}

export function updateQuestionsSet(questionSetId, data) {
  return request({
    url: "/questions/set/" + questionSetId,
    method: "PUT",
    data: data,
  });
}

export function delQuestionsSet(questionSetId) {
  return request({
    url: "/questions/set/" + questionSetId,
    method: "DELETE",
  });
}

export function detailQuestionsSet(questionSetId) {
  return request({
    url: "/questions/set/" + questionSetId,
    method: "GET",
  });
}
// 向测评课程的测评问卷中添加题集
export function addTesting(query, data) {
  return request({
    url: "/course/testing",
    method: "POST",
    params: query,
    data: data,
  });
}
