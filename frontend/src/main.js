import Vue from 'vue'
import VueRouter from 'vue-router'
import store from './store.js'

import Index from './components/Index.vue'
import List from './components/List.vue'
import Archive from './components/Archive.vue'
import Login from './components/Login.vue'

Vue.use(VueRouter)

import axios from 'axios'

const is_authenticated = () =>
  axios.get('/api/users/me/', {
    headers: {'Authorization': 'Token ' + localStorage.getItem('token')},
  })

const loginRequired = (to, from, next) => {
  is_authenticated()
    .then(() => next())
    .catch(() => next('/login'))
}

const anonRequired = (to, from, next) => {
  is_authenticated()
    .then(() => next('/list'))
    .catch(() => next())
}

const isAuthenticated = (to, from, next) => {
  store.dispatch('isAuthenticated')
  next()
}

const routes = [
  { path: '/',
    component: Index,
  },
  { path: '/list',
    component: List,
    beforeEnter: loginRequired,
  },
  { path: '/archive',
    component: Archive,
    beforeEnter: loginRequired,
  },
  { path: '/login',
    component: Login,
    beforeEnter: anonRequired,
  },
]

const router = new VueRouter({
  mode: 'history',
  routes,
})

router.beforeEach(isAuthenticated)

new Vue({
  store,
  router,
}).$mount('#app')
