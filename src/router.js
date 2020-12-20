import Vue from 'vue'
import VueRouter from 'vue-router'


import WelcomePage from './components/welcome/welcome.vue'

import SignupPage from './components/auth/signup.vue'
import SigninPage from './components/auth/signin.vue'


Vue.use(VueRouter)

const routes = [
  { path: '/', component: WelcomePage },
  { path: '/signup', component: SignupPage },
  { path: '/signin', component: SigninPage },


  {
    path: "/products",
    name: "product-list",
    component: () => import("./components/product/list"),
    meta: { requiresAuth: true }
  },

  {
    path: "/product/add",
    name: "product-add",
    component: () => import("./components/product/add"),
    meta: { requiresAuth: true }
  },
  {
    path: "/product/:id/edit",
    name: "product-edit",
    component: () => import("./components/product/add"),
    meta: { requiresAuth: true }
  },

]

export default new VueRouter({ mode: 'history', routes })