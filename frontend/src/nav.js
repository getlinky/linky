const nav = () => {
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
    },
    switch_list_archive: () =>
      document.querySelector('.list-archive-option-section > a.inactive').click(),
    open_in_new_tab: () =>
      window.open(link.querySelector('a.source').href, '_blank'),
    delete_current: () =>
      link.querySelector('button[name=delete]').click(),
    archive: () =>
      link.querySelector('button[name=archive]').click(),
    toggle_add_modal: () => {
      // TODO: toggle_add_menu()
      console.log('toggle_add_modal')
    },
    toggle_help_menu: () => {
      // TODO: toggle_help_menu()
      console.log('toggle_help_menu')
    },
    toggle_settings_modal: () => {
      // TODO: toggle_settings_menu()
      console.log('toggle settings menu')
    },
    open_in_current_tab: () => {
      window.location.href =
        link.querySelector('a.source').href
    },
    focus_search: () => {
      window.setTimeout(() =>
        document.querySelector('input.search').focus(), 100)
    }
  }
}
const links_nav = nav()

const handle_event = event => {
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

  const active_element = document.activeElement.tagName.toLowerCase()

  // disable keybinds if we are using an <input>
  if (active_element === 'input') return

  // focus first link element if active element is the body
  if ((is_key('j') || is_key('k')) && active_element === 'body') {
    document.querySelector('.link-container > li').focus()
    return
  }

  if (is_key('j') || (event.ctrlKey && is_key('n'))) {
    links_nav.next()
  } else if (is_key('k') || (event.ctrlKey && is_key('p'))) {
    links_nav.previous()
  } else if (is_key('d')) {
    links_nav.delete()
  } else if (is_key('a')) {
    links_nav.archive()
  } else if (is_key('c')) {
    links_nav.toggle_add_modal()
  } else if (is_key('/') && event.shiftKey) {
    links_nav.toggle_help_menu()
  } else if (is_key('/')) {
    links_nav.focus_search()
  } else if (is_key('l') || is_key('h')) {
    links_nav.switch_list_archive()
  } else if (is_key('o')) {
    links_nav.open_in_new_tab()
  } else if (is_key('enter')) {
    links_nav.open_in_current_tab()
  } else if (is_key('3') && event.shiftKey) {
    links_nav.delete()
  } else if (is_key(',')) {
    links_nav.toggle_settings_modal()
  }
}

export default function list_nav() {
  document.addEventListener('keydown', event => handle_event(event))
}
