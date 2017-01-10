<template>
  <transition name="fade">
  <div v-if="show" class="note" :class="position + ' ' + level">
    <span v-if="html" v-html="message"></span>
    <span v-else class="message">{{ message }}</span>
    <a v-if="button && sticky" class="close" @click="closed">✕</a>
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
    show () {
      if (this.show) {
        this.timer = setTimeout(() => this.closed(), this.duration)
      }
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
$font-family: Helvetica Neue, sans-serif;

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}

.note {
  font-family: $font-family;
  position: fixed;
  z-index: 101;
  text-align: center;
  left: 0;
  right: 0;
  font-size: 1.3em;
  padding: 15px 80px;
  user-select: none;

  .close {
    position: absolute;
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
  .note {
    font-size: 1em;
    padding: 12px 25px;

    .close {
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
  .note {
    font-size: .8em;
    padding: 15px 25px 15px 10px;

    .close {
      font-size: .8em;
      height: 20px;
      line-height: 20px;
      right: 5px;
      top: 5px;
      width: 20px;
    }
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
