<template>
  <div>
    <app-header>
      <template slot="title">
        <h1>
          Edit Course
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
          <div class="image-wrapper">
            <v-img
              :src="image"
              height="200px"
              contain
              max-width="300px"
              class="mr-4"
            />
            <v-textarea
              v-model="image"
              label="Image"
              type="textarea"
              auto-grow
              clearable-icon
              rows="1"
            />
          </div>
        </v-card>
      </template>
    </v-hover>
    <app-dialog
      v-if="openDialog"
      :open-dialog="openDialog"
      title="Are you sure?"
      text="If you cancel the progress will be lost."
      primary-button-label="Leave without saving"
      secondary-button-label="Cancel"
      @secondary="openDialog = false"
      @primary="onPrimaryAction"
    />
  </div>
</template>

<script>
import AppHeader from '../../../../../../components/common/AppHeader'
import AppButton from '../../../../../../components/common/AppButton'
import AppDialog from '../../../../../../components/common/AppDialog'

export default {
  name: 'EditCourse',
  components: {
    AppHeader,
    AppButton,
    AppDialog
  },
  data () {
    return {
      title: '',
      shortDescription: '',
      description: '',
      image: '',
      openDialog: false
    }
  },
  computed: {
    course () {
      return this.$store.getters['courses/getActiveCourse']
    }
  },
  created () {
    this.title = this.course.title
    this.description = this.course.description
    this.shortDescription = this.course.shortDescription
    this.image = this.course.image
  },
  methods: {
    onCancel () {
      this.openDialog = true
    },
    onSave () {
      // TODO: implement logic
      this.$store.dispatch('courses/updateCourse', {
        id: this.course.id,
        title: this.title,
        description: this.description,
        shortDescription: this.shortDescription,
        image: this.image
      })
      this.$router.push(`/professor/courses/course/${this.course.slug}`)
    },
    onPrimaryAction () {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="scss" scoped>
.image-wrapper {
  display: flex;
  align-items: center;
}
</style>
