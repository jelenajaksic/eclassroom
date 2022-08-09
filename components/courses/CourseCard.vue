<template>
  <v-hover>
    <template #default="{ hover }">
      <v-card
        v-if="data"
        class="card-default mr-4 mb-4 pa-4"
        :elevation="hover ? 2 : 0"
        @click="$emit('select', data.slug)"
      >
        <v-img
          src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
          height="200px"
        />
        <v-overlay
          v-if="data.shortDescription"
          absolute
          color="white"
          :value="hover"
          opacity="1"
          class="mt-4"
          style="height: 200px"
        >
          <span class="overlay-text"> {{ data.shortDescription }} </span>
        </v-overlay>
        <v-card-title v-if="data.title">
          {{ data.title }}
        </v-card-title>

        <v-card-subtitle v-if="data.subtitle">
          {{ data.subtitle }}
        </v-card-subtitle>
        <v-progress-linear v-if="user === USERS.STUDENT && data.progress" rounded :value="data.progress.toString()" />
      </v-card>
    </template>
  </v-hover>
</template>

<script>
import { USERS } from '../../common/commonHelper'

export default {
  name: 'CourseCard',
  props: {
    data: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      show: false,
      USERS
    }
  },
  computed: {
    user () {
      return this.$store.getters.getUser
    }
  }
}
</script>

<style lang="scss" scoped>
  .card-default {
    cursor: pointer;
  }
  .overlay-text {
    color: #000000;
    opacity: 50%;
  }
</style>
