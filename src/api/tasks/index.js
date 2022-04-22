import request from "@/utils/request/v4";

export function getTasksList(query) {
  return request({
    url: "/questions/set/tasks/list",
    method: "GET",
    params: query,
  });
}