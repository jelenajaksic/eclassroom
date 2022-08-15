export const state = () => ({
  courses: {},
  activeCourseSlug: '',
  activeLessonSlug: ''
})

export const mutations = {
  setCourses (state, courses) {
    state.courses = courses
  },
  setActiveCourse (state, slug) {
    state.activeCourseSlug = slug
  },
  setActiveLesson (state, slug) {
    state.activeLessonSlug = slug
  },
  addCourse (state, course) {
    state.courses.push(course)
  },
  addStudent (state, student) {},
  deleteCourse (state, courseID) {
    state.courses.splice(courseID, 1)
    // eslint-disable-next-line no-return-assign
    state.courses.forEach(course => course.id = state.courses.indexOf(course))
  },
  updateCourse (state, course) {
    state.courses[course.id] = {
      ...state.courses[course.id],
      title: course.title,
      description: course.description,
      shortDescription: course.shortDescription
    }
  }
}

export const actions = {
  async getAllCourses ({ commit }) {
    const response = await this.$axios.$post('api/courses/get_all')
    commit('setCourses', response)
  },
  setActiveCourse ({ commit }, slug) {
    commit('setActiveCourse', slug)
  },
  setActiveLesson ({ commit }, slug) {
    commit('setActiveLesson', slug)
  },
  addCourse ({ commit }, course) {
    commit('addCourse', course)
  },
  deleteCourse ({ commit }, courseID) {
    commit('deleteCourse', courseID)
  },
  updateCourse ({ commit }, course) {
    commit('updateCourse', course)
  },
  addStudent ({ commit }, student) {
    commit('addStudent', student)
  }
}

export const getters = {
  getCourses (state) {
    return state.courses
  },
  getActiveCourse (state) {
    return state.courses.find(course => course.slug === state.activeCourseSlug)
  },
  getActiveLesson (state) {
    return state.courses.find(course => course.slug === state.activeCourseSlug).lessons
      .find(lesson => lesson.slug === state.activeLessonSlug)
  },
  getNewCourseSlug (state) {
    return `course-${state.courses.length}`
  }
}
