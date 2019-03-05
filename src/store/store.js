import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    status: '',
    token: localStorage.getItem('token') || '',
    user: localStorage.getItem('user') || ''
  },
  mutations: {
    auth_request (state) {
      state.status = 'loading'
    },
    auth_success (state, {user, token}) {
      state.status = 'Logged in success!'
      state.token = token
      state.user = JSON.stringify(user)
    },
    register_success (state) {
      state.status = 'Registered success!'
    },
    auth_error (state, message) {
      console.log(message)
      state.status = message
    },
    logout (state) {
      state.status = ''
      state.token = ''
    }
  },
  actions: {
    login ({commit}, user) {
      return new Promise((resolve, reject) => {
        commit('auth_request')
        Axios({
          url: 'http://localhost:3000/user/login', data: user, method: 'POST' })
          .then(resp => {
            const token = resp.data.token
            const user = resp.data.user
            localStorage.setItem('token', token)
            localStorage.setItem('user', JSON.stringify(user))
            /**
             * Set headers.authorization as a token, so that each request will carry this information as default
             * @type {string | string | * | CancelToken}
             */
            Axios.defaults.headers.common['Authorization'] = token
            commit('auth_success', {user, token})
            resolve(resp)
          })
          .catch(err => {
            if (err.response) {
              commit('auth_error', err.response.data.message)
            } else {
              commit('auth_error', 'Network error!')
            }
            localStorage.removeItem('token')
            reject(err)
          })
      })
    },
    logout ({commit}) {
      return new Promise((resolve, reject) => {
        commit('logout')
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        delete Axios.defaults.headers.common['Authorization']
        resolve()
      })
    },
    register ({commit}, user) {
      return new Promise((resolve, reject) => {
        commit('auth_request')
        Axios({
          url: 'http://localhost:3000/user/register', data: user, method: 'POST' })
          .then(resp => {
            commit('register_success')
            resolve(resp)
          })
          .catch(err => {
            if (err.response) {
              commit('auth_error', err.response.data.message)
            } else {
              commit('auth_error', 'Network error!')
            }
            localStorage.removeItem('token')
            reject(err)
          })
      })
    }
  },
  getters: {
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status,
    getUsername: state => JSON.parse(state.user).username
  }
})
