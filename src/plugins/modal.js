import Vue from 'vue'

const modal = {
  install (Vue) {
    let config = {}

    const open = (content, props) =>
      Vue.$eventBus.$emit('modal', {
        ...config,
        content,
        props
      })

    const close = (content) =>
      Vue.$eventBus.$emit(`close-${config.component}`, content)

    const afterClose = (callback) =>
      Vue.$eventBus.$on(`close-${config.component}`, callback)

    Vue.prototype.$modal = Vue.$modal = (componentNameOrObject, width) => {
      if (typeof componentNameOrObject === 'string') {
        config = {
          component: componentNameOrObject,
          width
        }
      } else {
        config = componentNameOrObject
      }

      return {
        afterClose,
        close,
        open
      }
    }
  }
}

Vue.use(modal)
