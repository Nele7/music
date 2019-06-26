import * as types from '../mutation_types'

const state = {
  
}

const mutations = {
  [types.TOGGLE_LOGIN_DIALOG](state, flag) {
    state.showLoginDialog = flag
  },
 
}

const actions = {
 
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}