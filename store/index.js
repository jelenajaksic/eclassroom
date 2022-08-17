import { USERS } from '../common/commonHelper'

export const state = () => ({
  user: {},
  users: []
})

export const mutations = {
  setUser (state, user) {
    state.user = user
  },
  setUsers (state, users) {
    state.users = users
  },
  updateUserInfo (state, userInfo) {
    state.user.name = userInfo.name
    state.user.email = userInfo.email
    state.user.password = userInfo.password
  }
}

export const actions = {
  async login ({ commit }, loginData) {
    const response = await this.$axios.$post('api/login', loginData)
    commit('setUser', response)
    if (response?.admin) {
      await this.$router.push('/professor/courses')
    } else {
      await this.$router.push('/student/courses')
    }
  },
  async resetPassword ({ commit }, email) {
    await this.$axios.$post('api/reset-password', email)
  },
  logout ({ commit }) {
    commit('setUser', {})
  },
  async getAllUsers ({ commit }) {
    const response = await this.$axios.$post('api/get-all-users')
    commit('setUsers', response)
  },
  async updateUserInfo ({ commit }, userInfo) {
    const response = await this.$axios.$post('api/update-user-info', userInfo)
    commit('updateUserInfo', response)
  }
}

export const getters = {
  getUser (state) {
    return state.user
  },
  getUserRole (state) {
    return state.user.admin ? USERS.PROFESSOR : USERS.STUDENT
  },
  getAllStudents (state) {
    return state.users.length ? state.users.filter(user => user.admin === false).map(user => user.email) : []
  }
}
