import request from '@/utils/request'

export function getProject(projectid) {
  return request({
    url: '/api/projects/' + projectid + '/',
    method: 'get'
  })
}

export function getTemplate(templateid) {
  return request({
    url: '/api/templates/' + templateid + '/entitygroups/',
    method: 'get'
  })
}

export function getTemplatedet(templateid) {
  return request({
    url: '/api/templates/' + templateid + '/',
    method: 'get'
  })
}
