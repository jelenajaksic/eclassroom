<template>
  <v-hover>
    <template #default="{ hover }">
      <v-card class="pa-10 mt-10" :elevation="hover ? 2 : 0">
        <!--        TODO: If dragable enabled      -->
        <!--      <v-card class="pa-10 mt-10" :elevation="hover ? 2 : 0" :class="{ 'cursor-grab': hover }">-->
        <!--        <v-card-actions class="justify-center">-->
        <!--          <v-icon-->
        <!--            right-->
        <!--            light-->
        <!--          >-->
        <!--            {{ ICONS.DRAG_HORIZONTAL }}-->
        <!--          </v-icon>-->
        <!--        </v-card-actions>-->
        <v-card-actions class="justify-end">
          <v-icon
            right
            light
            @click="$emit('duplicate', newSection)"
          >
            {{ ICONS.COPY }}
          </v-icon>
          <v-icon
            right
            light
            @click="$emit('remove')"
          >
            {{ ICONS.TRASH }}
          </v-icon>
        </v-card-actions>
        <!--        <div v-if="section.type === SECTION_TYPES.TEXT">-->
        <!--          <v-text-field-->
        <!--            v-model="newSection.title"-->
        <!--            label="Title"-->
        <!--          />-->
        <v-textarea
          v-model="newSection.title"
          label="Title"
          type="textarea"
          auto-grow
          clearable-icon
          rows="1"
        />
        <v-textarea
          v-model="newSection.description"
          label="Paragraph"
          type="textarea"
          auto-grow
          clearable-icon
          rows="1"
        />
        <v-textarea
          v-model="newSection.image"
          label="Image"
          type="textarea"
          auto-grow
          clearable-icon
          rows="1"
        />
        <!--        </div>-->
        <div v-if="newSection.type === SECTION_TYPES.QUESTION">
          <v-textarea
            v-model="newSection.question.description"
            label="Question"
            type="textarea"
            auto-grow
            clearable-icon
            rows="1"
          />
          <app-button-dropdown
            v-if="displayQuestionTypeButton"
            label="Select Question Type"
            class="mt-10"
            :icon="ICONS.PLUS"
            :items="questionTypes"
            @selected="addQuestion"
          />

          <div v-if="newSection.question.type === QUESTION_TYPES.MULTISELECT">
            <draggable v-model="newSection.question.answers">
              <transition-group>
                <div v-for="(answer, index) in newSection.question.answers" :key="index" class="checkbox-input">
                  <v-icon
                    left
                    light
                    class="cursor-grab"
                  >
                    {{ ICONS.DRAG_VERTICAL }}
                  </v-icon>
                  <v-icon
                    left
                    light
                    class="mr-5"
                    @click="answer.correct = !answer.correct"
                  >
                    {{ answer.correct ? ICONS.MULTISELECT_MARKED : ICONS.MULTISELECT_BLANK }}
                  </v-icon>
                  <v-text-field
                    :ref="`question-${newSection.id}-answer-${index}`"
                    v-model="answer.label"
                    @keyup.enter="addAnswer()"
                  />
                  <v-icon
                    right
                    light
                    class="ml-5"
                    @click="removeAnswer(index)"
                  >
                    {{ ICONS.CLOSE }}
                  </v-icon>
                </div>
              </transition-group>
            </draggable>
          </div>

          <div v-if="newSection.question.type === QUESTION_TYPES.SINGLE_SELECT">
            <draggable v-if="newSection.question.answers" v-model="newSection.question.answers">
              <transition-group>
                <div v-for="(answer, index) in newSection.question.answers" :key="index" class="checkbox-input">
                  <v-icon
                    left
                    light
                    class="cursor-grab"
                  >
                    {{ ICONS.DRAG_VERTICAL }}
                  </v-icon>
                  <v-icon
                    left
                    light
                    class="mr-5"
                    @click="radioSelectCorrect(index)"
                  >
                    {{ answer.correct ? ICONS.RADIO_MARKED : ICONS.RADIO_BLANK }}
                  </v-icon>
                  <v-text-field
                    :ref="`question-${newSection.id}-answer-${index}`"
                    v-model="answer.label"
                    @keyup.enter="addAnswer"
                  />
                  <v-icon
                    right
                    light
                    class="ml-5"
                    @click="removeAnswer(index)"
                  >
                    {{ ICONS.CLOSE }}
                  </v-icon>
                </div>
              </transition-group>
            </draggable>
          </div>
        </div>
      </v-card>
    </template>
  </v-hover>
</template>

<script>
import draggable from 'vuedraggable'
import AppButtonDropdown from '../common/AppButtonDropdown'
import { QUESTIONS, ICONS, QUESTION_TYPES, SECTION_TYPES } from '../../common/commonHelper'
export default {
  name: 'LessonSection',
  components: {
    AppButtonDropdown,
    draggable
  },
  props: {
    section: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      ICONS,
      QUESTION_TYPES,
      SECTION_TYPES,
      questionTypes: QUESTIONS,
      sectionId: this.section.id,
      newSection: {
        shortDescription: this.section.shortDescription,
        // title: this.section.title,
        id: this.section.id,
        title: this.section.title,
        description: this.section.description,
        image: this.section.image,
        type: this.section.type,
        question: {
          type: this.section?.question?.type || '',
          description: this.section?.question?.description || '',
          answers: this.section?.question?.answers || []
        }
      }
    }
  },
  computed: {
    // description: {
    //   get () {
    //     // return this.$store.getters['lesson/getSectionDescriptionById'](this.sectionId)
    //     return 'desc'
    //   },
    //   set (value) {
    //     this.$store.dispatch('lesson/updateSectionDescription', { sectionId: this.sectionId, description: value })
    //   }
    // },
    displayQuestionTypeButton () {
      return !this.newSection.question.type || (this.newSection.question.type !== QUESTION_TYPES.TEXT && this.newSection.question.answers.length === 0)
    }
  },
  // updated () {
  //   this.$emit('update-section', this.newSection)
  // },
  methods: {
    addQuestion (item) {
      // this.$store.dispatch('lesson/addQuestion', { type: item.slug, sectionId: this.sectionId })
      this.newSection.question.type = item.slug
      if (this.newSection.question.type === QUESTION_TYPES.MULTISELECT || this.newSection.question.type === QUESTION_TYPES.SINGLE_SELECT) {
        this.addAnswer()
      }
    },
    addAnswer () {
      this.newSection.question.answers.push({
        label: '',
        correct: false
      })
      this.$nextTick(() => this.$refs[`question-${this.newSection.id}-answer-${this.newSection.question.answers.length - 1}`][0].focus())
    },
    removeAnswer (index) {
      this.newSection.question.answers.splice(index, 1)
      // eslint-disable-next-line no-return-assign
      this.newSection.question.answers.forEach(s => s.id = this.newSection.question.answers.indexOf(s))
    },
    radioSelectCorrect (targetIndex) {
      // // eslint-disable-next-line no-return-assign
      // this.newSection.question.answers[ind].correct = true
      // eslint-disable-next-line no-return-assign
      this.newSection.question.answers.forEach((answer, index) => {
        answer.correct = index === targetIndex
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.cursor-grab {
  cursor: grab;
}
.checkbox-input {
  display: flex;
  justify-content: flex-start;
}
</style>
