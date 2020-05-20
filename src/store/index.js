import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
// import VuexPersistence from 'vuex-persist'
Vue.use(Vuex)

// https://webpack.js.org/guides/dependency-management/#requirecontext
const modulesFiles = require.context('./modules', true, /\.js$/)

// you do not need `import app from './modules/app'`
// it will auto require all vuex module from modules file
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  // set './app.js' => 'app'
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  const value = modulesFiles(modulePath)
  modules[moduleName] = value.default
  return modules
}, {})
// const vuexLocal = new VuexPersistence({
//   storage: window.localStorage
// })
const store = new Vuex.Store({
  modules,
  getters
  // plugins: [vuexLocal.plugin]
})

export default store
