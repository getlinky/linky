<template>
  <div>

    <linky-nav>
      <a id="add-icon" @click='showAdd = true' class="icon">+</a>
      <a @click="refreshList" class="icon">🔄</a>
      <a id="settings-icon" @click='showSettings = true' class="icon">⚙</a>
      <a v-if="authenticated" @click='logout'>Logout</a>
      <router-link to="/login" v-else>Login</router-link>
    </linky-nav>

    <nav class="list-options">
      <div class="search-option-section">
        <a class="icon">🔍</a>
        <input class="search" @focusin="searchActive" @blur="doneSearching" id="search" placeholder="search" type="search" v-model="query">
      </div>
      <div class="list-archive-option-section">
        <!-- FIXME -->
        <router-link :class="{ inactive: parentName !== 'list' }" to="/list">List</router-link>
        <router-link :class="{ inactive: parentName !== 'archive' }" to="/archive">Archive</router-link>
      </div>
    </nav>

    <ul class="link-container">
      <slot></slot>
    </ul>

    <helpModal :show="showHelp" @close="showHelp = false"></helpModal>
    <showSettingsModal :show="showSettings" @closed="showSettings = false"></showSettingsModal>
    <addLinkModal :show="showAdd" @closed="showAdd = false"></addLinkModal>
  </div>
</template>

<script>

import linkyNav from './LinkyNav.vue'
import helpModal from './helpModal.vue'
import showSettingsModal from './showSettingsModal.vue'
import addLinkModal from './addLinkModal.vue'

import list_nav from '../nav.js'
list_nav()

export default {
  name: 'list-base',
  components: {
    linkyNav,
    addLinkModal,
    showSettingsModal,
    helpModal,
  },
  data () {
    return {
      query: '',
      showAdd: false,
      showSettings: false,
      showHelp: false,
      searching: false,
    }
  },
  props: {
    parentName: {
      type: String,
      required: true,
    }
  },
  mounted() {
    this.$store.dispatch('refreshLinks')
    document.addEventListener('paste', this.pasteHandler)
  },
  beforeDestroy () {
    document.removeEventListener('paste', this.pasteHandler)
  },
  computed: {
    authenticated () {
      return this.$store.state.user.authenticated
    },
  },
  methods: {
    refreshList() {
      this.$store.dispatch('refreshLinks')
    },
    logout() {
      this.$store.dispatch('logout').then(this.$router.replace('/'))
    },
    pasteHandler (e) {
      const paste = e.clipboardData.getData('text')
      if (paste.length > 0 && this.$store.state.errors.addLink == null && !this.searching && !this.showAdd && !this.showHelp && !this.showSettings) {
        this.$store.dispatch('addLink', paste).then(console.log('Added link from paste'))
      }
    },
    searchActive () {
      this.searching = true
    },
    doneSearching () {
      this.searching = false
    },
  },
}

</script>

<style lang='scss'>

$font-family: georgia, serif;
$base-font-size: 18px;

$text-gray: #444;
$max-width-main-content: 40em;

// background colors
$sepia: #f8f2e3;
$grayblack: #3c3c3c;

$light-gray: #eee;
html {
  color: $text-gray;
  font-family: $font-family;
  font-size: $base-font-size;
  // background-color: $sepia;
}

body {
  // disable default margin of browser
  margin: 0;
}

a {
  color: inherit;
}

form {
  margin-bottom: 0;
}

.link-container {
  list-style-type: none;
  margin: 0 auto;
  max-width: 40em;
  overflow-wrap: break-word;
  padding-top: 0;
  margin-bottom: .5rem;
}

// styling for search <input>
.search {
  border-top: 0;
  border-left: 0;
  border-right: 0;
  border-bottom-style: solid;
  border-bottom-color: lightgray;
  width: 60%;
  outline: none;
  height: 1.5rem;
  transition: border 300ms ease-out;

  &::placeholder {
    font-style: italic;

  }

  &:disabled {
    color: lightgray;
    border-radius: 5px;
    background-image: repeating-linear-gradient(
    45deg,
    lightgray,
    lightgray 10px,
    white 10px,
    white 20px
    );
  }

  &:focus {
    border-color: $text-gray;
  }

}

input {
  font-size: 1rem;
  font-family: $font-family;

  &:disabled {
    color: lightgray;
    background-color: yellow;
  }
}

.main-nav {
  background: $light-gray;

  a {
    padding: .5rem .5rem;
    color: inherit;
    text-decoration: none;

    &:hover {
      color: lighten($text-gray, 10%);
    }

    &:not(:first-child) {
      margin-left: .5rem;
    }

  }

  .icon {
    font-size: 1.5rem;
  }

  h1 {
    margin-bottom: 0;
    margin-top: 0;
  }

  .title {
    font-style: italic;
  }

  .items {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
}

// list, archive, or search
.list-options {
  margin: 0 auto;
  max-width: $max-width-main-content;
  display: flex;
  justify-content: space-between;

  a {
    padding: 1rem .5rem;
    color: inherit;
    text-decoration: none;
    font-weight: bold;

    &:hover {
      color: lighten($text-gray, 10%);
    }

    &:not(:first-child) {
      margin-left: .5rem;
    }
  }

  .inactive {
    color: lighten($text-gray, 30%);
    font-style: italic;

    &:hover {
      color: lighten($text-gray, 20%);
    }
  }

  .search-option-section {
    width: 100%;
    display: flex;
    align-items: center;
  }

  .list-archive-option-section {
    display: flex;
    align-items: center;
  }

}
</style>
