<template>
  <div v-if="studentAnswers">
    <div v-for="(answer, index) in studentAnswers" :key="index" class="checkbox-wrapper">
      <v-checkbox
        :id="`${answer.label}-${index}`"
        v-model="answer.correct"
        :label="answer.label"
        @select="emitAnswer"
      />
      <v-scroll-x-transition v-if="!isTest">
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
    },
    isTest: {
      type: Boolean,
      default: false
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
  },
  methods: {
    emitAnswer () {
      if (this.isTest) {
        let isAnswerCorrect = true
        this.studentAnswers.forEach((answer, index) => {
          if (isAnswerCorrect) {
            isAnswerCorrect = this.answers[index].correct === answer.correct
          }
        })
        console.log(isAnswerCorrect)
        this.$emit('input', isAnswerCorrect)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.checkbox-wrapper {
  display: flex;
}
.v-input--checkbox {
  margin: 0;
}
</style>
