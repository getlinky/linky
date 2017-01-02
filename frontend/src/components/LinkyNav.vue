<template>
  <header>
    <nav class="main-nav">
      <div class="items">
        <div class="section">
          <router-link to="/">
            <h1 class="title">Linky</h1>
          </router-link>
        </div>
        <div class="section">
          <slot>

            <router-link to="/list">List</router-link>
            <router-link to="/archive">Archive</router-link>
            <router-link to="/login">Login</router-link>
            <template v-if='userAuthenticated'>
              <router-link to="/list">List</router-link>
              <router-link to="/archive">Archive</router-link>
              <a @click='logoutUser'>Logout</a>
            </template>
            <router-link v-else to="/login">Login</router-link>
          </slot>
        </div>
        </div>
    </nav>
  </header>
</template>

<script>

export default {
  name: 'linky-nav',
  computed: {
    userAuthenticated () {
      return this.$store.state.user.authenticated
    },
    userEmail () {
      return this.$store.state.user.email
    }

  },
  methods: {
    logoutUser() {
      this.$store.dispatch('logout').then(this.$router.replace('/'))
    },
  }

}
</script>


<style lang='scss'>

.section {
    align-items: center;
    display: flex;
    font-weight: bold;
    text-decoration: none;
    font-size: .8rem;

    // make sure the last link section doesn't hit the edge of the browser
    &:last-child {
      margin-right: .5rem;
    }

    &:first-child {
      margin-left: .5rem;
    }
  }
</style>
