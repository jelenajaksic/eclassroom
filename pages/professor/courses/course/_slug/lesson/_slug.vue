<template>
  <div>
    <app-header>
      <template slot="title">
        <!--        <div style="display:flex; align-items: center;">-->
        <h1 v-if="!edit">
          {{ lesson.title }}
        </h1>
        <!--          <v-icon v-if="!edit" left light class="ml-5" @click="edit = true">-->
        <!--            {{ ICONS.EDIT }}-->
        <!--          </v-icon>-->
        <!--        </div>-->
        <text-input v-if="edit" label="Lesson Title" :text-input="lesson.title" @input="updateTitle" />
      </template>
      <template slot="headerButtons">
        <!--        TODO: move        -->
        <app-button v-if="!edit" label="Back" class="mr-4" @click="$router.go(-1)" />
        <app-button v-if="!edit" label="Edit Lesson" :icon="ICONS.EDIT" @click="edit = true" />
        <app-button v-if="edit" label="Cancel" class="mr-4" @click="openDialog = true" />
        <app-button v-if="edit" label="Save Lesson" @click="saveLesson" />
      </template>
    </app-header>
    <v-container>
      <v-row>
        <v-col>
          <p v-if="!edit">
            {{ lesson.subtitle }}
          </p>
          <text-input v-if="edit" label="Lesson Subtitle" :text-input="lesson.subtitle" @input="updateSubtitle" />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <p v-if="!edit">
            {{ lesson.shortDescription }}
          </p>
          <text-input v-if="edit" label="Lesson Short Description" :text-input="lesson.shortDescription" @input="updateShortDescription" />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <p v-if="!edit">
            {{ lesson.description }}
          </p>
          <text-input v-if="edit" label="Lesson Description" :text-input="lesson.description" @input="updateDescription" />
        </v-col>
      </v-row>
      <v-row v-for="(section, index) in lesson.sections" :key="index">
        <v-card
          v-if="section"
          class="my-4 pa-10"
          elevation="2"
          width="100%"
        >
          <!--          <v-icon v-if="!edit" right light class="mb-5" @click="edit = true">-->
          <!--            {{ ICONS.EDIT }}-->
          <!--          </v-icon>-->
          <p v-if="section.description && !edit">
            {{ section.description }}
          </p>
          <text-input
            v-if="section.description && edit"
            label="Section Description"
            :text-input="section.description"
            @input="desc => updateSectionDescription(desc, index)"
          />
          <div v-if="section.type === SECTION_TYPES.QUESTION">
            <p v-if="section.question.description && !edit">
              {{ section.question.description }}
            </p>
            <text-input
              v-if="section.question.description && edit"
              label="Question"
              :text-input="section.question.description"
              @input="desc => updateQuestionDescription(desc, index)"
            />
            <text-input
              v-if="section.question.type === QUESTION_TYPES.TEXT"
              :readonly="true"
              label="Answer"
            />
            <checkbox
              v-if="section.question.type === QUESTION_TYPES.MULTISELECT && !edit"
              :readonly="true"
              :answers="section.question.answers"
            />
            <checkbox-edit
              v-if="section.question.type === QUESTION_TYPES.MULTISELECT && edit"
              :section="section"
              @update="s => updateQuestionAnswers(s, index)"
            />
            <radio
              v-if="section.question.type === QUESTION_TYPES.SINGLE_SELECT && !edit"
              :readonly="true"
              :answers="section.question.answers"
            />
            <radio-edit
              v-if="section.question.type === QUESTION_TYPES.SINGLE_SELECT && edit"
              :section="section"
              @update="s => updateQuestionAnswers(s, index)"
            />
          </div>
        </v-card>
      </v-row>
    </v-container>
    <app-dialog
      v-if="openDialog"
      :open-dialog="openDialog"
      title="Are you sure?"
      text="If you leave the page the progress will be lost"
      primary-button-label="Leave without saving"
      secondary-button-label="Cancel"
      @secondary="openDialog = false"
      @primary="onCancel"
    />
  </div>
</template>

<script>
import AppHeader from '../../../../../../components/common/AppHeader'
import AppButton from '../../../../../../components/common/AppButton'
import AppDialog from '../../../../../../components/common/AppDialog'
import { ICONS, QUESTION_TYPES, SECTION_TYPES } from '../../../../../../common/commonHelper'
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
      openDialog: false
    }
  },
  computed: {
    lesson () {
      return this.$store.getters['lesson/getLesson']
    }
  },
  created () {
    this.$store.dispatch('lesson/getLesson')
  },
  methods: {
    updateTitle (title) {
      this.$store.dispatch('lesson/updateTitle', title)
    },
    updateSubtitle (subtitle) {
      this.$store.dispatch('lesson/updateSubtitle', subtitle)
    },
    updateShortDescription (shortDescription) {
      this.$store.dispatch('lesson/updateShortDescription', shortDescription)
    },
    updateDescription (description) {
      this.$store.dispatch('lesson/updateDescription', description)
    },
    updateQuestionDescription (description, index) {
      this.$store.dispatch('lesson/updateQuestionDescription', { description, index })
    },
    updateSectionDescription (description, index) {
      this.$store.dispatch('lesson/updateSectionDescription', { description, index })
    },
    updateQuestionAnswers (section, index) {
      this.$store.dispatch('lesson/updateQuestionAnswers', {
        answers: section.question.answers,
        index
      })
    },
    saveLesson () {
      this.edit = false
    },
    onCancel () {
      this.edit = false
    }
  }
}
</script>
