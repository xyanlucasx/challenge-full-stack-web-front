import Vue from 'vue'

const eventBus = {
  install (Vue) {
    Vue.prototype.$eventBus = Vue.$eventBus = new Vue()
  }
}

Vue.use(eventBus)
