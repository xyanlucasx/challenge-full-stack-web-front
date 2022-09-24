<template>
  <v-container>
    <header-app />

    <transition name="fade" mode="out-in">
      <router-view />
    </transition>
    <box title="Alunos">
      <v-row>
        <v-col cols="12" md="4">
          <v-btn
            outlined
            color="primary"
            @click="
              studentToUpdate = null
              modalStudent = true
            "
          >
            <v-icon>add</v-icon> Aluno
          </v-btn>
        </v-col>
      </v-row>

      <v-flex>
        <v-layout>
          <v-flex xs12 white mb-3>
            <v-data-table
              :items="students"
              :loading="loading"
              :headers="headers"
              hide-default-footer
            >
              <template v-slot:[`item.createdAt`]="{ item }">
                {{ item.createdAt | formatDateLocaleDateTime }}
              </template>

              <template v-slot:[`item.updatedAt`]="{ item }">
                <v-icon
                  color="primary"
                  @click="
                    studentToUpdate = item
                    modalStudent = true
                  "
                >
                  create
                </v-icon>
              </template>

              <template v-slot:[`item.id`]="{ item }">
                <v-icon color="primary" @click="deleteStudentModal(item.id)">
                  delete
                </v-icon>
              </template>
            </v-data-table>

            <v-container
              lg6
              xs12
              mt-4
              mx-auto
              text-center
              v-if="students.length > 0"
              class="float-button-group-xs"
            >
              <v-pagination
                class="hide-xs-400 mx-auto"
                :length="pagination.count"
                v-model="pagination.current"
                :total-visible="10"
              />

              <v-flex class="show-xs-400">
                <v-row
                  no-gutters
                  class="d-flex align-center justify-space-between"
                >
                  <v-flex xs3>
                    <v-btn
                      fab
                      small
                      depressed
                      color="#f1f1f1"
                      @click="prevPage"
                      :style="{ opacity: pagination.current > 1 ? 1 : 0.2 }"
                    >
                      <v-icon>navigate_before</v-icon>
                    </v-btn>
                  </v-flex>

                  <v-flex xs5>
                    <v-select
                      dense
                      outlined
                      hide-details
                      v-model="pagination.current"
                      :items="
                        Array(pagination.count)
                          .fill(0)
                          .map((num, index) => index + 1)
                      "
                    />
                  </v-flex>

                  <v-flex xs3>
                    <v-btn
                      fab
                      small
                      depressed
                      color="#f1f1f1"
                      @click="nextPage"
                      :style="{
                        opacity: pagination.current < pagination.count ? 1 : 0.2
                      }"
                    >
                      <v-icon>navigate_next</v-icon>
                    </v-btn>
                  </v-flex>
                </v-row>
              </v-flex>
            </v-container>
          </v-flex>
        </v-layout>
      </v-flex>
    </box>
    <student-modal
      v-if="modalStudent"
      v-model="modalStudent"
      :update="studentToUpdate"
    />
  </v-container>
</template>
<script>
import { formatDateLocaleDateTime } from '@/utils/formatDate'

export default {
  name: 'Student',

  watch: {
    'pagination.current' (value) {
      this.loadStudents(value)
    },
    modalStudent (value) {
      if (value === undefined) this.loadStudents()
    }
  },

  components: {
    HeaderApp: () => import('@/components/header/HeaderApp'),
    StudentModal: () =>
      import('@/views/private/students/components/StudentModal')
  },

  data: () => ({
    loading: true,
    students: [],
    modalStudent: false,
    studentToUpdate: null,
    headers: [
      {
        text: 'Registro Acadêmico',
        align: 'left',
        sortable: true,
        value: 'ra'
      },
      {
        text: 'Nome',
        align: 'left',
        sortable: false,
        value: 'name'
      },
      {
        text: 'CPF',
        align: 'left',
        sortable: true,
        value: 'cpf'
      },
      {
        text: 'Email',
        align: 'left',
        sortable: false,
        value: 'email'
      },
      {
        text: 'Data de criação',
        align: 'left',
        sortable: true,
        value: 'createdAt'
      },
      {
        text: 'Editar',
        align: 'center',
        sortable: false,
        value: 'updatedAt'
      },
      {
        text: 'Deletar',
        align: 'center',
        sortable: false,
        value: 'id'
      }
    ],

    pagination: {
      current: 1,
      perPage: 10,
      total: 0,
      count: 0
    }
  }),

  filters: {
    formatDateLocaleDateTime
  },

  methods: {
    prevPage () {
      if (this.pagination.current > 1) this.pagination.current -= 1
    },
    nextPage () {
      if (this.pagination.current < this.pagination.count) {
        this.pagination.current += 1
      }
    },
    async deleteStudent (id) {
      try {
        await this.$api.delete(`/v1/students/${id}`)
        this.$toast({
          text: 'Aluno deletado com sucesso',
          type: 'success',
          duration: 3000
        })
      } catch (e) {
        this.$toast({
          text: 'Erro ao deletar aluno',
          type: 'error',
          duration: 3000
        })
      } finally {
        this.loadStudents()
      }
    },
    deleteStudentModal (id) {
      this.$modal('genericModal', 450).open({
        type: 'warning',
        title: 'Atenção',
        text: 'Deseja deletar esse aluno?',
        btnConfirmText: 'SIM',
        btnConfirmAction: () => {
          this.deleteStudent(id)
          this.$modal('genericModal').close()
        },
        btnCancelText: 'NÃO',
        btnCancelAction: () => {
          this.$modal('genericModal').close()
        }
      })
    },
    async loadStudents () {
      try {
        this.loading = true
        this.$eventBus.$emit('loading-page', true)
        const offset =
          this.pagination.perPage * this.pagination.current -
          this.pagination.perPage
        const limit = this.pagination.perPage
        const url = `/v1/students?limit=${limit}&skip=${offset}&`
        const { data } = await this.$api.get(url)
        this.students = data.data
        this.pagination.total = data.count
        if (this.pagination.total > 0) {
          this.pagination.count = Math.ceil(
            this.pagination.total / this.pagination.perPage
          )
        }
      } catch (e) {
        this.$toast({
          text: 'Erro ao carregar a lista de resultados',
          type: 'error',
          duration: 3000
        })
      } finally {
        this.loading = false
        this.$eventBus.$emit('loading-page', false)
      }
    }
  },

  mounted () {
    this.loadStudents()
  }
}
</script>
