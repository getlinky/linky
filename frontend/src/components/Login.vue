<template>
  <div>
    <linky-nav></linky-nav>
    <form slot='body' action="" method="post" @submit.prevent='login'>
      <label for='email'>Email</label>
      <input v-focus="emailFocused" @focus='emailFocused = true' @blur='emailFocused = false' type='email' name='email' placeholder='name@example.com' required v-model='email'>
      <label for='password'>Password</label>
      <input type='password' name='password' required v-model='password'>
      <input type='submit' value='Login'>
      <pre v-if="Object.keys(errors).length > 0">{{ errors.response.data }}</pre>
    </form>
  </div>
</template>


<script>
import { focus } from 'vue-focus'

import linkyNav from './LinkyNav.vue'

export default {
  directives: {
    focus,
  },
  name: 'login',
  components: {
    linkyNav,
  },
  data () {
    return {
      email: '',
      password: '',
      emailFocused: true,
    }
  },
  computed: {
    errors () {
      return this.$store.state.errors.login
    },
  },
  methods: {
    login () {
      const creds = {'email': this.email, 'password': this.password}
      this.$store.dispatch('login', creds)
      .then(this.$router.replace('/list'))
    },
  },
}
</script>
