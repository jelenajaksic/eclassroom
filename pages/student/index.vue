<template>
  <div>
    <app-header>
      <template slot="title">
        <h1 style="width: 80vw;">
          {{ `Welcome back, ${user.name}!` }}
        </h1>
      </template>
    </app-header>
    <v-container v-if="user.linkedUsers.length">
      <v-row v-if="courses.length" id="tests">
        <v-col>
          <h2 class="mb-2">
            Enroll to
          </h2>
        </v-col>
      </v-row>
      <v-row>
        <v-col v-for="(course, index) in courses" :key="course._id" lg="4">
          <course-card :data="course" @select="openDialog = true; activeCourseIndex = index;" />
        </v-col>
      </v-row>
    </v-container>
    <app-dialog
      v-if="openDialog"
      :open-dialog="openDialog"
      :title="courses[activeCourseIndex].title"
      :text="courses[activeCourseIndex].description"
      primary-button-label="Enroll"
      secondary-button-label="Cancel"
      @secondary="openDialog = false"
      @primary="enrollStudent"
    />
    <v-alert
      v-model="displayAlert"
      dismissible
      :type="alertType"
      dense
      style="position: absolute; top: 92vh; right: 2rem; width: 96%;"
      transition="scale-transition"
    >
      {{ alertMessage }}
    </v-alert>
  </div>
</template>

<script>
import AppHeader from '../../components/common/AppHeader'
import AppDialog from '../../components/common/AppDialog'
import CourseCard from '../../components/courses/CourseCard'
import { ALERT_TYPES } from '../../common/commonHelper'

export default {
  name: 'HomeStudentPage',
  components: {
    AppHeader,
    CourseCard,
    AppDialog
  },
  data () {
    return {
      openDialog: false,
      activeCourseIndex: 0,
      alertType: ALERT_TYPES.ERROR,
      displayAlert: false,
      alertMessage: ''
    }
  },
  computed: {
    user () {
      return this.$store.getters.getUser
    },
    courses () {
      const allCourses = this.$store.getters['courses/getCourses']
      return allCourses?.filter((course) => {
        if (course?.students && (course.students.length !== 0)) {
          return !course.students.includes(this.user.email)
        } else {
          return true
        }
      })
    }
  },
  created () {
    this.$store.dispatch('courses/getCoursesFromLinked', this.user)
  },
  methods: {
    async enrollStudent () {
      try {
        await this.$store.dispatch('courses/enrollExistingStudent', {
          course_id: this.courses[this.activeCourseIndex]._id,
          email: this.user.email
        })
        await this.$store.dispatch('courses/getCoursesFromLinked', this.user)
        this.alertType = ALERT_TYPES.SUCCESS
        this.alertMessage = 'You have successfully enrolled to this course.'
        this.displayAlert = true
      } catch (e) {
        this.alertType = ALERT_TYPES.ERROR
        this.alertMessage = e.message
        this.displayAlert = true
      } finally {
        this.activeCourseIndex = 0
      }
    }
  }
}
</script>
