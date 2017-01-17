/* globals chrome */

import Vue from 'vue'
import Login from './Login.vue'

// eslint-disable-next-line no-new
new Vue({
  el: '#app',
  render: (h) => h(Login),
})

chrome.browserAction.onClicked.addListener((tab) => {
  // Note: message isn't actually used, this connects the button to an function
  chrome.tabs.sendMessage(tab.id, {'cmd': 'addURL'})
})

chrome.contextMenus.create({'title': 'Linky'})
chrome.contextMenus.onClicked.addListener((_, tab) => {
  chrome.tabs.sendMessage(tab.id, {'cmd': 'addURL'})
})
