<template>
  <div>
    <header>
        <nav class="main-nav">
            <div class="items">
              <div class="section">
                <h1 class="title">
                  <a href="https://getlinky.com">Linky</a></h1>
              </div>
            </div>
        </nav>
    </header>
    <div class="container">
        <section>
          <div v-if="authenticated">
            <h1>Currently Authenticated</h1>
            <a @click='logout'>Logout</a>
          </div>
          <div v-else>
            <h1>Login</h1>
            <form action="" method="post" @submit.prevent='login'>
              <label>Email
                <input v-focus="emailFocused" @focus='emailFocused = true' @blur='emailFocused = false' type='email' name='email' placeholder='name@example.com' required v-model='email'>
              </label>
              <label>Password
                <input type='password' name='password' required v-model='password'>
              </label>
              <input type='submit' value='Login'>
              <br>
              <div class="forgot">
                <a href="https://getlinky.com/reset">Forgot Password?</a>
              </div>
            </form>
            <p v-if='inputErrors'>
              Error with login info
            </p>
          </div>
        </section>
    </div>
  </div>
</template>

<script>
/* globals chrome */
import axios from 'axios'
import { focus } from 'vue-focus'
import config from './config.js'

const baseURL =
  config.isDebug
  ? 'http:localhost:8000'
  : 'https://getlinky.com'

const storage =
  typeof chrome.storage.sync !== 'undefined'
  ? chrome.storage.sync
  : chrome.storage.local

export default {
  directives: {
    focus,
  },
  name: 'Login',
  data () {
    return {
      emailFocused: true,
      inputErrors: false,
      authenticated: false,
    }
  },
  methods: {
    login () {
      const credentials = {'email': this.email, 'password': this.password}
      axios.post(baseURL + '/rest-auth/login/', credentials)
        .then(response => {
          console.info('login successful')
          storage.set({'token': response.data.key})
          this.inputErrors = false
          this.authenticated = true
          this.password = ''
        })
        .catch(error => {
          console.warn('problem logging in', error)
          this.authenticated = false
          this.inputErrors = true
          this.password = ''
        })
    },
    logout () {
      // Note: empty data payload needed for axios to send the headers as headers
      storage.get('token', token => {
        axios.post(baseURL + '/rest-auth/logout/', {}, {headers: {'Authorization': 'Token ' + token.token}})
          .then(response => {
            console.info('logged out')
            this.authenticated = false
          })
          .catch(error => {
            console.warn('Problem logging out user.', error)
          })
      })
    },
  },
  mounted () {
    console.log('mounted')
    storage.get('token', token => {
      axios.get(baseURL + '/api/users/me/',
        {headers: {'Authorization': 'Token ' + token.token}})
        .then(response => {
          console.info('User authenticated')
          this.authenticated = true
        })
        .catch(error => {
          console.warn('Problem authenticating user.', error)
          this.authenticated = false
        })
    })
  },
}
</script>

<style lang="scss">
body {
  color: #444;
  font-family: georgia, serif;
  font-size: 18px;
}

.container {
  display: flex;
  justify-content: center;
  margin-left: 5px;
}

.success {
  color: #468966;
}

a {
  text-decoration: underline;
  cursor: pointer;
}


label {
  display: inline-block;
}

.title {
  margin-left: .5rem;
  font-style: italic;
  font-size: 1.5rem;
  margin-top: 0rem;
  margin-bottom: 0rem;

  a {
    color: inherit;
    text-decoration: none;
  }
}

h1 {
  font-size: 2rem;

}
</style>
