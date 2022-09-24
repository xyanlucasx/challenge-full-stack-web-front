<template>
  <b-select
    autocomplete
    clearable
    v-model="emailField"
    :options="listEmailsAux"
    :searcher="updateListEmails"
    label="E-mail"
    :rules="rules"
    outlined
    :loading="loading"
  >
  </b-select>
</template>

<script>
export default {
  name: 'EmailDropdown',
  inheritAttrs: false,
  props: {
    domains: {
      type: Array,
      default: () => [
        '@gmail.com',
        '@hotmail.com',
        '@yahoo.com',
        '@outlook.com',
        '@bol.com.br',
        '@uol.com.br',
        '@terra.com.br'
      ]
    },
    emailTyped: {
      type: String,
      default: '',
      required: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    rules: {
      type: String,
      default: 'required|email|validate-accent'
    }
  },
  data () {
    return {
      listEmailsAux: []
    }
  },
  computed: {
    emailField: {
      get () {
        return this.emailTyped
      },
      set (value) {
        this.$emit('updateEmailField', value)
        this.updateListEmails(value)
      }
    }
  },
  methods: {
    updateListEmails (email) {
      if (!email) {
        this.listEmailsAux = []
        return
      }
      if (email.indexOf('@') === -1) {
        this.listEmailsAux = this.domains.map(
          (sugestedDomain) => `${email || ''}${sugestedDomain}`
        )
        return
      }
      const [username, domain] = email.split('@')
      this.listEmailsAux = this.domains.reduce((accAux, sugestedDomain) => {
        if (sugestedDomain.indexOf(domain) !== -1) {
          accAux.push(`${username}${sugestedDomain}`)
        }
        return accAux
      }, [])

      if (this.listEmailsAux.length <= 1) {
        this.listEmailsAux = [email]
        this.$emit('updateEmailField', email)
      }
    }
  }
}
</script>
