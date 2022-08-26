<template>
  <div>
    <app-header>
      <template slot="title">
        <h1 style="width: 80vw;">
          {{ `Welcome back, ${user.name}!` }}
        </h1>
      </template>
    </app-header>
    <v-container v-if="courses.length">
      <v-row id="tests">
        <v-col>
          <h2 class="mb-2">
            Enroll your first students
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
      title="Enroll a Student"
      :text="enrollStudentDialogText"
      :primary-button-label="showNewStudent || showExistingStudent ? 'Enroll' : 'Cancel'"
      :secondary-button-label="showNewStudent || showExistingStudent ? 'Cancel' : ''"
      :primary-disabled="showNewStudent || showExistingStudent ? isEnrollDisabled : false"
      @secondary="closeDialog"
      @primary="showNewStudent || showExistingStudent ? enrollStudent() : closeDialog()"
    >
      <template slot="customDialogContent">
        <div v-if="!showExistingStudent && !showNewStudent">
          <app-button label="New" :is-block="true" class="mb-5 mt-5" :icon="ICONS.PLUS" @click="showNewStudent = true" />
          <app-button label="Existing" :is-block="true" class="mb-2" :icon="ICONS.PLUS" @click="getExistingStudents" />
        </div>
        <div v-if="showExistingStudent">
          <v-select
            v-model="existingStudentEmail"
            :items="existingStudents"
            label="Select existing student"
          />
        </div>
        <div v-if="showNewStudent">
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field
              v-model="studentName"
              label="Name"
              :rules="nameRules"
            />
            <v-text-field
              v-model="studentEmail"
              label="Email"
              :rules="emailRules"
            />
          </v-form>
        </div>
      </template>
    </app-dialog>
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
import { ALERT_TYPES, ICONS } from '../../common/commonHelper'
import AppButton from '../../components/common/AppButton'

export default {
  name: 'HomeProfessorPage',
  components: {
    AppButton,
    AppHeader,
    CourseCard,
    AppDialog
  },
  data () {
    return {
      ICONS,
      openDialog: false,
      activeCourseIndex: 0,
      studentName: '',
      studentEmail: '',
      alertType: ALERT_TYPES.ERROR,
      displayAlert: false,
      alertMessage: '',
      courses: [],
      showExistingStudent: false,
      showNewStudent: false,
      existingStudentEmail: '',
      valid: false,
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid'
      ],
      nameRules: [
        v => !!v || 'Name is required'
      ]
    }
  },
  computed: {
    user () {
      return this.$store.getters.getUser
    },
    allCourses () {
      return this.$store.getters['courses/getCourses']
    },
    existingStudents () {
      return this.$store.getters.getAllStudents
    },
    isEnrollDisabled () {
      if (this.showNewStudent) {
        return !this.valid
      }
      return !this.existingStudentEmail
    },
    enrollStudentDialogText () {
      if (this.showExistingStudent) {
        return 'Enroll an existing student by selecting email from the dropdown.'
      } else if (this.showNewStudent) {
        return 'Enroll a new student to this course by providing name, email and password'
      }
      return `Enroll new or existing student to ${this.courses[this.activeCourseIndex].title}.`
    }
  },
  async created () {
    await this.$store.dispatch('courses/getAllCourses')
    await this.setCourses()
  },
  methods: {
    setCourses () {
      this.courses = this.allCourses.filter((course) => {
        return !course?.students || course.students.length === 0
      })
    },
    async getExistingStudents () {
      await this.$store.dispatch('getAllUsers')
      this.showExistingStudent = true
    },
    async enrollStudent () {
      try {
        if (this.showNewStudent) {
          const data = {
            course_id: this.courses[this.activeCourseIndex]._id,
            name: this.studentName,
            email: this.studentEmail,
            adminEmail: this.user.email
          }
          await this.$store.dispatch('courses/addStudent', data)
        } else if (this.showExistingStudent) {
          await this.$store.dispatch('courses/enrollExistingStudent', {
            course_id: this.courses[this.activeCourseIndex]._id,
            email: this.existingStudentEmail
          })
        }
        this.alertType = ALERT_TYPES.SUCCESS
        const name = this.studentName || this.existingStudentEmail
        this.alertMessage = `You have successfully enrolled ${name} to ${this.courses[this.activeCourseIndex].title}.`
        this.displayAlert = true
      } catch (e) {
        this.alertType = ALERT_TYPES.ERROR
        this.alertMessage = e.message
        this.displayAlert = true
      } finally {
        this.closeDialog()
      }
    },
    closeDialog () {
      this.openDialog = false
      this.showNewStudent = false
      this.showExistingStudent = false
    }
  }
}
</script>
