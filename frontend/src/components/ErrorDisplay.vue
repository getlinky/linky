<template>
  <transition name="fade">
    <template v-for="(field, name) in errors" v-if="field.length > 0">
      <p class="warning">
        {{ name | normalize }}: <template v-for="error in field">{{ error }} </template>
        </p>
    </template>
  </transition>
</template>

<script>
import { normalize } from '../utilities.js'

export default {
  props: {
    errors: {
      type: Object,
      required: true,
    },
  },
  filters: {
    normalize,
  },
}
</script>

<style lang="scss" scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}

p {
  font-size: 1em;
  font-style: normal;
  font-weight: normal;
}
</style>
