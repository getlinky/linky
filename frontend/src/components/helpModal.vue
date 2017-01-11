<template>
  <modal :show='show' @closed='closeModal'>
      <h1 slot='header'>Key Binds</h1>
      <ul slot="body">
        <li><kbd>j</kbd> or <kbd>ctrl-n</kbd> — down</li>
        <li><kbd>k</kbd> or <kbd>ctrl-p</kbd> — up</li>
        <li><kbd>l</kbd> — switch right list (wraps)</li>
        <li><kbd>h</kbd> — switch left list (wraps)</li>
        <li><kbd>a</kbd> — archive current item (or unarchive)</li>
        <li><kbd>#</kbd> — delete current item</li>
        <li><kbd>e</kbd> — edit current item</li>
        <li><kbd>/</kbd> — search</li>
        <li><kbd>?</kbd> — toggle help menu</li>
        <li><kbd>esc</kbd> — close current menu</li>
        <li><kbd>{{ super_key }}-c</kbd> or <kbd>y</kbd> — copy link to clipboard</li>
        <li><kbd>{{ super_key }}-v</kbd> — add link from clipboard</li>
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
        required: true,
      },
    },
    mounted () {
      this.$nextTick(function () {
        document.addEventListener('keydown', e => {
          const active_element = document.activeElement.tagName.toLowerCase()
          if (active_element === 'input') return

          const is_slash_key = e.keyCode === 191
          const is_question_mark = is_slash_key && e.shiftKey
          if (is_question_mark) {
            if (this.show) {
              this.closeModal()
            } else {
              this.showModal()
            }
          }
        })
      })
    },
    components: {
      modal,
    },
    methods: {
      closeModal () {
        this.$emit('closed')
      },
      showModal () {
        this.$emit('show')
      },
    },
    computed: {
      super_key () {
        const is_mac = navigator.platform.toUpperCase().indexOf('MAC') > -1
        return is_mac ? 'cmd' : 'ctrl'
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
