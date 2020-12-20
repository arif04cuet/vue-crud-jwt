import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'


import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

// add to ken to restricted route
const token = localStorage.getItem('token')
if (token) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

// route guard

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!token) {
      next({
        path: '/signin'
      })
    } else {
      next()
    }
  } else {
    next() // make sure to always call next()!
  }
})



new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
