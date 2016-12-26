<template>
  <div id="app">
    <my-nav></my-nav>
    <hello></hello>
  </div>
</template>

<script>
import Hello from './components/Hello.vue'
import nav from './components/nav.vue'

export default {
  name: 'app',
  components: {
      Hello,
      my-nav : nav
  }
}
</script>
