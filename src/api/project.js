import request from '@/utils/request'

export function getProject(projectid) {
  return request({
    url: '/api/projects/' + projectid + '/',
    method: 'get'
  })
}

export function getTemplate(templateid) {
  return request({
    url: '/api/templates/' + templateid + '/classifications/',
    method: 'get'
  })
}
