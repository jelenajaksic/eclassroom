<template>
  <div>
    <app-header>
      <template slot="title">
        <h1>
          New Lesson
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
          <v-text-field
            v-model="subtitle"
            label="Subtitle"
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
        </v-card>
      </template>
    </v-hover>
    <!--    TODO: implement drag?   -->
    <!--    <draggable v-model="sections">-->
    <!--      <transition-group>-->
    <div v-for="(section, index) in sections" :key="index">
      <lesson-section
        :section="section"
        @remove="removeSection(index)"
        @duplicate="s => duplicateSection(index, s)"
      />
    </div>
    <!--      </transition-group>-->
    <!--    </draggable>-->
    <app-button-dropdown label="Add Section" class="mt-10" :icon="ICONS.PLUS" :items="sectionTypes" @selected="addSection" />
    <app-dialog
      v-if="openDialog"
      :open-dialog="openDialog"
      title="Are you sure?"
      text="If you cancel the progress will be lost"
      primary-button-label="Leave without saving"
      secondary-button-label="Cancel"
      @secondary="openDialog = false"
      @primary="onPrimaryAction"
    />
  </div>
</template>

<script>
// import draggable from 'vuedraggable'
import AppHeader from '../../../../../../components/common/AppHeader'
import AppButton from '../../../../../../components/common/AppButton'
import AppButtonDropdown from '../../../../../../components/common/AppButtonDropdown'
import LessonSection from '../../../../../../components/lessons/LessonSection'
import AppDialog from '../../../../../../components/common/AppDialog'
import { SECTIONS, ICONS } from '../../../../../../common/commonHelper'

export default {
  name: 'NewLesson',
  components: {
    AppHeader,
    AppButton,
    AppButtonDropdown,
    LessonSection,
    AppDialog
    // draggable
  },
  data () {
    return {
      ICONS,
      sectionTypes: SECTIONS,
      sections: [],
      title: '',
      subtitle: '',
      description: '',
      shortDescription: '',
      openDialog: false
    }
  },
  computed: {
    lessonSlug () {
      return this.$store.getters['lessons/getNewLessonSlug']
    }
    // sections () {
    //   return this.$store.getters['lesson/getSections']
    // },
    // title: {
    //   get () {
    //     return this.$store.getters['lesson/getTitle']
    //   },
    //   set (title) {
    //     this.$store.dispatch('lesson/updateTitle', title)
    //   }
    // },
    // subtitle: {
    //   get () {
    //     return this.$store.getters['lesson/getSubtitle']
    //   },
    //   set (subtitle) {
    //     this.$store.dispatch('lesson/updateSubtitle', subtitle)
    //   }
    // },
    // shortDescription: {
    //   get () {
    //     return this.$store.getters['lesson/getShortDescription']
    //   },
    //   set (shortDescription) {
    //     this.$store.dispatch('lesson/updateShortDescription', shortDescription)
    //   }
    // },
    // description: {
    //   get () {
    //     return this.$store.getters['lesson/getDescription']
    //   },
    //   set (description) {
    //     this.$store.dispatch('lesson/updateDescription', description)
    //   }
    // }
  },
  methods: {
    onCancel () {
      this.openDialog = true
    },
    onSave () {
      this.$router.go(-1)
      this.$store.dispatch('lessons/addLesson', {
        slug: this.lessonSlug,
        sections: this.sections,
        title: this.title,
        subtitle: this.subtitle,
        description: this.description,
        shortDescription: this.shortDescription
      })
      // TODO: add popup
    },
    addSection (item) {
      // this.$store.dispatch('lesson/addSection', {
      //   id: this.sections.length,
      //   title: 'New Section',
      //   description: '',
      //   type: item.slug,
      //   question: {
      //     type: '',
      //     description: '',
      //     answers: []
      //   }
      // })
      this.sections.push({
        id: this.sections.length,
        // title: 'New Section',
        description: '',
        shortDescription: '',
        type: item.slug,
        question: {
          type: '',
          description: '',
          answers: []
        }
      })
    },
    removeSection (index) {
      // this.$store.dispatch('lesson/removeSection', index)
      this.sections.splice(index, 1)
      // eslint-disable-next-line no-return-assign
      this.sections.forEach(s => s.id = this.sections.indexOf(s))
    },
    duplicateSection (index, s) {
      this.sections.splice(index + 1, 0, JSON.parse(JSON.stringify(s)))
      this.sections.forEach((section) => {
        section.id = this.sections.indexOf(section)
      })
    },
    // updateSection (section, index) {
    //   this.$store.dispatch('lesson/updateSection', { index, section })
    // },
    onPrimaryAction () {
      // TODO: redirect to course
      this.$router.go(-1)
    }
  }
}
</script>
