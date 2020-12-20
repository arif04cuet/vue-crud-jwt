import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from './router.js'

Vue.use(Vuex)

const API_URL = 'http://localhost:8000/api';

export default new Vuex.Store({


  state: {
    idToken: null,
    userId: null,
    user: null,
    errors: []
  },
  mutations: {
    authUser(state, userData) {
      state.idToken = userData.token
      state.userId = userData.userId
    },
    clearAuth(state) {
      state.idToken = null
      state.userId = null
    },
    addError: (state, data) => {
      state.errors = data.errors;

    }
  },
  actions: {

    setError: ({ commit }, errors) => {
      commit("addError", {
        errors: errors
      });
    },
    signup({ commit }, authData) {
      let signupUrl = API_URL + '/register';
      axios.post(signupUrl, {
        name: authData.name,
        email: authData.email,
        password: authData.password
      })
        .then(res => {
          console.log('ok' + res)
          const data = res.data.data;
          localStorage.setItem('token', data.token)
          localStorage.setItem('userId', data.user.id)
          commit('authUser', {
            token: data.token,
            userId: data.user.id,
            user: data.user
          })

          router.push("/login");
        })
        .catch(error => {
          console.log(error.response.data);
          commit('addError', {
            errors: error.response.data.data
          })


        })
    },
    login({ commit }, authData) {
      let loginUrl = API_URL + '/login';
      axios.post(loginUrl, {
        email: authData.email,
        password: authData.password
      })
        .then(res => {
          const data = res.data.data;
          localStorage.setItem('token', data.token)
          localStorage.setItem('userId', data.user.id)
          commit('authUser', {
            token: data.token,
            userId: data.user.id,
            user: data.user
          })
          router.push("/products")
        })
        .catch(error => console.log(error))
    },
    logout({ commit }) {
      commit('clearAuth')
      localStorage.removeItem('token')
      localStorage.removeItem('userId')
      router.replace('/')
    },
    AutoLogin({ commit }) {
      const token = localStorage.getItem('token')
      if (!token) {
        return
      }
      const userId = localStorage.getItem('userId')
      commit('authUser', {
        token: token,
        userId: userId
      })
    }
  },
  getters: {
    user(state) {
      return state.user
    },
    ifAuthenticated(state) {
      return state.idToken !== null
    },

    hasError(state) {
      return state.errors.length;
    }
  }
})
