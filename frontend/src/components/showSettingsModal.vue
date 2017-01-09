<template>
  <modal :show="show || errors !== null" @closed="closeModal">
      <h1 slot="header">Settings</h1>
      <div slot="body">
        <form action="" method="post" @submit.prevent="updateEmail(updatedEmail)">
          <label for="email" >Email</label>
          <input name="email" type="email" placeholder="name@example.com" required v-focus="emailFocused" v-model="updatedEmail">
          <input name="update" type="submit" value="update">
          <pre v-if="errors !== null">{{errors}}</pre>
        </form>
        <p><a href="">Download Links</a></p>
        <p><a href="">Password Reset</a></p>
      </div>
    </modal>
</template>

<script>
  import modal from './modal.vue'
  import { focus } from 'vue-focus'

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
        document.addEventListener('keydown', e => {
          e.preventDefault();
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
        emailFocused: true,
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
    },
  }
</script>
