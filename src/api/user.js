import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/api/auth_token/',
    method: 'post',
    data
  })
}

export function getRoles(token) {
  return request({
    url: '/api/roles/',
    method: 'get',
    headers: {
      Authorization: 'TOKEN ' + token,
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
