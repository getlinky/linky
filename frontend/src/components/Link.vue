<template>
  <li class="link" tabindex="0"
      @keydown="keybindHandler"
      @focus="addCopyListener"
      @blur="removeCopyListener"
      @mouseover="addCopyListener"
      @mouseout="removeCopyListener">
    <h1>
      <a tabindex="-1" :href="li.url">{{ title | maxLength(120) }}</a>
    </h1>
    <p tabindex="-1">{{ description | maxLength(250) }}</p>
    <a tabindex="-1" v-if="!editing" :href="url">{{ url | normalizeUrl | maxLength(50) }}</a>
    <input v-else v-focus="editing" @keyup.enter="saveChanges" @keydown.esc="cancelChanges" type="text" v-model="url">
    <div class="button-group">
      <button v-if="!editing" @click.once="enableEditing">Edit</button>
      <template v-else>
        <button @click.once="cancelChanges">Cancel</button>
        <button  @click.once="saveChanges">Done</button>
      </template>
      <button name="delete" @click.once="deleteLink">Delete</button>
      <button v-if='li.archived'name="unarchive" @click.once="unarchiveLink">Unarchive</button>
      <button v-else name="archive" @click.once="archiveLink">Archive</button>
    </div>
  </li>
</template>

<script>
import { focus } from 'vue-focus'
import { maxLength, normalizeUrl } from '../utilities.js'

export default {
  name: 'Link',
  props: {
    li: {
      required: true,
      type: Object,
    },
  },
  directives: {
    focus,
  },
  data () {
    return {
      editing: false,
      title: this.li.title,
      description: this.li.description,
      url: this.li.url,
      id: this.li.id,
    }
  },
  computed: {
    link () {
      return this.li
    },
  },
  filters: {
    maxLength,
    normalizeUrl,
  },
  watch: {
    link () {
      this.editing = false
      this.title = this.li.title
      this.description = this.li.description
      this.url = this.li.url
      this.id = this.li.id
    },
  },
  methods: {
    deleteLink () {
      this.$store.dispatch('removeLink', this.id)
    },
    archiveLink () {
      this.$store.dispatch('archiveLink', this.id)
    },
    unarchiveLink () {
      this.$store.dispatch('unarchiveLink', this.id)
    },
    enableEditing () {
      this.editing = true
      this.$store.commit('enableEditing')
    },
    disableEditing () {
      this.editing = false
      this.$store.commit('disableEditing')
    },
    saveChanges () {
      this.disableEditing()
      this.$store.dispatch('changeLinkUrl', {'id': this.id, 'url': this.url})
    },
    cancelChanges () {
      this.disableEditing()
      this.url = this.li.url
    },
    copyHandler (event) {
      const selection = getSelection()
      const isSelection = selection.anchorOffset !== selection.focusOffset
      if (!this.editing && !isSelection) {
        event.clipboardData.setData('text/plain', this.li.url)
        event.preventDefault()
        console.info('Copied link to clipboard.', this.li.url)
        this.$store.commit('notify', {'message': 'Copied Link to Clipboard', 'level': 'info'})
      }
    },
    removeCopyListener () {
      document.removeEventListener('copy', this.copyHandler)
    },
    addCopyListener () {
      document.addEventListener('copy', this.copyHandler)
    },
    keybindHandler (event) {
      if (this.editing) {
        return
      }
      switch (event.keyCode) {
        case 89: {
          // y - copy link
          document.execCommand('copy')
          break
        }
        case 13: {
          // enter - open in current tab
          window.location.href = this.li.url
          break
        }
        case 79: {
          // o - open in new tab
          window.open(this.li.url, '_blank')
          break
        }
        case 51: {
          // shift 3 - delete current item
          if (event.shiftKey) {
            this.deleteLink(this.li.id)
          }
          break
        }
        case 65: {
          // a - (un)archive item
          if (!this.li.archived) {
            this.archiveLink(this.li.id)
          } else {
            this.unarchiveLink(this.li.id)
          }
        }
      }
    },
  },
}
</script>

<style lang="scss" scoped>
@import '../styles/_partials.scss';

$text-gray: #444;
$light-gray: #eee;
$sepia: #f8f2e3;

button {
  font-family: georgia;
  margin-right: 2px;

  &:last-child {
    margin-right: 0px;
  }

}

.link {
  padding-left: 5px;
  padding-bottom: .7em;
  margin-left: 3px;
  line-height: 1.5em;

  &:focus {
    outline: none;
    margin-left: 0px;
    background-color: lighten($light-gray, 3%);
    border-left-style: solid;
    border-left-color: invert($text-gray);
    border-left-width: 3px;
    color: $text-gray;
  }

  &:hover {
    .button-group {
      visibility: visible;
    }
  }

  & > * {
    margin-bottom: 0.5;
  }

  h1 {
    font-size: 1.25em;
  }

  p {
    padding: 0;
    margin: 0;
  }

  a {
    font-style: italic;
  }

  input {
    width: 55%;
  }

  .button-group {
    display: flex;
    float: right;
    visibility: hidden;
    padding-right: 5px;
  }
}
</style>
