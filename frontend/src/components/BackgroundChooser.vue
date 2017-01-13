<template>
  <div class="container">
    <a tabindex="1" @click="setBackground('white')" @keydown.enter="setBackground('white')" class="item white" :class="{active: background === 'white'}"> White</a>
    <a tabindex="1" @click="setBackground('sepia')" @keydown.enter="setBackground('sepia')" class="item sepia" :class="{active: background === 'sepia'}">Sepia</a>
    <a tabindex="1" @click="setBackground('grayblack')" @keydown.enter="setBackground('grayblack')" class="item grayblack" :class="{active: background === 'grayblack'}">Black</a>
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
$light-gray: #eee;
$sepia: #f8f2e3;
$blue: #0074bf;

.container {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  color: $text-gray;
  user-select: none;

  .item {
    padding: 1em;
    border-radius: 5px;
    border-color: gray;
    border-width: 3px;
    flex-basis: max-content;
    outline: none;
    border-width: 3px;
    border-style: solid;
    border-color: $text-gray;

    a {
      &:focus, &:active {
        border-color: $blue;
        box-shadow: 0 0 5px 1px lighten($blue, 15%);
      }
    }
  }
  .active {
      border-color: $blue;
      box-shadow: 0 0 2px 1px lighten($blue, 5%);
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
