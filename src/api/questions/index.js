import request from "@/utils/request/v4";
import qs from "qs";

export function createQuestions(query, data) {
  return request({
    url: "/questions",
    method: "POST",
    params:query,
    data:data,
  });
}

// export function updateQuestionsSet(questionSetId) {
//   return request({
//     url: "/questions/" + questionSetId,
//     method: "PUT",
//   });
// }

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

