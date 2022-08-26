<template>
  <v-container mb-4>
    <v-row align="center" justify="center" cols="12">
      <v-col>
        <slot name="title" />
      </v-col>
      <v-col style="display: flex; justify-content: flex-end;">
        <slot name="headerButtons" />
      </v-col>
    </v-row>
    <v-row>
      <v-col style="margin-top: -1px;">
        <slot name="navigation" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'AppHeader'
}
</script>
