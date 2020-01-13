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

export function getEpoch(userid) {
  return request({
    url: '/api/annotators/'/* + userid +*/ + '2/epoches/',
    method: 'get'
  })
}

export function getDoc(epochid) {
  return request({
    url: '/api/projects/epoches/' + epochid + '/docs/',
    method: 'get'
  })
}
