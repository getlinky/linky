<template>
  <linky-nav>
    <template v-if='userAuthenticated'>
      <router-link to="/list">List</router-link>
      <router-link to="/archive">Archive</router-link>
      <a @click='logoutUser'>Logout</a>
    </template>
    <router-link v-else to="/login">Login</router-link>
  </linky-nav>
</template>

<script>
import linkyNav from './LinkyNav.vue'

export default {
  name: 'index',
  components: {
    linkyNav,
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
