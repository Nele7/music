import Vue from 'vue'
import Vuex from 'vuex'

import { createPersistedState, createSharedMutations } from 'vuex-electron'

import modules from './modules'

Vue.use(Vuex)

// // 引入modules所有的文件，除去子文件夹下，并且都是以 .js 结尾的文件
// const modulesFiles = require.context('./modules', false, /\.js$/)

// // 遍历modulesFiles
// const modules = modulesFiles.keys().reduce((modules, modulePath) => {
//     // 将文件名转换为 app tagsViews user形式
//     const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
//     const value = modulesFiles(modulePath)
//     modules[moduleName] = value.default
//     return modules
// }, {})

export default new Vuex.Store({
  modules,
  plugins: [
    createPersistedState(),
    createSharedMutations()
  ],
  strict: process.env.NODE_ENV !== 'production'
})
