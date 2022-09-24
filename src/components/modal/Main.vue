<script>
import componentModals from './components'

export default {
  name: 'Modal',

  components: componentModals,

  data: () => ({
    components: []
  }),

  methods: {
    change (index, value) {
      if (!value) {
        this.$eventBus.$emit(`close-${this.components[index].key}`)
        setTimeout(() => this.components.splice(index, 1), 100)
      }
    }
  },

  mounted () {
    this.$eventBus.$on('modal', async ({ component, content, width, props }) => {
      this.components.push({
        key: component,
        content,
        module: component,
        width,
        open: false,
        props
      })
      const index = this.components.findIndex((item) => item.key === component)
      setTimeout(() => (this.components[index].open = true), 100)

      this.$eventBus.$on(`close-${this.components[index].key}`, () => {
        this.components[index].open = false
        setTimeout(() => this.components.splice(index, 1), 100)
      })
    })
  }
}
</script>

<template>
  <v-flex>
    <v-dialog
      persistent
      scrollable
      :key="component.key"
      :value="component.open"
      :max-width="component.width"
      @input="(value) => change(index, value)"
      v-for="(component, index) in components"
    >
      <component :is="component.module" v-bind="component.content" v-model="component.props" />
    </v-dialog>
  </v-flex>
</template>
