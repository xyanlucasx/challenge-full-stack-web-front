<script>
import fieldMixin from './BFieldMixin'

export default {
  name: 'BFieldText',
  mixins: [fieldMixin],

  components: {
    BFieldBase: () => import('./BFieldBase'),
    BFieldMask: () => import('./BFieldMask')
  }
}
</script>

<template>
  <v-flex>
    <component
      @blur="(v) => $emit('blur', v)"
      @input="(v) => $emit('input', v)"
      @focus="(v) => $emit('focus', v)"
      @change="(v) => $emit('change', v)"
      @click:append="(v) => $emit('click:append', v)"
      :icon="icon"
      :mask="mask"
      :label="label"
      :value="value"
      :rules="rules"
      :loading="loading"
      :append-icon="icon"
      :clearable="clearable"
      :onlyNumeric="onlyNumeric"
      :disabled="loading || disabled"
      :error-messages="errorMessages"
      :is="mask ? 'b-field-mask' : 'b-field-base'"
      :type="type"
    />
  </v-flex>
</template>
