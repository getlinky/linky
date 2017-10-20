<template>
  <linky-modal :show='show' @closed='closeModal'>
    <h1 slot='header'>Add Item</h1>
    <form slot='body' action="" method="post" @submit.prevent="addLink">
      <input type='text' placeholder='https://example.com' required v-focus="show" v-model="url">
      <input type='submit' value='Add'>
        <h2 v-if="Object.keys(errors).length > 0">Errors</h2>
       <linky-error-display :errors="errors"></linky-error-display>
    </form>
  </linky-modal>
</template>

<script>
import linkyModal from './modal.vue'
import { focus } from 'vue-focus'

import linkyErrorDisplay from './ErrorDisplay.vue'

export default {
  name: 'AddLinkModal',
  directives: {
    focus,
  },
  props: {
    show: {
      type: Boolean,
      required: true,
    },
  },
  data () {
    return {
      url: '',
    }
  },
  computed: {
    errors () {
      return this.$store.state.errors.addLink
    },
  },
  mounted () {
    this.$nextTick(function () {
      document.addEventListener('keyup', e => {
        const active_element = document.activeElement.tagName.toLowerCase()
        if (active_element === 'input') return

        const c = 67
        if (e.keyCode === c) {
          if (this.show) {
            this.closeModal()
          } else {
            this.showModal()
          }
        }
      })
    })
  },
  methods: {
    addLink () {
      this.$store.dispatch('addLink', this.url)
        .then(() => {
          this.url = ''
          this.$emit('closed')
        })
    },
    closeModal () {
      this.$store.commit('addLinkErrorsClear')
      this.url = ''
      this.$emit('closed')
    },
    showModal () {
      this.$emit('show')
    },
  },
  components: {
    linkyModal,
    linkyErrorDisplay,
  },
}
</script>
