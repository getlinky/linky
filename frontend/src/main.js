// The following line loads the standalone build of Vue instead of the runtime-only build,
// so you don't have to do: import Vue from 'vue/dist/vue'
// This is done with the browser options. For the config, see package.json
import Vue from 'vue'
// import App from './App.vue'
import VueRouter from 'vue-router'
import Index from './components/Index.vue'
// import hello from './components/Hello.vue'

Vue.use(VueRouter)

const Foo = { template: '<router-link to="/bar">go to bar</router-link>' }
const Bar = { template: '<router-link to="/">go to base</router-link>' }
const Base = { template: '<router-link to="/foo">go to foo</router-link>' }

const routes = [
  // { path: '/', component: index },
  { path: '/foo', component: Foo },
  { path: '/bar', component: Bar },
  { path: '/', component: Index },
]

const router = new VueRouter({
  mode: 'history',
  routes
})

new Vue({
  router
}).$mount('#app')
