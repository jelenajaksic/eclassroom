<template>
  <div>
    <app-header>
      <template slot="title">
        <h1>
          Create a New Course
        </h1>
      </template>
      <template slot="headerButtons">
        <app-button label="Cancel" :outlined="true" class="mr-4" @click="openDialog = true" />
        <app-button label="Save" :disabled="!valid" @click="onSave" />
      </template>
    </app-header>
    <v-hover>
      <template #default="{ hover }">
        <v-card class="pa-10 mt-10" :elevation="hover ? 2 : 0">
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field
              v-model="title"
              label="Title"
              :rules="titleRules"
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
          </v-form>
        </v-card>
      </template>
    </v-hover>
    <app-dialog
      v-if="openDialog"
      :open-dialog="openDialog"
      title="Are you sure?"
      text="If you leave the page the progress will be lost."
      primary-button-label="Leave without saving"
      secondary-button-label="Cancel"
      @secondary="openDialog = false"
      @primary="goToCourses"
    />
    <v-alert
      v-model="displayAlert"
      dismissible
      :type="alertType"
      dense
      style="position: absolute; top: 92vh; right: 2rem; width: 96%;"
      transition="scale-transition"
    >
      {{ alertMessage }}
    </v-alert>
  </div>
</template>

<script>
import AppHeader from '../../../../components/common/AppHeader'
import AppButton from '../../../../components/common/AppButton'
import AppDialog from '../../../../components/common/AppDialog'
import { ICONS, ALERT_TYPES, slugFromTitle, uuidV4 } from '../../../../common/commonHelper'

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
      alertType: ALERT_TYPES.ERROR,
      displayAlert: false,
      alertMessage: '',
      valid: false,
      titleRules: [
        v => !!v || 'Title is required'
      ]
    }
  },
  computed: {
    user () {
      return this.$store.getters.getUser
    }
  },
  watch: {
    image () {
      console.log(this.image)
    }
  },
  methods: {
    async onSave () {
      try {
        const data = {
          course: {
            slug: slugFromTitle(this.title),
            title: this.title,
            description: this.description,
            shortDescription: this.shortDescription,
            admin: this.user.email,
            image: uuidV4(),
            lessons: [],
            tests: [],
            students: []
          },
          image: this.image
        }
        await this.$store.dispatch('courses/addCourse', data)
        this.alertType = ALERT_TYPES.SUCCESS
        this.alertMessage = 'You have successfully created a course'
        this.displayAlert = true
        setTimeout(() => {
          this.goToCourses()
        }, 2000)
      } catch (e) {
        this.alertType = ALERT_TYPES.ERROR
        this.alertMessage = e.message
        this.displayAlert = true
      }
    },
    goToCourses () {
      this.$router.push('/professor/courses')
    }
  }
}
</script>
