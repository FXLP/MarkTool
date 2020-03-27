import { getreepoch, getredoc, getrelabel, getentitys } from '@/api/reviewer'

const state = {
  reviewerid: '',
  epochid: '',
  annotator_id: '',
  docid: ''
}

const mutations = {
  SET_reviewerid: (state, reviewerid) => {
    state.reviewerid = reviewerid
  },
  SET_epochid: (state, epochid) => {
    state.epochid = epochid
  },
  SET_annotator_id: (state, annotator_id) => {
    state.annotator_id = annotator_id
  },
  SET_docid: (state, docid) => {
    state.docid = docid
  }
}

const actions = {
  getreepoch({ commit, state }, id) {
    const reviewerid = id
    return new Promise((resolve, reject) => {
      getreepoch(reviewerid).then(response => {
        // console.log(response)
        const data = response
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  getredoc({ commit, state }) {
    return new Promise((resolve, reject) => {
      getredoc(state.epochid).then(response => {
        // console.log(response)
        const data = response
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  getrelabel({ commit, state }) {
    return new Promise((resolve, reject) => {
      getrelabel(state.templateid).then(response => {
        // console.log(response)
        const data = response
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  getentitys({ commit, state }) {
    return new Promise((resolve, reject) => {
      getentitys(state.projectid).then(response => {
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
