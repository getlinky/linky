import Vuex from 'vuex'
import Vue from 'vue'
import axios from 'axios'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
      user: {
        authenticated: false,
        csrf_cookie: document.cookie.replace(/^.*=/, ''),
        email: '',
      },
      list: [],
      errors: {
        addLink: [],
        archiveLink: [],
        login: [],
        logout: [],
        removeLink: [],
        updateEmail: [],
        updateList: [],
      }
  },
  mutations: {
      archiveLink(state, id) {
        for (let i = 0; i < state.list.length; i++) {
          if (state.list[i].id == id) {
            state.list[i].archived = true
            return
          }
        }
      },
      archiveLinkErrors (state, errors) {
        state.errors.archiveLink = errors
      },
      removeLink(state, id) {
        for (let i = 0; i < state.list.length; i++) {
            if (state.list[i].id == id) {
              state.list.splice(i, 1)
              return
            }
        }
      },
      removeLinkErrors (state, errors) {
        state.errors.removeLink = errors
      },
      updateEmail(state, email) {
        state.user.email = email
      },
      updateList (state, listData) {
        state.list = listData
      },
      updateListErrors (state, errors) {
        state.errors.updateList = errors
      },
      addLink(state, linkData) {
        state.list.push(linkData)
      },
      addLinkErrors (state, errors) {
        state.errors.addLink = errors
      },
      loginSuccessful(state) {
        state.user.authenticated = true
      },
      loginErrors(state, errors) {
        state.errors.login = errors
      },
      logout(state) {
        state.user.email = ''
        state.user.csrf_cookie = ''
        state.user.authenticated = false
        state.list = []
      },
      logoutErrors(state, errors) {
        state.errors.logout = errors
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
        })
        .catch(error => {
          console.warn('problem logging in', error)
          context.commit('loginErrors', error)
        });

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
        });
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
          context.commit('addLinkErrors', error)
        });
    },
    refreshList (context) {
      axios.get('/api/links.json', {
        withCredentials: true
      }).then(response => {
        console.log('Refreshed List')
        context.commit('updateList', response.data)
      })
      .catch(error => {
        console.log('error getting links', error)
        context.commit('updateListErrors', error)
      });
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
        });
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
        });
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
          context.commit('updateEmailErrors', error)
      });
    }
  }
})

export default store
