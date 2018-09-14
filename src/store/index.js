import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'
import testModule from './modules/testModule'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    testModule,
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
})
