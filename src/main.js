// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import App from './App'
import axios from 'axios'
import store from './store'
import Vue from 'vue'
import Vuetify from 'vuetify'
import '../node_modules/vuetify/dist/vuetify.min.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'

// theme colors and icon
Vue.use(Vuetify, {
  iconfont: 'md',
  theme: {
    primary: '#03a9f4',
    secondary: '#8e24aa',
    accent: '#fff',
    error: '#C62828',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FFC107',
    textPrimary: '#ffffff'
  }
})

Vue.config.productionTip = false
Vue.use(Vuetify)

axios.defaults.baseURL = 'http://ggt-des.ibge.gov.br/dev-api/controle-adesao-inde/'
axios.defaults.headers.common['Accept'] = 'application/json'
axios.defaults.headers.post['Content-Type'] = 'application/json'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  template: '<App/>',
  components: { App },
  render: h => h(App)
})
