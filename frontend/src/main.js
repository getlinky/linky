import Vue from 'vue'
import VueRouter from 'vue-router'
import store from './store.js'

import Index from './components/Index.vue'
import List from './components/List.vue'
import Archive from './components/Archive.vue'
import Login from './components/Login.vue'

Vue.use(VueRouter)

const loginRequired = (to, from, next) => {
  if (store.state.user.authenticated || from.path === '/login') {
    next()
  } else {
    console.log(`loginRequired for ${to.path}`)
    next('/login')
  }
}

const anonRequired = (to, from, next) => {
  if (store.state.user.authenticated) {
    next('/list')
  } else {
    next()
  }
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
