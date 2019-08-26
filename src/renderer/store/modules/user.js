
import { neteaseApi } from '@/api';
import to from '@/utils/await-to.js'
import local from '@/utils/storage.js'
import * as types from '../mutation_types'

const state = {
  userLoginStatus:localStorage.getItem('loginStatus') || false,  // 用户登录状态
  userInfo: local.getItem('userInfo') || {},                     // 用户登录信息       
  userPlayList: [],                                              // 用户创建收藏歌单
  userSignStatus: false,                                         // 用户签到状态
  userlikelist: [],                                              // 用户喜欢列表
  userInfoLoading:false,                                         // 用户详情loading
  userTheme:'default',                                                  // 用户主题色
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
      state.userLoginStatus = false
      local.removeItem('userInfo')
      localStorage.removeItem('loginStatus')
    } catch (e) { }
  },
  // 用户歌单
  [types.USER_PALYLIST](state, res) {
    state.userPlayList = res
  },
  [types.USER_SIGN](state,flag) {
    state.userSignStatus = flag
  },
  [types.USER_LIKE_LIST](state,arr) {
    state.userlikelist = arr
  },
  [types.USER_PLAY_LIST](state,arr) {
    state.userPlayList = arr
  },
  [types.USER_INFO_LOADING](state,flag) {
    state.userInfoLoading = flag
  },
  [types.USER_THEME](state,theme) {
    try {
      state.userTheme = theme
      localStorage.setItem('theme',theme)
    } catch (e) { }
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
  getUserFollow({commit},uid){
    return new Promise(async (resolve) => {
      let [res] = await to(neteaseApi.userFollows({
        uid
      }))
      resolve(res)
    })
  },
  // 获取用户--粉丝列表
   getUserFollower({commit,state},uid){
    return new Promise(async (resolve) => {
      let [res] = await to(neteaseApi.userFollowed({
        uid
      }))
      resolve(res)
    })
  },
  // 获取用户--动态列表
   getUserEvent({commit,state},uid){
    return new Promise(async (resolve) => {
      let [res] = await to(neteaseApi.userEvent({
        uid
      }))
      resolve(res)
    })
  },
  // 获取用户--详情
  getUserDetail({ state,commit }){
    return new Promise(async (resolve,reject) => {
      let [res] = await to(neteaseApi.userDetail({
        uid: state.userInfo.userId
      }))
      commit(types.USER_SIGN,res.mobileSign)
      resolve(res)
    })
  },
  // 获取用户--歌单
  getUserPlayList({ commit, state }) {
    return new Promise(async (resolve,reject) => {
      let [res] = await to(neteaseApi.userPlayList({
        uid: state.userInfo.userId
      }))
      commit(types.USER_PALYLIST, res.playlist)
      resolve(state.userPlayList)
    })
  },
  // 获取用户--喜欢列表
  async getUserLikelist({commit,state}) {
    let [res] = await to(neteaseApi.likelist({
      uid: state.userInfo.userId
    }))
    commit(types.USER_LIKE_LIST, res.ids)
  },
  // 用户签到
  sign({commit,dispatch}) {
    return new Promise(async (resolve,reject) => {
      let [res] = await to(neteaseApi.sign())
      let {mobileSign} = await dispatch('getUserDetail')
      commit(types.USER_SIGN,mobileSign)
      resolve(res)
    })
  },
  // s 操作我的喜欢--id列表
  insertUserLikelist({commit,state},id) {
    let userlist = [...state.userlikelist]
    let index = userlist.findIndex(item => item === id)
    if(index === -1){
      userlist.unshift(id)
    }
    commit(types.USER_LIKE_LIST,userlist)
  },
  deleteUserLikelist({commit,state},id) {
    let userlist = [...state.userlikelist]
    let index = userlist.findIndex(item => item === id)
    if(index > -1){
      userlist.splice(index,1)
    }
    commit(types.USER_LIKE_LIST,userlist)
  },
  // e

  // s 操作用户歌单列表
  insertUserPlayList({commit,state},obj) {
    let playlist = [...state.userPlayList]
    let index = playlist.findIndex(item => item.id === obj.id)
    if(index === -1){
      playlist.unshift(obj)
    }
    commit(types.USER_PALYLIST,playlist)
  },
  deleteUserPlayList({commit,state},id) {
    let playlist = [...state.userPlayList]
    let index = playlist.findIndex(item => item.id === id)
    if(index > -1){
      playlist.splice(index,1)
    }
    console.log(playlist)
    commit(types.USER_PALYLIST,playlist)
  },
  // e
}

export default {
  // 为了解决不同模块命名冲突问题，将不同模块的namespaced：true
  // 之后再不同的页面引入getter、action、mutation时，需要加上所属模块名即可
  namespaced: true,
  state,
  mutations,
  actions
}
