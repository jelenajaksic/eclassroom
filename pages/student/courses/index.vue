<template>
  <div>
    <app-header>
      <template slot="title">
        <h1>
          Courses
        </h1>
      </template>
    </app-header>
    <v-container>
      <v-row>
        <v-col v-for="course in courses" :key="course._id" lg="4" md="4">
          <course-card :data="course" @select="goToCourse" />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import CourseCard from '../../../components/courses/CourseCard.vue'
import AppHeader from '../../../components/common/AppHeader'
import { ICONS } from '../../../common/commonHelper'

export default {
  name: 'CoursesPageStudent',
  components: {
    CourseCard,
    AppHeader
  },
  data () {
    return {
      ICONS
    }
  },
  computed: {
    allCourses () {
      return this.$store.getters['courses/getCourses']
    },
    user () {
      return this.$store.getters.getUser
    },
    courses () {
      return this.allCourses?.filter(course => course.students.includes(this.user.email))
    }
  },
  created () {
    this.$store.dispatch('courses/getAllCourses', this.user.email)
  },
  methods: {
    goToCourse (slug) {
      this.$router.push(`/student/courses/course/${slug}`)
    }
  }
}
</script>
