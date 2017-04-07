<template>
  <div>
    <slot></slot>
    <linky-extended-notification></linky-extended-notification>
  </div>
</template>

<script>
import linkyExtendedNotification from './ExtendedNotification.vue'

export default {
  name: 'Base',
  components: {
    linkyExtendedNotification,
  },
  computed: {
    background () {
      return this.$store.state.background
    },
  },
  mounted () {
    document.getElementsByTagName('body')[0].className = this.background
  },
}
</script>

<style lang="scss">

body {
  // disable default margin of browser
  margin: 0;
  margin-bottom: 10px;
}

.nanobar {
  width: 100%;
  height: 3px;
  z-index: 9999;
  top:0
}

.bar {
  width: 0;
  height: 100%;
  transition: height .3s;
  background: lightgray;
}
</style>
