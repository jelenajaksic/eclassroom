<template>
  <v-container class="lesson-overview-wrapper">
    <v-row justify="between">
      <v-col cols="12" md="5" lg="5">
        <v-img
          src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
          height="100%"
        />
      </v-col>
      <v-col cols="12" md="6" lg="6">
        <p class="lesson-desc">
          {{ description }}
        </p>
        <app-button :label="buttonLabel" :is-block="true" class="mt-10" @click="$emit('start', $event)" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import AppButton from '../../../components/common/AppButton'

export default {
  name: 'LessonOverview',
  components: {
    AppButton
  },
  props: {
    description: {
      type: String,
      default: ''
    }
  },
  computed: {
    buttonLabel () {
      return this.$store.getters['student-lesson/getOverviewButtonLabel']
    }
  }
}
</script>

<style lang="scss" scoped>
.lesson-overview-wrapper {
  width: 80%;
  margin: 8rem auto 0;
}
.lesson-desc {
  text-align: justify;
  font-size: 1.25rem;
}
</style>
