<template>
  <modal :show='show || errors !== null' @closed='closeModal'>
    <h1 slot='header'>Add Item</h1>
    <form slot='body' action="" method="post" @submit.prevent.once='addLink(url)'>
      <input type='url' placeholder='https://example.com' required v-focus="urlFocused" v-model='url'>
      <input type='submit' value='Add'>
        <pre v-if="errors !== null"> {{ errors }}</pre>
    </form>
  </modal>
</template>

<script>
import modal from './modal.vue'
import { focus } from 'vue-focus'

export default {
  name: 'addLinkModal',
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
  },
  components: {
    modal,
  },
}
</script>
