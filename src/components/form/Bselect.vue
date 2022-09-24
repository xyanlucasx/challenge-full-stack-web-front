<!-- eslint-disable vue/require-prop-type-constructor -->
<script>
import { ValidationProvider } from 'vee-validate'

export default {
  name: 'BSelect',

  props: {
    label: String,
    rules: String,
    options: Array,
    loading: Boolean,
    disabled: Boolean,
    searcher: Function,
    value: String | Number,
    autocomplete: Boolean,
    errorMessages: Boolean
  },

  data: () => ({
    term: '',
    fnSearch: null,
    searching: false,
    optionsLocal: []
  }),

  components: {
    ValidationProvider
  },

  watch: {
    term (value) {
      if (this.fnSearch && value !== this.value) {
        this.searching = true
        this.fnSearch(value)
      }
    }
  },

  methods: {
    async search (value) {
      try {
        this.optionsLocal = await this.searcher(value)
      } catch (e) {
        console.error(e)
      } finally {
        this.searching = false
      }
    }
  },

  created () {
    if (this.searcher) this.fnSearch = this.search
  }
}
</script>

<template>
  <v-flex>
    <validation-provider
      v-slot="{ errors }"
      :name="label || 'Este campo'"
      :rules="rules"
    >
      <v-autocomplete
        @blur="(v) => $emit('blur', v)"
        @focus="(v) => $emit('focus', v)"
        @input="(v) => $emit('input', v)"
        @change="(v) => $emit('change', v)"
        :value="value"
        :items="options || optionsLocal"
        :search-input.sync="term"
        :disabled="loading || disabled"
        :label="label + (rules && rules.includes('required') ? '*' : '')"
        :error-messages="errorMessages.length > 0 ? errorMessages : errors"
        v-bind="$attrs"
        outlined
        v-if="autocomplete"
      >
        <template v-if="loading || searching" v-slot:append>
          <v-progress-circular size="25" indeterminate />
        </template>

        <template v-slot:no-data>
          <v-flex mx-3>
            <span v-if="!term && !searching"> Digite para buscar </span>

            <span v-else-if="searching">
              Buscando por <b>{{ term }}</b>
            </span>

            <span v-else>
              Nenhum registro encontrado com o termo <b>{{ term }}</b>
            </span>
          </v-flex>
        </template>
      </v-autocomplete>

      <v-select
        @blur="(v) => $emit('blur', v)"
        @input="(v) => $emit('input', v)"
        @focus="(v) => $emit('focus', v)"
        @change="(v) => $emit('change', v)"
        :value="value"
        :items="options"
        :disabled="loading || disabled"
        :label="label + (rules && rules.includes('required') ? '*' : '')"
        :error-messages="errorMessages.length > 0 ? errorMessages : errors"
        v-bind="$attrs"
        v-else
        outlined
      >
        <template v-if="loading" v-slot:append>
          <v-progress-circular size="25" indeterminate />
        </template>
      </v-select>
    </validation-provider>
  </v-flex>
</template>
