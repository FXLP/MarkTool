import request from '@/utils/request'

export function getreepoch(reviewerid) {
  return request({
    url: '/api/reviewers/' + reviewerid + '/epoches/',
    method: 'get'
  })
}

export function getredoc(epochid) {
  return request({
    url: '/api/reviewers/epoches/' + epochid + '/docs/',
    method: 'get'
  })
}

export function getrelabel(docid, annotator_id) {
  return request({
    url: '/api/projects/docs/' + docid + '/reviewer/,' + annotator_id + '/annotations/',
    method: 'get'
  })
}
