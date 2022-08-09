<template>
  <div>
    <app-header>
      <template slot="title">
        <h1> {{ course.title }} </h1>
      </template>
      <template slot="headerButtons">
        <app-button label="Delete" button-class="mr-2" :icon="ICONS.TRASH" @click="openDialog = true" />
        <app-button label="Edit" button-class="mr-2" :icon="ICONS.EDIT" @click="editCourse" />
        <app-button label="New Lesson" :icon="ICONS.PLUS" @click="newLesson" />
      </template>
    </app-header>
    <!--    <v-sheet class="mx-auto">-->
    <!--      <v-slide-group-->
    <!--        show-arrows-->
    <!--      >-->
    <!--        <v-slide-item-->
    <!--          v-for="lesson in lessons"-->
    <!--          :key="lesson.slug"-->
    <!--        >-->
    <!--          <course-card :data="lesson" @select="goToLesson" style="max-width: 300px" />-->
    <!--        </v-slide-item>-->
    <!--      </v-slide-group>-->
    <!--    </v-sheet>-->
    <v-container>
      <v-row>
        <v-col>
          <h3>{{ course.description }}</h3>
        </v-col>
      </v-row>
      <v-row>
        <v-col v-for="lesson in lessons" :key="lesson.slug" lg="3">
          <course-card :data="lesson" @select="goToLesson" />
        </v-col>
      </v-row>
    </v-container>
    <app-dialog
      v-if="openDialog"
      :open-dialog="openDialog"
      title="Delete course"
      text="Are you sure you want to delete this course?"
      primary-button-label="Delete"
      secondary-button-label="Cancel"
      @secondary="openDialog = false"
      @primary="deleteCourse"
    />
  </div>
</template>

<script>
import CourseCard from '../../../../../components/courses/CourseCard.vue'
import AppHeader from '../../../../../components/common/AppHeader'
import AppButton from '../../../../../components/common/AppButton'
import AppDialog from '../../../../../components/common/AppDialog'
import { ICONS } from '../../../../../common/commonHelper'

export default {
  name: 'CoursePage',
  components: {
    CourseCard,
    AppHeader,
    AppButton,
    AppDialog
  },
  data () {
    return {
      ICONS,
      model: null,
      openDialog: false
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
    }
  }
}
</script>
