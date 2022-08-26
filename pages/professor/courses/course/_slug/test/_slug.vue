<template>
  <div>
    <app-header>
      <template slot="title">
        <h1 v-if="!edit && test.title">
          {{ test.title }}
        </h1>
        <text-input
          v-if="edit && test.title"
          label="Test Title"
          :text-input="test.title"
          @input="e => test.title = e"
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
        <app-button v-if="!edit" label="Edit Test" :icon="ICONS.EDIT" @click="edit = true" />
        <app-button v-if="edit" label="Cancel" :outlined="true" class="mr-2" @click="openDialog = true" />
        <app-button v-if="edit" label="Save Test" @click="saveTest" />
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
      <v-row align="center">
        <v-col v-if="initTest.image" lg="4" md="4">
          <v-img
            :src="`http://localhost:8080/files?filename=${initTest.image}`"
            height="200px"
            contain
          />
        </v-col>
      </v-row>
      <v-row align="center">
        <v-col v-if="edit">
          <v-file-input
            v-model="test.image"
            show-size
            small-chips
            :prepend-icon="ICONS.CAMERA"
            label="Image"
          />
        </v-col>
      </v-row>
      <v-row v-for="(section, index) in test.sections" :key="index">
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
      @primary="deleteTest"
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
  name: 'TestPage',
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
      test: {},
      alertType: ALERT_TYPES.ERROR,
      displayAlert: false,
      alertMessage: ''
    }
  },
  computed: {
    initTest () {
      return this.$store.getters['courses/getActiveTest']
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
          text: `${this.test.title}`,
          disabled: true,
          href: ''
        }
      ]
    }
  },
  created () {
    this.test = JSON.parse(JSON.stringify(this.initTest))
    this.test.image = null
  },
  methods: {
    async deleteTest () {
      try {
        this.openDeleteDialog = false
        await this.$store.dispatch('courses/deleteTest', {
          courseID: this.activeCourse._id,
          testID: this.test._id
        })
        this.alertType = ALERT_TYPES.SUCCESS
        this.alertMessage = `You have successfully deleted ${this.test.title}.`
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
    async saveTest () {
      try {
        this.edit = false
        await this.$store.dispatch('courses/updateTest', {
          courseID: this.activeCourse._id,
          newTest: this.test
        })
        this.alertType = ALERT_TYPES.SUCCESS
        this.alertMessage = `You have successfully edited ${this.test.title}.`
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
