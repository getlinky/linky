<template>
  <linky-modal :show="show" @closed="closeModal">
      <h1 slot="header">Settings</h1>
      <div slot="body">
        <linky-background-chooser></linky-background-chooser>
        <router-link to="/settings">Account Settings</router-link>
      </div>
  </modal>
</template>

<script>
  import linkyModal from './Modal.vue'
  import linkyBackgroundChooser from './BackgroundChooser.vue'

  export default {
    name: 'showSettingsModal',
    components: {
      linkyModal,
      linkyBackgroundChooser,
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
