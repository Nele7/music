import * as types from '../mutation_types'
import local from '@/utils/storage.js'
import {shuffle} from '@/utils/util'
const playlist = '__playlist__'
const currentIndex = '__currentIndex__'
const playMode = '__playMode__'
const sequentlist = '__sequentlist__'
const state = {
  playList: JSON.parse(localStorage.getItem(playlist)) || [],               // 播放列表
  sequentList:JSON.parse(localStorage.getItem(sequentlist)) || [],          // 顺序列表
  playCurrentIndex: localStorage.getItem(currentIndex) || -1,               // 当前下标
  playStatus:false,                                                         // 播放状态
  playMode: localStorage.getItem(playMode) || 0,                            // 播放模式
}
console.log()
const mutations = {
  [types.SET_PLAY_SEQUENTLIST](state, list) {
    try {
      localStorage.setItem(sequentlist,JSON.stringify(list))
      state.sequentList = list
    } catch (error) {}
  },
  [types.SET_PLAY_LIST](state, list) {
    try {
      localStorage.setItem(playlist,JSON.stringify(list))
      state.playList = list
    } catch (error) {}
  },
  [types.SET_PLAY_CURRENT_INDEX](state, index) {
    try {
      localStorage.setItem(currentIndex,index)
      state.playCurrentIndex = index
    }catch(error) {}
  },
  [types.SET_PLAY_STATUS](state, flag) {
    state.playStatus = flag
  },
  [types.SET_PLAY_MODE](state,mode) {
    try {
      localStorage.setItem(playMode,mode)
      state.playMode = mode
    } catch (error) {}
  }
}

const actions = {
  // 播放列表
  insertMusicPlayList({commit,state},{list,index}) {
    let playlist = [...list]
    if(state.playMode == 3){
      shuffle(playlist)
      index = playlist.findIndex(item => {
        return item.id == list[index].id
      })
    }
    commit(types.SET_PLAY_LIST,playlist)
    commit(types.SET_PLAY_SEQUENTLIST,playlist)
    commit(types.SET_PLAY_CURRENT_INDEX,index)
    commit(types.SET_PLAY_STATUS,true)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}