const mockLesson = {
  slug: 'lesson-1',
  title: 'Lesson Title',
  subtitle: 'Lesson Subtitle',
  shortDescription: 'Lesson Short Description',
  description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.',
  img: 'https://cdn.vuetifyjs.com/images/cards/sunshine.jpg',
  progress: 0,
  currentSectionId: 0,
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
  setCurrentSection (state, sectionId) {
    // Set current section ID
    state.lesson.currentSectionId = sectionId
    // Calculate progress based on current section
    state.lesson.progress = Math.round((sectionId / state.lesson.sections.length) * 100)
  },
  completeLesson (state) {
    state.lesson.progress = 100
    state.lesson.currentSectionId = 0
  },
  resetProgress (state) {
    state.lesson.progress = 0
    state.lesson.currentSectionId = 0
  }
}

export const actions = {
  getLesson ({ commit }) {
    commit('setLesson')
  },
  updateCurrentSection ({ commit }, sectionId) {
    commit('setCurrentSection', sectionId)
  },
  completeLesson ({ commit }) {
    commit('completeLesson')
  },
  resetProgress ({ commit }) {
    commit('resetProgress')
  }
}

export const getters = {
  getLesson (state) {
    return state.lesson
  },
  getCurrentSection (state) {
    return state.lesson.sections.find(s => s.id === state.lesson.currentSectionId)
  },
  getOverviewButtonLabel (state) {
    if (state.lesson.currentSectionId === 0) {
      if (state.lesson.progress === 0) {
        return 'Start lesson'
      } else if (state.lesson.progress === 100) {
        return 'Restart lesson'
      }
    } else { return 'Continue lesson' }
  }
}
