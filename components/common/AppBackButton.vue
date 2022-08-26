<template>
  <nuxt-link v-if="link" :to="link" class="back-link-wrapper">
    <p class="back-link" @click="$emit('click', $event)">
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
.back-link-wrapper {
  text-decoration: none;
  color: gray;

  &:hover {
    color: #627cda;
  }
}
.back-link {
  color: gray;

  &:hover {
    color: #627cda;
  }
}
</style>
