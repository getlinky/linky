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
    focus_search: () => {
      window.setTimeout(() =>
        document.querySelector('input.search').focus(), 100)
    },
  }
}
const links_nav = nav()

export const handle_event = event => {
  // takes in `event` from the current scope so it can be called more cleanly
  const is_key = k => {
    return k === {
      74: 'j',
      75: 'k',
      80: 'p',
      191: '/',
    }[event.keyCode]
  }

  const active_element = document.activeElement.tagName.toLowerCase()
  // focus first link element if active element is the body
  if ((is_key('j') || is_key('k')) && active_element === 'body') {
    document.querySelector('.link-container > li').focus()
    return
  }

  if (is_key('j') || (event.ctrlKey && is_key('n'))) {
    links_nav.next()
  } else if (is_key('k') || (event.ctrlKey && is_key('p'))) {
    links_nav.previous()
  } else if (is_key('/')) {
    links_nav.focus_search()
  }
}
