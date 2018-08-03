import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isSignIn: false,
    userName: ''
  },
  mutations: {
    signIn (state) {
      state.isSignIn = true
    },
    setName (state, name) {
      state.userName = name
    }
  },
  actions: {
    signIn ({commit}) {
      commit('signIn')
    },
    setName ({commit}, name) {
      commit('setName', name)
    }
  }
})
