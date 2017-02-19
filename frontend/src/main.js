import Vue from 'vue'
import VueRouter from 'vue-router'
import store from './store.js'

import Raven from 'raven-js'
import RavenVue from 'raven-js/plugins/vue'

import Index from './components/Index.vue'
import List from './components/List.vue'
import Archive from './components/Archive.vue'
import Login from './components/Login.vue'
import Settings from './components/Settings.vue'
import ResetPassword from './components/ResetPassword.vue'
import ConfirmResetPassword from './components/ConfirmResetPassword.vue'

Vue.use(VueRouter)

Raven
    .config('https://5e9833708bb047ac977f7839110f83fd@sentry.io/140375')
    .addPlugin(RavenVue, Vue)
    .install()

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
    .then(() => {
      if (from.path === '/list') {
        store.commit('setLoadingProgress', 0)
        next(false)
      }
      next('/list')
    })
    .catch(() => next())
}

const isAuthenticated = (to, from, next) => {
  store.dispatch('isAuthenticated')
  store.commit('setLoadingProgress', 30)
  next()
}

const routes = [
  { path: '/',
    component: Index,
    beforeEnter: anonRequired,
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
  { path: '/settings',
    component: Settings,
    beforeEnter: loginRequired,
  },
  {
    path: '/reset',
    component: ResetPassword,
  },
  { path: '/reset/confirm/:uid-:token',
    component: ConfirmResetPassword,
  },
]

const router = new VueRouter({
  mode: 'history',
  routes,
})

router.beforeEach(isAuthenticated)
router.afterEach(() => store.commit('setLoadingProgress', 100))

new Vue({
  store,
  router,
}).$mount('#app')
