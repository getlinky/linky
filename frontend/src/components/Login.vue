<template>
  <div>
    <linky-nav>
        <div></div>
    </linky-nav>

    <form slot='body' action="" method="post" @submit.prevent='login'>
      <label for='email'>Email</label>
      <input type='email' name='email' placeholder='name@example.com' required v-model='email'>
      <label for='password'>Password</label>
      <input type='password' name='password' required v-model='password'>
      <input type='submit' value='Login'>
      <!-- TODO: make errors pretty-->
      <pre v-if="Object.keys(errors).length > 0">{{ errors }}</pre>
    </form>
  </div>
</template>


<script>
import linkyNav from './LinkyNav.vue'

export default {
  name: 'login',
  components: {
    linkyNav
  },
  data() {
    return {
      email: '',
      password: ''
    }
  },
  computed: {
    errors () {
      return this.$store.state.errors.login
    }
  },
  mounted () {
    // redirect to list view if already logged in
    if (this.$store.state.user.authenticated) {
      this.$router.replace('/list')
    }
  },
  methods: {
    login() {
        this.$store.dispatch('login', {'email': this.email, 'password': this.password}).then(this.$router.replace('/list'))
    }
  }
}
</script>
