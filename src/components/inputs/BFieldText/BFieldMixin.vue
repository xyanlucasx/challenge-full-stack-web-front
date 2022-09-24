<!-- eslint-disable vue/require-prop-type-constructor -->
<script>
import { mask } from 'vue-the-mask'

import { ValidationProvider } from 'vee-validate'

export default {
  name: 'BFieldMixin',

  components: {
    ValidationProvider
  },

  directives: {
    mask
  },

  props: {
    disabled: {
      type: Boolean,
      default: false
    },

    errorMessages: {
      type: Array,
      default: () => []
    },

    label: {
      type: String,
      default: null
    },

    loading: {
      type: Boolean,
      default: false
    },

    icon: {
      type: String,
      default: null
    },

    mask: {
      type: String | Array,
      default: null
    },

    value: {
      type: String | Number,
      default: null
    },

    rules: {
      type: String,
      default: null
    },

    onlyNumeric: {
      type: Boolean,
      default: false
    },

    clearable: {
      type: Boolean,
      default: false
    },
    type: {
      type: String
    }
  },

  methods: {
    onlyNumber ($event) {
      const keyCode = $event.keyCode ? $event.keyCode : $event.which

      if (keyCode < 48 || keyCode > 57) {
        $event.preventDefault()
      }
    }
  }
}
</script>
