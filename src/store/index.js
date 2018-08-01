import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isSignIn: false
  },
  mutations: {
    signIn (state) {
      state.isSignIn = true
    }
  },
  actions: {
    signIn ({commit}) {
      commit('signIn')
    }
  }
})
