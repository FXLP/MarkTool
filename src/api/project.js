import request from '@/utils/request'

export function getallProject(projectid) {
  return request({
    url: '/api/projects/',
    method: 'get'
  })
}

export function getProject(projectid) {
  return request({
    url: '/api/projects/' + projectid + '/',
    method: 'get'
  })
}

export function delProject(projectid) {
  return request({
    url: '/api/projects/' + projectid + '/',
    method: 'delete'
  })
}

export function newProject(data) {
  return request({
    url: '/api/projects/',
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    data: data
  })
}

export function getTemplate(templateid) {
  return request({
    url: '/api/templates/' + templateid + '/entitygroups/',
    method: 'get'
  })
}

export function getallTemplate(templateid) {
  return request({
    url: '/api/templates/',
    method: 'get'
  })
}

export function delTemplate(templateid) {
  return request({
    url: '/api/templates/' + templateid + '/',
    method: 'delete'
  })
}

export function getTemplatedet(templateid) {
  return request({
    url: '/api/templates/' + templateid + '/',
    method: 'get'
  })
}

export function getentitys(entityid) {
  return request({
    url: '/api/templates/entitygroups/' + entityid + '/entitys/',
    method: 'get',
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

export function newTemplate(name, template_type) {
  return request({
    url: '/api/templates/',
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    data: {
      name,
      template_type
    }
  })
}

export function newEntitygroup(templateid, entitylist) {
  return request({
    url: '/api/templates/' + templateid + '/entitygroups/',
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    data: entitylist
  })
}

export function newEventgroup(templateid, eventlist) {
  return request({
    url: '/api/templates/' + templateid + '/eventgroups/',
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    data: eventlist
  })
}

export function newEntitys(entitygroupsid, data) {
  return request({
    url: '/api/templates/entitygroups/' + entitygroupsid + '/entitys/',
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    data: data
  })
}

export function getEventgroup(templateid) {
  return request({
    url: '/api/templates/' + templateid + '/eventgroups/',
    method: 'get'
  })
}

export function newClass(templateid, classlist) {
  return request({
    url: '/api/templates/' + templateid + '/classifications/',
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    data: classlist
  })
}

export function getClass(templateid) {
  return request({
    url: '/api/templates/' + templateid + '/classifications/',
    method: 'get'
  })
}

export function newRe(templateid, relist) {
  return request({
    url: '/api/templates/' + templateid + '/relations/',
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    data: relist
  })
}

export function getRe(templateid) {
  return request({
    url: '/api/templates/' + templateid + '/relations/',
    method: 'get'
  })
}

export function getEventEntitys(entityid) {
  return request({
    url: '/api/templates/eventgroups/' + entityid + '/entitys/',
    method: 'get',
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

export function newEventEntitys(entitygroupsid, data) {
  return request({
    url: '/api/templates/eventgroups/' + entitygroupsid + '/entitys/',
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    data: data
  })
}

export function getReEntitys(reid) {
  return request({
    url: '/api/templates/relations/' + reid + '/entitys/',
    method: 'get',
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

export function newReEntitys(reid, data) {
  return request({
    url: '/api/templates/relations/' + reid + '/entitys/',
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    data: data
  })
}

export function template_use(id, data) {
  return request({
    url: '/api/templates/' + id + '/',
    method: 'patch',
    headers: {
      'Content-Type': 'application/json'
    },
    data: data
  })
}

export function project_use(id, data) {
  return request({
    url: '/api/projects/' + id + '/',
    method: 'patch',
    headers: {
      'Content-Type': 'application/json'
    },
    data: data
  })
}

export function uploadlabelfile(projectid, formData) {
  return request({
    url: '/api/projects/' + projectid + '/docs/',
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    data: formData
  })
}

export function uploaddic(projectid, formData) {
  return request({
    url: '/api/projects/' + projectid + '/dics/',
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    data: formData
  })
}

export function fenpeiepoch(projectid, formData) {
  return request({
    url: '/api/projects/' + projectid + '/epoches/',
    method: 'post',
    headers: {
      'Content-Type': 'form-data'
    },
    data: formData
  })
}

export function getallepoches(id) {
  return request({
    url: '/api/projects/' + id + '/epoches/',
    method: 'get',
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

export function getannres(epochid, data) {
  return request({
    url: '/api/projects/epoches/' + epochid + '/docs/annotationResults/',
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    data: data
  })
}

export function fileaddstandard(projectid, data) {
  return request({
    url: '/api/projects/' + projectid + '/standards/',
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    data: data
  })
}

export function manualaddstandard(projectid, data) {
  return request({
    url: '/api/projects/' + projectid + '/standards/',
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    data: data
  })
}

export function getstandard(projectid, entityid) {
  return request({
    url: '/api/projects/' + projectid + '/entity_template/' + entityid + '/standards/',
    method: 'get',
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

export function getdic(project_id) {
  return request({
    url: '/api/projects/' + project_id + '/dics/',
    method: 'get',
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

export function dicmatch(projectid, formdata) {
  return request({
    url: '/api/projects/dics/matches/',
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    data: formdata
  })
}

export function uploadregular(projectid, formdata) {
  return request({
    url: '/api/projects/' + projectid + '/res/',
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    data: formdata
  })
}

export function getregular(project_id) {
  return request({
    url: '/api/projects/' + project_id + '/res/',
    method: 'get',
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

export function regularmatch(formdata) {
  return request({
    url: '/api/projects/res/matches/',
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    data: formdata
  })
}

export function deletedic(projectid, entityid) {
  return request({
    url: '/api/projects/' + projectid + '/entitytemplates/' + entityid + '/dics/',
    method: 'delete'
  })
}

export function deleteregular(reid) {
  return request({
    url: '/api/res/' + reid + '/',
    method: 'delete'
  })
}

export function deletest(stid) {
  return request({
    url: '/api/standards/' + stid + '/',
    method: 'delete'
  })
}
