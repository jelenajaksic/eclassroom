<template>
  <div v-if="lesson">
    <app-header>
      <template slot="title">
        <h1 style="width: max-content;">
          {{ lesson.title }}
          <span v-if="lesson.sections.length" style="font-size: 1.5rem; font-weight: normal; display: inline-block;">
            {{ `(${currentSection + 1}/${lesson.sections.length})` }}
          </span>
        </h1>
      </template>
      <template slot="headerButtons">
        <app-button v-if="displayOverview" :label="overviewButtonLabel" class="mr-4" @click="startLesson" />
        <app-button
          v-if="!displayOverview"
          :disabled="currentSection === 0"
          class="mr-4"
          label="Previous"
          @click="updateCurrentSection(currentSection - 1)"
        />
        <app-button
          v-if="!displayOverview"
          :label="forwardButtonLabel"
          @click="isProgressComplete ? completeLesson() : updateCurrentSection(currentSection + 1)"
        />
      </template>
      <template slot="navigation">
        <app-back-button
          :label="`< Back to ${activeCourse.title}`"
          :link="`/student/courses/course/${activeCourse.slug}`"
          @click="saveProgress"
        />
      </template>
    </app-header>
    <lesson-overview
      v-if="displayOverview"
      :description="lesson.description"
      :image="lesson.image"
    />
    <v-progress-linear
      v-if="!displayOverview"
      rounded
      :value="progress.toString()"
    />
    <student-section
      v-if="!displayOverview"
      :section="lesson.sections[currentSection]"
    />
    <app-dialog
      v-if="openDialog"
      :open-dialog="openDialog"
      title="Lesson completed!"
      text="You can go back to course page, and proceed to the next lesson or take a test."
      primary-button-label="Back to Course"
      @primary="backToCourse"
    />
  </div>
</template>

<script>
import AppHeader from '../../../../../../components/common/AppHeader'
import AppButton from '../../../../../../components/common/AppButton'
import AppDialog from '../../../../../../components/common/AppDialog'
import AppBackButton from '../../../../../../components/common/AppBackButton'
import LessonOverview from '../../../../../../components/lessons/student/LessonOverview'
import { ICONS, QUESTION_TYPES, SECTION_TYPES } from '../../../../../../common/commonHelper'
import StudentSection from '../../../../../../components/lessons/student/StudentSection'

export default {
  name: 'LessonPageStudent',
  components: {
    AppHeader,
    AppButton,
    AppDialog,
    LessonOverview,
    StudentSection,
    AppBackButton
  },
  data () {
    return {
      ICONS,
      QUESTION_TYPES,
      SECTION_TYPES,
      displayOverview: true,
      openDialog: false,
      currentSection: 0
    }
  },
  computed: {
    user () {
      return this.$store.getters.getUser
    },
    lesson () {
      return this.$store.getters['courses/getActiveLesson']
    },
    activeCourse () {
      return this.$store.getters['courses/getActiveCourse']
    },
    lessonProgress () {
      return this.lesson.students[this.user.email]
    },
    lessonProgressFormatted () {
      return Math.round((this.lessonProgress / this.lesson.sections.length) * 100)
    },
    isProgressComplete () {
      return this.currentSection === this.lesson.sections.length - 1
    },
    forwardButtonLabel () {
      return this.isProgressComplete ? 'Done' : 'Next'
    },
    overviewButtonLabel () {
      if (this.isProgressComplete) {
        return 'Restart Lesson'
      }
      return this.currentSection ? 'Continue Lesson' : 'Start Lesson'
    },
    progress () {
      return this.openDialog ? 100 : Math.round((this.currentSection / this.lesson.sections.length) * 100)
    }
  },
  mounted () {
    this.currentSection = Number(this.lessonProgress)
  },
  methods: {
    startLesson () {
      this.displayOverview = false
      if (this.lesson.sections.length === (this.currentSection + 1)) {
        this.currentSection = 0
      }
    },
    updateCurrentSection (index) {
      this.currentSection = index
    },
    async completeLesson () {
      await this.saveProgress()
      this.openDialog = true
    },
    backToCourse () {
      this.$router.go(-1)
    },
    async saveProgress () {
      await this.$store.dispatch('courses/updateCurrentLessonSection', {
        courseID: this.activeCourse._id,
        lessonID: this.lesson._id,
        sectionIndex: this.currentSection.toString(),
        studentEmail: this.user.email
      })
    }
  }
}
</script>
