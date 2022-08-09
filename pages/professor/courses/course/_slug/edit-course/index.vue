<template>
  <div>
    <app-header>
      <template slot="title">
        <h1>
          Edit Course
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
        </v-card>
      </template>
    </v-hover>
  </div>
</template>

<script>
import AppHeader from '../../../../../../components/common/AppHeader'
import AppButton from '../../../../../../components/common/AppButton'

export default {
  name: 'EditCourse',
  components: {
    AppHeader,
    AppButton
  },
  data () {
    return {
      title: '',
      shortDescription: '',
      description: ''
    }
  },
  computed: {
    course () {
      return this.$store.getters['courses/getCourse']
    }
  },
  created () {
    this.title = this.course.title
    this.description = this.course.description
    this.shortDescription = this.course.shortDescription
  },
  methods: {
    onCancel () {
      // TODO: add dialog
      this.$router.push(`/professor/courses/course/${this.course.slug}`)
    },
    onSave () {
      // TODO: implement logic
      this.$store.dispatch('courses/updateCourse', {
        id: this.course.id,
        title: this.title,
        description: this.description,
        shortDescription: this.shortDescription
      })
      this.$router.push(`/professor/courses/course/${this.course.slug}`)
    }
  }
}
</script>
