<template>
  <notification :message="message" :level="level" :show="showNotification" @closed="closed"></notification>
</template>

<script>
import notification from './notification.vue'

export default {
  name: 'linkyNotification',
  computed: {
    message () {
      return this.$store.state.notification.message
    },
    level () {
      return this.$store.state.notification.level
    },
    showNotification () {
      return this.$store.state.notification.show
    },
  },
  components: {
    notification,
  },
  methods: {
    closed () {
      this.$store.commit('notificationClosed')
    },
  },
}
</script>

