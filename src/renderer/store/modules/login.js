const state = {
  loginDialogVisible:false
}

const mutations = {
  setLoginDialogStatus (state,flag) {
    state.loginDialogVisible = flag
  }
 
}

const actions = {
  // someAsyncTask ({ commit }) {
    // do something async
  //   commit('INCREMENT_MAIN_COUNTER')
  // }
}

export default {
  state,
  mutations,
  actions
}
