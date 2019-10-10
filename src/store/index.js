import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);
const store = new Vuex.Store({
  state: {
    LoginUser: sessionStorage.getItem('LoginUser')
    ? JSON.parse(sessionStorage.getItem('LoginUser')) : null
  },
  getters: {},
  mutations : {
    initUser(state, payload) {
      state.LoginUser = payload;
    }
  },
  actions: {},
  getters: {
    getLoginUser(state) {
      return store.getLoginUser
    }
  }
})

export default store
