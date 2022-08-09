const mockCoursesDB = [
  // One mock course
  {
    id: '',
    slug: '',
    title: '',
    description: '',
    shortDescription: '',
    professor: 'email',
    students: [
      {
        email: '',
        progress: [
          {
            lessonId: '',
            currentSection: ''
          }
        ]
      }
    ],
    lessons: []
  }
]
const mockCourses = [
  {
    // TODO: remove id?
    id: 0,
    slug: '0',
    title: 'Title',
    description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.',
    shortDescription: 'Course Short Description',
    progress: 20,
    img: 'https://cdn.vuetifyjs.com/images/cards/sunshine.jpg',
    lessons: []
  },
  {
    id: 1,
    slug: '1',
    title: 'Title',
    description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.',
    shortDescription: 'Course Short Description',
    progress: 40,
    img: 'https://cdn.vuetifyjs.com/images/cards/sunshine.jpg',
    lessons: []
  },
  {
    id: 2,
    slug: '2',
    title: 'Title',
    description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.',
    shortDescription: 'Course Short Description',
    progress: 90,
    img: 'https://cdn.vuetifyjs.com/images/cards/sunshine.jpg',
    lessons: []
  },
  {
    id: 3,
    slug: '3',
    title: 'Title',
    description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.',
    shortDescription: 'Course Short Description',
    progress: 0,
    img: 'https://cdn.vuetifyjs.com/images/cards/sunshine.jpg',
    lessons: []
  }
]

export const state = () => ({
  courses: {},
  courseSlug: ''
})

export const mutations = {
  setCourses (state) {
    state.courses = mockCourses
  },
  setCourse (state, slug) {
    state.courseSlug = slug
  },
  addCourse (state, course) {
    state.courses.push(course)
  },
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
  getAllCourses ({ commit }) {
    commit('setCourses')
  },
  getCourse ({ commit }, slug) {
    commit('setCourse', slug)
  },
  addCourse ({ commit }, course) {
    commit('addCourse', course)
  },
  deleteCourse ({ commit }, courseID) {
    commit('deleteCourse', courseID)
  },
  updateCourse ({ commit }, course) {
    commit('updateCourse', course)
  }
}

export const getters = {
  getCourses (state) {
    return state.courses
  },
  getCourse (state) {
    return state.courses.find(course => course.slug === state.courseSlug)
  },
  getNewCourseSlug (state) {
    return `course-${state.courses.length}`
  }
}
