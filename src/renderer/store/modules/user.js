import Vue from 'vue'
import { neteaseApi } from '@/api';
import to from '@/utils/await-to.js'
import local from '@/utils/storage.js'
import * as types from '../mutation_types'
import { stat } from 'fs';
// const obj = {}
// try {
//   if(local.getItem('userInfo')){
//     obj = local.getItem('userInfo')
//   }
// } catch (error) { }

const state = {
  // userInfo: obj,
  userLoginStatus:localStorage.getItem('loginStatus') || false,
  userInfo: local.getItem('userInfo') || {},
  userPlayList: local.getItem('userPlayList') || {},
  userFollowList:[],    // 用户关注列表
  userFollowerList:[],  // 用户粉丝列表
  userEvent:[],         // 用户动态列表
}

const mutations = {
  // 用户登录
  [types.USER_SINGIN](state, user) {
    try {
      state.userInfo = user
      state.userLoginStatus = true
      local.setItem('userInfo', user)
      localStorage.setItem('loginStatus',true)
    } catch (e) { }
  },
  // 用户退出
  [types.USER_SINGOUT](state) {
    try {
      state.userInfo = {}
      state.userPlayList = {}
      state.userLoginStatus = false
      local.removeItem('userInfo')
      local.removeItem('userPlayList')
      localStorage.removeItem('loginStatus')
    } catch (e) { }
  },
  // 用户歌单
  [types.USER_PALYLIST](state, res) {
    try {
      state.userPlayList = res
      local.setItem('userPlayList', res)
    } catch (e) { }
  },
  [types.USER_FOLLOW](state,list) {
    state.userFollowList = list
  },
  [types.USER_FOLLOWER](state,list) {
    state.userFollowerList = list
  },
  [types.USER_EVENT](state,list) {
    state.userEvent = list
  },
}

const actions = {
  // 手机登录
  dologinPhone({ commit }, from) {
    return new Promise(async (resolve,reject) => {
      let [res] = await to(neteaseApi.phoneLogin(from))
      commit(types.USER_SINGIN, res.profile)
      resolve('登录成功')
    })
  },
  // 邮箱登录
  dologinEmail({ commit }, from) {
    return new Promise(async (resolve,reject) => {
      let [res] = await to(neteaseApi.emailLogin(from))
      commit(types.USER_SINGIN, res.profile)
      resolve('登录成功')
    })
  },
  // 退出登录
  logout({ commit }) {
    return new Promise(async (resolve) => {
      await to(neteaseApi.logout())
      commit(types.USER_SINGOUT)
      resolve('退出成功')
    })
  },
  // 获取用户--关注列表
  async getUserFollow({commit}){
    let [res] = await to(neteaseApi.userFollows({
      uid: state.userInfo.userId
    }))
    commit(types.USER_FOLLOW,res.follow)
  },
  // 获取用户--粉丝列表
  async getUserFollower({commit,state}){
    let [res] = await to(neteaseApi.userFollowed({
       uid: state.userInfo.userId
    }))
    commit(types.USER_FOLLOWER,res.followeds)
  },
  // 获取用户--动态列表
  async getUserEvent({commit,state}){
    let [res] = await to(neteaseApi.userEvent({
      uid: state.userInfo.userId
    }))
    commit(types.USER_EVENT,res.events)
  },
  // 获取用户--详情
  getUserDetail({ state }){
    return new Promise(async (resolve,reject) => {
      let [res] = await to(neteaseApi.userDetail({
        uid: state.userInfo.userId
      }))
      resolve(res)
    })
  },
  // 获取用户--歌单
  getUserPlayList({ commit, state }) {
    return new Promise(async (resolve,reject) => {
      let [res] = await to(neteaseApi.userPlayList({
        uid: state.userInfo.userId
      }))
      commit(types.USER_PALYLIST, res)
      resolve(state.userPlayList)
    })
  },
  // 用户签到
  sign() {
    return new Promise(async (resolve,reject) => {
      let [res] = await to(neteaseApi.sign())
      resolve(res)
    })
  }
}

export default {
  // 为了解决不同模块命名冲突问题，将不同模块的namespaced：true
  // 之后再不同的页面引入getter、action、mutation时，需要加上所属模块名即可
  namespaced: true,
  state,
  mutations,
  actions
}
