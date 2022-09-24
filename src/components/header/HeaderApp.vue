<template>
  <v-container class="header-app">
    <v-layout align-center>
      <router-link to="/">
        <img
          src="https://maisaedu.com.br/hubfs/site-grupo-a/logo-mais-a-educacao.svg"
          aspect-ratio="1"
          class="mx-auto d-flex header-app__logo"
        />
      </router-link>

      <v-spacer />
      <menu-app v-if="hiddenInLogin()" />
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'headerApp',

  components: {
    MenuApp: () => import('@/components/header/MenuApp')
  },
  methods: {
    hiddenInLogin () {
      return this.$route.path !== '/login'
    }
  }
}
</script>

<style lang="stylus">
.header-app
  +prefix-classes('header-app__')
    .logo
      height 60px
</style>
