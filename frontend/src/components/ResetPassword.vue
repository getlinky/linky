<template>
  <linky-base>
    <linky-nav></linky-nav>
    <div class="container">
      <div class="item">
       <h1>Reset Password</h1>
        <form @submit.prevent.once="resetPassword">
          <label> Email
            <input v-focus="emailFocus" @focus="emailFocus = true" @blur="emailFocus = false" type="email" v-model="email" required>
          </label>
          <input type="submit" value="Reset">
        </form>
      </div>
    </div>
  </linky-base>
</template>

<script>
import axios from 'axios'
import { focus } from 'vue-focus'
import linkyNav from './Nav.vue'
import linkyBase from './Base.vue'

export default {
  directives: {
    focus,
  },
  components: {
    linkyNav,
    linkyBase,
  },
  data () {
    return {
      email: '',
      emailFocus: true,
    }
  },
  methods: {
    resetPassword () {
      axios.post('/rest-auth/password/reset/', {'email': this.email})
      .then(response => {
        this.$store.commit('notify', {'message': 'Password Reset. Check your email to complete the process.', 'level': 'success'})
        console.info('Password Reset')
        this.email = ''
      })
      .catch(error => {
        this.$store.commit('notify', {'message': 'Problem Resetting Password', 'level': 'warning'})
        console.warn('Problem resetting password.', error)
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  justify-content: center;
  margin-left: 5px;
}
</style>
