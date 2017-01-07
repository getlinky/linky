<template>
  <li class="display-on-hover-container" tabindex="0" @keydown="keydownHandler">
    <h3 class="link-title">
      <a :href="li.url">{{ title }}</a>
    </h3>
    <p class="description">{{ description }}</p>
    <a v-if="!editing" class="source" :href="url">{{ url }}</a>
    <input v-else v-focus="editing" @keyup.enter="saveChanges" @keydown.esc="cancelChanges" type="text" class="source" v-model="url">
    <button name="delete" class="display-on-hover" @click.once="deleteLink">Delete</button>
    <template v-if='li.archived'>
      <button name="unarchive" class="display-on-hover" @click.once="unarchiveLink">Unarchive</button>
    </template>
    <button v-else name="archive" class="display-on-hover" @click.once="archiveLink">Archive</button>
    <button v-if="!editing" class="display-on-hover" @click.once="enableEditing">Edit</button>
    <template v-else>
      <button  class="display-on-hover" @click.once="saveChanges">Done</button>
      <button class="display-on-hover" @click.once="cancelChanges">Cancel</button>
    </template>
  </li>
</template>

<script>
import { focus } from 'vue-focus'

export default {
  name: 'linky-link',
  props: {
    li: {
      required: true,
      type: Object,
    }
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
    keydownHandler (event) {
      if (this.editing) {
        return
      }
      switch (event.keyCode) {
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
  }
}
</script>

<style lang='scss'>
$text-gray: #444;
$light-gray: #eee;
.link-title {
  margin-top: 0;
}

.description,
.source {
  font-style: italic;
  margin-top: 0;
}

// link section
li {
  margin-bottom: 1rem;
  margin-left: .5rem;
  margin-right: .5rem;
  padding-left: 5px;
  border-left-style: solid;
  border-left-color: #fff;

  &:focus {
    outline: none;
    background-color: lighten($light-gray, 3%);
    border-left-color: $text-gray;
  }

  & > * {
    margin-bottom: 0.5;
  }
}

// displays text inside the container & with the .display-on-hover class on hover
// Usage:
//   1. Outer container uses the container class
//   2. Items that should display on hover of container get .display-on-hover
.display-on-hover {
  float: right;
  visibility: hidden;
}

.display-on-hover-container:hover .display-on-hover {
  visibility: visible;
}

</style>
