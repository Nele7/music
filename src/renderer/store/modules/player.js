import * as types from '../mutation_types'

const state = {
  playList: [],          // 播放列表
  playCurrentIndex:-1,   // 当前下标
  playStatus:false,      // 播放状态
}

const mutations = {
  [types.SET_PLAY_LIST](state, list) {
    state.playList = list
  },
  [types.SET_PLAY_CURRENT_INDEX](state, index) {
    state.playCurrentIndex = index
  },
  [types.SET_PLAY_STATUS](state, flag) {
    state.playStatus = flag
  }
}

const actions = {
  // 播放列表
  insertMusicPlayList({commit},{list,index}) {
    let playlist = [...list]
    commit(types.SET_PLAY_LIST,playlist)
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