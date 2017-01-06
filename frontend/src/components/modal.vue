<template>
    <div class="modal-container" @click.self="$emit('closed')" v-show="show">
        <div class="modal-inner">
            <div class="modal">
                <nav>
                      <slot name='header'></slot>
                    <h1>
                        <a class="close" @click.self="$emit('closed')">✕</a>
                    </h1>
                </nav>
            <slot name='body'></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: 'modal',
    props: {
        show: {
            type: Boolean,
            required: true
        }
    },
  data () {
    return {
      esc: false,
      ctrl: false,
      bracket: false,
    }
  },
  mounted () {
    document.addEventListener('keydown', this.keydownListener)
    document.addEventListener('keyup', this.keyupListener)
  },
  methods: {
    keydownListener (event) {
      if (event.keyCode === 27) {
        this.esc = true
      }
      if (event.keyCode === 17) {
        this.ctrl = true
      }
      if (event.keyCode === 221) {
        this.bracket = true
      }
      if (this.show) {
        if (this.esc) {
          this.$emit('closed')
          return
        }
        if (this.ctrl && this.bracket) {
          this.$emit('closed')
        }
      }
    },
    keyupListener (event) {
      if (event.keyCode === 27) {
        this.esc = false
      }
      if (event.keyCode === 17) {
        this.ctrl = false
      }
      if (event.keyCode === 221) {
        this.bracket = false
      }
    },
  },
  beforeDestroy () {
    document.removeEventListener('keydown', this.keydownListener)
    document.removeEventListener('keyup', this.keyupListener)
  },
}
</script>

<style lang='scss'>
$light-gray: #eee;

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

