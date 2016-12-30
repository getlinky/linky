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
      {{ error }}
    </form>
  </div>
</template>


<script>
import axios from 'axios'

import linkyNav from './LinkyNav.vue'
export default {
  name: 'login',
  components: {
    linkyNav
  },
  data() {
    return {
      email: '',
      password: '',
      csrf_cookie: document.cookie.replace(/^.*=/, ''),
      error: {},
    }
  },
  methods: {
    login() {
      console.log('trying to login')

      axios.post('/rest-auth/login/', { 'email': this.email, 'password': this.password}, {
          withCredentials: true,
          headers: {'X-CSRFToken': this.csrf_cookie},
        })
        .then(response => {
          console.log('logged in ')
          this.$router.replace('/list')
          // TODO: send msg that you logged in successfully
        })
        .catch(error => {
          console.log(error.response.data)
          this.error = error.response.data
          // TODO: send error that
        });
    },
  }
}
</script>

<style lang='scss'>


</style>
