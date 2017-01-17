<template>
  <transition v-if="!isFirefox" name="fade">
    <div v-if="show" class="linky-note linky-bottom" :class="'linky-'+level">
      <span v-if="html" v-html="message"></span>
      <span v-else >{{ message }}</span>
      <a v-if="button" class="linky-close" @click="closed">✕</a>
    </div>
  </transition>
  <div v-else>
    <div v-if="show" class="linky-note linky-bottom" :class="'linky-'+level">
      <span v-if="html" v-html="message"></span>
      <span v-else >{{ message }}</span>
      <a v-if="button" class="linky-close" @click="closed">✕</a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Notification',
  props: {
    button: {
      type: Boolean,
      default: true,
    },
    duration: {
      type: Number,
      default: 4000,
    },
    html: {
      type: Boolean,
      default: false,
    },
    level: {
      type: String,
      default: 'info',
    },
    message: {
      type: String,
      required: true,
    },
    position: {
      type: String,
      default: 'bottom',
    },
    show: {
      type: Boolean,
      required: true,
    },
    sticky: {
      type: Boolean,
      default: false,
    },
    theme: {
      type: String,
      default: 'pure',
    },
  },
  methods: {
    closed () {
      this.$emit('closed')
      clearTimeout(this.timer)
    },
  },
  watch: {
    propData () {
      if (this.show && !this.sticky) {
        clearTimeout(this.timer)
        if (!this.sticky) {
          this.timer = setTimeout(() => this.closed(), this.duration)
        }
      }
    },
  },
  beforeDestroy () {
    this.closed()
  },
  computed: {
    propData () {
      return {
        'duration': this.duration,
        'button': this.button,
        'html': this.html,
        'level': this.level,
        'sticky': this.sticky,
        'message': this.message,
        'position': this.position,
        'theme': this.theme,
        'show': this.show,
      }
    },
    isFirefox () {
      return navigator.userAgent.indexOf('Firefox') > 0
    },
  },
}
</script>

<style lang="scss" scoped>
.linky-fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.linky-fade-enter, .fade-leave-to {
  opacity: 0;
}

.linky-note {
  font-family: georgia, serif;
  font-style: italic;
  font-weight: bold;
  position: fixed;
  z-index: 101;
  text-align: center;
  left: 0;
  right: 0;
  font-size: 1.3em;
  padding: 15px 80px;
  user-select: none;

  .linky-close {
    position: absolute;
    font-style: normal;
    font-family: sans-serif;
    top: 15px;
    right: 25px;
    height: 30px;
    width: 30px;
    border-radius: 15px;
    box-shadow: inset 0px 0px 5px 5px black;
    font-size: .8em;
    font-weight: bold;
    line-height: 30px;
    color: rgba(255, 255, 255, .8);
    background-color: rgba(0, 0, 0, 0.6);
    opacity: .2;
  }
}

@media only screen and (max-width : 600px) {
  .linky-note {
    font-size: 1em;
    padding: 12px 25px;

    .linky-close {
      font-size: .8em;
      height: 20px;
      line-height: 20px;
      right: 5px;
      top: 5px;
      width: 20px;
    }
  }
}

@media only screen and (max-width : 400px) {
  .linky-note {
    font-size: .8em;
    padding: 15px 25px 15px 10px;

    .linky-close {
      font-size: .8em;
      height: 20px;
      line-height: 20px;
      right: 5px;
      top: 5px;
      width: 20px;
    }
  }
}

.linky-bottom {
  bottom: 0;
}
.linky-success {
  background: #468966;
  color: white;
}
.linky-info {
  background: #1695A3;
  color: white;
}
.linky-warning {
  background: #EB7F00;
  color: white;
}
.linky-danger {
  background: #B64926;
  color: white;
}
</style>
