<template>
  <v-container v-if="section" class="section-wrapper">
    <v-row>
      <p v-if="section.description" class="text">
        {{ section.description }}
      </p>
    </v-row>
    <v-row v-if="isQuestion">
      <p v-if="section.question && section.question.description" class="text">
        {{ section.question.description }}
      </p>
    </v-row>
    <v-row v-if="isQuestion && section.question.type === QUESTION_TYPES.TEXT">
      <text-input label="Type your answer here" />
    </v-row>
    <v-row v-if="isQuestion && section.question.type === QUESTION_TYPES.MULTISELECT">
      <checkbox-stud :answers="section.question.answers" />
    </v-row>
    <v-row v-if="isQuestion && section.question.type === QUESTION_TYPES.SINGLE_SELECT">
      <radio-stud :answers="section.question.answers" />
    </v-row>
    <!--    <v-row>-->
    <!--      <app-button :label="buttonLabel" class="mt-10" @click="onClick" />-->
    <!--    </v-row>-->
  </v-container>
</template>

<script>
import { QUESTION_TYPES, SECTION_TYPES } from '../../../common/commonHelper'
// import AppButton from '../../common/AppButton'
import TextInput from '../../common/input/TextInput'
import CheckboxStud from '../../common/input/student/CheckboxStud'
import RadioStud from '../../common/input/student/RadioStud'

export default {
  name: 'StudentSection',
  components: {
    // AppButton,
    TextInput,
    CheckboxStud,
    RadioStud
  },
  props: {
    section: {
      type: Object,
      default: () => {}
    }
    // progress: {
    //   type: Number,
    //   default: 0
    // }
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
    // isProgressComplete () {
    //   return this.progress === 100
    // },
    // buttonLabel () {
    //   return this.isProgressComplete ? 'Done' : 'Next'
    // }
  }
  // methods: {
  //   onClick () {
  //     if (this.isProgressComplete) {
  //       this.$emit('done')
  //     } else {
  //       this.$emit('next')
  //     }
  //   }
  // }
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
