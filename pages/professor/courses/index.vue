<template>
  <div v-if="courses">
    <app-header>
      <template slot="title">
        <h1>
          Courses
        </h1>
      </template>
      <template slot="headerButtons">
        <app-button label="New Course" :icon="ICONS.PLUS" @click="newCourse" />
      </template>
    </app-header>
    <v-container>
      <v-row>
        <v-col v-for="course in courses" :key="course._id" lg="4">
          <course-card :data="course" @select="goToCourse" />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import CourseCard from '../../../components/courses/CourseCard.vue'
import AppHeader from '../../../components/common/AppHeader'
import AppButton from '../../../components/common/AppButton'
import { ICONS } from '../../../common/commonHelper'

export default {
  name: 'CoursesPage',
  components: {
    CourseCard,
    AppHeader,
    AppButton
  },
  data () {
    return {
      ICONS
    }
  },
  computed: {
    courses () {
      return this.$store.getters['courses/getCourses']
    }
  },
  created () {
    this.$store.dispatch('courses/getAllCourses')
  },
  methods: {
    goToCourse (slug) {
      this.$router.push(`/professor/courses/course/${slug}`)
    },
    newCourse () {
      this.$router.push('/professor/courses/new-course')
    }
  }
}
</script>
