import request from '@/utils/request'

export function getProject(projectid) {
  return request({
    url: '/api/projects/' + projectid + '/',
    method: 'get'
  })
}
