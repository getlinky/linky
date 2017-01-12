<template>
  <div class="container">
  <a @click="setBackground('white')">
    <div class="item white" :class="{active: background === 'white'}">White</div>
  </a>
  <a @click="setBackground('sepia')">
    <div class="item sepia" :class="{active: background === 'sepia'}">Sepia</div>
  </a>
  <a @click="setBackground('grayblack')">
    <div class="item grayblack" :class="{active: background === 'grayblack'}">Black</div>
  </a>
</div>
</template>

<script>
export default {
  computed: {
    background () {
      return this.$store.state.background
    },
  },
  methods: {
    setBackground (color) {
      console.info('Set background', color)
      this.$store.commit('setBackground', color)
    },
  },
}
</script>

<style lang="scss" scoped>
$sepia: #f8f2e3;
$grayblack: #3c3c3c;
$text-gray: #444;

.container {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  // padding-bottom: 10px;
  color: $text-gray;
  user-select: none;

  .item {
    padding: 1em;
    border-radius: 5px;
    border-color: #0074bf;
    border-width: 4px;
    margin: 4px;
    flex-basis: max-content;
    &:active {
      margin: 0px;
      border-style: solid;
    }
  }
  .active {
      margin: 0px;
      border-style: solid;
    }
  .white {
    background-color: white;
  }
  .sepia {
    background-color: $sepia;
  }
  .grayblack {
    background-color: $grayblack;
    color: white;
  }
}
</style>
