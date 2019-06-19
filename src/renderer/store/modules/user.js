import Vue from 'vue'
import { neteaseApi } from '@/api';
import to from '@/utils/await-to.js'
import local from '@/utils/storage.js'
import * as types from '../mutation_types'
// const obj = {}
// try {
//   if(local.getItem('userInfo')){
//     obj = local.getItem('userInfo')
//   }
// } catch (error) { }

const state = {
  // userInfo: obj,
  userInfo: local.getItem('userInfo') || {},
  userPlayList: local.getItem('userPlayList') || {},
}

const mutations = {
  [types.USER_SINGIN](state, user) {
    try {
      state.userInfo = user
      local.setItem('userInfo', user)
    } catch (e) { }
  },
  [types.USER_SINGOUT](state) {
    try {
      state.userInfo = {}
      state.userPlayList = {}
      local.removeItem('userInfo')
      local.removeItem('userPlayList')
    } catch (e) { }
  },
  [types.USER_PALYLIST](state, res) {
    try {
      state.userPlayList = res
      local.setItem('userPlayList', res)
    } catch (e) { }
  }
}

const actions = {
  dologinPhone({ commit }, from) {
    return new Promise(async (resolve) => {
      let [res] = await to(neteaseApi.phoneLogin(from))
      commit(types.USER_SINGIN, res.profile)
      resolve('登录成功')
    })
  },
  dologinEmail({ commit }, from) {
    return new Promise(async (resolve) => {
      let [res] = await to(neteaseApi.emailLogin(from))
      commit(types.USER_SINGIN, res.profile)
      resolve('登录成功')
    })
  },
  logout({ commit }) {
    return new Promise(async (resolve) => {
      await to(neteaseApi.logout())
      commit(types.USER_SINGOUT)
      resolve('退出成功')
    })
  },
  // 获取用户歌单
  getUserPlayList({ commit, state }) {
    return new Promise(async (resolve) => {
      let [res] = await to(neteaseApi.userPlayList({
        uid: state.userInfo.userId
      }))
      commit(types.USER_PALYLIST, res)
      resolve(state.userPlayList)
    })
  }
  // dologinPhone({commit}, from) {
  //   // let [res] = await to(neteaseApi.phoneLogin(from))
  //   // console.log(Vue.prototype.$store)
  //   console.log(123)
  //   Vue.prototype.$toast('登录成功')
  //   // commit(types.USER_SINGIN,res.profile)
  //   commit(types.TOGGLE_LOGIN_DIALOG, false,{ root: true })
  // },
  // async dologinPhone({commit}, from) {
  //   let [res] = await to(neteaseApi.phoneLogin(from))
  //   // console.log(Vue.prototype.$store)
  //   console.log(res)
  //   Vue.prototype.$toast('登录成功')
  //   // commit(types.USER_SINGIN,res.profile)
  //   // commit(types.TOGGLE_LOGIN_DIALOG, false,{ root: true })
  // },
  // async dologinEmail({ commit }, from) {
  //   let [res] = await to(neteaseApi.emailLogin(from))
  //   console.log(res)
  //   Vue.prototype.$toast('登录成功')
  //   commit(types.USER_SINGIN,res.profile)
  //   commit(`toggle/${types.TOGGLE_LOGIN_DIALOG}`)
  // },
  // async logout({commit}){
  //   let [res] = await to(neteaseApi.logout())
  //   console.log(commit)
  //   Vue.prototype.$toast('退出成功')
  //   commit(types.USER_SINGOUT)
  //   commit(`toggle/${types.TOGGLE_USERINFO_DETAIL}`, false)
  // }
}

export default {
  // 为了解决不同模块命名冲突问题，将不同模块的namespaced：true
  // 之后再不同的页面引入getter、action、mutation时，需要加上所属模块名即可
  namespaced: true,
  state,
  mutations,
  actions
}
