<template>
  <div v-if="course">
    <app-header>
      <template slot="title">
        <h1> {{ course.title }} </h1>
      </template>
      <template slot="headerButtons">
        <a href="#lessons">
          <app-button label="See lessons" class="mr-4" />
        </a>
        <a href="#tests">
          <app-button label="See tests" class="mr-4" />
        </a>
      </template>
      <template slot="navigation">
        <app-back-button label="< Back to Courses" :link="`/student/courses/`" />
      </template>
    </app-header>
    <v-container>
      <v-row class="course-overview-wrapper" align="center">
        <v-col v-if="course.image" cols="12" md="6" lg="6">
          <v-img
            :src="`http://localhost:8080/files?filename=${course.image}`"
            contain
            max-height="400px"
            height="100%"
          />
        </v-col>
        <v-col cols="12" :md="course.image ? '5' : '12'" :lg="course.image ? '5' : '12'">
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
      <v-row v-if="course.lessons.length" id="lessons">
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
      <v-row>
        <v-col>
          <div class="page-divider" />
        </v-col>
      </v-row>
      <v-row v-if="course.tests.length" id="tests">
        <v-col>
          <h2 class="mb-2">
            Tests
          </h2>
        </v-col>
      </v-row>
      <v-row v-if="course.tests.length" style="min-height: 100vh;" cols="12">
        <v-col v-for="test in course.tests" :key="test._id" lg="4" md="4">
          <course-card :data="test" :is-test="true" @select="goToTest" />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import CourseCard from '../../../../../components/courses/CourseCard.vue'
import AppHeader from '../../../../../components/common/AppHeader'
import AppButton from '../../../../../components/common/AppButton'
import AppBackButton from '../../../../../components/common/AppBackButton'
import { ICONS } from '../../../../../common/commonHelper'

export default {
  name: 'CoursePage',
  components: {
    CourseCard,
    AppHeader,
    AppButton,
    AppBackButton
  },
  data () {
    return {
      ICONS,
      model: null
    }
  },
  computed: {
    course () {
      return this.$store.getters['courses/getActiveCourse']
    }
  },
  created () {
    this.$store.dispatch('courses/setActiveCourse', this.$route.params?.slug)
  },
  methods: {
    goToLesson (slug) {
      this.$store.dispatch('courses/setActiveLesson', slug)
      this.$router.push(`/student/courses/course/${this.course.slug}/lesson/${slug}`)
    },
    goToTest (slug) {
      this.$store.dispatch('courses/setActiveTest', slug)
      this.$router.push(`/student/courses/course/${this.course.slug}/test/${slug}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.course-overview-wrapper {
  margin: 5rem auto 9rem;
}
.course-desc {
  text-align: justify;
  font-size: 1.25rem;
}
</style>
