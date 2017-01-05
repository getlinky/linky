<template>
  <modal :show='show' @closed='closeModal'>
      <h1 slot='header'>Key Binds</h1>
      <ul slot="body">
        <li><kbd>j</kbd> - down</li>
        <li><kbd>k</kbd> - up</li>
        <li><kbd>l</kbd> - switch right list (wraps)</li>
        <li><kbd>h</kbd> - switch left list (wraps)</li>
        <li><kbd>a</kbd> - archive current item (or unarchive)</li>
        <li><kbd>#</kbd> - delete current item</li>
        <li><kbd>e</kbd> - edit current item</li>
        <li><kbd>/</kbd> - search</li>
        <li><kbd>?</kbd> - toggle help menu</li>
        <li><kbd>esc</kbd> - close current menu</li>
      </ul>
  </modal>
</template>

<script>
  import modal from './modal.vue'

  export default {
    name: 'helpModal',
    props: {
      show: {
        type: Boolean,
        required: true
      }
    },
    components: {
      modal
    },
    methods: {
      closeModal () {
        this.$emit('closed')
      },
    },
  }
</script>

<style lang="scss">
kbd {
  background-color: #f7f7f7;
  border: 1px solid #ccc;
  border-radius: 3px;
  box-shadow: 0 1px 0 rgba(0, 0, 0, .2), 0 0 0 2px #fff inset;
  color: #333;
  display: inline-block;
  font-family: sans-serif;
  font-size: 11px;
  line-height: 1.4;
  margin: 0 .1em;
  padding: .1em .6em;
  text-shadow: 0 1px 0 #fff;
}
</style>
