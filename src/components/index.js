import Vue from 'vue'

Vue.component('box', () => import('@/components/cards/Box'))

Vue.component('renderHTML', {
  props: ['element', 'content'],
  render: function (createElement) {
    return createElement(this.element || 'p', {
      domProps: {
        innerHTML: this.content
      }
    })
  }
})

Vue.component('b-field-text', () =>
  import('@/components/inputs/BFieldText/BFieldText.vue')
)

Vue.component('b-form', () => import('@/components/form/Bform.vue'))

Vue.component('b-select', () => import('@/components/form/Bselect.vue'))
