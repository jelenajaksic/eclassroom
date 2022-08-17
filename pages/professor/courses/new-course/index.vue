<template>
  <div>
    <app-header>
      <template slot="title">
        <h1>
          Create a New Course
        </h1>
      </template>
      <template slot="headerButtons">
        <app-button label="Cancel" :outlined="true" class="mr-4" @click="onCancel" />
        <app-button label="Save" @click="onSave" />
      </template>
    </app-header>
    <v-hover>
      <template #default="{ hover }">
        <v-card class="pa-10 mt-10" :elevation="hover ? 2 : 0">
          <v-text-field
            v-model="title"
            label="Title"
            required
          />
          <v-textarea
            v-model="shortDescription"
            label="Short Description"
            type="textarea"
            auto-grow
            clearable-icon
            rows="1"
          />
          <v-textarea
            v-model="description"
            label="Description"
            type="textarea"
            auto-grow
            clearable-icon
            rows="1"
          />
          <v-file-input
            v-model="image"
            show-size
            small-chips
            :prepend-icon="ICONS.CAMERA"
            label="Image"
          />
        </v-card>
      </template>
    </v-hover>
    <app-dialog
      v-if="openCloseDialog"
      :open-dialog="openCloseDialog"
      title="Are you sure?"
      text="If you leave the page the progress will be lost."
      primary-button-label="Leave without saving"
      secondary-button-label="Cancel"
      @secondary="openCloseDialog = false"
      @primary="goToCourses"
    />
    <app-dialog
      v-if="openDialog"
      :open-dialog="openDialog"
      title="Course successfully created"
      text="You can now see this course in the list of courses, or create the first lesson in this course."
      primary-button-label="Create Lesson"
      secondary-button-label="Go to Courses"
      @secondary="goToCourses"
      @primary="createLesson"
    />
  </div>
</template>

<script>
import AppHeader from '../../../../components/common/AppHeader'
import AppButton from '../../../../components/common/AppButton'
import AppDialog from '../../../../components/common/AppDialog'
import { slugFromTitle, ICONS } from '../../../../common/commonHelper'

export default {
  name: 'NewCourse',
  components: {
    AppHeader,
    AppButton,
    AppDialog
  },
  data () {
    return {
      ICONS,
      title: '',
      shortDescription: '',
      description: '',
      image: null,
      openDialog: false,
      openCloseDialog: false
    }
  },
  computed: {
    slug () {
      return slugFromTitle(this.course.title)
    },
    user () {
      return this.$store.getters.getUser
    }
  },
  methods: {
    onCancel () {
      this.openCloseDialog = true
    },
    onSave () {
      this.openDialog = true
      this.$store.dispatch('courses/addCourse', {
        slug: this.slug,
        title: this.title,
        description: this.description,
        short_description: this.shortDescription,
        admin: this.user.email,
        image: this.image,
        students: {},
        lessons: []
      })
    },
    goToCourses () {
      this.$router.push('/professor/courses')
    },
    createLesson () {
      this.$router.push(`/professor/courses/course/${this.slug}/new-lesson`)
    }
  }
}
</script>
