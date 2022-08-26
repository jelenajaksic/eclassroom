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
    const response = await this.$axios.$post('api/courses/get-all')
    commit('setCourses', response)
    if (studentEmail) {
      commit('setStudent', studentEmail)
    }
  },
  async getCoursesFromLinked ({ commit }, user) {
    const response = await this.$axios.$post('api/courses/get-all')
    const coursesFromLinked = response.filter(course => user.linkedUsers.includes(course.admin))
    commit('setCourses', coursesFromLinked)
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
  async addCourse ({ commit }, data) {
    await this.$axios.$post('api/courses/add-course', { course: data.course })
    const fd = new FormData()
    fd.append('file', data.image)
    fd.append('filename', data.course.image)
    await this.$axios.$post('api/image', fd)
    await this.getAllCourses
  },
  async deleteCourse ({ commit }, courseID) {
    await this.$axios.$post('api/courses/delete-course', { id: courseID })
    await this.getAllCourses
  },
  async updateCourse ({ commit }, data) {
    await this.$axios.$post('api/courses/update-course', data.course)
    const fd = new FormData()
    fd.append('file', data.image)
    fd.append('filename', data.course.image)
    await this.$axios.$post('api/image', fd)
    await this.getAllCourses
  },
  async addStudent ({ commit }, data) {
    await this.$axios.$post('api/courses/add-student', data)
  },
  async enrollExistingStudent ({ commit }, data) {
    await this.$axios.$post('api/courses/enroll-student', data)
  },
  async addLesson ({ commit }, { courseID, lesson, images }) {
    await this.$axios.$post('api/courses/add-lesson', {
      course_id: courseID,
      lesson
    })
    const promises = []
    Object.keys(images).forEach((imageTitle) => {
      const fd = new FormData()
      fd.append('file', images[imageTitle])
      fd.append('filename', imageTitle)
      promises.push(this.$axios.$post('api/image', fd))
    })
    await Promise.all(promises)
    await this.getAllCourses
  },
  async updateLesson ({ commit }, { courseID, lesson }) {
    await this.$axios.$post('api/courses/update-lesson', {
      course_id: courseID,
      lesson
    })
    await this.getAllCourses
  },
  async deleteLesson ({ commit }, { courseID, lessonID }) {
    await this.$axios.$post('api/courses/delete-lesson', {
      course_id: courseID,
      lesson_id: lessonID
    })
    await this.getAllCourses
  },
  async addTest ({ commit }, { courseID, newTest, images }) {
    await this.$axios.$post('api/courses/add-test', {
      course_id: courseID,
      newTest
    })
    const promises = []
    Object.keys(images).forEach((imageTitle) => {
      const fd = new FormData()
      fd.append('file', images[imageTitle])
      fd.append('filename', imageTitle)
      promises.push(this.$axios.$post('api/image', fd))
    })
    await Promise.all(promises)
    await this.getAllCourses
  },
  async updateTest ({ commit }, { courseID, newTest }) {
    await this.$axios.$post('api/courses/update-test', {
      course_id: courseID,
      newTest
    })
    await this.getAllCourses
  },
  async deleteTest ({ commit }, { courseID, testID }) {
    await this.$axios.$post('api/courses/delete-test', {
      course_id: courseID,
      test_id: testID
    })
    await this.getAllCourses
  },
  async updateCurrentLessonSection ({ commit }, { courseID, lessonID, sectionIndex, studentEmail }) {
    await this.$axios.$post('api/courses/update-current-lesson-section', {
      course_id: courseID,
      lesson_id: lessonID,
      sectionIndex,
      studentEmail
    })
    await this.getAllCourses
  },
  async updateTestProgress ({ commit }, { courseID, testID, score, studentEmail }) {
    await this.$axios.$post('api/courses/update-test-progress', {
      course_id: courseID,
      test_id: testID,
      score,
      studentEmail
    })
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
}
