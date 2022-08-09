<template>
  <div v-if="lesson">
    <app-header>
      <template slot="title">
        <h1> {{ lesson.title }} </h1>
      </template>
      <template slot="headerButtons">
        <app-button v-if="displayOverview" label="Back To Course" class="mr-4" @click="backToCourse" />
        <app-button
          v-if="!displayOverview"
          :disabled="currentSection.id === 0"
          class="mr-4"
          label="Previous"
          @click="updateCurrentSection(currentSection.id - 1)"
        />
        <app-button
          v-if="!displayOverview"
          :label="forwardButtonLabel"
          @click="isProgressComplete ? completeLesson() : updateCurrentSection(currentSection.id + 1)"
        />
      </template>
    </app-header>
    <!--    <v-scroll-x-transition>-->
    <lesson-overview
      v-if="displayOverview"
      :description="lesson.description"
      @start="startLesson"
    />
    <!--    </v-scroll-x-transition>-->
    <v-progress-linear
      v-if="!displayOverview"
      rounded
      :value="lesson.progress.toString()"
    />
    <!--    <v-scroll-x-transition>-->
    <student-section
      v-if="!displayOverview"
      :section="currentSection"
    />
    <!--    </v-scroll-x-transition>-->
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
      openDialog: false
    }
  },
  computed: {
    lesson () {
      return this.$store.getters['student-lesson/getLesson']
    },
    currentSection () {
      return this.$store.getters['student-lesson/getCurrentSection']
    },
    isProgressComplete () {
      return this.currentSection.id === this.lesson.sections.length - 1
    },
    forwardButtonLabel () {
      return this.isProgressComplete ? 'Done' : 'Next'
    }
  },
  created () {
    this.$store.dispatch('student-lesson/getLesson')
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
      this.$store.dispatch('student-lesson/updateCurrentSection', index)
    },
    // nextSection () {
    //   this.$store.dispatch('student-lesson/updateCurrentSection', this.currentSection.id + 1)
    // },
    // previousSection () {
    //   this.$store.dispatch('student-lesson/updateCurrentSection', this.currentSection.id - 1)
    // },
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
