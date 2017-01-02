<template>
  <div>
    <linky-nav></linky-nav>
    <form slot='body' action="" method="post" @submit.prevent='login'>
      <label for='email'>Email</label>
      <input v-focus="emailFocused" @focus='emailFocused = true' @blur='emailFocused = false' type='email' name='email' placeholder='name@example.com' required v-model='email'>
      <label for='password'>Password</label>
      <input type='password' name='password' required v-model='password'>
      <input type='submit' value='Login'>
      <!-- TODO: make errors pretty-->
      <pre v-if="Object.keys(errors).length > 0">{{ errors.response.data }}</pre>
    </form>
  </div>
</template>


<script>
import axios from 'axios'
import { focus } from 'vue-focus';

import linkyNav from './LinkyNav.vue'

export default {
  directives: {
    focus
  },
  name: 'login',
  components: {
    linkyNav
  },
  data() {
    return {
      email: '',
      password: '',
      emailFocused: true
    }
  },
  computed: {
    errors () {
      return this.$store.state.errors.login
    }
  },
  methods: {
    login() {
      const creds = {'email': this.email, 'password': this.password }
      axios.post('/rest-auth/login/', creds, {
        withCredentials: true,
        headers: {'X-CSRFToken': document.cookie.replace(/^.*=/, '')},
      })
        .then(response => {
          console.log('logged in')
          this.$store.commit('loginSuccessful')
          // fetch links once user is logged in
          this.$store.dispatch('refreshLinks')
          this.$router.replace('/list')
        })
        .catch(error => {
          console.warn('problem logging in', error)
          this.$store.commit('loginErrors', error)
        })
    }
  }
}
</script>
