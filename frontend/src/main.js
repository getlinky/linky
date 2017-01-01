import Vue from 'vue'
import VueRouter from 'vue-router'
import store from './store.js'

import Index from './components/Index.vue'
import List from './components/List.vue'
import Archive from './components/Archive.vue'
import Login from './components/Login.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', component: Index },
  { path: '/list', component: List },
  { path: '/archive', component: Archive },
  { path: '/login', component: Login },
]

const router = new VueRouter({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  store.dispatch('isAuthenticated')
  next()
})

new Vue({
  store,
  router
}).$mount('#app')
