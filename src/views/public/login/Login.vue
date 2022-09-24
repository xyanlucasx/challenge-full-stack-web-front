<template>
  <v-main>
    <header-app />
    <v-card class="mx-auto md6 xs12 pa-6" max-width="550">
      <h1>Login</h1>
      <b-form @submit="login">
        <EmailDropdown
          class="mt-6"
          :emailTyped="email"
          @updateEmailField="email = $event"
          ref="emailDropdown"
          :loading="loading"
        />
        <b-field-text
          :loading="loading"
          class="mt-6"
          label="Senha"
          rules="required"
          v-model="password"
          :icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
          :type="showPass ? 'text' : 'password'"
          @click:append="showPass = !showPass"
        />

        <v-card-actions class="justify-center">
          <v-spacer />
          <v-btn depressed :loading="loading" color="primary" type="submit"> Logar </v-btn>
        </v-card-actions>
      </b-form>
    </v-card>
    <router-view />
  </v-main>
</template>

<script>
import formMixinVue from '../../../mixins/form.mixin.vue'
import { mapActions } from 'vuex'
export default {
  name: 'Login',
  mixins: [formMixinVue],
  components: {
    HeaderApp: () => import('@/components/header/HeaderApp'),
    EmailDropdown: () => import('@/components/inputs/EmailDropdown')
  },
  data() {
    return {
      email: '',
      password: '',
      loading: false,
      showPass: false
    }
  },
  methods: {
    ...mapActions(['setUser']),

    async login() {
      try {
        this.loading = true
        const { data } = await this.$api.post('/v1/authentication', {
          email: this.email,
          password: this.password
        })
        this.setUser(data)
        this.$toast({
          text: 'Logado com sucesso',
          type: 'success',
          duration: 3000
        })
        this.$router.push('/')
      } catch (error) {
        this.$toast({
          text: 'Usuário não encontrado ou senha incorreta',
          type: 'warning',
          duration: 3000
        })
      } finally {
        this.loading = false
      }
    }
  }
}
</script>
