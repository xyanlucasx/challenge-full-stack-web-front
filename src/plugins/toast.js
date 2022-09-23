import Vue from 'vue'
import Notifications from 'vue-notification'
Vue.use(Notifications)

const toast = {
  install () {
    const titleTypes = {
      success: 'Pronto!',
      warning: 'Puxa!',
      error: 'Ah não!'
    }

    const notify = options =>
      Vue.notify({
        duration: options.text.length < 15 ? 7500 : options.text.length * 500,
        title: titleTypes[options.type],
        ...options
      })

    const actionsTypes = {
      success: text => notify({ text, type: 'success' }),
      warning: text => notify({ text, type: 'warning' }),
      error: text => notify({ text, type: 'error' }),
      default: text => notify({ text })
    }

    Vue.prototype.$toast = (options, type = 'default') => {
      typeof options === 'string'
        ? (actionsTypes[type] || actionsTypes.default)(options)
        : notify(options)
    }
  }
}

Vue.use(toast)
