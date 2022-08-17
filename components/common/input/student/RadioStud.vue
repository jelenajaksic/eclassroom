<template>
  <div v-if="formattedAnswers">
    <v-radio-group v-model="checkedAnswer" class="radio-wrapper">
      <v-radio
        v-for="(answer, index) in formattedAnswers"
        :id="`${answer}-${index}`"
        :key="index"
        :label="answer"
        :value="answer"
        class="mb-8"
        @change="emitAnswer"
      >
        <template #label>
          <div>
            {{ answer }}
          </div>
          <v-scroll-x-transition v-if="!isTest">
            <v-icon
              v-if="answer === checkedAnswer && answers[index].correct"
              color="success"
              class="ml-4"
            >
              {{ ICONS.CHECK }}
            </v-icon>
            <v-icon
              v-if="answer === checkedAnswer && !answers[index].correct"
              color="error"
              class="ml-4"
            >
              {{ ICONS.CLOSE }}
            </v-icon>
          </v-scroll-x-transition>
        </template>
      </v-radio>
    </v-radio-group>
  </div>
</template>

<script>
import { ICONS } from '../../../../common/commonHelper'

export default {
  name: 'RadioStudent',
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
      checkedAnswer: ''
    }
  },
  computed: {
    formattedAnswers () {
      return this.answers.map(answer => answer.label)
    },
    correctAnswer () {
      return this.answers.find(answer => answer.correct === true)?.label
    }
  },
  methods: {
    emitAnswer () {
      console.log('answer', this.checkedAnswer === this.correctAnswer)
      if (this.isTest) {
        this.$emit('input', this.checkedAnswer === this.correctAnswer)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.radio-wrapper {
  display: flex;
}
</style>
