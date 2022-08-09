<template>
  <div v-if="studentAnswers">
    <div v-for="(answer, index) in studentAnswers" :key="index" class="checkbox-wrapper">
      <v-checkbox
        :id="`${answer.label}-${index}`"
        v-model="answer.correct"
        :label="answer.label"
        @input="$emit('input', studentAnswers)"
      />
      <v-scroll-x-transition>
        <v-icon
          v-if="answer.correct && answers[index].correct"
          color="success"
          class="ml-4"
        >
          {{ ICONS.CHECK }}
        </v-icon>
        <v-icon
          v-if="answer.correct && !answers[index].correct"
          color="error"
          class="ml-4"
        >
          {{ ICONS.CLOSE }}
        </v-icon>
      </v-scroll-x-transition>
    </div>
  </div>
</template>

<script>
import { ICONS } from '../../../../common/commonHelper'

export default {
  name: 'CheckboxStudent',
  props: {
    answers: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      ICONS,
      studentAnswers: []
    }
  },
  created () {
    this.studentAnswers = this.answers.map(answer => ({
      ...answer,
      correct: false
    }))
  }
}
</script>

<style lang="scss" scoped>
.checkbox-wrapper {
  display: flex;
}
</style>
