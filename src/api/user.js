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
    url: '/api/annotators/' + userid + '/epoches/',
    method: 'get'
  })
}

export function getDoc(epochid) {
  return request({
    url: '/api/annotators/epoches/' + epochid + '/docs/',
    method: 'get'
  })
}

export function labelentity(docid, data) {
  return request({
    url: '/api/projects/docs/' + docid + '/annotations/entities/',
    method: 'post',
    data: data
  })
}

export function deleteentity(docid, entityid) {
  return request({
    url: '/api/projects/docs/' + docid + '/annotations/entities/' + entityid + '/',
    method: 'delete'
  })
}

export function labelevent(docid, data) {
  return request({
    url: '/api/projects/docs/' + docid + '/annotations/events/',
    method: 'post',
    data: data
  })
}

export function deleteevent(docid, eventid) {
  return request({
    url: '/api/projects/docs/' + docid + '/annotations/events/' + eventid,
    method: 'delete'
  })
}

export function labelrelation(docid, data) {
  return request({
    url: '/api/projects/docs/' + docid + '/annotations/relations/',
    method: 'post',
    data: data
  })
}

export function deletere(docid, reid) {
  return request({
    url: '/api/projects/docs/' + docid + '/annotations/relations/' + reid,
    method: 'delete'
  })
}

export function labelclass(docid, data) {
  return request({
    url: '/api/projects/docs/' + docid + '/annotations/classifications/',
    method: 'post',
    data: data
  })
}

export function deleteclass(docid, classid) {
  return request({
    url: '/api/projects/docs/' + docid + '/annotations/classifications/' + classid,
    method: 'delete'
  })
}

export function labelconfirm(docid, data) {
  return request({
    url: '/api/projects/docs/' + docid + '/annotations/confirmations/',
    method: 'post',
    data: data
  })
}

export function getuserlabel(docid, userid) {
  return request({
    url: '/api/projects/docs/' + docid + '/annotator/' + userid + '/annotations/',
    method: 'get'
  })
}

export function labelstantard(annotation_id, data) {
  return request({
    url: '/api/projects/annotations/' + annotation_id + '/standards/',
    method: 'patch',
    data: data
  })
}

export function getuserinfo(data) {
  return request({
    url: '/api/users/',
    method: 'get',
    params: data
  })
}

export function register(data) {
  return request({
    url: '/api/users/',
    method: 'post',
    data: data
  })
}
