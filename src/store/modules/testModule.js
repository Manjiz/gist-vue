const TEST = 'TEST'

export default {
  state: {
    test: 0
  },
  getters: {
    test: state => state.test
  },
  mutations: {
    [TEST] (state, { payload }) {
      state.test = payload
    }
  },
  actions: {
    setTest ({ commit }, num) {
      commit(TEST, {
        payload: num
      })
    }
  }
}
