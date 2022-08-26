<template>
  <div>
    <app-header>
      <template slot="title">
        <h1 v-if="course.title">
          {{ course.title }}
        </h1>
      </template>
      <template slot="headerButtons">
        <app-button label="Delete" button-class="mr-2" :outlined="true" :icon="ICONS.TRASH" @click="openDeleteDialog = true" />
        <app-button label="Edit" button-class="mr-2" :outlined="true" :icon="ICONS.EDIT" @click="editCourse" />
        <app-button-dropdown
          label="Student"
          class="mr-2"
          display-property=""
          :icon="ICONS.PLUS"
          :items="studentTypes"
          @selected="selectStudentType"
        />
        <app-button label="Test" button-class="mr-2" :icon="ICONS.PLUS" @click="newTest" />
        <app-button label="Lesson" :icon="ICONS.PLUS" @click="newLesson" />
      </template>
      <template slot="navigation">
        <v-breadcrumbs
          :items="breadcrumbsItems"
          divider="/"
          style="padding: 0 0 1rem;"
        />
      </template>
    </app-header>
    <v-container>
      <v-row class="course-overview-wrapper" align="center">
        <v-col v-if="course.image" cols="12" md="6" lg="6">
<!--          <v-img-->
<!--            :src="course.image"-->
<!--            height="100%"-->
<!--          />-->
          <v-img
            :src="`http://localhost:8080/files?filename=${course.image}`"
            max-height="400px"
            contain
          />
        </v-col>
        <v-col v-if="course.description" cols="12" :md="course.image ? '5' : '12'" :lg="course.image ? '5' : '12'">
          <p class="course-desc">
            {{ course.description }}
          </p>
        </v-col>
      </v-row>
      <v-row v-if="course.lessons.length">
        <v-col>
          <div class="page-divider" />
        </v-col>
      </v-row>
      <v-row v-if="course.lessons.length">
        <v-col>
          <h2 class="mb-2">
            Lessons
          </h2>
        </v-col>
      </v-row>
      <v-row v-if="course.lessons.length" cols="12">
        <v-col v-for="lesson in course.lessons" :key="lesson._id" lg="4" md="4">
          <course-card :data="lesson" :is-lesson="true" @select="goToLesson" />
        </v-col>
      </v-row>
      <v-row v-if="course.lessons.length">
        <v-col>
          <div class="page-divider" />
        </v-col>
      </v-row>
      <v-row v-if="course.lessons.length">
        <v-col>
          <h2 class="mb-2">
            Tests
          </h2>
        </v-col>
      </v-row>
      <v-row v-if="course.tests.length" cols="12" style="min-height: 100vh;">
        <v-col v-for="test in course.tests" :key="test._id" lg="4" md="4">
          <course-card :data="test" :is-test="true" @select="goToTest" />
        </v-col>
      </v-row>
    </v-container>
    <app-dialog
      v-if="openDeleteDialog"
      :open-dialog="openDeleteDialog"
      title="Delete course"
      text="Are you sure you want to delete this course?"
      primary-button-label="Delete"
      secondary-button-label="Cancel"
      @secondary="openDeleteDialog = false"
      @primary="deleteCourse"
    />
    <app-dialog
      v-if="openStudentDialog"
      :open-dialog="openStudentDialog"
      title="Enroll a Student"
      :text="showExistingStudent
        ? 'Enroll an existing student by selecting email from the dropdown.'
        : 'Enroll a new student to this course by providing name, email and password'"
      primary-button-label="Enroll"
      secondary-button-label="Cancel"
      :primary-disabled="showNewStudent ? !valid : !existingStudentEmail"
      @secondary="openStudentDialog = false"
      @primary="addStudent"
    >
      <template slot="customDialogContent">
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
import CourseCard from '../../../../../components/courses/CourseCard.vue'
import AppHeader from '../../../../../components/common/AppHeader'
import AppButton from '../../../../../components/common/AppButton'
import AppDialog from '../../../../../components/common/AppDialog'
import AppButtonDropdown from '../../../../../components/common/AppButtonDropdown'
import { ALERT_TYPES, ICONS } from '../../../../../common/commonHelper'

export default {
  name: 'CoursePage',
  components: {
    CourseCard,
    AppHeader,
    AppButton,
    AppDialog,
    AppButtonDropdown
  },
  data () {
    return {
      ICONS,
      studentTypes: ['New', 'Existing'],
      model: null,
      openDeleteDialog: false,
      openStudentDialog: false,
      showNewStudent: false,
      showExistingStudent: false,
      studentEmail: '',
      studentName: '',
      existingStudentEmail: '',
      alertType: ALERT_TYPES.ERROR,
      displayAlert: false,
      alertMessage: '',
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
    course () {
      return this.$store.getters['courses/getActiveCourse']
    },
    breadcrumbsItems () {
      return [
        {
          text: 'Courses',
          disabled: false,
          href: '/professor/courses'
        },
        {
          text: `${this.course.title}`,
          disabled: true,
          href: ''
        }
      ]
    },
    existingStudents () {
      return this.$store.getters.getAllStudents
    }
  },
  created () {
    this.$store.dispatch('courses/setActiveCourse', this.$route.params?.slug)
  },
  methods: {
    selectStudentType (type) {
      this.showNewStudent = type === 'New'
      this.showExistingStudent = type === 'Existing'
      this.openStudentDialog = true
      if (this.showExistingStudent) {
        this.getExistingStudents()
      }
    },
    goToLesson (slug) {
      this.$store.dispatch('courses/setActiveLesson', slug)
      this.$router.push(`/professor/courses/course/${this.course.slug}/lesson/${slug}`)
    },
    goToTest (slug) {
      this.$store.dispatch('courses/setActiveTest', slug)
      this.$router.push(`/professor/courses/course/${this.course.slug}/test/${slug}`)
    },
    newLesson () {
      this.$router.push(`/professor/courses/course/${this.course.slug}/new-lesson`)
    },
    newTest () {
      this.$router.push(`/professor/courses/course/${this.course.slug}/new-test`)
    },
    editCourse () {
      this.$router.push(`/professor/courses/course/${this.course.slug}/edit-course`)
    },
    async deleteCourse () {
      try {
        await this.$store.dispatch('courses/deleteCourse', this.course._id)
        this.alertType = ALERT_TYPES.SUCCESS
        this.alertMessage = `You have successfully deleted ${this.course.title}.`
        this.displayAlert = true
        await this.$router.push('/professor/courses')
      } catch (e) {
        this.alertType = ALERT_TYPES.ERROR
        this.alertMessage = e.message
        this.displayAlert = true
      } finally {
        this.openDeleteDialog = false
      }
    },
    async addStudent () {
      try {
        if (this.showNewStudent) {
          const data = {
            course_id: this.course._id,
            name: this.studentName,
            email: this.studentEmail,
            adminEmail: this.user.email
          }
          await this.$store.dispatch('courses/addStudent', data)
        } else if (this.showExistingStudent) {
          await this.$store.dispatch('courses/enrollExistingStudent', {
            course_id: this.course._id,
            email: this.existingStudentEmail
          })
        }
        this.alertType = ALERT_TYPES.SUCCESS
        this.alertMessage = `You have successfully enrolled a student to ${this.course.title}.`
        this.displayAlert = true
      } catch (e) {
        this.alertType = ALERT_TYPES.ERROR
        this.alertMessage = e.message
        this.displayAlert = true
      } finally {
        this.openStudentDialog = false
      }
    },
    async getExistingStudents () {
      await this.$store.dispatch('getAllUsers')
    }
  }
}
</script>

<style lang="scss" scoped>
.course-overview-wrapper {
  margin: 4rem auto 10rem;
}
.course-desc {
  text-align: justify;
  font-size: 1.25rem;
}
</style>
