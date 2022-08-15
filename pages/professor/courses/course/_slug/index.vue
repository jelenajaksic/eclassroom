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
        <app-button label="Add Student" button-class="mr-2" :icon="ICONS.PLUS" @click="openStudentDialog = true" />
        <app-button label="New Lesson" :icon="ICONS.PLUS" @click="newLesson" />
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
          <v-img
            :src="course.image"
            height="100%"
          />
        </v-col>
        <v-col v-if="course.description" cols="12" md="5" lg="5">
          <p class="course-desc">
            {{ course.description }}
          </p>
        </v-col>
      </v-row>
      <v-row>
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
      <v-row v-if="course.lessons.length">
        <v-col v-for="lesson in course.lessons" :key="lesson.slug" lg="3">
          <course-card :data="lesson" :is-lesson="true" @select="goToLesson" />
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
      title="Enroll a New Student"
      text="Enroll a new student to this course by providing students' name, email and initial password."
      primary-button-label="Enroll"
      secondary-button-label="Cancel"
      :primary-disabled="!studentEmail || !studentName || !studentPassword"
      @secondary="openStudentDialog = false"
      @primary="addStudent"
    >
      <template slot="customDialogContent">
        <text-input label="Name" :text-input="studentName" @input="setStudentName" />
        <text-input label="Email" :text-input="studentEmail" @input="setStudentEmail" />
        <text-input label="Password" :text-input="studentPassword" @input="setStudentPassword" />
      </template>
    </app-dialog>
    <app-dialog
      v-if="openSuccessDialog"
      :open-dialog="openSuccessDialog"
      title="Success"
      text="You have successfully enrolled a new student!"
      primary-button-label="Ok"
      @primary="openSuccessDialog = false"
    />
  </div>
</template>

<script>
import CourseCard from '../../../../../components/courses/CourseCard.vue'
import AppHeader from '../../../../../components/common/AppHeader'
import AppButton from '../../../../../components/common/AppButton'
import AppDialog from '../../../../../components/common/AppDialog'
import TextInput from '../../../../../components/common/input/TextInput'
import { ICONS } from '../../../../../common/commonHelper'

export default {
  name: 'CoursePage',
  components: {
    CourseCard,
    AppHeader,
    AppButton,
    AppDialog,
    TextInput
  },
  data () {
    return {
      ICONS,
      model: null,
      openDeleteDialog: false,
      openStudentDialog: false,
      openSuccessDialog: false,
      studentEmail: '',
      studentName: '',
      studentPassword: ''
    }
  },
  computed: {
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
    }
  },
  created () {
    this.$store.dispatch('courses/setActiveCourse', this.$route.params?.slug)
  },
  methods: {
    goToLesson (slug) {
      this.$store.dispatch('courses/setActiveLesson', slug)
      this.$router.push(`/professor/courses/course/${this.course.slug}/lesson/${slug}`)
    },
    newLesson () {
      this.$router.push(`/professor/courses/course/${this.course.slug}/new-lesson`)
    },
    editCourse () {
      this.$router.push(`/professor/courses/course/${this.course.slug}/edit-course`)
    },
    deleteCourse () {
      this.$store.dispatch('courses/deleteCourse', this.course.id)
      this.$router.push('/professor/courses')
    },
    setStudentEmail (email) {
      this.studentEmail = email
    },
    setStudentName (name) {
      this.studentName = name
    },
    setStudentPassword (pass) {
      this.studentPassword = pass
    },
    addStudent () {
      const newStudent = {
        name: this.studentName,
        email: this.studentEmail,
        password: this.studentPassword,
        admin: false
      }
      // eslint-disable-next-line no-return-assign
      this.$store.dispatch('courses/addStudent', newStudent).then(() => {
        this.openSuccessDialog = true
        this.studentName = ''
        this.studentEmail = ''
        this.studentPassword = ''
      })
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
