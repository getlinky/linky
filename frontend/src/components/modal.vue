<template>
  <transition name="fade">
    <div class="modal-container" v-show="show">
        <div class="modal-inner">
            <div class="modal">
                <nav>
                    <slot name='header'></slot>
                    <h1>
                        <a class="close" @click="$emit('closed')">✕</a>
                    </h1>
                </nav>
            <slot name='body'></slot>
        </div>
    </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'Modal',
  props: {
    show: {
      type: Boolean,
      required: true,
    },
  },
  mounted () {
    document.addEventListener('keydown', this.keydownListener)
  },
  methods: {
    keydownListener (event) {
      if (this.show) {
        const is_esc_key = event.keyCode === 27
        const is_terminal_esc = event.keyCode === 219 && event.ctrlKey
        if (is_esc_key || is_terminal_esc) {
          this.$emit('closed')
        }
      }
    },
  },
  beforeDestroy () {
    document.removeEventListener('keydown', this.keydownListener)
  },
}
</script>

<style lang='scss'>
.fade-enter-active, .fade-leave-active {
  transition: opacity .2s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}

$light-gray: #eee;
$text-gray: #444;

a {
  cursor: pointer
}

.modal-container {
  background: rgba(0, 0, 0, .7);
  bottom: 0;
  display: flex;
  outline: 0;
  overflow-x: hidden;
  overflow-y: auto;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 10;
  color: $text-gray;
}

.modal-inner {
  box-sizing: border-box;
  margin: auto;
  position: relative;
  min-width: 320px;
  width: 50%;
}

.modal {
  background-color: $light-gray;
  border-radius: 5px;
  padding-top: 0;
  padding-bottom: 1rem;
  padding-left: 1rem;
  padding-right: 1rem;

  ul {
    margin: 0;
    list-style: none;
    padding: 0;
  }

  nav {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    h1 {
      padding: 0;
    }

    a {
      text-decoration: none;
      color: inherit;
    }

    .close {
      font-size: 1.5rem;
    }
  }

  input {
    width: 100%;
    font-size: 1rem;
    margin-bottom: .5rem;
  }
}
</style>

