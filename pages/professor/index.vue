<template>
  <div>
    <h1 class="mt-2">
      {{ `Welcome back, ${user}!` }}
    </h1>
  </div>
</template>

<script>
export default {
  name: 'HomeProfessorPage',
  computed: {
    user () {
      return this.$store.getters.getUser?.name
    }
  }
}
</script>
