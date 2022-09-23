import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import pt from 'vuetify/src/locale/pt.ts'

Vue.use(Vuetify)

export default new Vuetify({
  lang: { locales: { ptbr: pt }, current: 'ptbr' },
  theme: {
    dark: false,

    themes: {
      light: {
        background: '#f1f1f1',
        primary: '#ff203b'
      },

      dark: {
        primary: '#ff203b'
      }
    }
  }
})
