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
import LessonSection from '../../../../../../components/lessons/LessonSection'
import AppDialog from '../../../../../../components/common/AppDialog'
import { SECTIONS, ICONS, SECTION_TYPES, slugFromTitle } from '../../../../../../common/commonHelper'

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
      description: '',
      shortDescription: '',
      image: null,
      reload: false,
      openDialog: false
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
      this.$router.go(-1)
      const newTest = {
        // TODO: add uuid
        // id: '',
        slug: slugFromTitle(this.title),
        sections: JSON.parse(JSON.stringify(this.sections)),
        title: this.title,
        description: this.description,
        shortDescription: this.shortDescription,
        image: this.image
      }
      await this.$store.dispatch('courses/addTest', {
        courseID: this.course.id,
        lesson: newTest
      })
      // TODO: add popup
    },
    addSection () {
      this.sections.push({
        // TODO: add uuid
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
    onPrimaryAction () {
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
