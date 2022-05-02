import request from "@/utils/request/v4";
import qs from "qs";

export function createQuestions(query, data) {
  return request({
    url: "/questions",
    method: "POST",
    params: query,
    data: data,
  });
}

export function updateQuestions(questionId, data) {
  return request({
    url: "/questions/" + questionId,
    method: "PUT",
    data: data,
  });
}

export function delQuestions(questionId) {
  return request({
    url: "/questions/" + questionId,
    method: "DELETE",
  });
}

export function detailQuestions(questionId) {
  return request({
    url: "/questions/" + questionId,
    method: "GET",
  });
}
// 删除选项
export function delOptions(questionOptionId) {
  return request({
    url: "/questions/options/" + questionOptionId,
    method: "DELETE",
  });
}
// 删除填空选项
export function delBlanks(questionOptionId) {
  return request({
    url: "/questions/blanks/" + questionOptionId,
    method: "DELETE",
  });
}

// 向题目中添加选项
export function addOptions(query, data) {
  return request({
    url: "/questions/options",
    method: "POST",
    params: query,
    data: data,
  });
}
// 更新选项内容
export function updateOptions(questionOptionId, data) {
  return request({
    url: "/questions/options/" + questionOptionId,
    method: "PUT",
    data: data,
  });
}
  // 向题目中添加填空
export function addBlanks(query, data) {
  return request({
    url: "/questions/blanks",
    method: "POST",
    params: query,
    data: data,
  });
}
// 更新填空
export function updateBlanks(questionBlankId, data) {
  return request({
    url: "/questions/blanks/" + questionBlankId,
    method: "PUT",
    data: data,
  });
}