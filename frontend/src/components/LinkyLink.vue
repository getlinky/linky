<template>
  <li class="display-on-hover-container" tabindex="0" @keydown="keydownHandler">
    <h3 class="link-title">
      <a :href="li.url">{{ li.title }}</a>
    </h3>
    <p class="description">{{ li.description }}</p>
    <a class="source" :href="li.url">{{ li.url }}</a>
    <button name="delete" class="display-on-hover" @click.once="deleteLink(li.id)">Delete</button>
    <template v-if='li.archived'>
      <button name="unarchive" class="display-on-hover" @click.once="unarchiveLink(li.id)">Unarchive</button>
    </template>
    <button v-else name="archive" class="display-on-hover" @click.once="archiveLink(li.id)">Archive</button>
  </li>
</template>

<script>
export default {
  name: 'linky-link',
  props: {
    li: {
      required: true,
      type: Object,
    }
  },
  methods: {
    deleteLink(id) {
      this.$store.dispatch('removeLink', id)
    },
    archiveLink(id) {
      this.$store.dispatch('archiveLink', id)
    },
    unarchiveLink(id) {
      this.$store.dispatch('unarchiveLink', id)
    },
    keydownHandler (event) {
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
