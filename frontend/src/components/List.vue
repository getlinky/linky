<template>
  <list-base parentName='list'>
    <template v-if="list_items.length > 0">
      <linky-link
        v-for="item in list_items"
        :li='item'>
      </linky-link>
    </template>
    <li v-else>
      No links found.
      <pre>{{ list_items }}</pre>
    </li>
  </list-base>
</template>

<script>
import axios from 'axios'

import linkyLink from './LinkyLink.vue'
import listBase from './ListBase.vue'


const compareValues = (a, b) => {
  if (a > b) {
    return 1
  }
  if (a < b) {
    return -1
  }
  return 0
}


export default {
  name: 'list',
  components: {
    linkyLink,
    listBase
  },
  computed: {
    list_items() {
      return this.$store.state
        .links
        .filter(x => !x.archived)
        .sort((x, y) => compareValues(x.last_updated, y.last_updated))
        .reverse()
    },
  },
}
</script>
