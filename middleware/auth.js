export default function ({ store, redirect }) {
  if (Object.values(store.state.user).length === 0) {
    store.actions.dispatch('logout')
    return redirect('/')
  }
}
