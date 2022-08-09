export const state = () => ({
  user: {}
})

export const mutations = {
  setUser (state, user) {
    state.user = user
  }
}

export const actions = {
  async login ({ commit }, loginData) {
    const response = await this.$axios.$post('api/login', loginData)
    commit('setUser', response)
    if (response?.admin) {
      await this.$router.push('/professor')
    } else {
      await this.$router.push('/student')
    }
  },
  logout ({ commit }) {
    commit('setUser', {})
  }
}

export const getters = {
  getUser (state) {
    return state.user
  }
}
