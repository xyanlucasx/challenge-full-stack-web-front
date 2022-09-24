<template>
  <validation-observer ref="observer">
    <form @submit.prevent="submit">
      <slot />
    </form>
  </validation-observer>
</template>

<script>
import { required, email } from 'vee-validate/dist/rules'

import { extend, ValidationObserver, setInteractionMode } from 'vee-validate'

setInteractionMode('eager')

extend('required', {
  ...required,
  message: '{_field_} é obrigatório'
})

extend('email', {
  ...email,
  message: 'Email invalido'
})

export default {
  components: {
    ValidationObserver
  },

  methods: {
    async submit (evt) {
      evt.preventDefault()
      const valid = await this.$refs.observer.validate()

      if (valid) {
        this.$emit('submit')
      } else {
        this.$emit('invalid')
      }
    }
  }
}
</script>
