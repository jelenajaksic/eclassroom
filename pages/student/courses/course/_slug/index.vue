<template>
  <div v-if="course">
    <app-header>
      <template slot="title">
        <h1> {{ course.title }} </h1>
      </template>
      <template slot="headerButtons">
        <app-button label="Take the final test" class="mr-4" @click="goToTest" />
      </template>
    </app-header>
    <v-container>
      <v-row class="course-overview-wrapper" align="center">
        <v-col cols="12" md="6" lg="6">
          <v-img
            :src="course.image"
            height="100%"
          />
        </v-col>
        <v-col cols="12" md="5" lg="5">
          <p class="course-desc">
            {{ course.description }}
          </p>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <div class="page-divider"/>
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
  </div>
</template>

<script>
import CourseCard from '../../../../../components/courses/CourseCard.vue'
import AppHeader from '../../../../../components/common/AppHeader'
import AppButton from '../../../../../components/common/AppButton'
import { ICONS } from '../../../../../common/commonHelper'

export default {
  name: 'CoursePage',
  components: {
    CourseCard,
    AppHeader,
    AppButton
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
      this.$router.push(`/student/courses/course/${this.course.slug}/lesson/${slug}`)
    },
    goToTest () {}
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
