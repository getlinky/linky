<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'linky-base',
}
</script>

<style lang="scss">
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
