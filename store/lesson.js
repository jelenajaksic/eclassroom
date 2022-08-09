// import { QUESTION_TYPES } from '../common/commonHelper'

const mockLesson = {
  slug: '0',
  title: 'Lesson Title',
  subtitle: 'Lesson Subtitle',
  shortDescription: 'Lesson Short Description',
  description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.',
  isPublic: true,
  student: {
    studentId: '???',
    progress: 25,
    currentSectionId: 2
  },
  sections: [
    {
      id: 0,
      description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
      type: 'text',
      img: false,
      question: {
        type: '',
        description: '',
        answers: []
      }
    },
    {
      id: 1,
      description: 'kkk',
      type: 'question',
      img: false,
      question: {
        type: 'text',
        description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
        answers: []
      }
    },
    {
      id: 2,
      description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
      type: 'question',
      img: false,
      question: {
        type: 'radio',
        description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
        answers: [
          {
            label: 'One',
            correct: false
          },
          {
            label: 'Two',
            correct: true
          }
        ],
        correct: 'One'
      }
    },
    {
      id: 3,
      description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
      type: 'question',
      img: false,
      question: {
        type: 'multiselect',
        description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
        answers: [
          {
            label: 'One',
            correct: false
          },
          {
            label: 'Two',
            correct: true
          },
          {
            label: 'Three',
            correct: false
          },
          {
            label: 'Four',
            correct: true
          }
        ]
      }
    }
  ]
}

export const state = () => ({
  lesson: {}
})

export const mutations = {
  setLesson (state) {
    state.lesson = mockLesson
  },
  updateTitle (state, title) {
    state.lesson.title = title
  },
  updateSubtitle (state, subtitle) {
    state.lesson.subtitle = subtitle
  },
  updateShortDescription (state, shortDescription) {
    state.lesson.shortDescription = shortDescription
  },
  updateDescription (state, description) {
    state.lesson.description = description
  },
  // updateSection (state, { index, section }) {
  //   state.lesson.sections[index] = { ...section }
  // },
  // addSection (state, section) {
  //   state.lesson.sections.push(section)
  // },
  // removeSection (state, index) {
  //   state.lesson.sections.splice(index, 1)
  //   // eslint-disable-next-line no-return-assign
  //   state.lesson.sections.forEach(s => s.id = state.lesson.sections.indexOf(s))
  // },
  // duplicateSection (state, index) {
  //   const section = JSON.parse(JSON.stringify(state.lesson.sections[index]))
  //   state.lesson.sections.splice(index, 0, section)
  //   state.lesson.sections.forEach((s) => {
  //     s.id = state.lesson.sections.indexOf(s)
  //   })
  // },
  // addAnswer (state, sectionId) {
  //   state.lesson.sections.find(s => s.id === sectionId).question.answers.push({
  //     label: '',
  //     correct: false,
  //     checked: false
  //   })
  // },
  // addQuestion (state, { type, sectionId }) {
  //   state.lesson.sections[sectionId].type = type
  // },
  updateSectionDescription (state, { index, description }) {
    state.lesson.sections[index].description = description
  },
  updateQuestionDescription (state, { index, description }) {
    state.lesson.sections[index].question.description = description
  },
  updateQuestionAnswers (state, { index, answers }) {
    state.lesson.sections[index].question.answers = JSON.parse(JSON.stringify(answers))
  },
  // TODO: move to lesson student
  setCurrentSection (state, sectionId) {
    // Set current section ID
    state.lesson.student.currentSectionId = sectionId
    // Calculate progress based on current section
    if (sectionId === state.lesson.sections.length - 1) {
      state.lesson.student.progress = 100
    } else {
      state.lesson.student.progress = Math.round((sectionId + 1) / state.lesson.sections.length)
    }
  }
}

export const actions = {
  getLesson ({ commit }) {
    commit('setLesson')
  },
  updateTitle ({ commit }, title) {
    commit('updateTitle', title)
  },
  updateSubtitle ({ commit }, subtitle) {
    commit('updateSubtitle', subtitle)
  },
  updateShortDescription ({ commit }, shortDescription) {
    commit('updateShortDescription', shortDescription)
  },
  updateDescription ({ commit }, shortDescription) {
    commit('updateDescription', shortDescription)
  },
  // updateSection ({ commit }, { index, section }) {
  //   commit('updateSection', { index, section })
  // },
  // addSection ({ commit }, section) {
  //   commit('addSection', section)
  // },
  // removeSection ({ commit }, index) {
  //   commit('removeSection', index)
  // },
  // duplicateSection ({ commit }, index) {
  //   commit('duplicateSection', index)
  // },
  // addAnswer ({ commit }, sectionId) {
  //   commit('addAnswer', sectionId)
  // },
  // addQuestion ({ commit }, { type, sectionId }) {
  //   commit('addQuestion', { type, sectionId })
  //   if (type === QUESTION_TYPES.MULTISELECT || type === QUESTION_TYPES.SINGLE_SELECT) {
  //     commit('addAnswer', sectionId)
  //   }
  // },
  updateSectionDescription ({ commit }, { index, description }) {
    commit('updateSectionDescription', { index, description })
  },
  updateQuestionDescription ({ commit }, { index, description }) {
    commit('updateQuestionDescription', { index, description })
  },
  updateQuestionAnswers ({ commit }, { answers, index }) {
    commit('updateQuestionAnswers', { index, answers })
  },
  // TODO: move to student
  updateCurrentSection ({ commit }, sectionId) {
    commit('setCurrentSection', sectionId)
  }
}

export const getters = {
  getLesson (state) {
    return state.lesson
  },
  // getSections (state) {
  //   return state?.lesson?.sections
  // },
  // getTitle (state) {
  //   return state?.lesson?.title
  // },
  // getSubtitle (state) {
  //   return state?.lesson?.subtitle
  // },
  // getShortDescription (state) {
  //   return state?.lesson?.shortDescription
  // },
  // getDescription (state) {
  //   return state?.lesson?.description
  // },
  // getSectionDescriptionById (state, sectionId) {
  //   return state.lesson.sections.find(s => s.id === sectionId)?.description
  // },
  // getSectionById (state, sectionId) {
  //   return state.lesson.sections.find(s => s.id === sectionId)
  // },
  // TODO: move to student
  getCurrentSection (state) {
    return state.lesson.sections.find(s => s.id === state.lesson.student.currentSectionId)
  }
}
