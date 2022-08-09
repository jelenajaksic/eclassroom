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
      >
        <template #label>
          <div>
            {{ answer }}
          </div>
          <v-scroll-x-transition>
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
  }
}
</script>

<style lang="scss" scoped>
.radio-wrapper {
  display: flex;
}
</style>
