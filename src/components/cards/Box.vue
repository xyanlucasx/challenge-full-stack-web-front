<template>
  <div>
    <v-layout>
      <v-flex sx6>
        <slot name="title" />
        <h2>{{ title }}</h2>
      </v-flex>

      <v-flex sx6 text-right align-self-center>
        <slot name="actions" />
      </v-flex>
    </v-layout>

    <v-card>
      <v-card-text>
        <slot />
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'box',

  props: {
    title: String
  }
}
</script>
