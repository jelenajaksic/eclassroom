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
            <div class="image-wrapper">
              <v-img
                v-if="course.image"
                :src="`http://localhost:8080/files?filename=${course.image}`"
                height="200px"
                contain
                max-width="300px"
                class="mr-4"
              />
              <v-file-input
                v-model="image"
                show-size
                small-chips
                :prepend-icon="ICONS.CAMERA"
                label="Image"
              />
            </div>
          </v-form>
        </v-card>
      </template>
    </v-hover>
    <app-dialog
      v-if="openDialog"
      :open-dialog="openDialog"
      title="Are you sure?"
      text="If you leave the progress will be lost."
      primary-button-label="Leave without saving"
      secondary-button-label="Cancel"
      @secondary="openDialog = false"
      @primary="onPrimaryAction"
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
import AppHeader from '../../../../../../components/common/AppHeader'
import AppButton from '../../../../../../components/common/AppButton'
import AppDialog from '../../../../../../components/common/AppDialog'
import { ALERT_TYPES, ICONS, slugFromTitle, uuidV4 } from '../../../../../../common/commonHelper'

export default {
  name: 'EditCourse',
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
      alertMessage: '',
      displayAlert: false,
      valid: false,
      titleRules: [
        v => !!v || 'Title is required'
      ]
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
  },
  methods: {
    onCancel () {
      this.openDialog = true
    },
    async onSave () {
      try {
        const data = {
          course: {
            id: this.course._id,
            title: this.title,
            slug: slugFromTitle(this.title),
            description: this.description,
            shortDescription: this.shortDescription,
            image: uuidV4()
          },
          image: this.image
        }
        await this.$store.dispatch('courses/updateCourse', data)
        this.alertType = ALERT_TYPES.SUCCESS
        this.alertMessage = `You have successfully edited ${this.title}.`
        this.displayAlert = true
        setTimeout(() => {
          this.$router.push('/professor/courses')
        }, 2000)
      } catch (e) {
        this.alertType = ALERT_TYPES.ERROR
        this.alertMessage = e.message
        this.displayAlert = true
      }
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
