<template>
  <v-radio-group v-model="correctAnswer">
    <v-radio
      v-for="(answer, index) in formattedAnswers"
      :id="`${answer}-${index}`"
      :key="index"
      :label="answer"
      :value="answer"
      :readonly="readonly"
      class="mb-8"
    />
  </v-radio-group>
</template>

<script>

export default {
  name: 'CheckboxInput',
  props: {
    answers: {
      type: Array,
      default: () => []
    },
    readonly: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    formattedAnswers () {
      return this.answers.map(answer => answer.label)
    },
    correctAnswer: {
      get () {
        return this.answers.find(answer => answer.correct === true)?.label
      },
      set (value) {
        this.answers.find(answer => answer.correct === true).label = value
      }
    }
  }
}
</script>
