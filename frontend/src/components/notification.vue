<template>
  <transition name="fade">
  <div v-show="show" class="note" :class="position + ' ' + level">
    <span v-if="html" v-html="message"></span>
    <span v-else class="message">{{ message }}</span>
    <a v-if="button" class="close" @click="closed">✕</a>
  </div>
  </transition>
</template>

<script>
export default {
  name: 'notification',
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
      default: true,
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
  mounted () {
    if (!this.sticky) {
      this.timer = setTimeout(() => this.closed(), this.duration)
    }
  },
}
</script>

<style lang="scss" scoped>
$font-size: 1.25em;
$font-family: Helvetica Neue, sans-serif;
$line-height: 3em;
$button-size: 25px;

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}

.note {
  font-family: $font-family;
  font-size: $font-size;
  position: fixed;
  z-index: 101;
  width: 100%;
  text-align: center;
  line-height: $line-height;
  // box-shadow: 0 0 1px black;

  .close {
    position: absolute;
    right: $button-size;
    // Keep button vertically centered when line-height changes
    // top: ($font-size * $line-height - $button-size * 1em) / 2em;
    top: $font-size;
    height: $button-size;
    width: $button-size;
    line-height: $button-size;
    border-radius: $button-size;
    background-color: rgba(0, 0, 0, 0.2);
    color: white;
  }
}
.top {
  top: 0;
}
.bottom {
  bottom: 0;
}
.success {
  background: #468966;
  color: white;
}
.info {
  background: #1695A3;
  color: white;
}
.warning {
  background: #EB7F00;
  color: white;
}
.danger {
  background: #B64926;
  color: white;
}
</style>
