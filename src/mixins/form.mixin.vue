<script>
import { mapGetters } from 'vuex'
import { extend, ValidationProvider } from 'vee-validate'
import checkAccent from '@/utils/checkAccent'
import { isValidCPF } from '@/utils/validations'

extend('validate-accent', {
  validate: checkAccent,
  message: 'Não são permitidos acentos'
})

extend('cpf', {
  validate: isValidCPF,
  message: 'CPF inválido'
})

export default {
  name: 'form-mixin',

  components: {
    ValidationProvider
  },

  computed: {
    ...mapGetters(['getUser'])
  }
}
</script>
