<template>
  <div>
    <app-header>
      <template slot="title">
        <h1>
          New Test
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
    <div class="section-button-wrapper">
      <app-button
        label="Add Section"
        class="mb-10 mt-10"
        :icon="ICONS.PLUS"
        @click="addSection"
      />
    </div>
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
import LessonSection from '../../../../../../components/lessons/LessonSection'
import AppDialog from '../../../../../../components/common/AppDialog'
import {
  SECTIONS,
  ICONS,
  SECTION_TYPES,
  slugFromTitle,
  uuidV4,
  ALERT_TYPES
} from '../../../../../../common/commonHelper'

export default {
  name: 'NewLesson',
  components: {
    AppHeader,
    AppButton,
    LessonSection,
    AppDialog
  },
  data () {
    return {
      ICONS,
      SECTION_TYPES,
      sectionTypes: SECTIONS,
      sections: [],
      title: '',
      image: null,
      reload: false,
      openDialog: false,
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
    async onSave () {
      try {
        const images = {}
        this.sections.forEach((section) => {
          if (typeof section.image !== 'string') {
            const name = uuidV4()
            images[name] = section.image
            section.image = name
          }
        })
        const newTest = {
          _id: uuidV4(),
          slug: slugFromTitle(this.title),
          sections: JSON.parse(JSON.stringify(this.sections)),
          title: this.title,
          image: uuidV4(),
          students: {}
        }
        images[newTest.image] = this.image

        this.course.students.forEach((student) => {
          newTest.students[student] = '0'
        })

        await this.$store.dispatch('courses/addTest', {
          courseID: this.course._id,
          newTest,
          images
        })
        this.alertType = ALERT_TYPES.SUCCESS
        this.alertMessage = 'You have successfully created a new test.'
        this.displayAlert = true
        setTimeout(() => {
          this.goBack()
        }, 2000)
        await this.$router.push(`/professor/courses/course/${this.course.slug}`)
      } catch (e) {
        this.alertType = ALERT_TYPES.ERROR
        this.alertMessage = e.message
        this.displayAlert = true
      }
    },
    addSection () {
      this.sections.push({
        title: '',
        description: '',
        shortDescription: '',
        image: null,
        type: SECTION_TYPES.QUESTION,
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
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="scss" scoped>
.section-button-wrapper {
  width: 100%;
  text-align: center;
}
</style>
