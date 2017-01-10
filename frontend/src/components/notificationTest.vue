<template>
  <div class="notify">
    <notification
      :level="level"
      :button="button"
      :message="message"
      :duration="duration"
      :html="html"
      :position="position"
      :sticky="sticky"
      :theme="theme"
      :show="show"
      @closed="closed">
    </notification>

    <h1>Notification testing</h1>
    <label>Level:
      <select v-model="l_level">
        <option v-for="item in levels">{{item}}</option>
      </select>
    </label>
    <br>
    <label>Button <input type="radio" value="true" v-model="l_button"></label>
    <br>
    <label>No Button <input type="radio" value="false" v-model="l_button"></label>
    <br>
    <label>Message:
    <br>
    <input type="text" v-model="l_message" style="width: 300px;"></label>
    <br>
    <label>Duration <input type="number" v-model="l_duration"></label>
    <br>
    <label>Enable HTML <input type="radio" value="true" v-model="l_html"></label>
    <br>
    <label>Disable HTML <input type="radio" value="false" v-model="l_html"></label>
    <br>
    <label>Position Top <input type="radio" value="top" v-model="l_position"></label>
    <br>
    <label>Position Bottom <input type="radio" value="bottom" v-model="l_position"></label>
    <br>
    <label>Enable Sticky <input type="radio" value="true" v-model="l_sticky"></label>
    <br>
    <label>Disable Sticky <input type="radio" value="false" v-model="l_sticky"></label>
    <br>
    <label> Theme
      <select v-model="l_theme">
        <option value="pure">Pure</option>
        <option value="pastel">Pastel</option>
        <option value="prime">Prime</option>
        <option value="pitchy">Pitchy</option>
      </select></label>
    <br>
    <button type="button" @click="notify">Launch Notification</button>
    <br>
  </div>
</template>

<script>
import notification from './notification.vue'

export default {
  name: 'notificationTest',
  components: {
    notification,
  },
  data () {
    return {
      l_show: true,
      levels: ['info', 'success', 'warning', 'danger'],
      l_level: 'info',
      l_button: 'true',
      l_message: 'Notification testing message',
      l_duration: 4000,
      l_position: 'bottom',
      l_sticky: 'false',
      l_theme: 'pure',
      l_html: 'false',
    }
  },
  computed: {
    level () {
      return this.$store.state.notification.level
    },
    message () {
      return this.$store.state.notification.message
    },
    button () {
      return this.$store.state.notification.config.button
    },
    duration () {
      return this.$store.state.notification.config.duration
    },
    position () {
      return this.$store.state.notification.config.position
    },
    sticky () {
      return this.$store.state.notification.config.sticky
    },
    theme () {
      return this.$store.state.notification.config.theme
    },
    html () {
      return this.$store.state.notification.config.html
    },
    show () {
      return this.$store.state.notification.show
    },
  },
  methods: {
    closed () {
      this.$store.commit('notificationClosed')
    },
    notify () {
      let button = this.l_button != null ? this.l_button.toLowerCase() === 'true' : false
      let sticky = this.l_sticky != null ? this.l_sticky.toLowerCase() === 'true' : false
      let html = this.l_html != null ? this.l_html.toLowerCase() === 'true' : false
      const data = {
        'level': this.l_level,
        'message': this.l_message,
        'button': button,
        'duration': this.l_duration,
        'position': this.l_position,
        'sticky': sticky,
        'theme': this.l_theme,
        'html': html,
      }
      this.$store.commit('notify', data)
    },
  },
}
</script>

<style lang="scss">
  .notify {
    text-align: center;
  }
</style>
