<template>
  <v-dialog
    :value="value"
    @input="$emit('input')"
    fullscreen
    persistent
    transition="dialog-bottom-transition"
  >
    <v-card>
      <b-form @submit="update ? updateStudent() : createStudent()">
        <v-toolbar dark color="primary">
          <v-btn icon dark @click.native="$emit('input')">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>{{
            update ? 'Atualizar Aluno' : 'Cadastrar Aluno'
          }}</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark text type="submit" :loading="loading">
              {{ update ? 'Atualizar' : 'Cadastrar' }}
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-list three-line subheader>
          <v-list-item>
            <v-list-item-content>
              <v-container>
                <v-row>
                  <v-col cols="12" md="6">
                    <b-field-text
                      label="Nome do Aluno"
                      rules="required"
                      v-model="name"
                      :disabled="loading"
                    />
                  </v-col>
                  <v-col cols="12" md="6">
                    <EmailDropdown
                      :emailTyped="email"
                      @updateEmailField="email = $event"
                      ref="emailDropdown"
                      :loading="loading"
                    />
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" md="6">
                    <b-field-text
                      label="RA do Aluno"
                      rules="required"
                      v-model="ra"
                      :disabled="loading || update ? true : false"
                    />
                  </v-col>
                  <v-col cols="12" md="6">
                    <b-field-text
                      label="CPF do aluno"
                      rules="required|cpf"
                      v-model="cpf"
                      :mask="['###.###.###-##']"
                      :disabled="loading || update ? true : false"
                    />
                  </v-col>
                </v-row>
              </v-container>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </b-form>
    </v-card>
  </v-dialog>
</template>
<script>
import formMixin from '@/mixins/form.mixin.vue'

export default {
  name: 'StudentModal',

  props: ['value', 'update'],

  components: {
    EmailDropdown: () => import('@/components/inputs/EmailDropdown')
  },

  mixins: [formMixin],

  data: () => ({
    loading: false,
    name: '',
    email: '',
    cpf: '',
    ra: ''
  }),

  methods: {
    async populateStudentInfo () {
      this.name = this.update.name
      this.cpf = this.update.cpf
      this.ra = this.update.ra
      this.$refs.emailDropdown.updateListEmails(this.update.email)
      this.$nextTick(() => {
        this.$forceUpdate()
      })
    },

    async createStudent () {
      try {
        this.loading = true
        const payload = {
          name: this.name,
          email: this.email,
          ra: this.ra,
          cpf: this.cpf.replace(/\D/g, '')
        }

        const response = await this.$api.post('/v1/students/', payload)

        if (response) {
          this.$toast({
            text: `Aluno ${this.name} cadastrado com sucesso`,
            type: 'success',
            duration: 3000
          })
          this.$emit('input')
        }
      } catch (error) {
        this.$toast({
          text: 'Erro ao cadastrar aluno',
          type: 'error',
          duration: 3000
        })
      } finally {
        this.loading = false
      }
    },

    async updateStudent () {
      try {
        this.loading = true
        const payload = {
          name: this.name,
          email: this.email
        }

        const response = await this.$api.patch(
          `/v1/students/${this.update.id}`,
          payload
        )

        if (response) {
          this.$toast({
            text: `Agente ${this.name} atualizado com sucesso`,
            type: 'success',
            duration: 3000
          })
          this.$emit('input')
        }
      } catch (error) {
        this.$toast({
          text: 'Erro ao atualizar aluno',
          type: 'error',
          duration: 3000
        })
      } finally {
        this.loading = false
      }
    }
  },

  mounted () {
    setTimeout(() => {
      if (this.update) {
        this.populateStudentInfo()
      }
    }, 500)
  }
}
</script>
