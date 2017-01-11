<template>
  <modal :show="show" @closed="closeModal">
      <h1 slot="header">Settings</h1>
      <div slot="body">
        <background></background>
        <router-link to="/settings">Account Settings</router-link>
      </div>
  </modal>
</template>

<script>
  import modal from './modal.vue'
  import background from './background.vue'

  export default {
    name: 'showSettingsModal',
    components: {
      modal,
      background,
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
    methods: {
      closeModal () {
        this.$emit('closed')
      },
      showModal () {
        this.$emit('show')
      },
    },
  }
</script>
