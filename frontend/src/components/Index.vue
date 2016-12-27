<template>
    <div id="index">
        <header>
            <nav class="main-nav">
                <div class="items">
                    <div class="section">
                        <router-link to="/">
                            <h1 class="title">Linky</h1>
                        </router-link>
                    </div>
                    <div class="section settings-logout-save">
                        <a id="add-icon" @click='showAdd = true' class="icon">+</a>
                        <a id="settings-icon" @click='showSettings = true' class="icon">⚙</a>
                        <router-link to="/logout">Logout</router-link>
                        <!-- TODO: send request from here to log user out -->
                    </div>
                </div>
            </nav>
        </header>

        <nav class="list-options">
            <div class="search-option-section">
                <a class="icon">🔍</a>
                <input class="search" id="search" placeholder="search" type="search">
            </div>
            <div class="list-archive-option-section">
                <router-link to="/">List</router-link>
                <router-link class="inactive" to="/archive">Archive</router-link>
            </div>
        </nav>

        <ul class="link-container">
            <template v-if="list_items.length > 0">
                <template v-for="li in list_items">
                    <li class="display-on-hover-container" tabindex="0">
                        <h3 class="link-title">
                            <a :href="li.url">{{ li.title }}</a>
                        </h3>
                        <p class="description">{{ li.description }}</p>
                        <a class="source" :href="li.url">{{ li.url }}</a>
                        <button class="display-on-hover">Delete</button>
                        <button class="display-on-hover">{{ page_name === 'list' ? 'Archive' : 'Unarchive' }}</button>
                    </li>
                </template>
            </template>
            <template v-else>
                No items found.
            </template>
        </ul>

        <modal :show.sync='showHelp' @closed='showHelp = false'>
          <h1 slot='header'>Key Binds</h1>
          <ul slot="body">
                    <li><kbd>j</kbd> - down</li>
                    <li><kbd>k</kbd> - up</li>
                    <li><kbd>l</kbd> - switch right list (wraps)</li>
                    <li><kbd>h</kbd> - switch left list (wraps)</li>
                    <li><kbd>a</kbd> - archive current item (or unarchive)</li>
                    <li><kbd>#</kbd> - delete current item</li>
                    <li><kbd>e</kbd> - edit current item</li>
                    <li><kbd>/</kbd> - search</li>
                    <li><kbd>?</kbd> - toggle help menu</li>
                    <li><kbd>esc</kbd> - close current menu</li>
                </ul>
        </modal>

        <modal :show.sync='showSettings' @closed='showSettings = false'>
          <h1 slot='header'>Settings</h1>
          <div slot='body'>
            <form action="" method="post">
                    <!-- {% csrf_token %} -->
                    <!-- {{ form.errors }} -->
                    <!-- {{ form.non_field_errors }} -->
                    <!-- {{ form }} -->
                    <input type="submit" value="Save">
            </form>
            <p><a href="{% url 'download_links_json' %}">Download Links</a></p>
            <p><a href="">Password Reset</a></p>
          </div>
        </modal>

        <modal :show.sync='showAdd' @closed='showAdd = false'>
          <h1 slot='header'>Add Item</h1>
          <form slot='body' action="" method="post">
                    <!-- {% csrf_token %} -->
                    <!-- {% for field in form %} -->
                    <!-- {{ field.errors }} -->
                    <!-- {{ field }} -->
                    <!-- {% endfor %} -->
                    <input type="submit" value="Add">
                </form>
        </modal>
    </div>
</template>

<script>
import HelpModal from './HelpModal.vue'
import AddModal from './AddModal.vue'
import SettingsModal from './SettingsModal.vue'
import modal from './modal.vue'

export default {
    name: 'index',
    components: {
        HelpModal,
        AddModal,
        SettingsModal,
        modal
    },
    data () {
        return {
            showAdd: false,
            showSettings: false,
            showHelp: false,
            show: true,
            list_items: [{
                'title': 'Default title',
                'description': 'A default description',
                'url': 'https://defaulturl.com'
            }]
        }
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

// container for all of the link sections
.link-container {
  list-style-type: none;
  margin: 0 auto;
  max-width: $max-width-main-content;
  overflow-wrap: break-word;
  padding-top: 0;

  * {
    margin-bottom: .5rem;
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
  }

  .link-title {
    margin-top: 0;
  }

  .description,
  .source {
    font-style: italic;
    margin-top: 0;
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

  .section {
    align-items: center;
    display: flex;
    font-weight: bold;
    text-decoration: none;

    // make sure the last link section doesn't hit the edge of the browser
    &:last-child {
      margin-right: .5rem;
    }

    &:first-child {
      margin-left: .5rem;
    }
  }

  .settings-logout-save {
    font-size: .8rem;
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

.hidden {
  display: none;
  height: 0;
  width: 0;
}

kbd {
  background-color: #f7f7f7;
  border: 1px solid #ccc;
  border-radius: 3px;
  box-shadow: 0 1px 0 rgba(0, 0, 0, .2), 0 0 0 2px #fff inset;
  color: #333;
  display: inline-block;
  font-family: sans-serif;
  font-size: 11px;
  line-height: 1.4;
  margin: 0 .1em;
  padding: .1em .6em;
  text-shadow: 0 1px 0 #fff;
}

.modal-container {
  background: rgba(0, 0, 0, .7);
  bottom: 0;
  display: flex;
  outline: 0;
  overflow-x: hidden;
  overflow-y: auto;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 10;
}

.modal-inner {
  box-sizing: border-box;
  margin: auto;
  position: relative;
  min-width: 320px;
  width: 50%;
}

.modal {
  background-color: $light-gray;
  border-radius: 5px;
  padding-top: 0;
  padding-bottom: 1rem;
  padding-left: 1rem;
  padding-right: 1rem;

  ul {
    margin: 0;
    list-style: none;
    padding: 0;
  }

  nav {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    h1 {
      padding: 0;
    }

    a {
      text-decoration: none;
      color: inherit;
    }

    .close {
      font-size: 1.5rem;
    }
  }

  input {
    width: 100%;
    height: 1rem;
    font-size: 1rem;
    margin-bottom: .5rem;
  }
}
</style>
