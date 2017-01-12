<template>
  <linky-base>
    <linky-nav>
      <router-link to="/list">List</router-link>
      <router-link to="/archive">Archive</router-link>
      <a v-if="authenticated" @click='logout'>Logout</a>
      <router-link to="/login" v-else>Login</router-link>
    </linky-nav>

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
          <input type="submit" value="Update Password">
        </form>
      </div>

      <div class="item">
        <h1>Email</h1>
        <form @submit.prevent="updateEmail">
          <label>Email
            <input type="email" placeholder="name@example.com" v-model="updatedEmail" required>
          </label>
          <input type="submit" value="Update Email Address">
        </form>
      </div>

      <div class="item">
        <h1>Change Background</h1>
        <background></background>
      </div>

      <div class="item">
        <h1>Misc</h1>
        <a @click="exportLinks">Export Saved Links</a>
      </div>
    </div>
    <linky-notification></linky-notification>
  </linky-base>
</template>

<script>
import linkyBase from './LinkyBase.vue'
import linkyNav from './LinkyNav.vue'
import background from './background.vue'
import linkyNotification from './linkyNotification.vue'

import axios from 'axios'

export default {
  name: 'settings',
  components: {
    linkyBase,
    linkyNav,
    background,
    linkyNotification,
  },
  data () {
    return {
      oldPassword: '',
      newPassword1: '',
      newPassword2: '',
      updatedEmail: this.$store.state.user.email,
    }
  },
  computed: {
    authenticated () {
      return this.$store.state.user.authenticated
    },
  },
  methods: {
    logout () {
      this.$store.dispatch('logout')
      this.$router.replace('/')
    },
    updatePassword () {
      const data = {
        'old_password': this.oldPassword,
        'new_password1': this.newPassword1,
        'new_password2': this.newPassword2,
      }
      this.$store.dispatch('updatePassword', data)
      this.oldPassword = ''
      this.newPassword1 = ''
      this.newPassword2 = ''
    },
    updateEmail () {
      this.$store.dispatch('changeEmailAddress', this.updatedEmail)
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
.container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding-left: 10px;
  padding-right: 10px;
  max-width: 40em;
  margin: 0 auto;

  .item {
    flex-basis: max-content;
    padding-left: .5em;
    a {
      text-decoration: underline;
      &:hover {
        filter: invert(25%);
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
