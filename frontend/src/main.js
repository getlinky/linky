// The following line loads the standalone build of Vue instead of the runtime-only build,
// so you don't have to do: import Vue from 'vue/dist/vue'
// This is done with the browser options. For the config, see package.json
import Vue from 'vue'
// import App from './App.vue'
import VueRouter from 'vue-router'
import Index from './components/Index.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', component: Index }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

new Vue({
  router
}).$mount('#app')

const nav = () => {
  console.log('nav created')
  let link = document.activeElement
  return {
    next: () => {
      if (document.activeElement.nextElementSibling == null) {
        return
      }
      link = document.activeElement.nextElementSibling
      link.focus()
    },
    previous: () => {
      if (document.activeElement.previousElementSibling == null) {
        window.scroll(0, 0)
        return
      }
      link = document.activeElement.previousElementSibling
      link.focus()
    }
  }
}

const open_current_link_current_tab = () => {
  window.location.href = document.querySelector('.link-container > li:focus').querySelector('a.source').href
}

const open_current_link_new_tab = () => {
  const url = document.querySelector('.link-container > li:focus').querySelector('a.source').href
  window.open(url, '_blank')
}

const links_nav = nav()

document.addEventListener('keydown', event => {
  // takes in `event` from the current scope so it can be called more cleanly
  const is_key = k => {
    return k === {
      75: 'k',
      74: 'j',
      76: 'l',
      72: 'h',
      68: 'd',
      65: 'a',
      83: 's',
      70: 'f',
      78: 'n',
      79: 'o',
      80: 'p',
      191: '/',
      13: 'enter',
      27: 'esc',
      219: ']',
      51: '3',
      188: ',',
      67: 'c'
    }[event.keyCode]
  }

  // disable keybinds if we are using an <input>
  if (document.activeElement.tagName.toLowerCase() === 'input') {
    return
  }

  const search_input_in_use = () =>
    document.activeElement === document.querySelector('input.search')

  // don't need keybinds if we are editing the search input
  if (search_input_in_use()) {
    return
  }

  if (is_key('j') || is_key('k')) {
    console.log('key is h or k')
    const ael = document.activeElement.tagName.toLowerCase()
    console.log(ael)
    console.log(ael.previousSibling)

    if (ael === 'input') {
      console.log('active elemtn is the input or modal is in use')
      // do nothing since the user is editing an input / using a modal
      return
    } else if (ael === 'body') {
      console.log('active element is the body')
      // focus the first element if the activeElement is the body,
      // which means the user isn't using an input
      document.querySelector('.link-container > li').focus()
      return
    }
  }

  if (is_key('j') || (event.ctrlKey && is_key('n'))) {
    links_nav.next()
  } else if (is_key('k') || (event.ctrlKey && is_key('p'))) {
    links_nav.previous()
  } else if (is_key('d')) {
    console.log('delete')
  } else if (is_key('a')) {
    console.log('archive')
  } else if (is_key('c')) {
    // TODO: toggle_add_menu()
    console.log('toggle_add_menu')
  } else if (is_key('/') && event.shiftKey) {
    // TODO: toggle_help_menu()
    console.log('toggle_help_menu')
  } else if (is_key('/')) {
    window.setTimeout(() =>
      document.querySelector('input.search').focus(), 100)
  } else if (is_key('l')) {
    document.querySelector('.list-archive-option-section > a.inactive').click()
  } else if (is_key('h')) {
    document.querySelector('.list-archive-option-section > a.inactive').click()
  } else if (is_key('o')) {
    open_current_link_new_tab()
  } else if (is_key('enter')) {
    open_current_link_current_tab()
  } else if (is_key('3') && event.shiftKey) {
    console.log('delete current item')
  } else if (is_key(',')) {
    // TODO: toggle_settings_menu()
    console.log('toggle settings menu')
  }

  console.log(event.keyCode)
  console.log(event.ctrlKey)
})
