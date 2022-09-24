<script>
import fieldMixin from './BFieldMixin'

export default {
  name: 'BFieldMask',

  mixins: [fieldMixin],

  components: {
    BFieldBase: () => import('./BFieldBase')
  }
}
</script>

<template>
  <v-flex>
    <b-field-base
      @blur="(v) => $emit('blur', v)"
      @input="(v) => $emit('input', v)"
      @focus="(v) => $emit('focus', v)"
      @change="(v) => $emit('change', v)"
      :label="label"
      :icon="icon"
      :value="value"
      :rules="rules"
      :loading="loading"
      :append-icon="icon"
      :onlyNumeric="onlyNumeric"
      :disabled="loading || disabled"
      :error-messages="errorMessages"
      v-mask="mask"
    />
  </v-flex>
</template>
