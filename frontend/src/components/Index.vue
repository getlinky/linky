<template>
  <linky-base>
    <linky-nav>
      <template v-if='userAuthenticated'>
        <router-link to="/list">List</router-link>
        <router-link to="/archive">Archive</router-link>
        <a @click='logoutUser'>Logout</a>
      </template>
      <router-link v-else to="/login">Login</router-link>
    </linky-nav>
    <h1><i>Linky</i> — Save links for later</h1>
    <div class="container">
      <div class="item">
        <h2>Why choose this?</h2>
        <ul>
          <li>Use simple keybinds to breeze through your lists.</li>
          <li>A no fuss design enables quick access to what you need.</li>
          <li>Copy and paste links into your queue like you copy urls.</li>
          <li>Open Source</li>
        </ul>
      </div>
      <div class="item">
        <h2>Register Now</h1>
        <form @submit.prevent="registerUser">
          <label>Email<br>
            <input type="email" v-model="email" v-focus="focusEmail" @blur="focusEmail = false" @focus="focusEmail = true" required>
          </label>
          <br>
          <label>Password<br>
            <input type="password" v-model="password1" required>
          </label>
          <br>
          <label>Password Again<br>
            <input type="password" v-model="password2" required>
          </label>
          <br>
          <input type="submit" value="Register">
        </form>
        <div class="errors" v-show="Object.keys(inputErrors).length > 0">
          <transition name="fade" v-for="(errors, name) in inputErrors" v-if="errors.length > 0">
            <p class="warning">
            {{ name | normalize }}:
                <template v-for="error in errors">{{ error }} </template>
            </p>
          </transition>
        </div>
      </div>
    </div>
  </linky-base>
</template>

<script>
import { focus } from 'vue-focus'
import axios from 'axios'
import { normalize } from '../utilities.js'

import linkyBase from './LinkyBase.vue'
import linkyNav from './LinkyNav.vue'

export default {
  name: 'index',
  computed: {
    userAuthenticated () {
      return this.$store.state.user.authenticated
    },
  },
  directives: {
    focus,
  },
  filters: {
    normalize,
  },
  data () {
    return {
      email: '',
      password1: '',
      password2: '',
      focusEmail: true,
      inputErrors: {},
    }
  },
  components: {
    linkyBase,
    linkyNav,
  },
  methods: {
    logoutUser () {
      this.$store.dispatch('logout')
    },
    registerUser () {
      const data = {
        'email': this.email,
        'password1': this.password1,
        'password2': this.password2,
      }
      axios.post('/rest-auth/registration/', data)
      .then(response => {
        this.$store.commit('notify', {'message': 'Registration Successful', 'level': 'success'})
        console.info('Registration successful')
        this.$store.commit('loginSuccessful', response.data.key)
        this.$router.replace('/list')
      })
      .catch(error => {
        console.warn('Problem registering user.', error)
        this.inputErrors = error.response.data
        this.$store.commit('notify', {'message': 'Problem Registering User', 'level': 'warning', 'sticky': true})
      })
    },
  },
}
</script>

<style lang="scss" scoped>
h1 {
  font-size: 2em;
  text-align: center;
}

.container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;

  .item {
    flex-basis: max-content;
    padding-left: 20px;
    padding-right: 20px;
    max-width: 400px;
    font-size: 1.25em;

    h2 {
      font-size: 1.2em;
      margin: 0;
    }

    form {
      font-weight: normal;
      padding-top: 1em;
      font-size: .8em;
    }
    .errors {
      font-size: .6em;
      font-weight: normal;
    }
  }
}
</style>
