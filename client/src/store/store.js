import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: false,
  plugins: [
    createPersistedState()
  ],
  state: {
    token: null,
    user: null,
    company: null,
    isUserLoggedIn: false,
    sideBarOpen: true
  },
  getters: {
    g_sideBarOpen (state) {
      return state.sideBarOpen
    }
  },
  mutations: {
    setToken (state, token) {
      state.token = token
      if (token) {
        state.isUserLoggedIn = true
      } else {
        state.isUserLoggedIn = false
      }
    },
    setUser (state, user) {
      state.user = user
    },
    setCompany (state, company) {
      state.company = company
    },
    toggleSideBar (state) {
      state.sideBarOpen = !state.sideBarOpen
    }
  },
  actions: {
    setToken ({ commit }, token) {
      commit('setToken', token)
    },
    setUser ({ commit }, user) {
      commit('setUser', user)
    },
    setCompany ({ commit }, company) {
      commit('setCompany', company)
    }
  }
})
