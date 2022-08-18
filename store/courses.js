export const state = () => ({
  courses: {},
  activeCourseSlug: '',
  activeLessonSlug: '',
  activeTestSlug: '',
  studentEmail: ''
})

export const mutations = {
  setCourses (state, courses) {
    state.courses = courses
  },
  setStudent (state, studentEmail) {
    state.studentEmail = studentEmail
  },
  setActiveCourse (state, slug) {
    state.activeCourseSlug = slug
  },
  setActiveLesson (state, slug) {
    state.activeLessonSlug = slug
  },
  setActiveTest (state, slug) {
    state.activeTestSlug = slug
  }
}

export const actions = {
  async getAllCourses ({ commit }, studentEmail = '') {
    const response = await this.$axios.$post('api/courses/get_all')
    commit('setCourses', response)
    if (studentEmail) {
      commit('setStudent', studentEmail)
    }
  },
  setActiveCourse ({ commit }, slug) {
    commit('setActiveCourse', slug)
  },
  setActiveLesson ({ commit }, slug) {
    commit('setActiveLesson', slug)
  },
  setActiveTest ({ commit }, slug) {
    commit('setActiveTest', slug)
  },
  async addCourse ({ commit }, course) {
    await this.$axios.$post('api/courses/add-course', course)
    await this.getAllCourses
  },
  async deleteCourse ({ commit }, courseID) {
    await this.$axios.$post('api/courses/delete-course', courseID)
    await this.getAllCourses
  },
  async updateCourse ({ commit }, course) {
    await this.$axios.$post('api/courses/update-course', course)
    await this.getAllCourses
  },
  async addStudent ({ commit }, { courseID, student }) {
    await this.$axios.$post('api/courses/add-student', {
      course_id: courseID,
      student
    })
  },
  async enrollExistingStudent ({ commit }, { courseID, email }) {
    await this.$axios.$post('api/courses/enroll-student', {
      course_id: courseID,
      email
    })
  },
  async addLesson ({ commit }, { courseID, lesson }) {
    await this.$axios.$post('api/courses/add-lesson', {
      course_id: courseID,
      lesson
    })
    await this.getAllCourses
  },
  async addTest ({ commit }, { courseID, test }) {
    await this.$axios.$post('api/courses/add-test', {
      course_id: courseID,
      test
    })
    await this.getAllCourses
  },
  async updateLesson ({ commit }, { courseID, lesson }) {
    await this.$axios.$post('api/courses/update-lesson', {
      course_id: courseID,
      lesson
    })
    await this.getAllCourses
  },
  async deleteLesson ({ commit }, lessonID) {
    await this.$axios.$post('api/courses/delete-lesson', lessonID)
    await this.getAllCourses
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
  getActiveTest (state) {
    return state.courses.find(course => course.slug === state.activeCourseSlug).tests
      .find(test => test.slug === state.activeTestSlug)
  }
  // getLessonProgress (state) {
  //   return state.courses.find(course => course.slug === state.activeCourseSlug)?.lessons.length
  //     ? state.courses.find(course => course.slug === state.activeCourseSlug)
  //       .students[state.studentEmail].lessons[state.activeLessonSlug]
  //     : '0'
  // },
  // getTestProgress (state) {
  //   return state.courses.find(course => course.slug === state.activeCourseSlug)?.tests.length
  //     ? state.courses.find(course => course.slug === state.activeCourseSlug)
  //       .students[state.studentEmail].tests[state.activeTestSlug]
  //     : '0'
  // }
}
