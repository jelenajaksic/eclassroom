<template>
  <div style="display: flex; align-items: center">
    <v-textarea
      v-model="answer"
      label="Answer"
      type="textarea"
      auto-grow
      clearable-icon
      rows="1"
      style="max-width: 80%;"
      @input="emitAnswer"
    />
    <div>
      <v-scroll-x-transition v-if="!isTest">
        <v-icon
          v-if="answer === correctAnswer"
          color="success"
          class="ml-4"
        >
          {{ ICONS.CHECK }}
        </v-icon>
        <v-icon
          v-else-if="answer !== ''"
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
  name: 'TextInputStudent',
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
      answer: ''
    }
  },
  computed: {
    correctAnswer () {
      return this.answers[0].label
    }
  },
  methods: {
    emitAnswer () {
      if (this.isTest) {
        this.$emit('input', this.answer === this.correctAnswer)
      }
    }
  }
}
</script>
