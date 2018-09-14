import 'babel-polyfill'
import Vue from 'vue'
import VueResource from 'vue-resource'
import router from './router'
import store from './store'
import App from './App.vue'
import './sass/_reset.scss'

Vue.use(VueResource)

new Vue({
  el: '#manjizapp',
  store,
  router,
  render: (createElement) => createElement(App)
})
