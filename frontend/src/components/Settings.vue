<template>
  <linky-base>
    <linky-nav>
      <router-link tabindex="1" to="/list">List</router-link>
      <router-link tabindex="1" to="/archive">Archive</router-link>
      <a v-if="authenticated" tabindex="1" @click='logout'>Logout</a>
      <router-link tabindex="1" to="/login" v-else>Login</router-link>
    </linky-nav>
  <div class="content">
    <div class="container">
      <div class="item">
        <h1>Password</h1>
        <form @submit.prevent="updatePassword">
          <label>Old Password
            <input type="password" v-model="oldPassword" required>
          </label>
          <label>New Password
            <input type="password" v-model="newPassword1" required>
          </label>
          <label><i>Again</i>
            <input type="password" v-model="newPassword2" required>
          </label>
          <input class="button" type="submit" value="Update Password">
        </form>
        <linky-error-display :errors="errors.updatePassword"></linky-error-display>
      </div>

      <div class="item">
        <h1>Email</h1>
        <form @submit.prevent="updateEmail">
          <label>Email
            <input type="email" placeholder="name@example.com" v-model="updatedEmail" required>
          </label>
          <input class="button" type="submit" value="Update Email Address">
        </form>
        <linky-error-display :errors="errors.updateEmail"></linky-error-display>
      </div>

      <div class="item">
        <h1>Change Background</h1>
        <linky-background-chooser></linky-background-chooser>
      </div>

      <div class="item">
        <h1>Misc</h1>
        <a @click="exportLinks">Export Saved Links</a>
      </div>
    </div>
  </div>
  </linky-base>
</template>

<script>
import linkyBase from './Base.vue'
import linkyNav from './Nav.vue'
import linkyBackgroundChooser from './BackgroundChooser.vue'
import linkyErrorDisplay from './ErrorDisplay.vue'

import axios from 'axios'

export default {
  name: 'settings',
  components: {
    linkyBase,
    linkyNav,
    linkyBackgroundChooser,
    linkyErrorDisplay,
  },
  data () {
    return {
      oldPassword: '',
      newPassword1: '',
      newPassword2: '',
      updatedEmail: this.$store.state.user.email,
      errors: {
        updatePassword: {},
        updateEmail: {},
      },
    }
  },
  computed: {
    authenticated () {
      return this.$store.state.user.authenticated
    },
  },
  methods: {
    logout () {
      this.$store.commit('setLoadingProgress', 30)
      axios.post('/rest-auth/logout/', {},
        {headers: {'Authorization': 'Token ' + localStorage.getItem('token')}})
      .then(response => {
        console.info('logged out')
        this.$store.commit('logout')
        this.$router.replace('/login')
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
    updatePassword () {
      const data = {
        'old_password': this.oldPassword,
        'new_password1': this.newPassword1,
        'new_password2': this.newPassword2,
      }
      axios.post('/rest-auth/password/change/', data, {headers: {'Authorization': 'Token ' + localStorage.getItem('token')}})
      .then(response => {
        console.info('Updated password')
        this.$store.commit('notify', {'message': 'Updated Password', 'level': 'info'})
      })
      .catch(error => {
        console.warn('Problem updating password.', error)
        this.errors.updatePassword = error.response.data
        this.$store.commit('notify', {'message': 'Problem Updating Password', 'level': 'warning', 'sticky': true})
      })
      this.oldPassword = ''
      this.newPassword1 = ''
      this.newPassword2 = ''
    },
    updateEmail () {
      axios.patch('/api/users/me/', {'email': this.updatedEmail},
        {headers: {'Authorization': 'Token ' + localStorage.getItem('token')}})
        .then(response => {
          console.info('Email updated')
          this.$store.commit('notify', {'message': 'Updated Email Address', 'level': 'info'})
          this.$store.commit('updateEmail', this.updatedEmail)
        })
        .catch(error => {
          console.warn('Couln\'t update email address', error)
          this.$store.commit('notify', {'message': 'Problem Updating Email Address', 'level': 'warning', 'sticky': true})
          this.errors.updateEmail = error.response.data
        })
    },
    saveFile (data) {
      let link = document.createElement('a')
      let file = new File([JSON.stringify(data)], 'filename', {type: 'text/plaintext', lastModified: Date.now()})
      link.href = URL.createObjectURL(file)
      link.download = 'linky-export.json'
      link.click()
    },
    exportLinks () {
      console.info('Exporting of links is to be implemented')
      axios.get('/api/links/', {headers: {'Authorization': 'Token ' + localStorage.getItem('token')}})
      .then(response => {
        this.saveFile(response.data)
        this.$store.commit('notify', {'message': 'Exported Links', 'level': 'info'})
      }, error => {
        console.warn('Problem exporting links.', error)
        this.$store.commit('notify', {'message': 'Problem Exporting Links', 'level': 'warning'})
      })
    },
  },
}
</script>

<style lang="scss" scoped>
@import '../styles/_partials.scss';

.content {
  display: flex;
  justify-content: center;

  .container {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    padding-left: 10px;
    padding-right: 10px;

    .item {
      flex-basis: max-content;
      padding-left: 2em;

      a {
        text-decoration: underline;
      }
    }
  }
}


h1 {
  font-size: 1.5em;
}
form {
  width: 200px;
}
</style>
