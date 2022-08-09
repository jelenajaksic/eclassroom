export const state = () => ({
  profile: {
    name: 'Name Surname',
    email: 'email@email.com',
    password: 'password'
  }
})

export const mutations = {
  updateProfile (state, profile) {
    state.profile.name = profile.name
    state.profile.email = profile.email
    state.profile.password = profile.password
  }
}

export const actions = {
  updateProfile ({ commit }, profile) {
    commit('updateProfile', profile)
  }
}

export const getters = {
  getProfileData (state) {
    return state.profile
  }
}
