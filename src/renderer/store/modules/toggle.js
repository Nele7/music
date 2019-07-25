import * as types from '../mutation_types'

const state = {
  showLoginDialog: false,
  showUserInfoDetail: false,
  showPlayerListDialog: true,
}

const mutations = {
  [types.TOGGLE_LOGIN_DIALOG](state, flag) {
    state.showLoginDialog = flag
  },
  [types.TOGGLE_USERINFO_DETAIL](state, flag) {
    state.showUserInfoDetail = flag
  },
  [types.TOGGLE_PLAYERLIST](state,flag) {
    state.showPlayerListDialog = flag
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