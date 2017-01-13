<template>
  <linky-modal :show='show || errors !== null' @closed='closeModal'>
    <h1 slot='header'>Add Item</h1>
    <form slot='body' action="" method="post" @submit.prevent.once='addLink(url)'>
      <input type='url' placeholder='https://example.com' required v-focus="urlFocused" v-model='url'>
      <input type='submit' value='Add'>
        <pre v-if="errors !== null"> {{ errors }}</pre>
    </form>
  </linky-modal>
</template>

<script>
import linkyModal from './Modal.vue'
import { focus } from 'vue-focus'

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
      urlFocused: true,
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
    addLink (url) {
      this.$store.dispatch('addLink', url)
      this.url = ''
      this.$emit('closed')
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
  },
}
</script>
