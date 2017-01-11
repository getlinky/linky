<template>
  <div>
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
            <input type="text" v-model="newPassword1" required>
          </label>
          <label><i>Again</i>
            <input type="text" v-model="newPassword2" required>
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
  </div>
</template>

<script>
import linkyNav from './LinkyNav.vue'
import background from './background.vue'
import linkyNotification from './linkyNotification.vue'

export default {
  name: 'settings',
  components: {
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
    },
    updatePassword () {
      const data = {
        'old_password': this.oldPassword,
        'new_password1': this.newPassword1,
        'new_password2': this.newPassword2,
      }
      this.$store.dispatch('updatePassword', data)
    },
    updateEmail () {
      this.$store.dispatch('changeEmailAddress', this.updatedEmail)
    },
    progress (event) {
      console.log(event)
    },
    exportLinks () {
      console.info('Exporting of links is to be implemented')
      this.$store.commit('notify', {'message': 'Exporting Links', 'level': 'info'})
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
