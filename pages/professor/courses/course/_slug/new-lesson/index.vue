<template>
  <div>
    <app-header>
      <template slot="title">
        <h1>
          New Lesson
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
          <v-text-field
            v-model="shortDescription"
            label="Short Description"
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
    <div v-for="(section, index) in sections" :key="index">
      <lesson-section
        :key="reload"
        :realod="reload"
        :section="section"
        @remove="removeSection(index)"
        @duplicate="duplicateSection(index)"
        @move-up="moveSection(index, index - 1)"
        @move-down="moveSection(index, index + 1)"
        @update-section="s => updateSection(index, s)"
      />
    </div>
    <app-button-dropdown
      label="Add Section"
      class="mt-10 mb-10"
      :icon="ICONS.PLUS"
      :items="sectionTypes"
      @selected="addSection"
    />
    <app-dialog
      v-if="openDialog"
      :open-dialog="openDialog"
      title="Are you sure?"
      text="If you leave the progress will be lost."
      primary-button-label="Leave without saving"
      secondary-button-label="Cancel"
      @secondary="openDialog = false"
      @primary="goBack"
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
import AppButtonDropdown from '../../../../../../components/common/AppButtonDropdown'
import LessonSection from '../../../../../../components/lessons/LessonSection'
import AppDialog from '../../../../../../components/common/AppDialog'
import {
  SECTIONS,
  SECTION_TYPES,
  ICONS,
  ALERT_TYPES,
  slugFromTitle,
  uuidV4
} from '../../../../../../common/commonHelper'

export default {
  name: 'NewLesson',
  components: {
    AppHeader,
    AppButton,
    AppButtonDropdown,
    LessonSection,
    AppDialog
  },
  data () {
    return {
      ICONS,
      sectionTypes: SECTIONS,
      sections: [],
      title: '',
      description: '',
      shortDescription: '',
      image: null,
      openDialog: false,
      reload: false,
      alertType: ALERT_TYPES.ERROR,
      alertMessage: '',
      displayAlert: false
    }
  },
  computed: {
    course () {
      return this.$store.getters['courses/getActiveCourse']
    }
  },
  methods: {
    onCancel () {
      this.openDialog = true
    },
    isFormInvalid () {
      if (this.sections?.length === 0) {
        return false
      } else {
        let isInvalid = false
        const questions = this.sections.filter(section => section.type === SECTION_TYPES.QUESTION)
        questions.forEach((question) => {
          if (question.question.answers.length === 0) {
            isInvalid = true
          }
        })
        return isInvalid
      }
    },
    async onSave () {
      if (this.isFormInvalid()) {
        this.alertType = ALERT_TYPES.ERROR
        this.alertMessage = 'All questions must contain at least one answer.'
        this.displayAlert = true
      } else {
        try {
          const images = {}
          this.sections.forEach((section) => {
            if (typeof section.image !== 'string') {
              const name = uuidV4()
              images[name] = section.image
              section.image = name
            }
          })
          const newLesson = {
            _id: uuidV4(),
            slug: slugFromTitle(this.title),
            sections: JSON.parse(JSON.stringify(this.sections)),
            title: this.title,
            description: this.description,
            shortDescription: this.shortDescription,
            image: uuidV4(),
            students: {}
          }
          images[newLesson.image] = this.image

          this.course.students.forEach((student) => {
            newLesson.students[student] = '0'
          })

          await this.$store.dispatch('courses/addLesson', {
            courseID: this.course._id,
            lesson: newLesson,
            images
          })
          this.alertType = ALERT_TYPES.SUCCESS
          this.alertMessage = 'You have successfully created a new lesson.'
          this.displayAlert = true
          setTimeout(() => {
            this.goBack()
          }, 2000)
        } catch (e) {
          this.alertType = ALERT_TYPES.ERROR
          this.alertMessage = e.message
          this.displayAlert = true
        }
      }
    },
    addSection (item) {
      this.sections.push({
        id: uuidV4(),
        title: '',
        description: '',
        shortDescription: '',
        type: item.slug,
        image: null,
        question: {
          type: '',
          description: '',
          answers: []
        }
      })
    },
    removeSection (index) {
      this.sections.splice(index, 1)
      this.reload = !this.reload
    },
    duplicateSection (index) {
      this.sections.splice(index + 1, 0, this.sections[index])
      this.reload = !this.reload
    },
    updateSection (index, section) {
      this.sections[index] = JSON.parse(JSON.stringify(section))
    },
    moveSection (fromIndex, toIndex) {
      if (fromIndex > toIndex && toIndex >= 0) {
        this.sections.splice(0, 2, this.sections[fromIndex], this.sections[toIndex])
      }
      if (fromIndex < toIndex && toIndex < this.sections.length) {
        this.sections.splice(0, 2, this.sections[toIndex], this.sections[fromIndex])
      }
      this.reload = !this.reload
    },
    goBack () {
      this.$router.push('/professor/courses')
    }
  }
}
</script>
