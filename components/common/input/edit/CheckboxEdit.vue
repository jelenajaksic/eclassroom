<template>
  <draggable v-model="newSection.question.answers">
    <transition-group>
      <div v-for="(answer, index) in newSection.question.answers" :key="index" class="checkbox-input">
        <v-icon
          left
          light
          class="cursor-grab"
        >
          {{ ICONS.DRAG_VERTICAL }}
        </v-icon>
        <v-icon
          left
          light
          class="mr-5"
          @click="answer.correct = !answer.correct; $emit('update', newSection)"
        >
          {{ answer.correct ? ICONS.MULTISELECT_MARKED : ICONS.MULTISELECT_BLANK }}
        </v-icon>
        <v-text-field
          :ref="`question-${newSection.id}-answer-${index}`"
          v-model="answer.label"
          @input="$emit('update', newSection)"
          @keyup.enter="addAnswer"
        />
        <v-icon
          right
          light
          class="ml-5"
          @click="removeAnswer(index)"
        >
          {{ ICONS.CLOSE }}
        </v-icon>
      </div>
    </transition-group>
  </draggable>
</template>

<script>
import draggable from 'vuedraggable'
import { ICONS } from '../../../../common/commonHelper'

export default {
  name: 'CheckboxEdit',
  components: {
    draggable
  },
  props: {
    section: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      ICONS,
      newSection: JSON.parse(JSON.stringify(this.section))
    }
  },
  methods: {
    addAnswer () {
      this.newSection.question.answers.push({
        label: '',
        correct: false
      })
      this.$nextTick(() => this.$refs[`question-${this.newSection.id}-answer-${this.newSection.question.answers.length - 1}`][0].focus())
      this.$emit('update', this.newSection.question.answers)
    },
    removeAnswer (index) {
      this.newSection.question.answers.splice(index, 1)
      // eslint-disable-next-line no-return-assign
      this.newSection.question.answers.forEach(s => s.id = this.newSection.question.answers.indexOf(s))
      this.$emit('update', this.newSection.question.answers)
    }
  }
}
</script>

<style lang="scss" scoped>
.cursor-grab {
  cursor: grab;
}
.checkbox-input {
  display: flex;
  justify-content: flex-start;
}
</style>
