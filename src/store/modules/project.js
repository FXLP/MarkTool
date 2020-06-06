import { getProject, getTemplate, getallTemplate, getTemplatedet, getentitys, getallProject, newTemplate, newEntitygroup, newEntitys, newEventgroup, getEventgroup, newClass, getClass, newRe, getRe, getEventEntitys, newEventEntitys, getReEntitys, newReEntitys, template_use, project_use, newProject, uploadlabelfile, uploaddic, fenpeiepoch, getallepoches, getannres, fileaddstandard, manualaddstandard, getstandard, delProject, delTemplate, getdic, dicmatch, uploadregular, getregular, regularmatch, deletedic, deleteregular, deletest } from '@/api/project'
import qs from 'qs'
import { template } from '@babel/core'

const state = {
  projectid: '',
  templateid: '',
  detaillist: {}
}

const mutations = {
  SET_PROJECTID: (state, projectid) => {
    state.projectid = projectid
  },
  SET_TEMPLATEID: (state, templateid) => {
    state.templateid = templateid
  },
  SET_DETAIL: (state, list) => {
    state.detaillist = list
  }
}

const actions = {
  getallProject({ commit, state }) {
    return new Promise((resolve, reject) => {
      getallProject().then(response => {
        // console.log(response)
        const data = response
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  getProject({ commit, state }, id) {
    return new Promise((resolve, reject) => {
      const projectid = id
      getProject(projectid).then(response => {
        // console.log(response)
        const data = response
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  delProject({ commit, state }, id) {
    return new Promise((resolve, reject) => {
      const projectid = id
      delProject(projectid).then(response => {
        // console.log(response)
        const data = response
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  getallepoches({ commit, state }, id) {
    return new Promise((resolve, reject) => {
      const projectid = id
      getallepoches(projectid).then(response => {
        // console.log(response)
        const data = response
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  newProject({ commit, state }, data) {
    return new Promise((resolve, reject) => {
      const newdata = data
      newProject(newdata).then(response => {
        // console.log(response)
        const data = response
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  getTemplate({ commit, state }, templatid) {
    return new Promise((resolve, reject) => {
      const id = templatid
      getTemplate(id).then(response => {
        // console.log(response)
        const data = response
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  delTemplate({ commit, state }, templatid) {
    return new Promise((resolve, reject) => {
      const id = templatid
      delTemplate(id).then(response => {
        // console.log(response)
        const data = response
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  getallTemplate({ commit, state }) {
    return new Promise((resolve, reject) => {
      getallTemplate().then(response => {
        // console.log(response)
        const data = response
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  getTemplatedet({ commit, state }, id) {
    return new Promise((resolve, reject) => {
      const templateid = id
      getTemplatedet(templateid).then(response => {
        // console.log(response)
        const data = response
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  getentitys({ commit, state }, entityid) {
    return new Promise((resolve, reject) => {
      const id = entityid
      getentitys(id).then(response => {
        // console.log(response)
        const data = response
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  newTemplate({ commit }, templateinfo) {
    console.log(212)
    const name = templateinfo.name
    const template_type = templateinfo.template_type
    return new Promise((resolve, reject) => {
      newTemplate(name, template_type).then(response => {
        console.log(response)
        const data = response
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  newEntitygroup({ commit, state }, Entityinfo) {
    const Entitylist = Entityinfo.list
    const templateid = Entityinfo.id
    console.log(33, templateid)
    return new Promise((resolve, reject) => {
      newEntitygroup(templateid, Entitylist).then(response => {
        console.log(response)
        const data = response
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  newEntitys({ commit, state }, data) {
    const list = data.list
    const entityid = data.id
    return new Promise((resolve, reject) => {
      newEntitys(entityid, list).then(response => {
        console.log(response)
        const data = response
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  newEventgroup({ commit, state }, Eventinfo) {
    const Eventlist = Eventinfo.list
    const templateid = Eventinfo.id
    console.log(33, templateid)
    return new Promise((resolve, reject) => {
      newEventgroup(templateid, Eventlist).then(response => {
        console.log(response)
        const data = response
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  getEventgroup({ commit, state }, templateid) {
    return new Promise((resolve, reject) => {
      const id = templateid
      getEventgroup(id).then(response => {
        // console.log(response)
        const data = response
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  newClass({ commit, state }, Classinfo) {
    const Classlist = Classinfo.list
    const templateid = Classinfo.id
    // console.log(33, templateid)
    return new Promise((resolve, reject) => {
      newClass(templateid, Classlist).then(response => {
        console.log(response)
        const data = response
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  getClass({ commit, state }, templateid) {
    return new Promise((resolve, reject) => {
      const id = templateid
      getClass(id).then(response => {
        // console.log(response)
        const data = response
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  newRe({ commit, state }, Reinfo) {
    const Relist = Reinfo.list
    const templateid = Reinfo.id
    // console.log(33, templateid)
    return new Promise((resolve, reject) => {
      newRe(templateid, Relist).then(response => {
        console.log(response)
        const data = response
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  getRe({ commit, state }, templateid) {
    return new Promise((resolve, reject) => {
      const id = templateid
      getRe(id).then(response => {
        // console.log(response)
        const data = response
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  newEventEntitys({ commit, state }, data) {
    const list = data.list
    const entityid = data.id
    return new Promise((resolve, reject) => {
      newEventEntitys(entityid, list).then(response => {
        console.log(response)
        const data = response
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  getEventEntitys({ commit, state }, entityid) {
    return new Promise((resolve, reject) => {
      const id = entityid
      getEventEntitys(id).then(response => {
        // console.log(response)
        const data = response
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  newReEntitys({ commit, state }, data) {
    const list = data.list
    const entityid = data.id
    return new Promise((resolve, reject) => {
      newReEntitys(entityid, list).then(response => {
        console.log(response)
        const data = response
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  getReEntitys({ commit, state }, entityid) {
    return new Promise((resolve, reject) => {
      const id = entityid
      getReEntitys(id).then(response => {
        // console.log(response)
        const data = response
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  template_use({ commit, state }, data) {
    const input = data.input
    const id = data.id
    return new Promise((resolve, reject) => {
      template_use(id, input).then(response => {
        console.log(response)
        const data = response
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  project_use({ commit, state }, data) {
    const input = data.input
    const id = data.id
    return new Promise((resolve, reject) => {
      project_use(id, input).then(response => {
        console.log(response)
        const data = response
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  uploadlabelfile({ commit, state }, data) {
    const formData = data.formdata
    const project_id = data.id
    return new Promise((resolve, reject) => {
      uploadlabelfile(project_id, formData).then(response => {
        console.log(response)
        const data = response
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  uploaddic({ commit, state }, data) {
    const formData = data.formdata
    const project_id = data.id
    return new Promise((resolve, reject) => {
      uploaddic(project_id, formData).then(response => {
        console.log(response)
        const data = response
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  fenpeiepoch({ commit, state }, data) {
    const formData = data.formdata
    const project_id = data.id
    return new Promise((resolve, reject) => {
      fenpeiepoch(project_id, formData).then(response => {
        console.log(response)
        const data = response
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  getannres({ commit, state }, data) {
    const list = data.list
    const epochid = data.id
    return new Promise((resolve, reject) => {
      getannres(epochid, list).then(response => {
        // console.log(response)
        const data = response
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  fileaddstandard({ commit, state }, data) {
    const list = data.formdata
    const projectid = data.id
    return new Promise((resolve, reject) => {
      fileaddstandard(projectid, list).then(response => {
        // console.log(response)
        const data = response
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  manualaddstandard({ commit, state }, data) {
    const list = data.list
    const projectid = data.id
    return new Promise((resolve, reject) => {
      manualaddstandard(projectid, list).then(response => {
        // console.log(response)
        const data = response
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  getstandard({ commit, state }, id) {
    const entityid = id.entityid
    const projectid = id.projectid
    return new Promise((resolve, reject) => {
      getstandard(projectid, entityid).then(response => {
        // console.log(response)
        const data = response
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  getdic({ commit, state }, id) {
    const projectid = id
    return new Promise((resolve, reject) => {
      getdic(projectid).then(response => {
        // console.log(response)
        const data = response
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  dicmatch({ commit, state }, list) {
    const projectid = list.id
    const formdata = list.formdata
    return new Promise((resolve, reject) => {
      dicmatch(projectid, formdata).then(response => {
        // console.log(response)
        const data = response
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  uploadregular({ commit, state }, list) {
    const projectid = list.id
    const formdata = list.formdata
    return new Promise((resolve, reject) => {
      uploadregular(projectid, formdata).then(response => {
        // console.log(response)
        const data = response
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  getregular({ commit, state }, id) {
    const projectid = id
    return new Promise((resolve, reject) => {
      getregular(projectid).then(response => {
        // console.log(response)
        const data = response
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  regularmatch({ commit, state }, list) {
    // const projectid = list.id
    const formdata = list.formdata
    return new Promise((resolve, reject) => {
      regularmatch(formdata).then(response => {
        // console.log(response)
        const data = response
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  deletedic({ commit, state }, id) {
    return new Promise((resolve, reject) => {
      const projectid = id.projectid
      const entityid = id.entityid
      deletedic(projectid, entityid).then(response => {
        // console.log(response)
        const data = response
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  deleteregular({ commit, state }, id) {
    return new Promise((resolve, reject) => {
      const reid = id
      deleteregular(reid).then(response => {
        // console.log(response)
        const data = response
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  deletest({ commit, state }, id) {
    return new Promise((resolve, reject) => {
      const stid = id
      deletest(stid).then(response => {
        // console.log(response)
        const data = response
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
