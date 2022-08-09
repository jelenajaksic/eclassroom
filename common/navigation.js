import { USERS } from './commonHelper'
const NAVBAR_ITEMS_PROFESSOR = [
  {
    icon: 'mdi-home',
    title: 'Home',
    to: '/professor'
  },
  {
    icon: 'mdi-school',
    title: 'Courses',
    to: '/professor/courses'
  },
  {
    icon: 'mdi-face-woman',
    title: 'Profile',
    to: '/profile'
  },
  {
    icon: 'mdi-logout',
    title: 'Logout',
    to: '/'
  }
]

const NAVBAR_ITEMS_STUDENT = [
  {
    icon: 'mdi-home',
    title: 'Home',
    to: '/student'
  },
  {
    icon: 'mdi-school',
    title: 'Courses',
    to: '/student/courses'
  },
  {
    icon: 'mdi-face-woman',
    title: 'Profile',
    to: '/profile'
  },
  {
    icon: 'mdi-logout',
    title: 'Logout',
    to: '/'
  }
]

export const getNavItems = (user) => {
  return user === USERS.PROFESSOR ? NAVBAR_ITEMS_PROFESSOR : NAVBAR_ITEMS_STUDENT
}
