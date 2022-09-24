import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {}
  },

  mutations: {
    user (store, user) {
      store.user = user
    }
  },

  actions: {
    setUser (context, user) {
      context.commit('user', {
        ...user
      })
    }
  },

  getters: {
    getUser: (store) => store.user
  },

  plugins: [createPersistedState()]
})
