import { getProject } from '@/api/project'

const state = {
  projectid: ''
}

const mutations = {
  SET_PROJECTID: (state, projectid) => {
    state.projectid = projectid
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
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
