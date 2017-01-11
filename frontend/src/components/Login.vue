<template>
  <div>
    <linky-nav></linky-nav>
    <div class="container">
      <div>
        <h1>Login</h1>
        <form slot='body' action="" method="post" @submit.prevent='login'>
          <label>Email
            <input v-focus="emailFocused" @focus='emailFocused = true' @blur='emailFocused = false' type='email' name='email' placeholder='name@example.com' required v-model='email'>
          </label>
          <label>Password
            <input type='password' name='password' required v-model='password'>
          </label>
          <input type='submit' value='Login'>
          <p class='warning' v-show="errors"><em>Error:</em> incorrect login info</p>
        </form>
      </div>
    </div>
  </div>
</template>


<script>
import { focus } from 'vue-focus'
import axios from 'axios'

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
      errors: false,
    }
  },
  methods: {
    login () {
      const credentials = {'email': this.email, 'password': this.password}
      axios.post('/rest-auth/login/', credentials)
        .then(response => {
          this.$store.commit('notify', {'message': 'Login Successful', 'level': 'success'})
          console.info('Login successful')
          this.$store.commit('loginSuccessful', response.data.key)
          // fetch links once user is logged in
          this.$store.dispatch('refreshLinks')
          this.errors = false
          this.$router.replace('/list')
        })
        .catch(error => {
          console.warn('problem logging in', error)
          this.errors = true
        })
    },
  },
}
</script>

<style lang='scss' scoped>

.container {
  display: flex;
  justify-content: center;
  margin-left: 5px;
}

label {
  display: inline-block;
}

</style>
