import Vuex from 'vuex'
import Vue from 'vue'
import axios from 'axios'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    user: {
      authenticated: false,
      email: '',
      token: '',
    },
    links: [],
    errors: {
      addLink: null,
      removeLink: [],
      archiveLink: [],
      unarchiveLink: [],
      logout: [],
      updateEmail: null,
      updateLinks: [],
    },
    keybindsDisabled: 0,
    notification: {
      message: '',
      level: '',
      show: false,
      config: {
        button: false,
        duration: 4000,
        position: 'bottom',
        sticky: false,
        theme: 'pure',
        html: false,
      },
    },
    background: localStorage.getItem('backgroundColor') != null ? localStorage.getItem('backgroundColor') : 'white',
  },
  mutations: {
    archiveLink (state, id) {
      for (let i = 0; i < state.links.length; i++) {
        if (state.links[i].id === id) {
          state.links[i].archived = true
          return
        }
      }
    },
    archiveLinkErrors (state, errors) {
      state.errors.archiveLink = errors
    },
    unarchiveLink (state, id) {
      for (let i = 0; i < state.links.length; i++) {
        if (state.links[i].id === id) {
          state.links[i].archived = false
          return
        }
      }
    },
    unarchiveLinkErrors (state, errors) {
      state.errors.unarchiveLink = errors
    },
    removeLink (state, id) {
      state.links = state.links.filter(x => x.id !== id)
    },
    removeLinkErrors (state, errors) {
      state.errors.removeLink = errors
    },
    updateEmail (state, email) {
      state.user.email = email
    },
    updateLinks (state, linkData) {
      state.links = linkData
    },
    updateLinksErrors (state, errors) {
      state.errors.updateLinks = errors
    },
    updateArchive (state, archiveData) {
      state.archive = archiveData
    },
    updateArchiveErrors (state, errors) {
      state.errors.updateArchive = errors
    },
    updateEmailErrors (state, errors) {
      state.errors.updateEmail = errors
    },
    updateEmailErrorsClear (state) {
      state.errors.updateEmail = null
    },
    addLink (state, linkData) {
      state.links.push(linkData)
    },
    addLinkErrors (state, errors) {
      state.errors.addLink = errors
    },
    addLinkErrorsClear (state) {
      state.errors.addLink = null
    },
    loginSuccessful (state, token) {
      state.user.authenticated = true
      state.user.token = token
      localStorage.setItem('token', token)
    },
    logout (state) {
      state.user.email = ''
      state.user.authenticated = false
      state.links = []
      localStorage.clear()
    },
    logoutErrors (state, errors) {
      state.errors.logout = errors
    },
    disableKeybinds (state) {
      state.keybindsDisabled++
    },
    enableKeybinds (state) {
      state.keybindsDisabled--
    },
    updateLinkUrl (state, data) {
      let {id, url} = data
      for (let i = 0; i < state.links.length; i++) {
        if (state.links[i].id === id) {
          state.links[i].url = url
          return
        }
      }
    },
    updateLinkUrlErrors (state, errors) {
      state.errors.updateLinkUrl = errors
    },
    enableEditing (state) {
      state.keybindsDisabled++
    },
    disableEditing (state) {
      state.keybindsDisabled--
    },
    notify (state, config) {
      const {message, level, button, duration, position, sticky, theme, html} = config
      state.notification.message = message
      state.notification.level = level
      state.notification.config.button = button
      state.notification.config.duration = duration
      state.notification.config.position = position
      state.notification.config.sticky = sticky
      state.notification.config.theme = theme
      state.notification.config.html = html
      state.notification.show = true
    },
    notificationClosed (state) {
      state.notification.show = false
    },
    setBackground (state, color) {
      state.background = color
      document.getElementsByTagName('body')[0].classList = color
      localStorage.setItem('backgroundColor', color)
    },
  },
  actions: {
    isAuthenticated (context) {
      axios.get('/api/users/me/',
        {headers: {'Authorization': 'Token ' + localStorage.getItem('token')}})
        .then(response => {
          console.info('User authenticated')
          context.commit('updateEmail', response.data.email)
          context.commit('loginSuccessful', localStorage.getItem('token'))
        })
        .catch(error => {
          context.commit('notify', {'message': 'User Not Authenticated', 'level': 'warning'})
          console.warn('Problem authenticating user.', error)
          context.commit('logout')
        })
    },
    logout (context) {
      // Note: empty data payload needed for axios to send the headers as headers
      axios.post('/rest-auth/logout/', {},
        {headers: {'Authorization': 'Token ' + localStorage.getItem('token')}})
      .then(response => {
        console.info('logged out')
        context.commit('logout')
        context.commit('notify', {'message': 'Logged out', 'level': 'success'})
      })
      .catch(error => {
        context.commit('notify', {'message': 'Problem Logging Out', 'level': 'warning'})
        console.warn('Problem logging out user.', error)
        context.commit('logoutErrors', error)
      })
    },
    addLink (context, url) {
      axios.post('/api/links/', {'url': url},
        {headers: {'Authorization': 'Token ' + localStorage.getItem('token')}})
        .then(response => {
          console.info('Added ' + url)
          context.commit('notify', {'message': 'Added New Link', 'level': 'info'})
          context.commit('addLink', response.data)
        })
        .catch(error => {
          console.warn(`Problem adding link ${url}.`, error)
          context.commit('notify', {'message': 'Problem Adding New Link', 'level': 'warning'})
          context.commit('addLinkErrors', error.response.data)
        })
    },
    refreshLinks (context) {
      axios.get('/api/links/',
        {headers: {'Authorization': 'Token ' + localStorage.getItem('token')}})
      .then(response => {
        console.info('Refreshed links')
        context.commit('updateLinks', response.data)
      })
      .catch(error => {
        console.warn('Problem getting links.', error)
        context.commit('updateLinksErrors', error)
      })
    },
    archiveLink (context, id) {
      axios.patch(`/api/links/${id}/`, {'archived': true},
        {headers: {'Authorization': 'Token ' + localStorage.getItem('token')}})
        .then(response => {
          console.info('Archived Link with id:', id)
          context.commit('notify', {'message': 'Archived Link', 'level': 'info'})
          context.commit('archiveLink', id)
        })
        .catch(error => {
          console.warn('Problem archiving link with id:', id, error)
          context.commit('notify', {'message': 'Problem archiving link', 'level': 'warning'})
          context.commit('archiveLinkErrors', error)
        })
    },
    unarchiveLink (context, id) {
      axios.patch(`/api/links/${id}/`, {'archived': false},
        {headers: {'Authorization': 'Token ' + localStorage.getItem('token')}})
        .then(response => {
          console.info('Unarchived Link with id:', id)
          context.commit('notify', {'message': 'Unarchived Link', 'level': 'info'})
          context.commit('unarchiveLink', id)
        })
        .catch(error => {
          console.warn('Problem unarchiving link with id:', id, error)
          context.commit('notify', {'message': 'Problem Unarchiving Link', 'level': 'warning'})
          context.commit('unarchiveLinkErrors', error)
        })
    },
    removeLink (context, id) {
      axios.delete(`/api/links/${id}/`,
        {headers: {'Authorization': 'Token ' + localStorage.getItem('token')}})
        .then(response => {
          console.info('Deleted link with id:', id)
          context.commit('notify', {'message': 'Deleted Link', 'level': 'info'})
          context.commit('removeLink', id)
        })
        .catch(error => {
          context.commit('notify', {'message': 'Problem Deleting Link', 'level': 'warning'})
          console.warn("Couldn't remove Link", error)
          context.commit('removeLinkErrors', error)
        })
    },
    changeEmailAddress (context, email) {
      axios.patch('/api/users/me/', {'email': email},
        {headers: {'Authorization': 'Token ' + localStorage.getItem('token')}})
        .then(response => {
          console.info('Email updated')
          context.commit('notify', {'message': 'Updated Email Address', 'level': 'info'})
          context.commit('updateEmail', email)
        })
        .catch(error => {
          console.warn('Couln\'t update email address', error)
          context.commit('notify', {'message': 'Problem Updating Email Address', 'level': 'warning'})
          context.commit('updateEmailErrors', error.response.data)
        })
    },
    changeLinkUrl (context, data) {
      let {id, url} = data
      axios.patch(`/api/links/${id}/`, {'url': url},
        {headers: {'Authorization': 'Token ' + localStorage.getItem('token')}})
      .then(response => {
        console.info('Updated link with id:', id)
        context.commit('notify', {'message': 'Updated Link', 'level': 'info'})
        context.commit('updateLinkUrl', id)
      })
      .catch(error => {
        console.warn('Problem updating link.', error)
        context.commit('notify', {'message': 'Problem updating Link', 'level': 'warning'})
        context.commit('updateLinkUrlErrors', error)
      })
    },
    updatePassword (context, data) {
      const {old_password, new_password1, new_password2} = data
      axios.post('/rest-auth/password/change/', {
        'old_password': old_password,
        'new_password1': new_password1,
        'new_password2': new_password2,
      }, {headers: {'Authorization': 'Token ' + localStorage.getItem('token')}})
      .then(response => {
        console.info('Updated password')
        context.commit('notify', {'message': 'Updated Password', 'level': 'info'})
      })
      .catch(error => {
        console.warn('Problem updating password.', error)
        context.commit('notify', {'message': 'Problem Updating Password', 'level': 'warning'})
      })
    },
  },
})

export default store
