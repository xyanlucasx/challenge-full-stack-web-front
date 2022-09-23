<template>
  <v-app :style="{ background: $vuetify.theme.themes[theme].background }">
    <notifications width="450" position="top right" />

    <transition name="fade" mode="out-in">
      <router-view />
    </transition>

    <modal />
  </v-app>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'App',

  components: {
    Modal: () => import('@/components/modal/Main')
  },

  computed: {
    theme () {
      return this.$vuetify.theme.dark ? 'dark' : 'light'
    }
  },
  methods: {
    ...mapActions(['setUser'])
  }
}
</script>

<style lang="stylus">
.fade-enter-active, .fade-leave-active {
  transition-duration: 0.3s;
  transition-property: opacity;
  transition-timing-function: ease;
}

.fade-enter, .fade-leave-active {
  opacity: 0;
}
</style>
<style>
@media screen and (max-width: 600px) {
  #app
    > div.v-menu__content.theme--light.menuable__content__active.v-autocomplete__content {
    max-height: 200px !important;
  }
}
</style>
