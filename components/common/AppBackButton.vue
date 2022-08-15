<template>
  <nuxt-link :to="link">
    <p class="back-link">
      {{ label }}
    </p>
  </nuxt-link>
</template>

<script>
export default {
  name: 'AppBackButton',
  props: {
    label: {
      type: String,
      default: ''
    },
    link: {
      type: String,
      default: '/'
    }
  }
}
</script>

<style lang="scss" scoped>
.nuxt-link-active {
  text-decoration: none;
}
.back-link {
  color: gray;

  &:hover {
    color: #627cda;
  }
}
</style>
