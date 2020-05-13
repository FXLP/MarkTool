import { login, logout, getRoles, getEpoch, getDoc, labelentity, deleteentity, labelevent, labelrelation, labelclass, deleteclass, deleteevent, labelconfirm, getuserlabel, deletere, labelstantard, getuserinfo, register } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import router, { resetRouter } from '@/router'

const state = {
  token: getToken(),
  name: '',
  avatar: '',
  introduction: '',
  roles: [],
  userid: '',
  epochid: ''
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
  SET_USERID: (state, userid) => {
    state.userid = userid
  },
  SET_EPOCHID: (state, epochid) => {
    state.epochid = epochid
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password }).then(response => {
        console.log('denglu', response)
        const data = response
        commit('SET_USERID', data.user_id)
        commit('SET_ROLES', data.roles)
        commit('SET_TOKEN', data.token)
        setToken(data.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getRoles({ commit, state }) {
    return new Promise((resolve, reject) => {
      getRoles(state.token).then(response => {
        console.log(response)
        const data = response
        if (!data) {
          reject('Verification failed, please Login again.')
        }

        const { roles } = data
        console.log('adada', data)

        // roles must be a non-empty array
        if (!roles || roles.length <= 0) {
          reject('getInfo: roles must be a non-null array!')
        }
        commit('SET_ROLES', roles)
        // commit('SET_NAME', name)
        // commit('SET_AVATAR', avatar)
        // commit('SET_INTRODUCTION', introduction)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 获取user epoch
  getEpoch({ commit, state }, id) {
    return new Promise((resolve, reject) => {
      getEpoch(id).then(response => {
        const list = response
        // console.log(list)
        const data = list
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  getDoc({ commit, state }, id) {
    const epochid = id
    return new Promise((resolve, reject) => {
      getDoc(epochid).then(response => {
        // console.log(response)
        const data = response
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state, dispatch }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        removeToken()
        resetRouter()

        // reset visited views and cached views
        // to fixed https://github.com/PanJiaChen/vue-element-admin/issues/2485
        dispatch('tagsView/delAllViews', null, { root: true })

        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      resolve()
    })
  },

  // dynamically modify permissions
  changeRoles({ commit, dispatch }, role) {
    return new Promise(async resolve => {
      const token = role + '-token'

      commit('SET_TOKEN', token)
      setToken(token)

      const { roles } = await dispatch('getRoles')

      resetRouter()

      // generate accessible routes map based on roles
      const accessRoutes = await dispatch('permission/generateRoutes', roles, { root: true })

      // dynamically add accessible routes
      router.addRoutes(accessRoutes)

      // reset visited views and cached views
      dispatch('tagsView/delAllViews', null, { root: true })

      resolve()
    })
  },
  labelentity({ commit }, data) {
    // console.log(212)
    const id = data.id
    const list = data.list
    return new Promise((resolve, reject) => {
      labelentity(id, list).then(response => {
        console.log(response)
        const data = response
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  deleteentity({ commit }, data) {
    // console.log(212)
    const docid = data.docid
    const entityid = data.entityid
    return new Promise((resolve, reject) => {
      deleteentity(docid, entityid).then(response => {
        console.log(response)
        const data = response
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  labelevent({ commit }, data) {
    // console.log(212)
    const id = data.id
    const list = data.list
    return new Promise((resolve, reject) => {
      labelevent(id, list).then(response => {
        console.log(response)
        const data = response
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  labelrelation({ commit }, data) {
    // console.log(212)
    const id = data.id
    const list = data.list
    return new Promise((resolve, reject) => {
      labelrelation(id, list).then(response => {
        console.log(response)
        const data = response
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  labelclass({ commit }, data) {
    // console.log(212)
    const id = data.id
    const list = data.list
    return new Promise((resolve, reject) => {
      labelclass(id, list).then(response => {
        console.log(response)
        const data = response
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  deleteclass({ commit }, data) {
    // console.log(212)
    const docid = data.docid
    const classid = data.classid
    return new Promise((resolve, reject) => {
      deleteclass(docid, classid).then(response => {
        console.log(response)
        const data = response
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  deleteevent({ commit }, data) {
    // console.log(212)
    const docid = data.id
    const eventid = data.eventid
    return new Promise((resolve, reject) => {
      deleteevent(docid, eventid).then(response => {
        console.log(response)
        const data = response
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  deletere({ commit }, data) {
    // console.log(212)
    const docid = data.docid
    const reid = data.reid
    return new Promise((resolve, reject) => {
      deletere(docid, reid).then(response => {
        console.log(response)
        const data = response
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  labelconfirm({ commit }, data) {
    // console.log(212)
    const id = data.id
    const list = data.list
    return new Promise((resolve, reject) => {
      labelconfirm(id, list).then(response => {
        console.log(response)
        const data = response
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  getuserlabel({ commit }, data) {
    // console.log(212)
    const docid = data.docid
    const userid = data.userid
    return new Promise((resolve, reject) => {
      getuserlabel(docid, userid).then(response => {
        console.log(response)
        const data = response
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  labelstantard({ commit }, data) {
    // console.log(212)
    const annotation_id = data.id
    const list = data.list
    return new Promise((resolve, reject) => {
      labelstantard(annotation_id, list).then(response => {
        console.log(response)
        const data = response
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  getuserinfo({ commit }, list) {
    // console.log(212)
    const data = list
    return new Promise((resolve, reject) => {
      getuserinfo(data).then(response => {
        console.log(response)
        const data = response
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  register({ commit }, list) {
    // console.log(212)
    const data = list
    return new Promise((resolve, reject) => {
      register(data).then(response => {
        console.log(response)
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
