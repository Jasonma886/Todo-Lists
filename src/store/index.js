import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isSignIn: false,
    userName: ''
  },
  mutations: {
    signIn (state, flag) {
      state.isSignIn = flag
    },
    setName (state, name) {
      state.userName = name
    }
  },
  actions: {
    signIn ({commit}, flag = true) {
      commit('signIn', flag)
    },
    setName ({commit}, name) {
      commit('setName', name)
    }
  }
})
