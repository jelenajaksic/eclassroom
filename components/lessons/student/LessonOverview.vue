<template>
  <v-container class="lesson-overview-wrapper">
    <v-row align="center">
      <v-col cols="12" md="6" lg="6">
        <v-img
          v-if="image"
          :src="image"
          contain
          height="100%"
        />
      </v-col>
      <v-col cols="12" md="5" lg="5">
        <p v-if="description" class="lesson-desc">
          {{ description }}
        </p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

export default {
  name: 'LessonOverview',
  props: {
    description: {
      type: String,
      default: ''
    },
    image: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>
.lesson-overview-wrapper {
  width: 90%;
  margin: 8rem auto 0;
}
.lesson-desc {
  text-align: justify;
  font-size: 1.25rem;
}
</style>
