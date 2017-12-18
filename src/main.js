// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import App from './App'
import axios from 'axios'
import router from './router'
import store from './core'
import Vue from 'vue'
import Vuetify from 'vuetify'
import('../node_modules/vuetify/dist/vuetify.min.css')

Vue.config.productionTip = false
Vue.use(Vuetify)
axios.defaults.baseURL = 'http://172.30.11.26:8001/adesao-list/'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
})
