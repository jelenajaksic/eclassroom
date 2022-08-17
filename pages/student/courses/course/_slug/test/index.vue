<template>
  <div v-if="course">
    <app-header>
      <template slot="title">
        <h1> {{ course.title }} </h1>
      </template>
      <template slot="headerButtons">
        <app-button
          :disabled="currentQuestion === 0"
          class="mr-4"
          label="Previous"
          @click="decrementSection"
        />
        <app-button
          :label="forwardButtonLabel"
          @click="incrementSection"
        />
      </template>
      <template slot="navigation">
        <app-back-button label="< Back to Course" :link="`/student/courses/course/${course.slug}`" />
      </template>
    </app-header>
    <v-progress-linear
      rounded
      :value="progress.toString()"
    />
    <student-section
      :section="currentSection"
      :is-test="true"
      @input="addToScore"
    />
    <app-dialog
      v-if="openDialog"
      :open-dialog="openDialog"
      :title="`Your score: ${finalScorePercentage}`"
      text="You have completed the final test for this course."
      primary-button-label="Back To Course"
      @primary="backToCourse"
    >
    </app-dialog>
  </div>
</template>

<script>
import AppHeader from '../../../../../../components/common/AppHeader'
import AppButton from '../../../../../../components/common/AppButton'
import AppDialog from '../../../../../../components/common/AppDialog'
import AppBackButton from '../../../../../../components/common/AppBackButton'
import { ICONS, QUESTION_TYPES, SECTION_TYPES } from '../../../../../../common/commonHelper'
import StudentSection from '../../../../../../components/lessons/student/StudentSection'

export default {
  name: 'CourseTestPage',
  components: {
    AppHeader,
    AppButton,
    AppDialog,
    StudentSection,
    AppBackButton
  },
  data () {
    return {
      ICONS,
      QUESTION_TYPES,
      SECTION_TYPES,
      openDialog: false,
      currentQuestion: 0,
      score: {},
      finalScore: 0
    }
  },
  computed: {
    course () {
      return this.$store.getters['courses/getActiveCourse']
    },
    testSections () {
      return this.course.lessons.map(lesson => lesson.sections.filter(section => section.type === SECTION_TYPES.QUESTION))[0]
    },
    currentSection () {
      return this.testSections[this.currentQuestion]
    },
    progress () {
      return this.openDialog ? 100 : Math.round((this.currentQuestion / this.testSections.length) * 100)
    },
    isProgressComplete () {
      return this.currentQuestion === this.testSections.length - 1
    },
    forwardButtonLabel () {
      return this.isProgressComplete ? 'Finish' : 'Next'
    }
  },
  created () {
    this.testSections.forEach((section) => {
      this.score[section.id] = false
    })
  },
  methods: {
    decrementSection () {
      this.currentQuestion = this.currentQuestion - 1
    },
    incrementSection () {
      if (this.isProgressComplete) {
        this.finishTest()
      } else {
        this.currentQuestion = this.currentQuestion + 1
      }
    },
    finishTest () {
      this.openDialog = true
    },
    backToCourse () {
      this.$router.go(-1)
    },
    addToScore (answer) {
      this.score[answer.id] = answer.value
      console.log(this.score)
    },
    finalScorePercentage () {
      this.finalScore = 0
      this.score.forEach((score) => {
        console.log(score)
        if (score) {
          this.finalScore = this.finalScore + 1
        }
      })
      return this.finalScore === this.testSections.length ? '100%' : `${Math.round((this.finalScore / this.testSections.length) * 100)}%`
    }
  }
}
</script>
