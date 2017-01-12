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
    </li>
  </list-base>
</template>

<script>
import linkyLink from './LinkyLink.vue'
import listBase from './ListBase.vue'

import { compareDateStrings, search } from '../utilities.js'

export default {
  name: 'list',
  components: {
    linkyLink,
    listBase,
  },
  computed: {
    list_items () {
      return this.$store.state
        .links
        .filter(x => !x.archived)
        .filter(x => search(x, this.$store.state.query))
        .sort((x, y) => compareDateStrings(x.last_updated, y.last_updated))
        .reverse()
    },
  },
}
</script>
