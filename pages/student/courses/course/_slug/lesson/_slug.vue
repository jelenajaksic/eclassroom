<template>
  <div v-if="lesson">
    <app-header>
      <template slot="title">
        <h1> {{ lesson.title }} </h1>
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
        <v-breadcrumbs
          :items="breadcrumbsItems"
          divider="/"
          style="padding: 0 0 1rem;"
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
      text="Continue to the next lesson or go back to course page."
      primary-button-label="Next Lesson"
      secondary-button-label="Back To Course"
      @secondary="backToCourse"
      @primary="goToNextLesson"
    />
  </div>
</template>

<script>
import AppHeader from '../../../../../../components/common/AppHeader'
import AppButton from '../../../../../../components/common/AppButton'
import AppDialog from '../../../../../../components/common/AppDialog'
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
    StudentSection
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
    breadcrumbsItems () {
      return [
        {
          text: 'Courses',
          disabled: false,
          href: '/student/courses'
        },
        {
          text: `${this.activeCourse.title}`,
          disabled: false,
          href: `/student/courses/course/${this.activeCourse.slug}`
        },
        {
          text: `${this.lesson.title}`,
          disabled: true,
          href: ''
        }
      ]
    },
    lesson () {
      return this.$store.getters['courses/getActiveLesson']
    },
    activeCourse () {
      return this.$store.getters['courses/getActiveCourse']
    },
    isProgressComplete () {
      return this.currentSection === this.lesson.sections.length - 1
    },
    forwardButtonLabel () {
      return this.isProgressComplete ? 'Done' : 'Next'
    },
    overviewButtonLabel () {
      return this.currentSection ? 'Continue Lesson' : 'Start Lesson'
    },
    progress () {
      return this.openDialog ? 100 : Math.round((this.currentSection / this.lesson.sections.length) * 100)
    }
  },
  methods: {
    // saveProgress () {
    //   this.$router.go(-1)
    // },
    startLesson () {
      // TODO: implement
      this.displayOverview = false
      if (this.lesson.progress === 100) {
        this.$store.dispatch('student-lesson/resetProgress')
      }
    },
    updateCurrentSection (index) {
      this.currentSection = index
      // this.$store.dispatch('student-lesson/updateCurrentSection', index)
    },
    completeLesson () {
      this.$store.dispatch('student-lesson/completeLesson')
      this.openDialog = true
      // this.$router.go(-1)
    },
    goToNextLesson () {
      this.openDialog = false
      this.displayOverview = true
    },
    backToCourse () {
      // this.openDialog = false
      this.$router.go(-1)
    }
  }
}
</script>
