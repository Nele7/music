import * as types from '../mutation_types'

const state = {
  playList: []
}

const mutations = {
  [types.SET_PLAY_LIST](state, list) {
    state.playList = list
  }
}

const actions = {
 
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}