<!-- eslint-disable vue/no-v-text-v-html-on-component -->
<template>
  <v-menu
    left
    offset-y
    :top="onTop"
    min-width="200px"
    :nudge-top="onTop ? 10 : 0"
    :nudge-bottom="!onTop ? 10 : 0"
  >
    <template v-slot:activator="{ on }">
      <v-btn icon v-on="on" @click="onTop = false" class="ml-4 hide-xs">
        <v-icon>menu</v-icon>
      </v-btn>

      <v-btn
        fab
        dark
        v-on="on"
        :loading="loading"
        @click="onTop = true"
        class="show-xs v-btn--float primary"
      >
        <v-icon>menu</v-icon>
      </v-btn>
    </template>

    <v-list nav dense class="pb-0">
      <v-list-item-group :value="selectedItem" color="primary">
        <v-list-item
          link
          :key="item.text"
          v-for="item in items"
          @click="$router.push(item)"
        >
          <v-list-item-icon>
            <v-icon color="primary" v-text="item.icon" />
          </v-list-item-icon>

          <v-list-item-title color="primary" v-text="item.text" />
        </v-list-item>

        <v-list-item link class="menu-app__item-logout" @click="confirmLogout">
          <v-list-item-icon>
            <v-icon>arrow_back</v-icon>
          </v-list-item-icon>

          <v-list-item-title>Sair</v-list-item-title>
        </v-list-item>
      </v-list-item-group>

      <v-divider class="mt-2" />

      <v-list-item>
        <v-list-item-title>Versão</v-list-item-title>
        <v-list-item-subtitle class="text-right">{{
          version
        }}</v-list-item-subtitle>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
import packageInfo from '../../../package.json'
import { mapActions } from 'vuex'
export default {
  name: 'headerMenuApp',

  data: () => ({
    version: packageInfo.version,
    onTop: false,
    loading: false,
    dropdown: false
  }),

  computed: {
    selectedItem () {
      return this.items.findIndex((item) => item.link === this.$route.name)
    },
    isDropDown (children) {
      if (children.length > 0) return true
      return false
    },
    items () {
      const contentItems = [
        {
          icon: 'home',
          text: 'Inicio',
          name: 'home',
          path: '/'
        },
        {
          icon: 'mdi-account-school-outline',
          text: 'Alunos',
          name: 'students',
          path: '/students'
        }
      ]
      return contentItems
    }
  },
  methods: {
    ...mapActions(['setUser']),
    async confirmLogout () {
      this.$modal('genericModal', 450).open({
        type: 'warning',
        title: 'Atenção',
        text: 'Deseja realmente deslogar?',
        btnConfirmAction: () => {
          this.setUser({})
          this.$router.push('/login')
          this.$modal('genericModal').close()
        },
        btnConfirmText: 'SIM',
        btnCancelAction: () => {
          this.$modal('genericModal').close()
        },
        btnCancelText: 'NÃO'
      })
    }
  },

  mounted () {
    this.$eventBus.$on('loading-page', (toggle) => (this.loading = toggle))
  }
}
</script>

<style lang="stylus">
.v-application .menu-app__item-logout * {
  color: #F44336;
}
</style>
