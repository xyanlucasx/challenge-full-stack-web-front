<script>
import fieldMixin from './BFieldMixin'

export default {
  name: 'BFieldBase',
  mixins: [fieldMixin]
}
</script>

<template>
  <v-flex>
    <validation-provider
      v-slot="{ errors }"
      :name="label || 'Este campo'"
      :rules="rules"
    >
      <v-text-field
        @change="(v) => $emit('change', v)"
        @input="(v) => $emit('input', v)"
        @blur="(v) => $emit('blur', v)"
        @focus="(v) => $emit('focus', v)"
        @keypress="(event) => (onlyNumeric ? onlyNumber(event) : event)"
        @click:append="(v) => $emit('click:append', v)"
        :value="value"
        :append-icon="icon"
        :clearable="clearable"
        :disabled="loading || disabled"
        :inputmode="onlyNumeric ? 'numeric' : 'text'"
        :label="label + (rules && rules.includes('required') ? '*' : '')"
        :error-messages="errorMessages.length > 0 ? errorMessages : errors"
        :type="type"
        outlined
      >
        <template v-if="loading" v-slot:append>
          <v-progress-circular indeterminate size="25" />
        </template>
      </v-text-field>
    </validation-provider>
  </v-flex>
</template>

<style lang="stylus">
.theme--light.v-text-field--outlined:not(.v-input--is-focused).v-input--is-disabled>.v-input__control>.v-input__slot
  background-color #ececec
</style>
