<template>
  <div>
    <linky-nav></linky-nav>
    <div class="container">
      <div>
       <h1>Update Password</h1>
         <div class="item">
          <form @submit.prevent.once="updatePassword">
            <label> New Password
              <input type="password" v-model="new_password1" v-focus="focusPassword" @focus="focusPassword = true" @blur="focusPassword = false" required>
            </label>
            <label> Repeat Password
              <input type="password" v-model="new_password2" required>
            </label>
            <input type="submit" value="Change Password">
          </form>
        </div>
      </div>
    </div>
    <linky-notification></linky-notification>
  </div>
</template>

<script>
import axios from 'axios'
import { focus } from 'vue-focus'
import linkyNav from './LinkyNav.vue'
import linkyNotification from './linkyNotification.vue'

export default {
  name: 'ConfirmResetPassword',
  components: {
    linkyNav,
    linkyNotification,
  },
  data () {
    return {
      new_password1: '',
      new_password2: '',
      uid: this.$route.params.uid,
      token: this.$route.params.token,
      focusPassword: true,
    }
  },
  directives: {
    focus,
  },
  methods: {
    updatePassword () {
      axios.post('/rest-auth/password/reset/confirm/', {
        'new_password1': this.new_password1,
        'new_password2': this.new_password2,
        'uid': this.uid,
        'token': this.token,
      })
      .then(response => {
        this.$store.commit('notify', {'message': 'Password Changed.', 'level': 'success', 'duration': 1000})
        console.info('Password Reset')
        setTimeout(() => this.$store.commit('notify', {'message': 'Redirecting to Login.', 'level': 'info'}), 1500)
        setTimeout(() => this.$router.replace('/login'), 3000)
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
  .item {
    display: flex;
    justify-content: center;
    form {
      width: 200px;
    }
  }
}
</style>
