<template>
  <list-base parentName='archive'>
    <template v-if="archive_items.length > 0">
      <linky-link
        v-for="item in archive_items"
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

import { compareDateStrings } from '../utilities.js'

export default {
  name: 'archive',
  components: {
    linkyLink,
    listBase,
  },
  computed: {
    archive_items () {
      return this.$store.state.links
        .filter(x => x.archived)
        .sort((x, y) => compareDateStrings(x.last_updated, y.last_updated))
        .reverse()
    },
  },
}
</script>
