import Vue from 'vue'
import VueRouter from 'vue-router'
import store from './store.js'

import list_nav from './nav.js'

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

new Vue({
  store,
  router
}).$mount('#app')

list_nav()
