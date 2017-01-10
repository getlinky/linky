<template>
<div>
  <linky-nav>
    <template v-if='userAuthenticated'>
      <router-link to="/list">List</router-link>
      <router-link to="/archive">Archive</router-link>
      <a @click='logoutUser'>Logout</a>
    </template>
    <router-link v-else to="/login">Login</router-link>
  </linky-nav>
  <notification-test v-if="debug"></notification-test>
  <linkyNotification></linkyNotification>
</div>
</template>

<script>
import linkyNav from './LinkyNav.vue'
import notificationTest from './notificationTest.vue'
import linkyNotification from './linkyNotification.vue'

export default {
  name: 'index',
  computed: {
    userAuthenticated () {
      return this.$store.state.user.authenticated
    },
    debug () {
      return localStorage.getItem('DEBUG')
    },
  },
  components: {
    linkyNav,
    notificationTest,
    linkyNotification,
  },
  methods: {
    logoutUser () {
      this.$store.dispatch('logout')
        .then(this.$router.replace('/'))
    },
  },
}
</script>
