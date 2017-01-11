<template>
  <modal :show="show || errors !== null" @closed="closeModal">
      <h1 slot="header">Settings</h1>
      <div slot="body">
        <form action="" method="post" @submit.prevent="updateEmail(updatedEmail)">
          <label for="email" >Email</label>
          <input name="email" type="email" placeholder="name@example.com" required v-model="updatedEmail">
          <input name="update" type="submit" value="update">
          <pre v-if="errors !== null">{{errors}}</pre>
        </form>
        <p><a href="">Download Links</a></p>
        <h2>Change Password <button type="button" @click="showPasswords = !showPasswords">show passwords</button></h2>
        <form @submit.prevent="updatePassword">
          <label>Old Password
            <input v-if="showPasswords" type="text" v-model="oldPassword" required>
            <input v-else type="password" v-model="oldPassword" required>
          </label>
          <label>New Password
            <input v-if="showPasswords" type="text" v-model="newPassword1" required>
            <input v-else type="password" v-model="newPassword1" required>
          </label>
          <label><i>Again</i>
            <input v-if="showPasswords" type="text" v-model="newPassword2" required>
            <input v-else type="password" v-model="newPassword2" required>
          </label>
          <input type="submit">
        </form>
      </div>
  </modal>
</template>

<script>
  import modal from './modal.vue'

  export default {
    name: 'showSettingsModal',
    components: {
      modal,
    },
    props: {
      show: {
        type: Boolean,
        required: true,
      },
    },
    mounted () {
      this.$nextTick(function () {
        document.addEventListener('keyup', e => {
          const active_element = document.activeElement.tagName.toLowerCase()
          if (active_element === 'input') return

          const is_comma = e.keyCode === 188
          if (is_comma) {
            if (this.show) {
              this.closeModal()
            } else {
              this.showModal()
            }
          }
        })
      })
    },
    data () {
      return {
        updatedEmail: this.$store.state.user.email,
        oldPassword: '',
        newPassword1: '',
        newPassword2: '',
        showPasswords: false,
      }
    },
    directives: {
      focus,
    },
    computed: {
      errors () {
        return this.$store.state.errors.updateEmail
      },
    },
    methods: {
      updateEmail (email) {
        this.$store.dispatch('changeEmailAddress', email)
      },
      closeModal () {
        this.$store.commit('updateEmailErrorsClear')
        this.url = ''
        this.$emit('closed')
      },
      showModal () {
        this.$emit('show')
      },
      updatePassword () {
        let data = {
          'old_password': this.oldPassword,
          'new_password1': this.newPassword1,
          'new_password2': this.newPassword2,
        }
        this.$store.dispatch('updatePassword', data)
      },
    },
  }
</script>

<style lang="scss">
  h1 {
    font-size: 1.5m;
  }
  h2 {
    font-size: 1.2em;
    margin: 0px;
    margin-bottom: .25em;
  }
</style>
