import Vue from 'vue'
import '@babel/polyfill'
import App from './App.vue'
import store from './store'
import router from './router'
import vuetify from './plugins/vuetify'

import '@mdi/font/css/materialdesignicons.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import './assets/style/notification.styl'
import './assets/style/custom.styl'

import '@/plugins'

import '@fortawesome/fontawesome-free'

import '@/components'

Vue.config.productionTip = false

window.App = new Vue({
  router,
  store,
  vuetify,
  render: (create) => create(App)
}).$mount('#app')
