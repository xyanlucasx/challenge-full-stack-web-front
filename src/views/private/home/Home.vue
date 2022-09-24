<template>
  <v-container>
    <header-app />

    <transition name="fade" mode="out-in">
      <router-view />
    </transition>
    <div class="mt-5">
      <h1 class="text-center">
        +A Educação - Desafio Full Stack Web Developer
      </h1>
    </div>
    <div class="mt-5">
      <v-img
        class="mx-auto"
        src="../../../assets/images/backgroundHome.jpg"
        max-width="400"
      >
      </v-img>
    </div>
  </v-container>
</template>
<script>
export default {
  name: 'Home',

  components: {
    HeaderApp: () => import('@/components/header/HeaderApp')
  }
}
</script>
