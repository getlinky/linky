<template>
  <linky-notification :message="message" :level="level" :show="show" :sticky="sticky" @closed="closed"></linky-notification>
</template>

<script>
import linkyNotification from './Notification.vue'

export default {
  name: 'ExtendedNotification',
  computed: {
    message () {
      return this.$store.state.notification.message
    },
    level () {
      return this.$store.state.notification.level
    },
    show () {
      return this.$store.state.notification.show
    },
    sticky () {
      return this.$store.state.notification.config.sticky
    },
  },
  components: {
    linkyNotification,
  },
  methods: {
    closed () {
      this.$store.commit('notificationClosed')
    },
  },
}
</script>

