import request from '@/utils/request/v4'

export function getSectionResource(section_id) {
  return request({
    url: '/resource',
    method: 'GET',
    params: { section_id }
  })
}
