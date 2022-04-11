import request from '@/utils/request/v4'

const chapterApi = '/chapter'


export function getChapterList(course_id) {
  return request({
    url: chapterApi,
    method: 'GET',
    params: { course_id }
  })
}
export function createChapter(course_id, data) {
  return request({
    url: chapterApi,
    method: 'POST',
    data,
    params: { course_id }
  })
}

export function getChapterInfo(chapterId) {
  return request({
    url: chapterApi,
    method: 'GET',
    params: { chapterId }

  })
}

export function editChapter(chapterId, data) {
  return request({
    url: `/chapter/${chapterId}`,
    method: 'PUT',
    data,
  })
}

export function deleteChapter(chapterId) {
  return request({
    url: `/chapter/${chapterId}`,
    method: 'DELETE',
  })
}
export function getDeletedChapter(course_id) {
  return request({
    url: `/chapter/deleted`,
    method: 'GET',
    params: { course_id }
  })
}
