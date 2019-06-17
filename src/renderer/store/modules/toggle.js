import * as types from '../mutation_types'

const state = {
  showLoginDialog: false,
  showUserInfoDetail: false
}

const mutations = {
  [types.TOGGLE_LOGIN_DIALOG](state, flag) {
    state.showLoginDialog = flag
  },
  [types.TOGGLE_USERINFO_DETAIL](state, flag) {
    state.showUserInfoDetail = flag
  },
}

const actions = {
 
}

export default {
  state,
  mutations,
  actions
}