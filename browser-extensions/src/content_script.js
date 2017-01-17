/* globals chrome */

import Vue from 'vue'
import axios from 'axios'
import Notification from './Notification.vue'

import config from './config.js'

const div = document.createElement('div')
div.id = 'linky-vue'
document.querySelector('body').appendChild(div)

const storage =
  typeof chrome.storage.sync !== 'undefined'
  ? chrome.storage.sync
  : chrome.storage.local

// eslint-disable-next-line no-new
const v = new Vue({
  el: '#linky-vue',
  template: `
  <notification :message='message' :level='level' :show='showNotification' @closed='showNotification = false'></notification>
  `,
  components: {
    Notification,
  },
  data () {
    return {
      showNotification: false,
      message: '',
      level: 'info',
    }
  },
  methods: {
    addURL (URL) {
      storage.get('token', token => {
        axios.post(baseURL + '/api/links/', {'url': URL},
          {headers: {'Authorization': 'Token ' + token.token}})
          .then(response => {
            console.info(`linky: added ${response.data.url}`)
            // trigger a notifcaiton
            this.message = 'Linky: Added URL'
            this.level = 'success'
            this.showNotification = true
          })
          .catch(error => {
            console.warn(`linky: error sending url: ${URL} `, error)
            // trigger a notifcaiton
            this.message = 'Linky: Error Adding URL'
            this.level = 'warning'
            this.showNotification = true
          })
      })
    },
  },
})

const baseURL = config.isDebug ? 'http://localhost:8000' : 'https://getlinky.com'

chrome.runtime.onMessage.addListener(() => v.addURL(window.location.href))
