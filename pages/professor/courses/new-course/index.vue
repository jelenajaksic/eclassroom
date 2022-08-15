<template>
  <div>
    <app-header>
      <template slot="title">
        <h1>
          Create a New Course
        </h1>
      </template>
      <template slot="headerButtons">
        <app-button label="Cancel" class="mr-4" @click="onCancel" />
        <app-button label="Save" @click="onSave" />
      </template>
    </app-header>
    <v-hover>
      <template #default="{ hover }">
        <v-card class="pa-10 mt-10" :elevation="hover ? 2 : 0">
          <v-text-field
            v-model="course.title"
            label="Title"
            required
          />
          <v-textarea
            v-model="course.shortDescription"
            label="Short Description"
            type="textarea"
            auto-grow
            clearable-icon
            rows="1"
          />
          <v-textarea
            v-model="course.description"
            label="Description"
            type="textarea"
            auto-grow
            clearable-icon
            rows="1"
          />
        </v-card>
      </template>
    </v-hover>
    <app-dialog
      v-if="openDialog"
      :open-dialog="openDialog"
      title="Course successfully created"
      text="Do you want to create the first lesson in this course?"
      primary-button-label="Create Lesson"
      secondary-button-label="Close"
      @secondary="onSecondaryAction"
      @primary="onPrimaryAction"
    />
  </div>
</template>

<script>
import AppHeader from '../../../../components/common/AppHeader'
import AppButton from '../../../../components/common/AppButton'
import AppDialog from '../../../../components/common/AppDialog'

export default {
  name: 'NewCourse',
  components: {
    AppHeader,
    AppButton,
    AppDialog
  },
  data () {
    return {
      course: {
        title: '',
        shortDescription: '',
        description: '',
        slug: ''
      },
      openDialog: false
    }
  },
  computed: {
    courseSlug () {
      return this.$store.getters['courses/getNewCourseSlug']
    }
  },
  methods: {
    onCancel () {
      this.$router.go(-1)
    },
    onSave () {
      this.openDialog = true
      this.$store.dispatch('courses/addCourse', {
        slug: this.courseSlug,
        title: this.course.title,
        description: this.course.description,
        progress: 0,
        lessons: []
      })
    },
    onSecondaryAction () {
      this.$router.push('/professor/courses')
    },
    onPrimaryAction () {
      this.$router.push(`/professor/courses/course/${this.courseSlug}/new-lesson`)
    }
  }
}
</script>
