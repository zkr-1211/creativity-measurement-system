import request from '@/utils/request/v4'

export function getCourseTeam(course_id) {
  return request({
    url: 'https://apis-dev.shukeapp.net/course/v2/admin/course/teams',
    method: 'GET',
    params: {
      course_id
    }
  })
}

export function editCourseTeam(teamId, data) {
  return request({
    url: `https://apis-dev.shukeapp.net/course/v2/admin/course/teams/${teamId}`,
    method: 'PUT',
    data
  })
}

export function searchTeamMembers(teamId, data) {
  return request({
    url: `https://apis-dev.shukeapp.net/course/v2/admin/course/teams/${teamId}/members/search`,
    method: 'POST',
    data
  })
}

export function addTeamMembers(teamId, data) {
  return request({
    url: `https://apis-dev.shukeapp.net/course/v2/admin/course/teams/${teamId}/members`,
    method: 'POST',
    data
  })
}

export function deleteTeamMembers(teamId, data) {
  return request({
    url: `https://apis-dev.shukeapp.net/course/v2/admin/course/teams/${teamId}/members`,
    method: 'DELETE',
    data
  })
}

export function editTeamMembersPermissions(teamId, data) {
  return request({
    url: `https://apis-dev.shukeapp.net/course/v2/admin/course/teams/${teamId}/members/settings`,
    method: 'PUT',
    data
  })
}

export function transferSuperAdministrator(teamId, data) {
  return request({
    url: `https://apis-dev.shukeapp.net/course/v2/admin/course/teams/${teamId}/transfer/super-admin`,
    method: 'POST',
    data
  })
}
