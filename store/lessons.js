export const state = () => ({
  lessons: [
    {
      slug: '0',
      title: 'Title',
      subtitle: 'Subtitle',
      description: 'Description',
      shortDescription: 'Lesson Short Description',
      img: 'https://cdn.vuetifyjs.com/images/cards/sunshine.jpg',
      progress: 20
    },
    {
      slug: '1',
      title: 'Title',
      subtitle: 'Subtitle',
      description: 'Description',
      shortDescription: 'Lesson Short Description',
      img: 'https://cdn.vuetifyjs.com/images/cards/sunshine.jpg',
      progress: 56
    },
    {
      slug: '2',
      title: 'Title',
      subtitle: 'Subtitle',
      description: 'Description',
      shortDescription: 'Lesson Short Description',
      img: 'https://cdn.vuetifyjs.com/images/cards/sunshine.jpg',
      progress: 20
    },
    {
      slug: '3',
      title: 'Title',
      subtitle: 'Subtitle',
      description: 'Description',
      shortDescription: 'Lesson Short Description',
      img: 'https://cdn.vuetifyjs.com/images/cards/sunshine.jpg',
      progress: 50
    },
    {
      slug: '4',
      title: 'Title',
      subtitle: 'Subtitle',
      description: 'Description',
      shortDescription: 'Lesson Short Description',
      img: 'https://cdn.vuetifyjs.com/images/cards/sunshine.jpg',
      progress: 70
    }
  ]
})

export const mutations = {
  addLesson (state, lesson) {
    state.lessons.push(lesson)
  }
}

export const actions = {
  getAllLessons ({ commit }) {},
  addLesson ({ commit }, lesson) {
    commit('addLesson', lesson)
  }
}

export const getters = {
  getAllLessons (state) {
    return state.lessons
  },
  getNewLessonSlug (state) {
    return `lesson-${state.lessons.length}`
  }
}
