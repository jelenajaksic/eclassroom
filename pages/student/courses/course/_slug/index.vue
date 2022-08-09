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
      <v-row class="course-overview-wrapper">
        <v-col cols="12" md="5" lg="5">
          <v-img
            :src="course.img"
            height="100%"
          />
        </v-col>
        <v-col cols="12" md="6" lg="6">
          <p class="course-desc">
            {{ course.description }}
          </p>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <h2>
            Lessons:
          </h2>
        </v-col>
      </v-row>
      <v-row>
        <v-col v-for="lesson in lessons" :key="lesson.slug" lg="3">
          <course-card :data="lesson" @select="goToLesson" />
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
    lessons () {
      return this.$store.getters['lessons/getAllLessons']
    },
    course () {
      return this.$store.getters['courses/getCourse']
    }
  },
  created () {
    this.$store.dispatch('courses/getCourse', this.$route.params?.slug)
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
  //width: 80%;
  margin: 2rem auto 5rem;
}
.course-desc {
  text-align: justify;
  font-size: 1.25rem;
}
</style>
