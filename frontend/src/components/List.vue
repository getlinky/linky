<template>
    <div id="index">

      <linky-nav>
          <a id="add-icon" @click='showAdd = true' class="icon">+</a>
          <a id="settings-icon" @click='showSettings = true' class="icon">⚙</a>
          <a v-if="user.authenticated" @click='logout'>Logout</a>
          <router-link to="/login" v-else>Login</router-link>
      </linky-nav>

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
          <template v-if="list_items.filter(x => !x.archived).length > 0">
            <linky-link
              v-for="item in list_items"
              v-if="!item.archived"
              :li='item'
              v-on:remove="remove"
              v-on:archive="archive">
            </linky-link>
          </template>
          <li v-else>
            No links found.
          </li>
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
            <form action="" method="post" @submit.prevent='updateEmail(email)'>
              <!-- TODO: handle errors -->
              <label for='email' >Email</label>
              <input name='email' :value="user.email" type='email' placeholder='name@example.com' required v-model='email'>
              <input name='update' type='submit' value='update'>
              {{ settingsModalError }}
            </form>
            <p><a href="">Download Links</a></p>
            <p><a href="">Password Reset</a></p>
          </div>
        </modal>

        <modal :show.sync='showAdd' @closed='showAdd = false'>
          <h1 slot='header'>Add Item</h1>
          <form slot='body' action="" method="post" @submit.prevent='add(url)'>
              <!-- TODO: handle errors -->
              <input type='url' placeholder='https://example.com' required v-model='url'>
              <input type='submit' value='Add'>
              {{ addModalError }}
          </form>
        </modal>
    </div>
</template>

<script>
import modal from './Modal.vue'
import linkyLink from './LinkyLink.vue'
import linkyNav from './LinkyNav.vue'

import axios from 'axios'

export default {
  name: 'list',
  components: {
    modal,
    linkyLink,
    linkyNav,
  },
  data () {
    return {
      list_items: [],
      user: {},
      email: '',
      showAdd: false,
      addModalError: {},
      showSettings: false,
      settingsModalError: {},
      showHelp: false,
      csrf_cookie: document.cookie.replace(/^.*=/, '')
    }
  },
  created() {
    // 1. Fetch links
    axios.get('/api/links.json', {
      withCredentials: true
    }).then(response => {
      this.list_items = response.data
    })
    .catch(error => {
      // TODO: redirect user to login
      console.log('error getting links', error)
    });

    // 2. Fetch user data
    axios.get('/api/users/me.json', {
      withCredentials: true
    })
    .then(response => {
      this.user = response.data
      this.email = this.user.email
      this.user.authenticated = true
      // TODO: display success
    })
    .catch(error => {
      // TODO: redirect user to log in
      console.log('error getting user info', error)
    })
  },
  methods: {
    add(url) {
      axios.post('/api/links/', {'url': url}, {
          withCredentials: true,
          headers: {'X-CSRFToken': this.csrf_cookie},
        })
        .then(response => {
          console.log('added ' + url)
          this.list_items.push(response.data)
          this.showAdd = false
        })
        .catch(error => {
          // 3. add item back to list if request to server failed
          console.log(error.response.data)
          this.addModalError = error.response.data
        });
    },
    remove(id) {
      const item_to_remove = this.list_items.filter(x => x.id === id)

      // 1. Remove item from list
      this.list_items = this.list_items.filter(x => x.id !== id)

      // 2. Send request to remove item from server
      axios.delete(`/api/links/${id}/`, {
          withCredentials: true,
          headers: {'X-CSRFToken': this.csrf_cookie}
        })
        .then(response => {
          console.log('deleted ' + id)
        })
        .catch(error => {
          // 3. add item back to list if request to server failed
          console.log('error deleting', error)
          this.list_items.push(item_to_remove)
        });
    },
    archive(id) {
      const item_to_archive = this.list_items.filter(x => x.id === id)

      this.list_items = this.list_items.filter(x => x.id !== id)

      axios.patch(`/api/links/${id}/`, {'archived': true}, {
          withCredentials: true,
          headers: {'X-CSRFToken': this.csrf_cookie},
        })
        .then(response => {
          console.log('archived ' + id)
        })
        .catch(error => {
          // 3. add item back to list if request to server failed
          console.log('error archiving', error)
          this.list_items.push(item_to_archive)
        });
    },
    updateEmail(email) {
      axios.patch(`/api/users/me/`, {'email': email}, {
          withCredentials: true,
          headers: {'X-CSRFToken': this.csrf_cookie},
        })
        .then(response => {
          console.log('email updated ', email)
        })
        .catch(error => {
          console.log('error updating email', error)
        });
    },
    logout() {
      // Note: empty data payload needed for axios to send the headers as headers
      axios.post('/rest-auth/logout/', {},  {
          withCredentials: true,
          headers: {'X-CSRFToken': this.csrf_cookie},
        }).then(response => {
          // TODO: display msg
          console.log('logged out')
          this.$router.replace('/')
        })
        .catch(error => {
          // TODO: redirect user to index
          console.log('error logging out', error)
        });
    }
  }
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

</style>
