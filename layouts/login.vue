<template>
  <v-app dark>
    <v-main class="background-dark">
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'LoginLayout'
}
</script>

<style lang="scss" scoped>
.background-dark {
  //background-color: #314a5e;
  background-color: #dae9fe;
  width: 100%;
  height: 100%;
  margin: 0;
}
</style>
