<!-- eslint-disable vue/no-v-text-v-html-on-component -->
<template>
  <v-card class="flex mx-auto xs12">
    <v-toolbar dark :color="colorRef[type]" dense flat>
      <v-toolbar-title class="white--text">{{ title }}</v-toolbar-title>
    </v-toolbar>

    <v-flex>
      <v-card>
        <v-card-text class="pa-4" v-html="text"></v-card-text>

        <v-card-actions class="pt-0">
          <v-spacer></v-spacer>
          <v-btn text v-show="btnConfirmAction" @click="btnConfirmAction">{{
            btnConfirmText
          }}</v-btn>
          <v-btn text v-show="btnCancelAction" @click="btnCancelAction">{{
            btnCancelText
          }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-card>
</template>

<script>
export default {
  name: 'GenericModal',

  props: [
    'type',
    'title',
    'text',
    'btnConfirmText',
    'btnCancelText',
    'btnConfirmAction',
    'btnCancelAction'
  ],

  data: () => ({
    colorRef: {
      warning: '#ff9800',
      success: '#4caf50'
    }
  })
}
</script>
