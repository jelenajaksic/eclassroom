<template>
  <div v-if="test">
    <app-header>
      <template slot="title">
        <h1 style="width: max-content;">
          {{ test.title }}
          <span v-if="test.sections.length" style="font-size: 1.5rem; font-weight: normal; display: inline;">
            {{ `(${currentQuestion + 1}/${test.sections.length})` }}
          </span>
        </h1>
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
        <app-back-button
          :label="`< Back to ${course.title}`"
          :link="`/student/courses/course/${course.slug}`"
          @click="saveProgress"
        />
      </template>
    </app-header>
    <v-progress-linear
      rounded
      :value="progress.toString()"
    />
    <student-section
      :section="test.sections[currentQuestion]"
      :is-test="true"
      @input="addToScore"
    />
    <app-dialog
      v-if="openDialog"
      :open-dialog="openDialog"
      :title="`Your score: ${finalScorePercentage()}%`"
      text="You have completed the final test for this course."
      primary-button-label="Back To Course"
      @primary="backToCourse"
    />
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
      finalScore: 0,
      previousScore: 0
    }
  },
  computed: {
    user () {
      return this.$store.getters.getUser
    },
    course () {
      return this.$store.getters['courses/getActiveCourse']
    },
    test () {
      return this.$store.getters['courses/getActiveTest']
    },
    progress () {
      return this.openDialog ? 100 : Math.round((this.currentQuestion / this.test.sections.length) * 100)
    },
    isProgressComplete () {
      return this.currentQuestion === this.test.sections.length - 1
    },
    forwardButtonLabel () {
      return this.isProgressComplete ? 'Finish' : 'Next'
    }
  },
  created () {
    this.test.sections.forEach((section) => {
      this.score[section.id] = false
    })
    this.previousScore = parseInt(this.test.students[this.user.email])
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
    async finishTest () {
      await this.saveProgress()
      this.openDialog = true
    },
    backToCourse () {
      this.$router.go(-1)
    },
    addToScore (answer) {
      this.score[answer.id] = answer.value
    },
    finalScorePercentage () {
      this.finalScore = 0
      if (Object.keys(this.score).length) {
        Object.values(this.score).forEach((score) => {
          if (score) {
            this.finalScore = this.finalScore + 1
          }
        })
        return this.finalScore === this.test.sections.length ? '100' : `${Math.round((this.finalScore / this.test.sections.length) * 100)}`
      }
      return '0'
    },
    async saveProgress () {
      if (parseInt(this.finalScorePercentage()) > this.previousScore) {
        await this.$store.dispatch('courses/updateTestProgress', {
          courseID: this.course._id,
          testID: this.test._id,
          score: this.finalScorePercentage(),
          studentEmail: this.user.email
        })
      }
    }
  }
}
</script>
