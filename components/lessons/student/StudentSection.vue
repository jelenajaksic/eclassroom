<template>
  <v-container v-if="section" class="section-wrapper">
    <v-row align="start" justify="start">
      <v-col v-if="section.image" md="5" lg="5">
        <v-img
          :src="`http://localhost:8080/files?filename=${section.image}`"
          contain
          height="100%"
          max-height="50vh"
        />
      </v-col>
      <v-col :md="section.image ? '7' : '12'" :lg="section.image ? '7' : '12'">
        <v-row v-if="section.title">
          <v-col>
            <h2>
              {{ section.title }}
            </h2>
          </v-col>
        </v-row>
        <v-row v-if="section.description">
          <v-col>
            <p class="text">
              {{ section.description }}
            </p>
          </v-col>
        </v-row>
        <v-row v-if="isQuestion">
          <v-col>
            <p v-if="section.question && section.question.description" class="text">
              {{ section.question.description }}
            </p>
          </v-col>
        </v-row>
        <v-row v-if="isQuestion && section.question.type === QUESTION_TYPES.TEXT">
          <v-col>
            <text-stud
              :answers="section.question.answers"
              :is-test="isTest"
              @input="e => $emit('input', { id: section.question.id, value: e })"
            />
          </v-col>
        </v-row>
        <v-row v-if="isQuestion && section.question.type === QUESTION_TYPES.MULTISELECT">
          <v-col>
            <checkbox-stud
              :answers="section.question.answers"
              :is-test="isTest"
              @input="e => $emit('input', { id: section.question.id, value: e })"
            />
          </v-col>
        </v-row>
        <v-row v-if="isQuestion && section.question.type === QUESTION_TYPES.SINGLE_SELECT">
          <v-col>
            <radio-stud
              :answers="section.question.answers"
              :is-test="isTest"
              @input="e => $emit('input', { id: section.question.id, value: e })"
            />
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { QUESTION_TYPES, SECTION_TYPES } from '../../../common/commonHelper'
import CheckboxStud from '../../common/input/student/CheckboxStud'
import RadioStud from '../../common/input/student/RadioStud'
import TextStud from '../../common/input/student/TextStud'

export default {
  name: 'StudentSection',
  components: {
    CheckboxStud,
    RadioStud,
    TextStud
  },
  props: {
    section: {
      type: Object,
      default: () => {}
    },
    isTest: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      SECTION_TYPES,
      QUESTION_TYPES
    }
  },
  computed: {
    isQuestion () {
      return this.section.type === SECTION_TYPES.QUESTION
    }
  }
}
</script>

<style lang="scss" scoped>
.section-wrapper {
  margin: 8rem auto 0;
  width: 80%;
}

.text {
  text-align: justify;
  font-size: 1.25rem;
}
</style>
