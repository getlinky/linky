import Vuex from 'vuex'
import Vue from 'vue'
import axios from 'axios'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
      user: {
        authenticated: false,
        email: '',
      },
    links: [],
    errors: {
        addLink: null,
        updateEmail: [],
        removeLink: [],
        archiveLink: [],
        unarchiveLink: [],
        login: [],
        logout: [],
        updateEmail: null,
        updateLinks: [],
      }
  },
  mutations: {
      archiveLink(state, id) {
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
      removeLink(state, id) {
        state.links = state.links.filter(x => x.id !== id)
      },
      removeLinkErrors (state, errors) {
        state.errors.removeLink = errors
      },
      updateEmail(state, email) {
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
      addLink(state, linkData) {
        state.links.push(linkData)
      },
      addLinkErrors (state, errors) {
        state.errors.addLink = errors
      },
      addLinkErrorsClear (state) {
        state.errors.addLink = null
      },
      loginSuccessful(state) {
        state.user.authenticated = true
        state.errors.login = []
      },
      loginErrors(state, errors) {
        state.errors.login = errors
      },
      logout(state) {
        state.user.email = ''
        state.user.authenticated = false
        state.links = []
      },
      logoutErrors(state, errors) {
        state.errors.logout = errors
      },
      checkAuthSuccessfull(state) {
        state.user.authenticated = true
      }
  },
  actions: {
    login (context, credentials) {
        context.commit('updateEmail', credentials.email)

        axios.post('/rest-auth/login/', credentials, {
          withCredentials: true,
          headers: {'X-CSRFToken': document.cookie.replace(/^.*=/, '')},
        })
        .then(response => {
          console.log('logged in')
          context.commit('loginSuccessful')
          // fetch links once user is logged in
          store.dispatch('refreshLinks')
        })
        .catch(error => {
          console.warn('problem logging in', error)
          context.commit('loginErrors', error)
        })

    },
    isAuthenticated (context, credentials) {
      axios.get('/api/users/me', {
          withCredentials: true,
          headers: {'X-CSRFToken': document.cookie.replace(/^.*=/, '')},
        })
        .then(response => {
          console.log('is authenticated')
          context.commit('updateEmail', response.data.email)
          context.commit('checkAuthSuccessfull')
        })
        .catch(error => {
          console.warn('not authenticated', error)
        })

    },
    logout (context) {
        // Note: empty data payload needed for axios to send the headers as headers
        axios.post('/rest-auth/logout/', {},  {
          withCredentials: true,
          headers: {'X-CSRFToken': document.cookie.replace(/^.*=/, '')},
        }).then(response => {
          console.log('logged out')
          context.commit('logout')
        })
        .catch(error => {
          console.log('error logging out', error)
          context.commit('logoutErrors', error)
        })
    },
    addLink (context, url) {
      axios.post('/api/links/', {'url': url}, {
          withCredentials: true,
          headers: {'X-CSRFToken': document.cookie.replace(/^.*=/, '')},
        })
        .then(response => {
          console.log('added ' + url)
          context.commit('addLink', response.data)
        })
        .catch(error => {
          console.warn(error)
          context.commit('addLinkErrors', error.response.data)
        })
    },
    refreshLinks (context) {
      axios.get('/api/links.json', {
        withCredentials: true
      }).then(response => {
        console.log('Refreshed links')
        context.commit('updateLinks', response.data)
      })
      .catch(error => {
        console.log('error getting links', error)
        context.commit('updateLinksErrors', error)
      })
    },
    archiveLink (context, id) {
      axios.patch(`/api/links/${id}/`, {'archived': true}, {
          withCredentials: true,
          headers: {'X-CSRFToken': document.cookie.replace(/^.*=/, '')},
        })
        .then(response => {
          console.log('archived ' + id)
          context.commit('archiveLink', id)
        })
        .catch(error => {
          console.log('error archiving', error)
          context.commit('archiveLinkErrors', error)
        })
    },
    unarchiveLink (context, id) {
      axios.patch(`/api/links/${id}/`, {'archived': false}, {
          withCredentials: true,
          headers: {'X-CSRFToken': document.cookie.replace(/^.*=/, '')},
        })
        .then(response => {
          console.log('unarchived ' + id)
          context.commit('unarchiveLink', id)
        })
        .catch(error => {
          console.log('error unarchiving', error)
          context.commit('unarchiveLinkErrors', error)
        })
    },
    removeLink (context, id) {
      axios.delete(`/api/links/${id}/`, {
          withCredentials: true,
          headers: {'X-CSRFToken': document.cookie.replace(/^.*=/, '')}
        })
        .then(response => {
          console.log('deleted ' + id)
          context.commit('removeLink', id)
          console.log('removed Link')
        })
        .catch(error => {
          console.error("Couldn't remove Link", error)
          context.commit('removeLinkErrors', error)
        })
    },
    changeEmailAddress (context, email) {
      axios.patch(`/api/users/me/`, {'email': email}, {
          withCredentials: true,
          headers: {'X-CSRFToken': document.cookie.replace(/^.*=/, '')},
        })
        .then(response => {
          console.log('email updated ', email)
          context.commit('updateEmail', email)
        })
        .catch(error => {
          console.error('Couln\'t update email address', error)
          context.commit('updateEmailErrors', error.response.data)
      })
    }
  }
})

export default store
