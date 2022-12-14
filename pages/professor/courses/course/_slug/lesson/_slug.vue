<template>
  <div>
    <app-header>
      <template slot="title">
        <h1 v-if="!edit && lesson.title">
          {{ lesson.title }}
        </h1>
        <text-input
          v-if="edit && lesson.title"
          label="Lesson Title"
          :text-input="lesson.title"
          @input="e => lesson.title = e"
        />
      </template>
      <template slot="headerButtons">
        <app-button
          v-if="!edit"
          label="Delete"
          button-class="mr-2"
          :outlined="true"
          :icon="ICONS.TRASH"
          @click="openDeleteDialog = true"
        />
        <app-button v-if="!edit" label="Edit Lesson" :icon="ICONS.EDIT" @click="edit = true" />
        <app-button v-if="edit" label="Cancel" :outlined="true" class="mr-2" @click="openDialog = true" />
        <app-button v-if="edit" label="Save Lesson" @click="saveLesson" />
      </template>
      <template slot="navigation">
        <v-breadcrumbs
          :items="breadcrumbsItems"
          divider="/"
          style="padding: 0 0 1rem;"
        />
      </template>
    </app-header>
    <v-container>
      <v-row>
        <v-col>
          <p v-if="!edit && lesson.shortDescription" style="font-size: 1.5rem;">
            {{ lesson.shortDescription }}
          </p>
          <text-input
            v-if="edit"
            label="Lesson Short Description"
            :text-input="lesson.shortDescription"
            @input="e => lesson.shortDescription = e"
          />
        </v-col>
      </v-row>
      <v-row align="center">
        <v-col v-if="initLesson.image" lg="4" md="4">
          <v-img
            :src="`http://localhost:8080/files?filename=${initLesson.image}`"
            height="200px"
            contain
          />
        </v-col>
        <v-col :lg="initLesson.image ? '7' : '12'" :md="initLesson.image ? '7' : '12'">
          <p v-if="!edit && lesson.description" class="mb-8">
            {{ lesson.description }}
          </p>
          <text-input
            v-if="edit"
            label="Lesson Description"
            :text-input="lesson.description"
            @input="e => lesson.description = e"
          />
        </v-col>
      </v-row>
      <v-row align="center">
        <v-col>
          <v-file-input
            v-model="lesson.image"
            show-size
            small-chips
            :prepend-icon="ICONS.CAMERA"
            label="Image"
          />
        </v-col>
      </v-row>
      <v-row v-for="(section, index) in lesson.sections" :key="index">
        <v-card
          v-if="section"
          class="my-4 pa-10"
          elevation="2"
          width="100%"
        >
          <v-card-title v-if="section.title && !edit" class="pl-0">
            {{ section.title }}
          </v-card-title>
          <text-input
            v-if="section.title && edit"
            label="Section Title"
            :text-input="section.title"
            @input="e => section.title = e"
          />
          <p v-if="section.description && !edit">
            {{ section.description }}
          </p>
          <text-input
            v-if="section.description && edit"
            label="Section Description"
            :text-input="section.description"
            @input="e => section.description = e"
          />
          <div v-if="section.type === SECTION_TYPES.QUESTION">
            <p v-if="section.question.description && !edit">
              {{ section.question.description }}
            </p>
            <text-input
              v-if="section.question.description && edit"
              label="Question"
              :text-input="section.question.description"
              @input="e => section.question.description = e "
            />
            <text-input
              v-if="section.question.type === QUESTION_TYPES.TEXT"
              :readonly="!edit"
              :label="section.question.answers[0].label"
              @input="e => section.question.answers[0].label = e"
            />
            <checkbox
              v-if="section.question.type === QUESTION_TYPES.MULTISELECT && !edit"
              :readonly="true"
              :answers="section.question.answers"
            />
            <checkbox-edit
              v-if="section.question.type === QUESTION_TYPES.MULTISELECT && edit"
              :section="section"
              @update="e => section.question.answers = e"
            />
            <radio
              v-if="section.question.type === QUESTION_TYPES.SINGLE_SELECT && !edit"
              :readonly="true"
              :answers="section.question.answers"
            />
            <radio-edit
              v-if="section.question.type === QUESTION_TYPES.SINGLE_SELECT && edit"
              :section="section"
              @update="e => section.question.answers = e"
            />
          </div>
        </v-card>
      </v-row>
    </v-container>
    <app-dialog
      v-if="openDialog"
      :open-dialog="openDialog"
      title="Are you sure?"
      text="If you leave the page the progress will be lost."
      primary-button-label="Leave without saving"
      secondary-button-label="Cancel"
      @secondary="openDialog = false"
      @primary="onCancel"
    />
    <app-dialog
      v-if="openDeleteDialog"
      :open-dialog="openDeleteDialog"
      title="Delete course"
      text="Are you sure you want to delete this course?"
      primary-button-label="Delete"
      secondary-button-label="Cancel"
      @secondary="openDeleteDialog = false"
      @primary="deleteLesson"
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
import { ALERT_TYPES, ICONS, QUESTION_TYPES, SECTION_TYPES } from '../../../../../../common/commonHelper'
import TextInput from '../../../../../../components/common/input/TextInput'
import Checkbox from '../../../../../../components/common/input/display/Checkbox'
import Radio from '../../../../../../components/common/input/display/Radio'
import CheckboxEdit from '../../../../../../components/common/input/edit/CheckboxEdit'
import RadioEdit from '../../../../../../components/common/input/edit/RadioEdit'

export default {
  name: 'LessonPage',
  components: {
    AppHeader,
    AppButton,
    AppDialog,
    TextInput,
    Checkbox,
    Radio,
    CheckboxEdit,
    RadioEdit
  },
  data () {
    return {
      ICONS,
      QUESTION_TYPES,
      SECTION_TYPES,
      edit: false,
      openDialog: false,
      openDeleteDialog: false,
      lesson: {},
      alertType: ALERT_TYPES.ERROR,
      displayAlert: false,
      alertMessage: ''
    }
  },
  computed: {
    initLesson () {
      return this.$store.getters['courses/getActiveLesson']
    },
    activeCourse () {
      return this.$store.getters['courses/getActiveCourse']
    },
    breadcrumbsItems () {
      return [
        {
          text: 'Courses',
          disabled: false,
          href: '/professor/courses'
        },
        {
          text: `${this.activeCourse.title}`,
          disabled: false,
          href: `/professor/courses/course/${this.activeCourse.slug}`
        },
        {
          text: `${this.lesson.title}`,
          disabled: true,
          href: ''
        }
      ]
    }
  },
  created () {
    this.lesson = JSON.parse(JSON.stringify(this.initLesson))
    this.lesson.image = null
  },
  methods: {
    async deleteLesson () {
      try {
        this.openDeleteDialog = false
        await this.$store.dispatch('courses/deleteLesson', {
          courseID: this.activeCourse._id,
          lessonID: this.lesson._id
        })
        this.alertType = ALERT_TYPES.SUCCESS
        this.alertMessage = `You have successfully deleted ${this.lesson.title}.`
        this.displayAlert = true
        setTimeout(() => {
          this.goBack()
        }, 2000)
      } catch (e) {
        this.alertType = ALERT_TYPES.ERROR
        this.alertMessage = e.message
        this.displayAlert = true
      }
    },
    async saveLesson () {
      try {
        this.edit = false
        await this.$store.dispatch('courses/updateLesson', {
          courseID: this.activeCourse._id,
          lesson: this.lesson
        })
        this.alertType = ALERT_TYPES.SUCCESS
        this.alertMessage = `You have successfully edited ${this.lesson.title}.`
        this.displayAlert = true
        setTimeout(() => {
          this.goBack()
        }, 2000)
      } catch (e) {
        this.alertType = ALERT_TYPES.ERROR
        this.alertMessage = e.message
        this.displayAlert = true
      }
    },
    onCancel () {
      this.openDialog = false
      this.edit = false
    },
    goBack () {
      this.$router.push('/professor/courses')
    }
  }
}
</script>
