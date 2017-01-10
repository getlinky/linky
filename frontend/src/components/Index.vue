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
  <notification message="You may or may not have had success" type="info" :show="show" @closed="show = false"></notification>
  </div>
</template>

<script>
import linkyNav from './LinkyNav.vue'
import notification from './notification.vue'

export default {
  name: 'index',
  data () {
    return {
      show: true,
    }
  },
  components: {
    linkyNav,
    notification,
  },
  computed: {
    userAuthenticated () {
      return this.$store.state.user.authenticated
    },
  },
  methods: {
    logoutUser () {
      this.$store.dispatch('logout')
        .then(this.$router.replace('/'))
    },
  },
}
</script>
