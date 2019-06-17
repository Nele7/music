import Vue from 'vue'
import { neteaseApi } from '@/api';
import to from '@/utils/await-to.js'
import local from '@/utils/storage.js'
import * as types from '../mutation_types'
const obj = {}
// try {
//   if(local.getItem('userInfo')){
//     obj = local.getItem('userInfo')
//   }
// } catch (error) { }

const state = {
  // userInfo: obj,
  userInfo: local.getItem('userInfo') || obj
}

const mutations = {
  [types.USER_SINGIN](state,user){
    try {
      state.userInfo = user
      local.setItem('userInfo',user)
    } catch (e) {}
  }
}

const actions = {
  // dologin({ commit }, from) {
  //   return new Promise(async (resolve, reject) => {
  //     let [err, res] = await to(neteaseApi.phoneLogin(from))
  //     if(err){
  //       reject(err.response.data.msg)
  //     }
  //     if(res){
  //       resolve(res)
  //     }
  //   })
  // },
  async dologinPhone({ commit }, from) {
    let [res] = await to(neteaseApi.phoneLogin(from))
    console.log(res)
    Vue.prototype.$toast('登录成功')
    commit(types.USER_SINGIN,res.profile)
    commit(types.TOGGLE_LOGIN_DIALOG, false)
  },
  async dologinEmail({ commit }, from) {
    let [res] = await to(neteaseApi.emailLogin(from))
    console.log(res)
    Vue.prototype.$toast('登录成功')
    commit(types.USER_SINGIN,res.profile)
    commit(types.TOGGLE_LOGIN_DIALOG, false)
  }
}

export default {
  state,
  mutations,
  actions
}
