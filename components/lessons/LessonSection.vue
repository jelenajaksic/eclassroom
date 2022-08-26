<template>
  <v-hover>
    <template #default="{ hover }">
      <v-card class="pa-10 mt-10" :elevation="hover ? 2 : 0">
        <v-card-actions class="justify-end">
          <v-icon
            right
            light
            @click="$emit('move-up')"
          >
            {{ ICONS.ARROW_UP }}
          </v-icon>
          <v-icon
            right
            light
            class="mr-4"
            @click="$emit('move-down')"
          >
            {{ ICONS.ARROW_DOWN }}
          </v-icon>
          <v-icon
            right
            light
            class="mr-4"
            @click="$emit('duplicate')"
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
        <v-textarea
          v-model="newSection.title"
          label="Title"
          type="textarea"
          auto-grow
          clearable-icon
          rows="1"
          @input="updateSection"
        />
        <v-textarea
          v-model="newSection.description"
          label="Paragraph"
          type="textarea"
          auto-grow
          clearable-icon
          rows="1"
          @input="updateSection"
        />
        <v-file-input
          v-model="newSection.image"
          show-size
          small-chips
          :prepend-icon="ICONS.CAMERA"
          label="Image"
          @input="updateSection"
        />
        <div v-if="newSection.type === SECTION_TYPES.QUESTION">
          <v-textarea
            v-model="newSection.question.description"
            label="Question"
            type="textarea"
            auto-grow
            clearable-icon
            rows="1"
            @input="updateSection"
          />
          <app-button-dropdown
            v-if="displayQuestionTypeButton"
            label="Select Question Type"
            class="mt-10"
            :icon="ICONS.PLUS"
            :items="questionTypes"
            @selected="addQuestion"
          />

          <div v-if="newSection.question.type === QUESTION_TYPES.TEXT">
            <v-text-field
              v-model="newSection.question.answers[0].label"
              label="Answer"
            />
          </div>

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
                    @click="answer.correct = !answer.correct;"
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
    },
    reload: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      ICONS,
      QUESTION_TYPES,
      SECTION_TYPES,
      questionTypes: QUESTIONS,
      sectionId: this.section.id,
      newSection: JSON.parse(JSON.stringify(this.section))
    }
  },
  computed: {
    displayQuestionTypeButton () {
      return !this.newSection.question.type || (this.newSection.question.type !== QUESTION_TYPES.TEXT && this.newSection.question.answers.length === 0)
    }
  },
  methods: {
    updateSection () {
      this.$emit('update-section', this.newSection)
    },
    addQuestion (item) {
      this.newSection.question.type = item.slug
      if (this.newSection.question.type === QUESTION_TYPES.MULTISELECT || this.newSection.question.type === QUESTION_TYPES.SINGLE_SELECT) {
        this.addAnswer()
      } else if (this.newSection.question.type === QUESTION_TYPES.TEXT) {
        this.addTestAnswer()
      }
      this.updateSection()
    },
    addTestAnswer () {
      this.newSection.question.answers.push({
        label: '',
        correct: true
      })
      this.updateSection()
    },
    addAnswer () {
      this.newSection.question.answers.push({
        label: '',
        correct: false
      })
      this.$nextTick(() => this.$refs[`question-${this.newSection.id}-answer-${this.newSection.question.answers.length - 1}`][0].focus())
      this.updateSection()
    },
    removeAnswer (index) {
      this.newSection.question.answers.splice(index, 1)
      this.newSection.question.answers.forEach((answer) => {
        answer.id = this.newSection.question.answers.indexOf(answer)
      })
      this.updateSection()
    },
    radioSelectCorrect (targetIndex) {
      this.newSection.question.answers.forEach((answer, index) => {
        answer.correct = index === targetIndex
      })
      this.updateSection()
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
