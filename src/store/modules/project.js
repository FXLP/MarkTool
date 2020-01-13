import { getProject, getTemplate, getTemplatedet } from '@/api/project'

const state = {
  projectid: '',
  templateid: ''
}

const mutations = {
  SET_PROJECTID: (state, projectid) => {
    state.projectid = projectid
  },
  SET_TEMPLATEID: (state, templateid) => {
    state.templateid = templateid
  }
}

const actions = {
  getProject({ commit, state }) {
    return new Promise((resolve, reject) => {
      getProject(state.projectid).then(response => {
        // console.log(response)
        const data = response
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  getTemplate({ commit, state }) {
    return new Promise((resolve, reject) => {
      getTemplate(state.templateid).then(response => {
        // console.log(response)
        const data = response
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  getTemplatedet({ commit, state }) {
    return new Promise((resolve, reject) => {
      getTemplatedet(state.templateid).then(response => {
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
