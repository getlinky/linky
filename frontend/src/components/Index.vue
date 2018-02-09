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
    <h1>Save links for later</h1>
    <div class="container">
      <div class="item">
       <img class="max-width-800px w-100" src="static/list.png">
      </div>
      <div class="item register min-width-300px">
        <h2>Register Now</h2>
        <form @submit.prevent="registerUser">
          <label>Email<br>
            <input type="email"
              v-model="email"
              v-focus="focusEmail"
              @blur="focusEmail = false"
              @focus="focusEmail = true"
              placeholder="j.appleseed@leominster.net"
              required>
          </label>
          <br>
          <label>Password<br>
            <input type="password" v-model="password1" placeholder="super secret password" required>
          </label>
          <br>
          <label>Password Again<br>
            <input type="password" v-model="password2" placeholder="super secret password (again)" required>
          </label>
          <br>
          <input class="button" type="submit" value="Register">
        </form>
        <div class="errors">
          <linky-error-display :errors="inputErrors"></linky-error-display>
        </div>
      </div>
    </div>
    <div class='container'>
      <div class="item copy fs-2rem">
        <h2 class='center'>Features</h2>
        <ul class='list-style-none mt-0'>
          <li>Keybinds — breeze through links.</li>
          <li>Efficient to its core.</li>
          <li>Copy and paste links into queue.</li>
          <li><a href="https://github.com/getlinky/linky">Open Source</a></li>
        </ul>
      </div>
    </div>
    <footer class='d-flex ml-4 mr-4 bold justify-content-end'>
    Est. 2016
    </footer>
  </linky-base>
</template>

<script>
import { focus } from 'vue-focus'
import axios from 'axios'
import { normalize } from '../utilities.js'

import linkyBase from './Base.vue'
import linkyNav from './Nav.vue'
import linkyErrorDisplay from './ErrorDisplay.vue'

export default {
  name: 'Index',
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
    linkyErrorDisplay,
  },
  methods: {
    logoutUser () {
      this.$store.commit('setLoadingProgress', 30)
      axios.post('/rest-auth/logout/', {},
        {headers: {'Authorization': 'Token ' + localStorage.getItem('token')}})
      .then(response => {
        console.info('logged out')
        this.$store.commit('logout')
        this.$store.commit('notify', {'message': 'Logged out', 'level': 'success'})
        this.$store.commit('setLoadingProgress', 100)
      })
      .catch(error => {
        this.$store.commit('notify', {'message': 'Problem Logging Out', 'level': 'warning'})
        console.warn('Problem logging out user.', error)
        this.$store.commit('logoutErrors', error)
        this.$store.commit('setLoadingProgress', 0)
      })
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
@import '../styles/_partials.scss';

h1 {
  font-size: 2em;
  text-align: center;
}

.container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;

  .register {
    margin-top: 25px;
  }

  .copy {
    margin-top: 20px;
  }

}

.fs-2rem {
  font-size: 2rem !important;
}

.mt-0 {
  margin-top: 0 !important;
}

@for $i from 0 to 8 {
  .ml-#{$i} {
    margin-left: #{$i/4}rem;
  }

  .mr-#{$i} {
    margin-right: #{$i/4}rem;
  }
}

.bold {
  font-weight: bold;
}

.d-flex {
  display: flex;
}

.justify-content-end {
  justify-content: flex-end;
}

.item {
  flex-basis: max-width;
  margin: 0 10px;
  font-size: 1.25em;

  .center {
    text-align: center;
  }

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

.list-style-none {
  list-style: none;
}

.min-width-300px {
  min-width: 300px;
}

.max-width-800px {
  max-width: 800px;
}

.w-100 {
  width: 100%;
}
</style>
